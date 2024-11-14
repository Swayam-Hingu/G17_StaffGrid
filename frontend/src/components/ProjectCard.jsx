// src/ProjectCard.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { ProgressBar } from 'react-bootstrap';
import { FaEye, FaTrash } from 'react-icons/fa';
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

const ProjectCard = ({ project, handleDelete }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="project-card">
      <div className="header">
        <h3 className="title">{project.title}</h3>
        <span className={`priority priority-${project.priority.toLowerCase()}`}>{project.priority}</span>
      </div>
      <p className="details">{project.description}</p>
      <div className="footer">
        <div>
          <p><strong>Team Manager:</strong> {project.teamManager}</p>
          <p><strong>Team Members:</strong> {project.teamMembers.join(', ')}</p>
          <p><strong>Status:</strong> <span className={`status status-${project.status.toLowerCase().replace(' ', '-')}`}>{project.status}</span></p>
          <p><strong>Start Date:</strong> {project.startDate}</p>
          <p><strong>End Date:</strong> {project.endDate}</p>
        </div>
      </div>
      <div className="buttons">
        <button className="view-button" onClick={openModal}><FaEye /></button>
        <button className="delete-button" onClick={() => handleDelete(project.id)}><FaTrash /></button>
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
        <h2>{project.title}</h2>
        <p><strong>Description:</strong> {project.description}</p>
        <p><strong>Team Manager:</strong> {project.teamManager}</p>
        <p><strong>Team Members:</strong> {project.teamMembers.join(', ')}</p>
        <p><strong>Status:</strong> {project.status}</p>
        <ProgressBar now={statusToPercentage(project.status)} label={`${statusToPercentage(project.status)}%`} />
        <p><strong>Start Date:</strong> {project.startDate}</p>
        <p><strong>Created At:</strong> {project.createdAt}</p>
        <p><strong>End Date:</strong> {project.endDate}</p>
        <h3>Tasks</h3>
        <ul>
          {project.tasks.map((task, index) => (
            <li key={index}>
              <p><strong>Title:</strong> {task.taskTitle}</p>
              <p><strong>Description:</strong> {task.taskDescription}</p>
              <p><strong>Assigned To:</strong> {task.assignedTo}</p>
              <p><strong>Due Date:</strong> {task.dueDate}</p>
              <p><strong>Status:</strong> {task.status}</p>
            </li>
          ))}
        </ul>
        <button className="close" onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ProjectCard;
