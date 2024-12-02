import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import UploadProject from "./UploadProject";

describe("UploadProject Component", () => {
  const setup = () => {
    const utils = render(<UploadProject />);
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const addTeamMemberButton = screen.getByText(/add team member/i);
    const addTaskButton = screen.getByText(/add task/i);
    const submitButton = screen.getByText(/submit/i);
    return { utils, titleInput, descriptionInput, addTeamMemberButton, addTaskButton, submitButton };
  };

  test("renders form fields correctly", () => {
    setup();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/add team member/i)).toBeInTheDocument();
    expect(screen.getByText(/add task/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  test("validates required fields", async () => {
    const { submitButton } = setup();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
  });

  test("adds and removes team members", async () => {
    const { addTeamMemberButton } = setup();

    await act(async () => {
      fireEvent.click(addTeamMemberButton);
    });

    expect(screen.getByPlaceholderText(/member id/i)).toBeInTheDocument();

    const removeButton = screen.getByText(/remove member/i);

    await act(async () => {
      fireEvent.click(removeButton);
    });

    expect(screen.queryByPlaceholderText(/member id/i)).not.toBeInTheDocument();
  });

  test("adds and removes tasks", async () => {
    const { addTaskButton } = setup();

    await act(async () => {
      fireEvent.click(addTaskButton);
    });

    expect(screen.getByPlaceholderText(/task title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/assigned id/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/task description/i)).toBeInTheDocument();

    const removeTaskButton = screen.getByText(/remove task/i);

    await act(async () => {
      fireEvent.click(removeTaskButton);
    });

    expect(screen.queryByPlaceholderText(/task title/i)).not.toBeInTheDocument();
  });

  test("handles form submission correctly", async () => {
    const { titleInput, descriptionInput, submitButton } = setup();

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: "Test Project" } });
      fireEvent.change(descriptionInput, { target: { value: "This is a test project" } });
      fireEvent.click(submitButton);
    });

    expect(screen.queryByText(/title is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/description is required/i)).not.toBeInTheDocument();
    // Verify console log
    expect(console.log).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test Project",
        description: "This is a test project",
        teamMembers: [],
        tasks: []
      })
    );
  });

  test("validates required fields in tasks and team members", async () => {
    const { addTeamMemberButton, addTaskButton, submitButton } = setup();

    // Add a team member and task
    await act(async () => {
      fireEvent.click(addTeamMemberButton);
      fireEvent.click(addTaskButton);
    });

    // Submit form without filling required fields
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Validate errors
    expect(screen.getByText(/member id is required/i)).toBeInTheDocument();
    expect(screen.getByText(/task title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/assigned id is required/i)).toBeInTheDocument();
  });

  test("handles start and end dates correctly", async () => {
    const { utils } = setup();

    const startDateInput = screen.getByLabelText(/start date/i);
    const endDateInput = screen.getByLabelText(/end date/i);

    await act(async () => {
      fireEvent.change(startDateInput, { target: { value: "2023-12-01" } });
      fireEvent.change(endDateInput, { target: { value: "2023-12-31" } });
    });

    expect(startDateInput.value).toBe("2023-12-01");
    expect(endDateInput.value).toBe("2023-12-31");
  });
});
