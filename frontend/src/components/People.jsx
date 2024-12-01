import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/People.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import image from './images/empPhoto.jpg';  
import { FaTrashAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const People = () => {
  const navigate = useNavigate();  
  const [peopledata, setPeopleData] = useState([]);
  const [profileImages, setProfileImages] = useState([]); 
  const token = Cookies.get("jwt11");


  const handleAddPerson = () => {
    navigate('/api/registration');  
  };

  const handleDelete = async (id) => {
    // console.log("ID is: ", id)
    const x = prompt("Please `YES` [capital] for validation");
    if(x!='YES'){
      alert("Error: You must enter 'YES' to proceed with deletion.");
      return;
    }
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_BASEURL}/api/login/delete/${id}`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });  
      getAllEmployeeView(); 
      toast.success("Employee deleted successfully");
    } catch (error) {
      // console.log("ERROR: ",error);  
      toast.error("Error: Unable to delete employee");
      if(error.response.data.error=="jwt malformed"){
        toast.error("Session expired. Redirecting to login...");
        setTimeout(() => {
          navigate("/api/login");
        }, 2000);
      }
    }
  }

  const getAllEmployeeView = async () => {
   
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASEURL}/api/login/viewAllemployee`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const people = response.data.allEmpDetailsWithProfiles;
      
      setPeopleData(people); 
      
      const images = people
        .filter(person => person.imageUrl) 
        .map(person => ({ id: person.id, url: person.imageUrl }));

      setProfileImages(images);  
    } catch (error) {
      // console.log("ERROR: ", error);  
      toast.error("Error: Unable to fetch employees");
      if(error.response.data.error=="jwt malformed"){
        setTimeout(() => {
          navigate("/api/login");
        }, 2000);
      }
    }
  };
  useEffect(() => {
    getAllEmployeeView();
  }, []);

  return (
    <div className="people-container"> 
      {peopledata.map((person) => { 
        const profileImage = profileImages.find(img => img.id === person.id)?.url || image;  
        return (
          <div key={person.id} className="cardpeople">
            <div>
              <img src={profileImage} alt={person.name} className="profile-img" />
            </div>
            <div className="card-info">
              <h3 className="name">{person.name}</h3>
              <p className="emlid">{person.id}</p>
              <p className="role">{person.role}</p> 
              {person.role != "admin" && <div className="delete-icon" onClick={() => handleDelete(person.id)}>
                <FaTrashAlt size={20} color="red" />  
              </div>}
            </div>
            
          </div>
        );
      })} 
      <div className="cardpeople add-card" onClick={handleAddPerson}>
        <div className="add-icon">+</div>
        <div className="card-info">
          <h3 className="name">Add New Person</h3>
          <p className="role">Click to Register</p>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default People;
