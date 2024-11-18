import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/People.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import image from './images/empPhoto.jpg';  

const People = () => {
  const navigate = useNavigate();  
  const [peopledata, setPeopleData] = useState([]);
  const [profileImages, setProfileImages] = useState([]);  

  const handleAddPerson = () => {
    navigate('/api/registration');  
  };

  const getAllEmployeeView = async () => {
    const token = Cookies.get('token');
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
      console.log("ERROR: ", error.response ? error.response.data : error.message);  
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
