import { useState, useEffect } from 'react';
import FileUpload from '../shared/FileUpload';

function formatForDatetimeLocal(dateString) {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16); // "yyyy-MM-ddTHH:mm"
}

const AppointmentForm = ({ patients, initialData, onSubmit, onCancel }) => {
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
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.patientId) newErrors.patientId = 'Patient is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Appointment date is required';
    if (formData.cost && isNaN(formData.cost)) newErrors.cost = 'Cost must be a number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
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
      onSubmit({
        ...formData,
        cost: formData.cost ? Number(formData.cost) : 0
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Patient Selection */}
      <div className="bg-white p-4 rounded-lg shadow">
        <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
          Patient *
        </label>
        <select
          id="patientId"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          disabled={!!initialData}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.patientId ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800`}
        >
          <option value="" className="text-gray-400">Select a patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id} className="text-gray-800">
              {patient.name}
            </option>
          ))}
        </select>
        {errors.patientId && <p className="mt-1 text-sm text-red-600">{errors.patientId}</p>}
      </div>

      {/* Appointment Details */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Date & Time *
          </label>
          <input
            type="datetime-local"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.appointmentDate ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800`}
          />
          {errors.appointmentDate && <p className="mt-1 text-sm text-red-600">{errors.appointmentDate}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
          >
            <option value="Scheduled" className="text-gray-800">Scheduled</option>
            <option value="In Progress" className="text-gray-800">In Progress</option>
            <option value="Completed" className="text-gray-800">Completed</option>
            <option value="Cancelled" className="text-gray-800">Cancelled</option>
          </select>
        </div>

        {formData.status === 'Completed' && (
          <div className="mb-4">
            <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
              Cost ($)
            </label>
            <input
              type="number"
              id="cost"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.cost ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800`}
            />
            {errors.cost && <p className="mt-1 text-sm text-red-600">{errors.cost}</p>}
          </div>
        )}

        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows={2}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
          />
        </div>
      </div>

      {/* Attachments Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Attachments
        </label>
        <FileUpload onFilesSelected={handleFilesSelected} />
        {formData.files.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Current Attachments:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {formData.files.map((file, index) => (
                <div key={index} className="border rounded-md p-2 flex flex-col bg-gray-50">
                  <div className="flex-grow">
                    {file.type === 'image' ? (
                      <img 
                        src={file.url} 
                        alt={file.name} 
                        className="max-h-40 w-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center p-4">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                          <span className="text-2xl">📄</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs truncate text-gray-800">{file.name}</p>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 ml-2 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 bg-white p-4 rounded-lg shadow">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          Save Appointment
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
