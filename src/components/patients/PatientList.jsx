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
        <div className="flex flex-wrap gap-2">
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
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      {/* this is header portion  */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Patient Management</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black w-full sm:w-auto"
          />
          <Link
            to="/patients/new"
            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition text-center"
          >
            <span className='text-white'>Add New Patient</span>
            
          </Link>
        </div>
      </div>

      {/* no Data */}
      <div className="overflow-x-auto">
        {filteredPatients.length > 0 ? (
          <DataTable columns={columns} data={filteredPatients} />
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
    </div>
  );
};

export default PatientList;
