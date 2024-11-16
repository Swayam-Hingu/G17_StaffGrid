import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './css/UploadProject.css';

const UploadProject = () => { 
  const { register, handleSubmit, control, formState: { errors } } = useForm(); // No defaultValues set

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
          `http://localhost:8000/api/project/${data.projectId}`, 
          data, 
          {
            withCredentials: true, 
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        ); 
        navigate("/api/project");
      } else {
        // Create a new project
        const response = await axios.post('http://localhost:8000/api/project/upload', {
          title: data.title,
          description: data.description,
          teamManager: {
            id: id,
            name: name
          },
          teamMembers: data.teamMembers.map(member => ({ id: member.id })), // Use dynamic teamMembers from form
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
        console.log("Project uploaded successfully:", response.data);
      }

      navigate("/api/project");

    } catch (error) {
      console.error("ERROR: ", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Project Details Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="error-message">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <p className="error-message">{errors.description.message}</p>}
        </div>

        {/* Team Manager */}
        <div className="form-group">
          <h3>Team Manager</h3>
          <label htmlFor="teamManager.id">Manager ID</label>
          <input
            type="text"
            id="teamManager.id"
            className="form-control"
            value={id}
            readOnly
          />
        </div>

        {/* Team Members */}
        <div className="form-group">
          <h3>Team Members</h3>
          {teamMembersFields.map((item, index) => (
            <div key={item.id} className="team-member">
              <label>Member {index + 1}</label>
              <input
                type="text"
                {...register(`teamMembers[${index}].id`, { required: "Member ID is required" })}
                placeholder="Member ID"
              />
              {errors.teamMembers?.[index]?.id && <p className="error-message">{errors.teamMembers[index].id.message}</p>}
              <button type="button" onClick={() => removeTeamMember(index)} style={{ color: "white" }}>Remove Member</button>
            </div>
          ))}
          <button type="button" onClick={() => appendTeamMember({ id: "" })} style={{ color: "white" }}>Add Team Member</button>
        </div>

        {/* Tasks */}
        <div className="form-group">
          <h3>Tasks</h3>
          {tasksFields.map((item, index) => (
            <div key={item.id} className="task">
              <label>Task {index + 1}</label>
              <input
                type="text"
                {...register(`tasks[${index}].taskTitle`, { required: "Task Title is required" })}
                placeholder="Task Title"
              />
              {errors.tasks?.[index]?.taskTitle && <p className="error-message">{errors.tasks[index].taskTitle.message}</p>}
              <textarea
                {...register(`tasks[${index}].taskDescription`)}
                placeholder="Task Description"
              />
              <input
                type="text"
                {...register(`tasks[${index}].assignedTo.id`, { required: "Assigned ID is required" })}
                placeholder="Assigned ID"
              />
              {errors.tasks?.[index]?.assignedTo?.id && <p className="error-message">{errors.tasks[index].assignedTo.id.message}</p>}
              <input
                type="date"
                {...register(`tasks[${index}].dueDate`)}
                placeholder="Due Date"
              />
              {errors.tasks?.[index]?.dueDate && <p className="error-message">{errors.tasks[index].dueDate.message}</p>}
              <select {...register(`tasks[${index}].status`)}>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
              <button type="button" onClick={() => removeTask(index)} style={{ color: "white" }}>Remove Task</button>
            </div>
          ))}
          <button type="button" onClick={() => appendTask({
            taskTitle: "",
            taskDescription: "",
            assignedTo: { id: "" },
            dueDate: "",
            status: "Not Started"
          })} style={{ color: "white" }}>Add Task</button>
        </div>

        {/* Start and End Dates */}
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            {...register("startDate")}
          />
          {errors.startDate && <p className="error-message">{errors.startDate.message}</p>}

          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            {...register("endDate")}
          />
          {errors.endDate && <p className="error-message">{errors.endDate.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>

      </form>
    </div>
  );
};

export default UploadProject;
