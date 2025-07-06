import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const PatientForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    contact: '',
    healthInfo: ''
  });

  const [errors, setErrors] = useState({});
  const { addPatient, patients } = useData();
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact information is required';
    } else if (!/^\d{10,}$/.test(formData.contact.replace(/\D/g, ''))) {
      newErrors.contact = 'Invalid phone number';
    }

    if (!initialData) {
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.password.trim()) newErrors.password = 'Password is required';
    }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const lowerEmail = formData.email.toLowerCase();

      // ✅ Block hardcoded admin/patient emails
      if (!initialData && (lowerEmail === 'admin@entnt.in' || lowerEmail === 'patient@entnt.in')) {
        alert('This email is reserved and cannot be used.');
        return;
      }

      // ✅ Check for duplicate patient emails
      const emailExists = patients.some(
        (p) => p.email?.toLowerCase() === lowerEmail
      );
      if (!initialData && emailExists) {
        alert('A patient with this email already exists.');
        return;
      }

      try {
        if (!initialData) {
          const patientId = addPatient(formData);
          registerUser({
            email: formData.email,
            password: formData.password,
            role: 'Patient',
            patientId
          });
          onSubmit && onSubmit({ ...formData, id: patientId });
        } else {
          onSubmit && onSubmit(formData);
        }
        navigate('/patients');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-4 rounded shadow-md">
      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* DOB */}
      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
          Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.dob ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900`}
        />
        {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
      </div>

      {/* Contact */}
      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
          Contact Information
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.contact ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900`}
        />
        {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!!initialData}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${
            !!initialData ? 'cursor-not-allowed bg-gray-100' : ''
          }`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        {initialData && (
          <p className="text-sm text-gray-500 mt-1">Email cannot be changed after registration.</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={!!initialData}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 ${
            !!initialData ? 'cursor-not-allowed bg-gray-100' : ''
          }`}
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        {initialData && (
          <p className="text-sm text-gray-500 mt-1">Password cannot be changed here.</p>
        )}
      </div>

      {/* Health Info */}
      <div>
        <label htmlFor="healthInfo" className="block text-sm font-medium text-gray-700">
          Health Information
        </label>
        <textarea
          id="healthInfo"
          name="healthInfo"
          value={formData.healthInfo}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3">
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
          Save Patient
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
