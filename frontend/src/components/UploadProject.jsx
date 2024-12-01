import React from "react";
import { useForm, useFieldArray } from "react-hook-form"; 
import './css/UploadProject.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UploadProject = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const { fields: teamMembersFields, append: appendTeamMember, remove: removeTeamMember } = useFieldArray({
    control,
    name: "teamMembers"
  });

  const { fields: tasksFields, append: appendTask, remove: removeTask } = useFieldArray({
    control,
    name: "tasks"
  });

  const token = Cookies.get('jwt11');
  const id = Cookies.get('employeeID');
  const name = Cookies.get('employeeName');

  const onSubmit = async (data) => {
    try {
      if (data.projectId) {
        // Update existing project
        const response = await axios.patch(
          `${process.env.REACT_APP_BACKEND_BASEURL}/api/project/${data.projectId}`, 
          data, 
          {
            withCredentials: true, 
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        ); 
        toast.success("Project updated successfully!");
        setTimeout(() => {
          navigate("/api/project");
        }, 2000);

      } else {
        // Create a new project
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/project/upload`, {
          title: data.title,
          description: data.description,
          teamManager: {
            id: id,
            name: name
          },
          teamMembers: data.teamMembers.map(member => ({ id: member.id })), 
          status: data.status,
          tasks: data.tasks.map((task) => ({
            taskTitle: task.taskTitle,
            taskDescription: task.taskDescription,
            assignedTo: { id: task.assignedTo.id },
            dueDate: task.dueDate,
            status: task.status
          })),
          startDate: data.startDate,
          endDate: data.endDate
        }, {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        toast.success("Project Upload successfully!");
        // console.log("Project uploaded successfully:", response.data);
      }

      setTimeout(() => {
        navigate("/api/project");
      }, 2000);

    } catch (error) {
      toast.error("Project Error successfully!");
      console.error("ERROR: ", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="project-upload">
      <div className="form-container1">
        <h2>Project Details Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Title */}
          <div className="form-group1">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="form-control1"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className="error-message">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div className="form-group1">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-control1"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <p className="error-message">{errors.description.message}</p>}
          </div>

          {/* Team Members */}
          <div className="form-group1">
          <label htmlFor="Team Member">Team Member</label>
          {teamMembersFields.map((item, index) => (
              <div key={item.id} className="team-member">
                <label>Member {index + 1}</label>
                <input
                  type="text"
                  {...register(`teamMembers.${index}.id`, { required: "Member ID is required" })}
                  placeholder="Member ID"
                />
                {errors.teamMembers?.[index]?.id && (
                  <p className="error-message">{errors.teamMembers[index].id.message}</p>
                )}

                <button className="remove-btn" type="button" onClick={() => removeTeamMember(index)} style={{ color: "white" }}>Remove Member</button>
              </div>
            ))}
            <button type="button" onClick={() => appendTeamMember({ id: "" })} style={{ color: "white" }}>Add Team Member</button>
          </div>

          {/* Tasks */}
          <div className="form-group1">
          <label htmlFor="Tasks">Tasks</label>

            {tasksFields.map((item, index) => (
              <div key={item.id} className="task">
                <label>Task {index + 1}</label>

                <input
                  type="text"
                  {...register(`tasks.${index}.taskTitle`, { required: "Task Title is required" })}
                  placeholder="Task Title"
                />
                {errors.tasks?.[index]?.taskTitle && (
                  <p className="error-message">{errors.tasks[index].taskTitle.message}</p>
                )}

                <textarea
                  {...register(`tasks.${index}.taskDescription`)}
                  placeholder="Task Description"
                />

                <input
                  type="text"
                  {...register(`tasks.${index}.assignedTo.id`, { required: "Assigned ID is required" })}
                  placeholder="Assigned ID"
                />
                {errors.tasks?.[index]?.assignedTo?.id && (
                  <p className="error-message">{errors.tasks[index].assignedTo.id.message}</p>
                )}

                <input
                  type="date"
                  {...register(`tasks.${index}.dueDate`)}
                />

                <select {...register(`tasks.${index}.status`)}>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Blocked">Blocked</option>
                </select>

                <button className="remove-btn" type="button" onClick={() => removeTask(index)} style={{ color: "white" }}>Remove Task</button>
              </div>
            ))}
            <button type="button" onClick={() => appendTask({ taskTitle: "", taskDescription: "", assignedTo: { id: "" }, dueDate: "", status: "Not Started" })} style={{ color: "white" }}>Add Task</button>
          </div>

          {/* Start and End Dates */}
          <div className="form-group1">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              {...register("startDate")}
            />

            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              {...register("endDate")}
            />
          </div>

          {/* Submit Button */}
          <div className="form-group1">
            <button type="submit" className="btn">Submit</button>
          </div>

        </form>
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

export default UploadProject;