import { useData } from '../context/DataContext';
import KPICard from '../components/dashboard/KPICard';
import UpcomingAppointments from '../components/dashboard/UpcomingAppointments';

const DashboardPage = () => {
  const { incidents, patients } = useData();
  
  // calculating the kpi cards
  const totalPatients = patients.length;
  const totalAppointments = incidents.length;
  
  const completedAppointments = incidents.filter(
    i => i.status === 'Completed'
  ).length;
  
  const totalRevenue = incidents.reduce(
    (sum, incident) => sum + (incident.cost || 0), 0
  );
  
  // get appointmnts for the next 10 days
  const now = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(now.getDate() + 10);
  
  const upcomingAppointments = incidents
    .filter(i => {
      const appDate = new Date(i.appointmentDate);
      return appDate > now && appDate <= sevenDaysFromNow;
    })
    .map(i => ({
      ...i,
      patientName: patients.find(p => p.id === i.patientId)?.name || 'Unknown'
    }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black px-2">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard 
          title="Total Patients" 
          value={totalPatients} 
          icon="👤" 
          color="blue"
        />
        
        <KPICard 
          title="Total Appointments" 
          value={totalAppointments} 
          icon="📅" 
          color="green"
        />
        
        <KPICard 
          title="Completed Treatments" 
          value={`${Math.round((completedAppointments / totalAppointments) * 100) || 0}%`} 
          icon="✅" 
          color="amber"
          trend={{
            value: `${completedAppointments}/${totalAppointments}`,
            label: 'completed',
            direction: 'up'
          }}
        />
        
        <KPICard 
          title="Total Revenue" 
          value={`$${totalRevenue.toFixed(2)}`} 
          icon="💰" 
          color="green"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingAppointments appointments={upcomingAppointments} />
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Patients</h3>
          {patients.length > 0 ? (
            <div className="space-y-3">
              {patients.slice(0, 5).map(patient => (
                <div key={patient.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-500">{patient.contact}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(patient.dob).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No patients found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;