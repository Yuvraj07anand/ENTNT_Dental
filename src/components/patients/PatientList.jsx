import { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../shared/DataTable';

const PatientList = ({ patients, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contact.includes(searchTerm)
  );

  const columns = [
    { key: 'name', label: 'Name' },
    {
      key: 'dob',
      label: 'Date of Birth',
      render: (item) => new Date(item.dob).toLocaleDateString()
    },
    { key: 'contact', label: 'Contact' },
    {
      key: 'healthInfo',
      label: 'Health Info',
      render: (item) => item.healthInfo || '-'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="flex space-x-3">
          <button
            onClick={() => onEdit(item)}
            className="text-blue-600 hover:underline text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item)}
            className="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Patient Management</h2>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <Link
            to="/patients/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add New Patient
          </Link>
        </div>
      </div>

      {filteredPatients.length > 0 ? (
        <DataTable
          columns={columns}
          data={filteredPatients}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No patients found</p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-2 text-blue-600 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientList;
