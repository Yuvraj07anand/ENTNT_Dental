// src/components/appointments/AppointmentForm.jsx
import { useState, useEffect } from 'react';
import FileUpload from '../shared/FileUpload';

function formatForDatetimeLocal(dateString) {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
}

const AppointmentForm = ({ patients, initialData, onSubmit, onCancel, isManaging }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    status: 'Scheduled',
    files: []
  });
  const [rescheduleOption, setRescheduleOption] = useState('Completed'); // Toggle for managing
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        appointmentDate: initialData.appointmentDate
          ? formatForDatetimeLocal(initialData.appointmentDate)
          : '',
        cost: initialData.cost || '',
        files: initialData.files || []
      });
      setRescheduleOption(initialData.status === 'Scheduled' ? 'Scheduled' : 'Completed');
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.patientId) newErrors.patientId = 'Patient is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Appointment date is required';
    else if (new Date(formData.appointmentDate) < new Date()) {
      newErrors.appointmentDate = 'Cannot select a past date/time';
    }
    if (formData.cost && isNaN(formData.cost)) newErrors.cost = 'Cost must be a number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleFilesSelected = (files) => {
    setFormData({ ...formData, files: [...formData.files, ...files] });
  };

  const removeFile = (index) => {
    const newFiles = [...formData.files];
    newFiles.splice(index, 1);
    setFormData({ ...formData, files: newFiles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const updatedStatus = isManaging ? rescheduleOption : formData.status;
      onSubmit({
        ...formData,
        cost: formData.cost ? Number(formData.cost) : 0,
        status: updatedStatus
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* patient  */}
      <div className="bg-white p-4 rounded shadow">
        <label className="block mb-1 text-black">Patient *</label>
        <select
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          disabled={!!initialData}
          className={`block w-full px-3 py-2 border ${errors.patientId ? 'border-red-500' : 'border-gray-300'} rounded text-black`}
        >
          <option value="">Select a patient</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        {errors.patientId && <p className="text-red-500 text-sm">{errors.patientId}</p>}
      </div>

      {/* title */}
      <div className="bg-white p-4 rounded shadow">
        <label className="block mb-1 text-black">Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`block w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded text-black`}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      {/* description  */}
      <div className="bg-white p-4 rounded shadow">
        <label className="block mb-1 text-black">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 rounded text-black"
        />
      </div>

      {/* date  */}
      <div className="bg-white p-4 rounded shadow">
        <label className="block mb-1 text-black">Appointment Date & Time *</label>
        <input
          type="datetime-local"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          className={`block w-full px-3 py-2 border ${errors.appointmentDate ? 'border-red-500' : 'border-gray-300'} rounded text-black`}
        />
        {errors.appointmentDate && <p className="text-red-500 text-sm">{errors.appointmentDate}</p>}
      </div>

      {/* manage that is for rescheduling appointments  */}
      {isManaging && (
        <div className="bg-white p-4 rounded shadow ">
          <label className="block mb-1 text-black">Change Status</label>
          <select
            value={rescheduleOption}
            onChange={(e) => setRescheduleOption(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded text-black"
          >
            <option className='text-black' value="Scheduled">Scheduled</option>
            <option className='text-black'  value="Completed">Completed</option>
          </select>
        </div>
      )}

      {/* costs section */}
      <div className="bg-white p-4 rounded shadow">
        <label className="block mb-1 text-black">Cost ($) for this appointment</label>
        <input
          type="number"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          min="0"
          step="0.01"
          className={`block w-full px-3 py-2 border ${errors.cost ? 'border-red-500' : 'border-gray-300'} rounded text-black`}
        />
        {errors.cost && <p className="text-red-500 text-sm">{errors.cost}</p>}
      </div>

      {/* comments  */}
      <div className="bg-white p-4 rounded shadow">
        <label className="block mb-1 text-black">Comments</label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          rows={2}
          className="block w-full px-3 py-2 border border-gray-300 rounded text-black"
        />
      </div>

      {/* attachemnt pdf images and all  */}
      <div className="bg-white p-4 rounded shadow">
        <label className="block mb-1">Attachments</label>
        <FileUpload onFilesSelected={handleFilesSelected} />
        {formData.files.length > 0 && (
          <ul className="mt-2 space-y-2">
            {formData.files.map((file, idx) => (
              <li key={idx} className="text-sm flex justify-between">
                <span>{file.name}</span>
                <button type="button" onClick={() => removeFile(idx)} className="text-red-500 text-sm">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
        )}
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Save Appointment
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
