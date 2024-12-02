import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Salary from './Salary';

describe('Salary Component', () => {
  test('renders the Salary form and handles employee addition and removal', () => {
    render(<Salary />);

    // Check initial form rendering
    expect(screen.getByText(/Salary Management Form/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee Salary Details/i)).toBeInTheDocument();

    // Add employees
    fireEvent.click(screen.getByRole('button', { name: /add employee/i }));
    fireEvent.click(screen.getByRole('button', { name: /add employee/i }));

    // Ensure 2 employees are added
    const employeeFields = screen.getAllByPlaceholderText(/Employee ID/i);
    expect(employeeFields.length).toBe(2);

    // Remove one employee
    fireEvent.click(screen.getAllByRole('button', { name: /remove employee/i })[0]);
    expect(screen.getAllByPlaceholderText(/Employee ID/i).length).toBe(1);

    // Remove the last employee
    fireEvent.click(screen.getByRole('button', { name: /remove employee/i }));
    expect(screen.queryByPlaceholderText(/Employee ID/i)).not.toBeInTheDocument();
  });

  test('validates form fields correctly', () => {
    render(<Salary />);

    // Add an employee
    fireEvent.click(screen.getByRole('button', { name: /add employee/i }));

    // Submit form without filling fields
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByText(/Employee ID is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Salary is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Bonus is required/i)).toBeInTheDocument();
  });

  test('handles optional fields correctly', () => {
    render(<Salary />);

    // Add an employee and fill required fields only
    fireEvent.click(screen.getByRole('button', { name: /add employee/i }));
    fireEvent.change(screen.getByPlaceholderText(/Employee ID/i), { target: { value: 'E001' } });
    fireEvent.change(screen.getByPlaceholderText(/Salary Amount/i), { target: { value: '5000' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'A' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check the output (mocking console.log)
    expect(console.log).toHaveBeenCalledWith('Salary Data:', {
      employees: [{ employeeId: 'E001', salary: '5000', bonus: 'A' }],
    });
  });

  test('rejects invalid input values', () => {
    render(<Salary />);

    // Add an employee
    fireEvent.click(screen.getByRole('button', { name: /add employee/i }));

    // Enter invalid salary
    fireEvent.change(screen.getByPlaceholderText(/Employee ID/i), { target: { value: 'E001' } });
    fireEvent.change(screen.getByPlaceholderText(/Salary Amount/i), { target: { value: '-1000' } }); // Negative salary
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'B' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Ensure form validation catches the error
    expect(screen.getByText(/Salary is required/i)).toBeInTheDocument();
  });

  test('handles multiple employees with valid data', () => {
    render(<Salary />);

    // Add multiple employees
    fireEvent.click(screen.getByRole('button', { name: /add employee/i }));
    fireEvent.click(screen.getByRole('button', { name: /add employee/i }));

    // Fill details for Employee 1
    fireEvent.change(screen.getAllByPlaceholderText(/Employee ID/i)[0], { target: { value: 'E001' } });
    fireEvent.change(screen.getAllByPlaceholderText(/Salary Amount/i)[0], { target: { value: '5000' } });
    fireEvent.change(screen.getAllByRole('combobox')[0], { target: { value: 'A' } });

    // Fill details for Employee 2
    fireEvent.change(screen.getAllByPlaceholderText(/Employee ID/i)[1], { target: { value: 'E002' } });
    fireEvent.change(screen.getAllByPlaceholderText(/Salary Amount/i)[1], { target: { value: '7000' } });
    fireEvent.change(screen.getAllByRole('combobox')[1], { target: { value: 'B' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check the output
    expect(console.log).toHaveBeenCalledWith('Salary Data:', {
      employees: [
        { employeeId: 'E001', salary: '5000', bonus: 'A' },
        { employeeId: 'E002', salary: '7000', bonus: 'B' },
      ],
    });
  });

  test('handles edge case: submit with no employees added', () => {
    render(<Salary />);

    // Submit the form without adding employees
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Ensure there are no validation errors since employees array is optional
    expect(screen.queryByText(/Employee ID is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Salary is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Bonus is required/i)).not.toBeInTheDocument();

    // Check if form submission logs empty employee array
    expect(console.log).toHaveBeenCalledWith('Salary Data:', { employees: [] });
  });

  test('handles edge case: remove all employees', () => {
    render(<Salary />);
  
    // Add one employee
    fireEvent.click(screen.getByRole('button', { name: /add employee/i }));
  
    // Fill in employee details
    fireEvent.change(screen.getByPlaceholderText(/Employee ID/i), { target: { value: 'E001' } });
    fireEvent.change(screen.getByPlaceholderText(/Salary Amount/i), { target: { value: '5000' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'A' } });
  
    // Remove the employee
    fireEvent.click(screen.getByRole('button', { name: /remove employee/i }));
  
    // Ensure no employees are left
    expect(screen.queryByPlaceholderText(/Employee ID/i)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/Salary Amount/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  
    // Check if the form can still be submitted without any employees (empty employee array)
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
    // Ensure no validation errors since employees array is optional
    expect(screen.queryByText(/Employee ID is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Salary is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Bonus is required/i)).not.toBeInTheDocument();
  
    // Check if form submission logs empty employee array
    expect(console.log).toHaveBeenCalledWith('Salary Data:', { employees: [] });
  });
  

  test('handles employee add, remove, and validation correctly', () => {
    render(<Salary />);
  
    // Ensure the "Add Employee" button is present initially
    expect(screen.getByRole('button', { name: /add employee/i })).toBeInTheDocument();
  
    // Add an employee
    fireEvent.click(screen.getByRole('button', { name: /add employee/i }));
  
    // Ensure the employee input fields are rendered
    const employeeInputs = screen.getAllByPlaceholderText(/Employee ID/i);
    expect(employeeInputs.length).toBe(1); // One employee input field should be rendered
  
    // Fill employee details with invalid data
    fireEvent.change(employeeInputs[0], { target: { value: '' } }); // Empty Employee ID
    fireEvent.change(screen.getAllByPlaceholderText(/Salary Amount/i)[0], { target: { value: '-1000' } }); // Invalid salary
    fireEvent.change(screen.getAllByRole('combobox')[0], { target: { value: '' } }); // No bonus selected
  
    // Trigger submit (without filling out correctly)
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
    // Ensure validation errors are displayed for all fields
    expect(screen.getByText(/Employee ID is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Salary is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Bonus is required/i)).toBeInTheDocument();
  
    // Correct the form data
    fireEvent.change(employeeInputs[0], { target: { value: 'E001' } }); // Valid Employee ID
    fireEvent.change(screen.getAllByPlaceholderText(/Salary Amount/i)[0], { target: { value: '5000' } }); // Valid salary
    fireEvent.change(screen.getAllByRole('combobox')[0], { target: { value: 'A' } }); // Valid bonus
  
    // Check that the validation errors disappear
    expect(screen.queryByText(/Employee ID is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Salary is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Bonus is required/i)).not.toBeInTheDocument();
  
    // Now submit the form with valid data
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
    // Ensure that the correct data is logged
    expect(console.log).toHaveBeenCalledWith('Salary Data:', {
      employees: [
        { employeeId: 'E001', salary: '5000', bonus: 'A' }
      ]
    });
  
    // Add another employee
    fireEvent.click(screen.getByRole('button', { name: /add employee/i }));
  
    // Ensure the second employee input fields are rendered
    expect(screen.getAllByPlaceholderText(/Employee ID/i).length).toBe(2); // Now two employee fields should be rendered
  
    // Fill in second employee details
    fireEvent.change(screen.getAllByPlaceholderText(/Employee ID/i)[1], { target: { value: 'E002' } });
    fireEvent.change(screen.getAllByPlaceholderText(/Salary Amount/i)[1], { target: { value: '7000' } });
    fireEvent.change(screen.getAllByRole('combobox')[1], { target: { value: 'B' } });
  
    // Now, remove the first employee
    fireEvent.click(screen.getAllByRole('button', { name: /remove employee/i })[0]);
  
    // Ensure the first employee's input fields are no longer visible
    expect(screen.queryByPlaceholderText(/Employee ID/i)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/Salary Amount/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  
    // Check that only the second employee remains
    expect(screen.getByPlaceholderText(/Employee ID/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Salary Amount/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  
    // Submit the form with the second employee only
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
    // Ensure that the correct data is logged (only second employee data)
    expect(console.log).toHaveBeenCalledWith('Salary Data:', {
      employees: [
        { employeeId: 'E002', salary: '7000', bonus: 'B' }
      ]
    });
  
    // Submit form with no employees added
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
    // Check if the form is submitted with an empty employee array
    expect(console.log).toHaveBeenCalledWith('Salary Data:', { employees: [] });
  });  
  
});
