import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime
from pymongo import MongoClient
from flask import Flask, jsonify, request
from threading import Thread

# create Flask app
app = Flask(__name__)

# access mongoDBs
client = MongoClient("mongodb+srv://mistryriddhi1510:OZBgSEDfrZVCY9la@cluster0.qa3sq.mongodb.net/EMS")
db = client["EMS"]
attendanceDetail = db["attendanceDetail"]

def getAllEmployeesEncodeProfilePhoto():
    # to store all employees encoded images (array-128 length)

    print("1")
    encodedImagesOfAllEmp = []
    idOfAll = []
    nameOfAll = []
    
    profiles = attendanceDetail.find({})
    for emp in profiles:
        if (not emp['profilePhoto'].get('data')) or (not emp.get('profilePhoto')):
            continue
        
        print(emp['profilePhoto'].get('data'))
        if not emp.get('encodedProfilePhoto'):
            imgBinary = emp['profilePhoto']['data']

            imgArr = np.frombuffer(imgBinary, np.uint8)
            # get image from the array
            img = cv2.imdecode(imgArr, cv2.IMREAD_COLOR)
            # now this image is ready to encode for face recognition
            encodedImage = face_recognition.face_encodings(img)
            if encodedImage: 
                encodedImagesOfAllEmp.append(encodedImage[0])  
                attendanceDetail.find_one_and_update(
                    {'id': emp['id']},
                    {'encodedProfilePhoto': encodedImage[0]}
                )
                idOfAll.append(emp['id'])
                nameOfAll.append(emp['name'])
        else:
            encodedImage = emp['encodedProfilePhoto']
            encodedImagesOfAllEmp.append(encodedImage)
            idOfAll.append(emp['id'])
            nameOfAll.append(emp['name'])

    return encodedImagesOfAllEmp, idOfAll, nameOfAll

def markAttendance(emp_id, date):
    print("inside mark")
    attendance_record = {'date': date, 'status': "present"}
    attendanceDetail.update_one(
        {'id': emp_id},
        {'$push': {'attendance': attendance_record}}
    )
    return True

def alreadyMarked(emp_id, date):
    emp = attendanceDetail.find_one({
        "id": emp_id,
        "attendance": {
            "$elemMatch": {
                "date": date
            }
        }
    }, {
        "attendance.$": 1 
    })
    if emp and "attendance" in emp:
        status = emp["attendance"][0]["status"]

        print(status)
        if status == "present":
            return True
        else:
            return False
    else:
        return False

print("mongoDB connected")
print("server started at port 5000")

messages=[]
def process_attendance(data):
    try:
        print("yes")
        emp = attendanceDetail.find_one({'id': data['id']})
        currDate = datetime.now().strftime("%Y-%m-%d")
        if alreadyMarked(emp['id'], currDate):
            print("Attendance already marked.")
            return
        
        print("passed")
        # Open Webcam for face capturing 
        cap = cv2.VideoCapture(0)

        encodedImagesOfAllEmp, idOfAll, nameOfAll = getAllEmployeesEncodeProfilePhoto()

        print("after")
        maxFrame = 5
        currFrame = 0

        print("loog stared and camera opened")
        while True:
            success, frame = cap.read()
            cv2.imshow('StaffGrid-Attendance - Webcam', frame)
            cv2.waitKey(1)
            # resize image
            imgS = cv2.resize(frame, (0, 0), None, 0.25, 0.25)
            imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)
            
            # get location and encodes frame
            facesCurFrame = face_recognition.face_locations(imgS, model="cnn")
            encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

            # Now loop to all image in the frame
            for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
                # compare current image with all the existing employees
                matches = face_recognition.compare_faces(encodedImagesOfAllEmp, encodeFace)
                faceDis = face_recognition.face_distance(encodedImagesOfAllEmp, encodeFace)

                # find the minimum value
                matchIndex = np.argmin(faceDis)

                # if matched, then mark attendance
                if matches[matchIndex]:
                    markAttendance(emp['id'], currDate) 
                    msgWhenMarks = f"{idOfAll[matchIndex]} - {nameOfAll[matchIndex]}"
                    y1, x2, y2, x1 = faceLoc
                    y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.rectangle(frame, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
                    cv2.putText(frame, msgWhenMarks, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

                    cv2.imshow('Webcam', frame)
                    cv2.waitKey(5000)
                    cap.release() 
                    cv2.destroyAllWindows()
                    print("attendence marked successfully")
                    return
            
            currFrame += 1
            if currFrame > maxFrame:
                print("Face not detected; please try again.")
                cap.release()  
                cv2.destroyAllWindows() 
                return
            
    except Exception as e:
        print(f"Error: {str(e)}")

messages=[]

@app.route('/api/mark', methods=['POST'])
def handleMarkAttendance():
    messages=[]
    data = request.get_json()
        
    emp = attendanceDetail.find_one({'id': data['id']})
    if not emp:
        return jsonify({"success": False, "message": "Employee not found"}), 404
    
    if not emp.get('profilePhoto') or not emp['profilePhoto'].get('data'):
        return jsonify({"success": False, "message": "You have to upload profile photo first to mark attendance"}), 400
    
    print("thread started")
    # Start a new thread to process attendance
    thread = Thread(target=process_attendance, args=(data,))
    thread.start()
    
    return jsonify({"success": True, "message": "Attendance marking started"}), 202


if __name__ == '__main__':
    app.run(debug=True)

client.close()
