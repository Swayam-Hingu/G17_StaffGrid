import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import './css/Salary.css';

const Salary = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const { fields: employees, append, remove } = useFieldArray({
    control,
    name: "employees"
  });

  const onSubmit = async (data) => {
    console.log("Salary Data:", data);
  };

  return (
    <div className="salary-main-container">
    <div className="salary-form-container">
      <h2>Salary Management Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Employee Details */}
        <div className="form-group">
          <h3>Employee Salary Details</h3>
          {employees.map((employee, index) => (
            <div key={employee.id} className="employee-detail">
              <label>Employee {index + 1}</label>
              
              <input
                type="text"
                {...register(`employees.${index}.employeeId`, { required: "Employee ID is required" })}
                placeholder="Employee ID"
                className="form-control"
              />
              
              {errors.employees?.[index]?.employeeId && (
                <p className="error-message">{errors.employees[index].employeeId.message}</p>
              )}

              <input
                type="number"
                {...register(`employees.${index}.salary`, { required: "Salary is required" })}
                placeholder="Salary Amount"
                className="form-control"
              />
              {errors.employees?.[index]?.salary && (
                <p className="error-message">{errors.employees[index].salary.message}</p>
              )}

              <select
                {...register(`employees.${index}.bonus`, { required: "Bonus is required" })}
                className="form-control"
              >
                <option value="">Select Bonus Type</option>
                <option value="A">Bonus A</option>
                <option value="B">Bonus B</option>
                <option value="C">Bonus C</option>
              </select>
              {errors.employees?.[index]?.bonus && (
                <p className="error-message">{errors.employees[index].bonus.message}</p>
              )}

              <button
                type="button"
                className="remove-btn"
                onClick={() => remove(index)}
              >
                Remove Employee
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={() => append({ employeeId: "", salary: "", bonus: "" })}
          >
            Add Employee
          </button>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="btn-primary">Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Salary;