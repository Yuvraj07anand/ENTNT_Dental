import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import CalendarPage from './pages/CalendarPage';
import PatientViewPage from './pages/PatientViewPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import PatientForm from './components/patients/PatientForm';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="px-0">
              <Routes> 
                <Route path="/login" element={<LoginPage />} />
                
                {/* routes for the  admins */}
                <Route element={<ProtectedRoute roles={['Admin']} />}>
                  <Route path="/" element={<DashboardPage />} />
                   <Route path="/patients/new" element={<PatientForm />} />
                   <Route path="/patients/edit/:id" element={<PatientForm />} />
                  <Route path="/patients" element={<PatientsPage />} />
                  <Route path="/appointments" element={<AppointmentsPage />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                </Route>
                
                {/* routes for  the patients */}
                <Route element={<ProtectedRoute roles={['Patient']} />}>
                  <Route path="/my-account" element={<PatientViewPage />} />
                </Route>
              </Routes>
            </div>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;