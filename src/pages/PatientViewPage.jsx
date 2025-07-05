import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const PatientViewPage = () => {
  const { currentUser } = useAuth();
  const { patients, incidents } = useData();
  
  // finding the  current patients info 
  const patient = patients.find(p => p.id === currentUser?.patientId);
  
  if (!patient) {
    return <div className="p-4 text-black">Patient data not found</div>;
  }

  // filtering  patient  incidents
  const patientIncidents = incidents.filter(i => i.patientId === patient.id);

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-black">My Dental Records</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black mb-2">{patient.name}</h2>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-black">{patient.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-black">{new Date(patient.dob).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="text-black">{patient.healthInfo || 'No health info'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-black">Upcoming Appointments</h2>
          {patientIncidents.filter(i => i.status === 'Scheduled').length > 0 ? (
            <div className="space-y-4">
              {patientIncidents
                .filter(i => i.status === 'Scheduled')
                .map(incident => (
                  <div key={incident.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-black">{incident.title}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(incident.appointmentDate).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          incident.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          incident.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {incident.status}
                        </span>
                      </div>
                    </div>
                    {incident.cost > 0 && (
                      <p className="mt-2 text-sm text-black">Cost: ${incident.cost.toFixed(2)}</p>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-600">No upcoming appointments</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-black">Treatment History</h2>
          {patientIncidents.filter(i => i.status !== 'Scheduled').length > 0 ? (
            <div className="space-y-4">
              {patientIncidents
                .filter(i => i.status !== 'Scheduled')
                .map(incident => (
                  <div key={incident.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-black">{incident.title}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(incident.appointmentDate).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          incident.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          incident.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {incident.status}
                        </span>
                      </div>
                    </div>
                    {incident.cost > 0 && (
                      <p className="mt-2 text-sm text-black">Cost: ${incident.cost.toFixed(2)}</p>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-600">No treatment history found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientViewPage;