import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useState } from 'react';
import ViewAttachmentModal from '../components/appointments/ViewAttachmentsModal'; 

const PatientViewPage = () => {
  const { currentUser } = useAuth();
  const { patients, incidents } = useData();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const patient = patients.find(p => p.id === currentUser?.patientId);
  if (!patient) return <div className="p-4 text-black">Patient data not found</div>;

  const patientIncidents = incidents.filter(i => i.patientId === patient.id);

  const openModal = (files) => {
    setSelectedFiles(files);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFiles([]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-black">My Dental Records</h1>

      {/* Patient Info Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-black">Patient Info</h2>
        <p className='text-black'><strong>Name:</strong> {patient.name}</p>
        <p className='text-black'><strong>DOB:</strong> {new Date(patient.dob).toLocaleDateString()}</p>
        <p className='text-black'><strong>Contact:</strong> {patient.contact}</p>
        <p className='text-black'><strong>Health Info:</strong> {patient.healthInfo || 'N/A'}</p>
      </div>

      {/* Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-black">Upcoming Appointments</h2>
          {patientIncidents.filter(i => i.status === 'Scheduled').length > 0 ? (
            <div className="space-y-4">
              {patientIncidents.filter(i => i.status === 'Scheduled').map(incident => (
                <div key={incident.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-black">{incident.title}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(incident.appointmentDate).toLocaleString()}
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {incident.status}
                    </span>
                  </div>
                  {incident.cost > 0 && (
                    <p className="text-sm text-black">Cost: ${incident.cost.toFixed(2)}</p>
                  )}
                  {incident.files?.length > 0 && (
                    <button
                      onClick={() => openModal(incident.files)}
                      className="mt-2 text-sm text-blue-600 hover:underline"
                    >
                      View Attachments
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No upcoming appointments</p>
          )}
        </div>

        {/* Treatment History */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-black">Treatment History</h2>
          {patientIncidents.filter(i => i.status !== 'Scheduled').length > 0 ? (
            <div className="space-y-4">
              {patientIncidents.filter(i => i.status !== 'Scheduled').map(incident => (
                <div key={incident.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-black">{incident.title}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(incident.appointmentDate).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      incident.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      incident.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {incident.status}
                    </span>
                  </div>
                  {incident.cost > 0 && (
                    <p className="text-sm text-black">Cost: ${incident.cost.toFixed(2)}</p>
                  )}
                  {incident.files?.length > 0 && (
                    <button
                      onClick={() => openModal(incident.files)}
                      className="mt-2 text-sm text-blue-600 hover:underline"
                    >
                      View Attachments
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No treatment history found</p>
          )}
        </div>
      </div>

      {/* Modal for Viewing Attachments */}
      <ViewAttachmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        files={selectedFiles}
      />
    </div>
  );
};

export default PatientViewPage;
