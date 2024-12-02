import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import RegisterEmp from './RegisterEmp';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('RegisterEmp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock environment variables
    process.env.REACT_APP_EMAIL_VALIDATION_API_KEY = 'mock-api-key';
    process.env.REACT_APP_BACKEND_BASEURL = 'http://mock-backend-url';

    // Mock default axios responses
    axios.get.mockResolvedValue({ data: { is_valid_format: { value: true }, deliverability: 'DELIVERABLE' } });
    axios.post.mockResolvedValue({ data: { message: 'Success' } });

    Cookies.get.mockReturnValue('mock-token');
  });

  const setup = () => {
    render(
      <Router>
        <RegisterEmp />
      </Router>
    );
  };

  test('handles valid input: Ra, user@example.com, manager', async () => {
    setup();

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Ra' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'manager' } });
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `https://emailvalidation.abstractapi.com/v1/?api_key=mock-api-key&email=user@example.com`
      );
      expect(axios.post).toHaveBeenCalledWith(
        'http://mock-backend-url/api/register',
        { name: 'Ra', mail: 'user@example.com', role: 'manager' },
        { withCredentials: true, headers: { Authorization: 'Bearer mock-token' } }
      );
    });
  });

  test('handles name exceeding maximum length: ThisNameIsVeryLongAndExceedsTheMaxLimit', async () => {
    setup();

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'ThisNameIsVeryLongAndExceedsTheMaxLimit' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'hr' } });
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText(/Name cannot exceed 50 characters/i)).toBeInTheDocument();
      expect(axios.get).not.toHaveBeenCalled();
      expect(axios.post).not.toHaveBeenCalled();
    });
  });

  test('handles invalid email: Ram Charan, invalid-email', async () => {
    setup();

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Ram Charan' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'employee' } });
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(axios.get).not.toHaveBeenCalled();
      expect(axios.post).not.toHaveBeenCalled();
    });
  });

  test('handles invalid email deliverability from API', async () => {
    setup();

    axios.get.mockResolvedValue({ data: { is_valid_format: { value: true }, deliverability: 'UNDELIVERABLE' } });

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'employee' } });
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText(/The email address is invalid or undeliverable/i)).toBeInTheDocument();
      expect(axios.post).not.toHaveBeenCalled();
    });
  });
});
