import React, { useState, useRef } from 'react';
import '../components/css/leaveform.css';

const LeaveForm = () => {
  const [form, setForm] = useState({
    employeeId: '154',
    leaveType: 'Sick Leave',
    type: 'Full Day',
    from: '',
    to: '',
    otherReason: '',
  });

  const [fileName, setFileName] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleDateInput = (e) => {
    const { name, value } = e.target;
    const dateParts = value.split('-');
    if (dateParts[0] && dateParts[0].length > 4) {
      e.target.value = `${dateParts[0].slice(0, 4)}${value.slice(4)}`; // Restrict year to 4 digits
    }
    setForm((prevForm) => ({
      ...prevForm,
      [name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.from) newErrors.from = 'Start date is required.';
    if (!form.to) newErrors.to = 'End date is required.';
    if (form.leaveType === 'Other Reason' && !form.otherReason) {
      newErrors.otherReason = 'Reason is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileUploaded(true);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', form);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setForm({
      employeeId: '154',
      leaveType: 'Sick Leave',
      type: 'Full Day',
      from: '',
      to: '',
      otherReason: '',
    });
    setFileName(null);
    setFileUploaded(false);
    setIsSubmitted(false);
    setErrors({});
  };

  const calculateTotalDays = () => {
    if (form.from && form.to) {
      const fromDate = new Date(form.from);
      const toDate = new Date(form.to);
      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(0, 0, 0, 0);
      const timeDiff = toDate - fromDate;
      const dayDiff = timeDiff / (1000 * 3600 * 24);
      return dayDiff >= 0 ? dayDiff + 1 : 0;
    }
    return '';
  };

  return (
    <div className="container">
      <div className="main">
        <div className="form-container">
          <h3>Apply Leave</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Employee ID</label>
              <input type="text" name="employeeId" value={form.employeeId} readOnly />
            </div>

            <div className="form-group">
              <label>Leave Type</label>
              <select name="leaveType" value={form.leaveType} onChange={handleInputChange}>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Earned Leave">Earned Leave</option>
                <option value="Other Reason">Other Reason</option>
              </select>
              {errors.leaveType && <small className="error">{errors.leaveType}</small>}
            </div>

            {form.leaveType === 'Other Reason' && (
              <div className="form-group">
                <label>Specify Reason</label>
                <input
                  type="text"
                  name="otherReason"
                  value={form.otherReason}
                  onChange={handleInputChange}
                  placeholder="Please specify"
                />
                {errors.otherReason && <small className="error">{errors.otherReason}</small>}
              </div>
            )}

            <div className="form-group">
              <label>From</label>
              <input
                type="date"
                name="from"
                value={form.from}
                onChange={handleDateInput}
              />
              {errors.from && <small className="error">{errors.from}</small>}
            </div>

            <div className="form-group">
              <label>To</label>
              <input
                type="date"
                name="to"
                value={form.to}
                onChange={handleDateInput}
              />
              {errors.to && <small className="error">{errors.to}</small>}
            </div>

            <div className="form-group">
              <label>Total Day(s)</label>
              <input type="text" value={calculateTotalDays()} readOnly />
            </div>

            <div className="buttons">
              <button type="submit" className={`submit ${isSubmitted ? 'submitted' : ''}`}>
                Submit
              </button>
              <button type="button" className="reset" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveForm;
