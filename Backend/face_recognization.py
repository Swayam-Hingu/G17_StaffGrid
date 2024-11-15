import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime
from pymongo import MongoClient
from flask import Flask, jsonify, request
from threading import Thread
import requests
from flask_cors import CORS
import asyncio

# create Flask app
app = Flask(__name__)
CORS(app)

# access mongoDBs
client = MongoClient("mongodb+srv://mistryriddhi1510:OZBgSEDfrZVCY9la@cluster0.qa3sq.mongodb.net/EMS")
db = client["EMS"]
attendanceDetail = db["attendanceDetail"]
detailProfile = db["detailedprofiles"]

def getAllEmployeesEncodeProfilePhoto():
    # to store all employees encoded images (array-128 length)

    print("1")
    encodedImagesOfAllEmp = []
    idOfAll = []
    nameOfAll = []
    
    ############################ we have to find employee in detailProfileSchema or employee schema

    profiles = detailProfile.find({})
    for emp in profiles:

        if not emp.get('profileImage') or emp.get('profileImage')=='img':
            continue

        profile_url = emp['profileImage']
        print(profile_url)
        
        if not emp.get('encodedProfilePhoto'):
            # get Image from the cloudinary
            img_response = requests.get(profile_url)

            if img_response.status_code == 200:
                img_data = np.frombuffer(img_response.content, np.uint8)
                img = cv2.imdecode(img_data, cv2.IMREAD_COLOR)

                # Now this image is ready to encode for face recognition
                encodedImage = face_recognition.face_encodings(img)
                if encodedImage:
                    encodedImagesOfAllEmp.append(encodedImage[0])
                    detailProfile.find_one_and_update(
                        {'id': emp['id']},
                        {'$set': {'encodedProfilePhoto': encodedImage[0]}}
                    )
                    idOfAll.append(emp['id'])
                    nameOfAll.append(emp['name'])

            # imgBinary = emp['profilePhoto']['data']

            # imgArr = np.frombuffer(imgBinary, np.uint8)
            # # get image from the array
            # img = cv2.imdecode(imgArr, cv2.IMREAD_COLOR)
            # # now this image is ready to encode for face recognition
            # encodedImage = face_recognition.face_encodings(img)
            # if encodedImage: 
            #     encodedImagesOfAllEmp.append(encodedImage[0])  
            #     attendanceDetail.find_one_and_update(
            #         {'id': emp['id']},
            #         {'encodedProfilePhoto': encodedImage[0]}
            #     )
            #     idOfAll.append(emp['id'])
            #     nameOfAll.append(emp['name'])

        else:
            encodedImage = emp['encodedProfilePhoto']
            encodedImagesOfAllEmp.append(encodedImage)
            idOfAll.append(emp['id'])
            nameOfAll.append(emp['name'])

    return encodedImagesOfAllEmp, idOfAll, nameOfAll

# this is also perfect
def markAttendance(emp_id, date):
    print("inside mark")
    attendance_record = {'date': date, 'status': "present"}
    attendanceDetail.update_one(
        {'id': emp_id},
        {'$push': {'attendance': attendance_record}}
    )
    return True

# this is perfect
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
        # emp = attendanceDetail.find_one({'id': data['id']})

        id = data['id']
        currDate = datetime.now().strftime("%Y-%m-%d")
        if alreadyMarked(id, currDate):
            print("Attendance already marked.")
            return
        
        print("passed")
        # Open Webcam for face capturing 
        cap = cv2.VideoCapture(0)

        encodedImagesOfAllEmp, idOfAll, nameOfAll = getAllEmployeesEncodeProfilePhoto()

        print("after")
        maxFrame = 5
        currFrame = 0

        print("loop stared and camera opened")
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
                
                if len(faceDis) == 0:
                    print("Not have any photo to match your face")
                if not matches :
                    print("No matches found; retrying...")
                    continue
                # find the minimum value
                matchIndex = np.argmin(faceDis)

                # if matched, then mark attendance
                if matches[matchIndex]:
                    markAttendance(id, currDate) 
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

@app.route('/api/markAttendance', methods=['POST'])
def handleMarkAttendance():
    try:
        data = request.get_json()

        # Correctly use motor's async query method
        emp = detailProfile.find_one({'id': data['id']})
        if not emp:
            print("Employee not found")
            return jsonify({"success": False, "message": "Employee not found"}), 404

        if not emp.get('profileImage') or emp.get('profileImage')=='img':
            print("You have to upload profile photo first to mark attendance")
            return jsonify({"success": False, "message": "You have to upload profile photo first to mark attendance"}), 400

        print(f"Employee found: {emp}")

        # Start the process in the background
        thread = Thread(target=process_attendance, args=(data,))
        thread.start()

        return jsonify({"success": True, "message": "Attendance marking started"}), 202

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"success": False, "message": "Error processing the attendance request"}), 500


if __name__ == '__main__':
    app.run(debug=True)

client.close()
