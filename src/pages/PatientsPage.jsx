import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import PatientList from '../components/patients/PatientList';
import PatientForm from '../components/patients/PatientForm';

const PatientsPage = () => {
  const { patients, addPatient, updatePatient, deletePatient } = useData();
  const [editingPatient, setEditingPatient] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const handleAddPatient = () => {
    setIsAdding(true);
    setEditingPatient(null);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setIsAdding(false);
  };

  const handleSavePatient = (patientData) => {
    if (editingPatient) {
      updatePatient(editingPatient.id, patientData);
    } else {
      addPatient(patientData);
    }
    setEditingPatient(null);
    setIsAdding(false);
  };

  const handleDeletePatient = (patient) => {
    if (window.confirm(`Are you sure you want to delete ${patient.name}?`)) {
      deletePatient(patient.id);
    }
  };

  const handleCancel = () => {
    setEditingPatient(null);
    setIsAdding(false);
  };

  return (
    <div>
      {isAdding || editingPatient ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            {editingPatient ? 'Edit Patient' : 'Add New Patient'}
          </h2>
          <PatientForm 
            initialData={editingPatient} 
            onSubmit={handleSavePatient} 
            onCancel={handleCancel}
          />
        </div>
      ) : (
        <PatientList 
          patients={patients} 
          onEdit={handleEditPatient} 
          onDelete={handleDeletePatient}
        />
      )}
    </div>
  );
};

export default PatientsPage;