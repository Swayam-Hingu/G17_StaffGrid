import React, { useState } from 'react';
import Modal from 'react-modal';
import { ProgressBar } from 'react-bootstrap';
import { FaEye, FaTrash, FaEdit} from 'react-icons/fa';
import './css/ProjectPage.css';

const statusToPercentage = (status) => {
  switch (status) {
    case 'Pending':
      return 25;
    case 'In Progress':
      return 50;
    case 'On Hold':
      return 75;
    case 'Completed':
      return 100;
    default:
      return 0;
  }
};

const ProjectCard = ({ project, handleDelete,role, handleUpdate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // console.log("Project is: ",project)

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  

  // Ensure project is an object and contains necessary properties
  if (!project) return null;

  return (
    <div className="project-card">
      <div className="header">
        <h3 className="title">Project Title: {project.title || 'Untitled Project'}</h3> 
      </div>
      <p className="details"><strong>Project Description:</strong> {project.description || 'No description available'}</p>
      <div className="footer">
        <div>
          <p><strong>Team Manager ID:</strong> {project.teamManager.id || 'N/A'}</p>
          <p><strong>Team Manager Name:</strong> {project.teamManager.name || 'N/A'}</p>
          <p><strong>Team Members:</strong> {Array.isArray(project.teamMembers) && project.teamMembers.length > 0 ? project.teamMembers.map((member) => member.id).join(', ') : 'No team members'}</p>
          <p><strong>Status:</strong> <span className={`status status-${project.status?.toLowerCase().replace(' ', '-') || 'unknown'}`}>{project.status || 'Unknown'}</span></p>
          <p><strong>Start Date:</strong> {project.startDate || 'N/A'}</p>
          <p><strong>End Date:</strong> {project.endDate || 'N/A'}</p>
        </div>
      </div>
      <div className="buttons">
        <button className="view-button" onClick={openModal}><FaEye /></button>
        {
          (role === 'manager'|| role === 'admin') && (
            <button className="view-button" onClick={() => handleUpdate(project)}><FaEdit /> Update</button>
          )}
          {
          (role=='manager' || role === 'admin') && <button className="delete-button" onClick={() => handleDelete(project.projectId)}><FaTrash /></button>
        }
        
        
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Project Details"
        style={{
          content: {
            marginTop: '113px', // margin-top of 113px
          },
        }}
      >
        <h2>{project.title || 'Untitled Project'}</h2>
        <p><strong>Description:</strong> {project.description || 'No description available'}</p>
        <p><strong>Team Manager ID:</strong> {project.teamManager.id || 'N/A'}</p> 
        <p><strong>Team Members:</strong> {Array.isArray(project.teamMembers) && project.teamMembers.length > 0 ? project.teamMembers.map((member) => member.id).join(', ') : 'No team members'}</p>
        <p><strong>Status:</strong> {project.status || 'Unknown'}</p>
        <ProgressBar now={statusToPercentage(project.status)} label={`${statusToPercentage(project.status)}%`} />
        <p><strong>Start Date:</strong> {project.startDate || 'N/A'}</p>
        <p><strong>Created At:</strong> {project.createdAt || 'N/A'}</p>
        <p><strong>End Date:</strong> {project.endDate || 'N/A'}</p>
        <h3>Tasks</h3>
        <ul>
          {Array.isArray(project.tasks) && project.tasks.length > 0 ? (
            project.tasks.map((task, index) => (
              <li key={index}>
                <p><strong>Title:</strong> {task.taskTitle || 'Untitled Task'}</p>
                <p><strong>Description:</strong> {task.taskDescription || 'No description available'}</p>
                <p><strong>Assigned To:</strong> {task.assignedTo?.id || 'N/A'}</p> {/* Change: Optional chaining here */}
                <p><strong>Due Date:</strong> {task.dueDate || 'N/A'}</p>
                <p><strong>Status:</strong> {task.status || 'Unknown'}</p>
              </li>
            ))
          ) : (
            <p>No tasks available</p>   
          )}
        </ul>

        <button className="close" onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ProjectCard;
