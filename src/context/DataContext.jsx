import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateStorage = (newData) => {
    localStorage.setItem('dentalData', JSON.stringify(newData));
    setPatients(newData.patients);
    setIncidents(newData.incidents);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('dentalData')) || {
      patients: [
        {
          id: 'p1',
          name: 'John Doe',
          dob: '1990-05-10',
          contact: '1234567890',
          healthInfo: 'No allergies'
        }
      ],
      incidents: [
        {
          id: 'i1',
          patientId: 'p1',
          title: 'Toothache',
          description: 'Upper molar pain',
          comments: 'Sensitive to cold',
          appointmentDate: new Date().toISOString(),
          cost: 80,
          status: 'Completed',
          files: []
        }
      ]
    };

    localStorage.setItem('dentalData', JSON.stringify(data));
    setPatients(data.patients);
    setIncidents(data.incidents);
    setLoading(false);
  }, []);

  // Patient CRUD operations
  const addPatient = (patientData) => {
    const data = JSON.parse(localStorage.getItem('dentalData'));
    const newPatientId = `p${Date.now()}`;
    const newPatient = { ...patientData, id: newPatientId };
    const newPatients = [...data.patients, newPatient];
    updateStorage({ ...data, patients: newPatients });
    return newPatientId;
  };

  const updatePatient = (id, updatedPatient) => {
    const data = JSON.parse(localStorage.getItem('dentalData'));
    const newPatients = data.patients.map(p =>
      p.id === id ? { ...p, ...updatedPatient } : p
    );
    updateStorage({ ...data, patients: newPatients });
  };

  const deletePatient = (id) => {
    const data = JSON.parse(localStorage.getItem('dentalData'));
    const newPatients = data.patients.filter(p => p.id !== id);
    const newIncidents = data.incidents.filter(i => i.patientId !== id);
    updateStorage({ ...data, patients: newPatients, incidents: newIncidents });
  };

  // crud actions 
  const addIncident = (incident) => {
    const data = JSON.parse(localStorage.getItem('dentalData'));
    const newIncidentId = `i${Date.now()}`;
    const newIncident = { ...incident, id: newIncidentId };
    const newIncidents = [...data.incidents, newIncident];
    updateStorage({ ...data, incidents: newIncidents });
  };

  const updateIncident = (id, updatedIncident) => {
    const data = JSON.parse(localStorage.getItem('dentalData'));
    const newIncidents = data.incidents.map(i =>
      i.id === id ? { ...i, ...updatedIncident } : i
    );
    updateStorage({ ...data, incidents: newIncidents });
  };

  return (
    <DataContext.Provider value={{
      patients,
      incidents,
      loading,
      addPatient,
      updatePatient,
      deletePatient,
      addIncident,
      updateIncident
    }}>
      {!loading && children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
