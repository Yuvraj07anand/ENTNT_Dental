// src/pages/AppointmentsPage.jsx
import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import DataTable from '../components/shared/DataTable';
import AppointmentForm from '../components/appointments/AppointmentForm';
import ViewAttachmentModal from '../components/appointments/ViewAttachmentsModal';

const AppointmentsPage = () => {
  const { incidents, patients, addIncident, updateIncident, deleteIncident } = useData();
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isManaging, setIsManaging] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // automatically marking past  appointments as completed
    incidents.forEach((incident) => {
      const isPast = new Date(incident.appointmentDate) < new Date();
      if (incident.status === 'Scheduled' && isPast) {
        updateIncident(incident.id, { ...incident, status: 'Completed' });
      }
    });
  }, [incidents]);

  const enhancedIncidents = incidents.map(incident => ({
    ...incident,
    patientName: patients.find(p => p.id === incident.patientId)?.name || 'Unknown'
  }));

  const handleAddAppointment = () => {
    setIsAdding(true);
    setEditingAppointment(null);
    setIsManaging(false);
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setIsAdding(false);
    setIsManaging(false);
  };

  const handleManageAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setIsAdding(false);
    setIsManaging(true);
  };

  const handleSaveAppointment = (appointmentData) => {
    if (editingAppointment) {
      const mergedFiles = [...(editingAppointment.files || []), ...(appointmentData.files || [])];
      const updatedCost = (editingAppointment.cost || 0) + (appointmentData.cost || 0);

      updateIncident(editingAppointment.id, {
        ...editingAppointment,
        ...appointmentData,
        files: mergedFiles,
        cost: updatedCost
      });
    } else {
      addIncident(appointmentData);
    }

    setEditingAppointment(null);
    setIsAdding(false);
    setIsManaging(false);
  };

  const handleCancel = () => {
    setEditingAppointment(null);
    setIsAdding(false);
    setIsManaging(false);
  };

  const handleDeleteAppointment = (appointment) => {
    if (window.confirm(`Delete appointment "${appointment.title}"?`)) {
      deleteIncident(appointment.id);
    }
  };

  const openAttachmentModal = (files) => {
    setSelectedFiles(files);
    setIsModalOpen(true);
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'patientName', label: 'Patient' },
    {
      key: 'appointmentDate',
      label: 'Date & Time',
      render: (item) => new Date(item.appointmentDate).toLocaleString()
    },
    { key: 'description', label: 'Description' },
    {
      key: 'cost',
      label: 'Cost',
      render: (item) => item.cost ? `$${item.cost.toFixed(2)}` : '-'
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => (
        <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
          {item.status}
        </span>
      )
    },
    {
      key: 'attachments',
      label: 'Attachments',
      render: (item) =>
        item.files && item.files.length > 0 ? (
          <button
            onClick={() => openAttachmentModal(item.files)}
            className="text-blue-600 hover:underline text-sm"
          >
            View ({item.files.length})
          </button>
        ) : (
          <span className="text-gray-400 text-sm">No files</span>
        )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="flex space-x-2">
          <button onClick={() => handleEditAppointment(item)} className="text-sm text-blue-600 underline">Edit</button>
          <button onClick={() => handleDeleteAppointment(item)} className="text-sm text-red-600 underline">Delete</button>
          {item.status === 'Completed' && (
            <button onClick={() => handleManageAppointment(item)} className="text-sm text-green-600 underline">Manage</button>
          )}
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex  flex-wrap justify-between items-center mb-6 ">
        <h1 className="text-2xl font-bold text-black">Appointment Management</h1>
        <button onClick={handleAddAppointment} className="px-4 py-2 mx-2 my-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add New Appointment
        </button>
      </div>

      {(isAdding || editingAppointment) && (
        <div className="bg-white p-6 shadow rounded mb-6">
          <h2 className="text-xl font-bold mb-4 text-black">
            {isManaging ? 'Manage Appointment' : editingAppointment ? 'Edit Appointment' : 'Add New Appointment'}
          </h2>
         <AppointmentForm
  patients={patients}
  initialData={
    isManaging
      ? { ...editingAppointment, cost: 0 ,files: []} 
      : editingAppointment
  }
  onSubmit={handleSaveAppointment}
  onCancel={handleCancel}
  isManaging={isManaging}
/>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow">
        {enhancedIncidents.length > 0 ? (
          <DataTable columns={columns} data={enhancedIncidents} />
        ) : (
          <p className="text-gray-500 text-center py-8">No appointments found</p>
        )}
      </div>

      {isModalOpen && selectedFiles.length > 0 && (
        <ViewAttachmentModal
          isOpen={true}
          files={selectedFiles}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AppointmentsPage;
