import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import axios from 'axios';
import Cookies from 'js-cookie';
import Modal from 'react-modal'; // Import Modal component
import { Link ,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProjectPage = () => {
  const id = Cookies.get('employeeID');
  const token = Cookies.get("jwt11");
  const role = Cookies.get('employeeRole');
  const navigate = useNavigate();
  // console.log(role)

  const [projects, setProjects] = useState([]);
  const [selectedUpdateProject, setSelectedUpdateProject] = useState(null); 
  const [modalIsOpen, setModalIsOpen] = useState(false); 

  // Get all projects for manager
  const getAllManagerorAdminProject = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASEURL}/api/project/${id}`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setProjects(response.data.projects);
      // toast.success("Fetch Projects!");

    } catch (error) {
      console.log('ERROR: ', error);
      toast.error("Fetch Projects error");
        if(error.response.data.error=="jwt malformed"){
        toast.error("Session expired. Redirecting to login...");
          setTimeout(() => {
            navigate("/api/login");
          }, 2000);
        }
    }
  };

  // Get all projects for employee
  const getAllEmployeeProject = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASEURL}/api/project/employee/${id}`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setProjects(response.data.projects);
      // toast.success("Fetch Projects!");
    } catch (error) {
      toast.error("Fetch Projects error");
        if(error.response.data.error=="jwt malformed"){
        toast.error("Session expired. Redirecting to login...");
          setTimeout(() => {
            navigate("/api/login");
          }, 2000);
        }
    }
  };

  // Handle project deletion
  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_BASEURL}/api/project/${projectId}`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      getAllManagerorAdminProject(); 
      toast.delete("Delete Project!");

    } catch (error) {
      toast.error("Error Delete Project");

        // if(error.response.data.error=="jwt malformed"){
        //   setTimeout(() => {
        //     navigate("/api/login");
        //   }, 2000);
        // }
    }
  };

  // Handle project update
  const handleUpdate = (project) => {
    // console.log("UPDATE FOR HERE....")
    setSelectedUpdateProject(project);  
    setModalIsOpen(true);  
  };

  // Close the modal
  const handleCloseModal = () => {
    setModalIsOpen(false);  
    setSelectedUpdateProject(null);  
  };

  // Handle form submission for updating the project status
  const handleFormSubmit = async (updatedProject) => {
    // console.log(updatedProject)
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/project/${updatedProject.projectId}`, 
        updatedProject, 
        {
          withCredentials: true, 
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ); 
      getAllManagerorAdminProject();  
      handleCloseModal();  
      toast.success("Update Project Done");

    } catch (error) {
      toast.error("Error in Update project");
        if(error.response.data.error=="jwt malformed"){
        toast.error("Session expired. Redirecting to login...");
          setTimeout(() => {
            navigate("/api/login");
          }, 2000);
        }
    }
  };

  useEffect(() => {
    if (role === 'manager' || role === 'admin') {
      getAllManagerorAdminProject();
    }
    if (role === 'employee') {
      getAllEmployeeProject();
    }
  }, []);

  return (
    <div className="project-page">
      {/* Render Projects */}
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project._id}>
            <ProjectCard
              project={project}
              handleDelete={(role === 'manager' || role === 'admin' )? handleDelete : null}
              handleUpdate={(role === 'manager' || role === 'admin') ? () => handleUpdate(project) : null}
              role={role}
            />
          </div>
        ))
      ) : (
        <p>No projects available.</p>
      )}
 
      <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Update Project Status"
        style={{
          content: { 
            maxWidth: '600px',
            width: '80%',  
            margin: '0 auto', 
            padding: '30px',
            marginTop:'100px',
            borderRadius: '10px',
            backgroundColor: '#E2F1E7',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            color: '#243642', 
          },
      
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)', 
          },
        }}
      >
        <h3 style={{ color: '#387478' }}>Update Project Status</h3> 

        {selectedUpdateProject && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit(selectedUpdateProject);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {/* Project Title */}
            <div>
              <label style={{ color: '#243642' }}>Project Title</label>
              <input
                type="text"
                value={selectedUpdateProject.title || ''}
                disabled
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #387478',
                  backgroundColor: '#fff',
                  color: '#243642',
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ color: '#243642' }}>Description</label>
              <textarea
                value={selectedUpdateProject.description || ''}
                disabled
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #387478',
                  backgroundColor: '#fff',
                  color: '#243642',
                }}
              />
            </div>

            {/* Team Manager */}
            <div>
              <label style={{ color: '#243642' }}>Team Manager</label>
              <input
                type="text"
                value={selectedUpdateProject.teamManager?.name || 'N/A'}
                disabled
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #387478',
                  backgroundColor: '#fff',
                  color: '#243642',
                }}
              />
            </div>

            {/* Team Manager ID */}
            <div>
              <label style={{ color: '#243642' }}>Team Manager ID</label>
              <input
                type="text"
                value={selectedUpdateProject.teamManager?.id || 'N/A'}
                disabled
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #387478',
                  backgroundColor: '#fff',
                  color: '#243642',
                }}
              />
            </div>

            {/* Team Members */}
            <div>
              <label style={{ color: '#243642' }}>Team Members</label>
              <input
                type="text"
                value={selectedUpdateProject.teamMembers?.map((member) => member.id).join(', ') || 'No team members'}
                disabled
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #387478',
                  backgroundColor: '#fff',
                  color: '#243642',
                }}
              />
            </div>

            {/* Tasks */}
            <h4 style={{ color: '#387478' }}>Tasks</h4>
            {selectedUpdateProject.tasks?.length > 0 ? (
              selectedUpdateProject.tasks.map((task, taskIndex) => (
                <div key={taskIndex} style={{ marginBottom: '15px' }}>
                  <div>
                    <label style={{ color: '#243642' }}>Task Title</label>
                    <input
                      type="text"
                      value={task.taskTitle || 'Untitled'}
                      disabled
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #387478',
                        backgroundColor: '#fff',
                        color: '#243642',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ color: '#243642' }}>Task Description</label>
                    <textarea
                      value={task.taskDescription || 'No description available'}
                      disabled
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #387478',
                        backgroundColor: '#fff',
                        color: '#243642',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ color: '#243642' }}>Assigned To</label>
                    <input
                      type="text"
                      value={task.assignedTo?.id || 'N/A'}
                      disabled
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #387478',
                        backgroundColor: '#fff',
                        color: '#243642',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ color: '#243642' }}>Due Date</label>
                    <input
                      type="text"
                      value={task.dueDate || 'N/A'}
                      disabled
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #387478',
                        backgroundColor: '#fff',
                        color: '#243642',
                      }}
                    />
                  </div>

                  {/* Task Status */}
                  <div>
                    <label style={{ color: '#243642' }}>Status</label>
                    <select
                      value={task.status || 'Not Started'}
                      onChange={(e) => {
                        const updatedProject = { ...selectedUpdateProject };
                        updatedProject.tasks[taskIndex].status = e.target.value;
                        setSelectedUpdateProject(updatedProject);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #387478',
                        backgroundColor: '#fff',
                        color: '#243642',
                      }}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks available</p>
            )}

            {/* Project Status Update */}
            <div>
              <label htmlFor="projectStatus" style={{ color: '#243642' }}>Project Status</label>
              <select
                id="projectStatus"
                value={selectedUpdateProject.status || ''}
                onChange={(e) => setSelectedUpdateProject({ ...selectedUpdateProject, status: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #387478',
                  backgroundColor: '#fff',
                  color: '#243642',
                }}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>

            {/* Submit and Close buttons */}
            <button
              type="submit"
              style={{
                backgroundColor: '#387478', // Primary color (teal)
                color: '#fff',
                padding: '10px 15px',
                borderRadius: '5px',
                border: 'none',
                marginTop: '20px',
                cursor: 'pointer',
              }}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              style={{
                backgroundColor: '#629584', // Secondary color (greenish)
                color: '#fff',
                padding: '10px 15px',
                borderRadius: '5px',
                border: 'none',
                marginTop: '10px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </form>
        )}
      </Modal>
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

export default ProjectPage;
