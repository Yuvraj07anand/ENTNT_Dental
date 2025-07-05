import { useState } from 'react';
import { useData } from '../context/DataContext';
import CalendarView from '../components/appointments/CalendarView';
import DataTable from '../components/shared/DataTable';

const CalendarPage = () => {
  const { incidents, patients } = useData();
  const [selectedDate, setSelectedDate] = useState(null);
  const enhancedIncidents = incidents.map(incident => ({
    ...incident,
    patientName: patients.find(p => p.id === incident.patientId)?.name || 'Unknown'
  })); 
  // get appointments details on the date when selected 
  const dayAppointments = selectedDate 
    ? enhancedIncidents.filter(i => {
        const appDate = new Date(i.appointmentDate);
        return (
          appDate.getDate() === selectedDate.getDate() &&
          appDate.getMonth() === selectedDate.getMonth() &&
          appDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  const handleDaySelect = (day) => {
    setSelectedDate(day);
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'patientName', label: 'Patient' },
    { 
      key: 'appointmentDate', 
      label: 'Time',
      render: (item) => new Date(item.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Appointment Calendar</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CalendarView 
            appointments={enhancedIncidents} 
            onDaySelect={handleDaySelect} 
          />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            {selectedDate ? `Appointments on ${selectedDate.toLocaleDateString()}` : 'Select a date'}
          </h2>
          
          {selectedDate ? (
            dayAppointments.length > 0 ? (
              <DataTable 
                columns={columns} 
                data={dayAppointments} 
              />
            ) : (
              <p className="text-gray-500">No appointments scheduled for this day</p>
            )
          ) : (
            <p className="text-gray-500">Select a date from the calendar to view appointments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;