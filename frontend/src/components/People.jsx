import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/People.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import image from './images/empPhoto.jpg';  
import { FaTrashAlt } from 'react-icons/fa'; 

const People = () => {
  const navigate = useNavigate();  
  const [peopledata, setPeopleData] = useState([]);
  const [profileImages, setProfileImages] = useState([]); 
  const token = Cookies.get("jwt11");


  const handleAddPerson = () => {
    navigate('/api/registration');  
  };

  const handleDelete = async (id) => {
    console.log("ID is: ", id)
    try {
      const response = await axios.delete(`http://localhost:8000/api/login/delete/${id}`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });  
      getAllEmployeeView(); 
    } catch (error) {
      console.log("ERROR: ",error);  
    }
  }

  const getAllEmployeeView = async () => {
   
    try {
      const response = await axios.get('http://localhost:8000/api/login/viewAllemployee', {
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
      console.log("ERROR: ", error);  
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
    </div>
  );
};

export default People;
