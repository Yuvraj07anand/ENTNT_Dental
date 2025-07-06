import { useState } from 'react';
import { useData } from '../context/DataContext';
import DataTable from '../components/shared/DataTable';
import AppointmentForm from '../components/appointments/AppointmentForm';
import ViewAttachmentModal from '../components/appointments/ViewAttachmentsModal';

const AppointmentsPage = () => {
  const { incidents, patients, addIncident, updateIncident, deleteIncident } = useData();
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAttachmentModal = (files) => {
    setSelectedFiles(files);
    setIsModalOpen(true);
  };

  const closeAttachmentModal = () => {
    setSelectedFiles([]);
    setIsModalOpen(false);
  };

  const enhancedIncidents = incidents.map(incident => ({
    ...incident,
    patientName: patients.find(p => p.id === incident.patientId)?.name || 'Unknown'
  }));

  const handleAddAppointment = () => {
    setIsAdding(true);
    setEditingAppointment(null);
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setIsAdding(false);
  };

  const handleSaveAppointment = (appointmentData) => {
    if (editingAppointment) {
      updateIncident(editingAppointment.id, appointmentData);
    } else {
      addIncident(appointmentData);
    }
    setEditingAppointment(null);
    setIsAdding(false);
  };

  const handleDeleteAppointment = (appointment) => {
    if (window.confirm(`Are you sure you want to delete this appointment: ${appointment.title}?`)) {
      deleteIncident(appointment.id);
    }
  };

  const handleCancel = () => {
    setEditingAppointment(null);
    setIsAdding(false);
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
        <span className={`px-2 py-1 text-xs rounded-full ${
          item.status === 'Completed'
            ? 'bg-green-100 text-green-800'
            : item.status === 'Cancelled'
              ? 'bg-red-100 text-red-800'
              : 'bg-blue-100 text-blue-800'
        }`}>
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
    }
  ];

  return (
    <div>
      {/* header area with heading and buton  */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-black px-2">Appointment Management</h1>
        <button
          onClick={handleAddAppointment}
          className="px-4 py-2 mx-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add New Appointment
        </button>
      </div>

      {(isAdding || editingAppointment) && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-6">
            {editingAppointment ? 'Edit Appointment' : 'Add New Appointment'}
          </h2>
          <AppointmentForm
            patients={patients}
            initialData={editingAppointment}
            onSubmit={handleSaveAppointment}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        {enhancedIncidents.length > 0 ? (
          <DataTable
            columns={columns}
            data={enhancedIncidents}
            onEdit={handleEditAppointment}
            onDelete={handleDeleteAppointment}
          />
        ) : (
          <p className="text-gray-500 text-center py-8">No appointments found</p>
        )}
      </div>

      {/* view the attachment modal  */}
      {isModalOpen && selectedFiles.length > 0 && (
        <ViewAttachmentModal 
          isOpen={true}
          files={selectedFiles}
          onClose={closeAttachmentModal}
        />
      )}
    </div>
  );
};

export default AppointmentsPage;
