import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const UpcomingAppointments = ({ appointments }) => {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 text-black">Upcoming Appointments</h3>
        <p className="text-black">No upcoming appointments</p>
      </div>
    );
  }

  // sorting the   appointments by date
  const sortedAppointments = [...appointments].sort((a, b) => 
    new Date(a.appointmentDate) - new Date(b.appointmentDate)
  ).slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-black">Upcoming Appointments</h3>
        <Link to="/appointments" className="text-sm text-blue-600 hover:underline">
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {sortedAppointments.map(appointment => (
          <div key={appointment.id} className="border-b pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{appointment.title}</p>
                <p className="text-sm text-gray-500">{appointment.patientName}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{format(new Date(appointment.appointmentDate), 'MMM dd, yyyy')}</p>
                <p className="text-sm text-gray-500">{format(new Date(appointment.appointmentDate), 'hh:mm a')}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className={`px-2 py-1 text-xs rounded-full ${
                appointment.status === 'Completed' 
                  ? 'bg-green-100 text-green-800' 
                  : appointment.status === 'Cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
              }`}>
                {appointment.status}
              </span>
              {appointment.cost > 0 && (
                <span className="ml-2 text-sm font-medium">${appointment.cost}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointments;