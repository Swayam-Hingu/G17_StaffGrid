// src/ProjectPage.js
import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

const initialProjects = [
  {
    id: 1, // Unique ID for Project Alpha
    title: 'Project Alpha',
    description: 'Description for Project Alpha',
    teamManager: 'John Doe',
    teamMembers: ['Alice', 'Bob'],
    status: 'In Progress',
    priority: 'High',
    tasks: [
      {
        taskTitle: 'Task 1',
        taskDescription: 'Description for Task 1',
        assignedTo: 'Alice',
        dueDate: '2024-11-30',
        status: 'Pending',
      },
      // More tasks...
    ],
    startDate: '2024-01-01',
    createdAt: '2023-12-01',
    endDate: '2024-12-31',
  },
  {
    id: 2, // Unique ID for another project
    title: 'Project Beta',
    description: 'Description for Project Beta',
    teamManager: 'Jane Smith',
    teamMembers: ['Charlie', 'Dave'],
    status: 'Pending',
    priority: 'Medium',
    tasks: [
      {
        taskTitle: 'Task 1',
        taskDescription: 'Description for Task 1',
        assignedTo: 'Charlie',
        dueDate: '2024-12-15',
        status: 'In Progress',
      },
    ],
    startDate: '2024-02-01',
    createdAt: '2023-12-02',
    endDate: '2024-08-01',
  },
  // Add more projects as needed with unique IDs
];

const ProjectPage = () => {
  const [projects, setProjects] = useState(initialProjects);

  const handleDelete = (projectId) => {
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
  };

  return (
    <div className="project-page">
      <button className="upload-button">New Project</button>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ProjectPage;
