import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    {/*Mimmic of backend with some set initial users namely admins and users that is patients  */}
    const users = JSON.parse(localStorage.getItem('users')) || [
      { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
      { id: '2', role: 'Patient', email: 'patient@entnt.in', password: 'patient123', patientId: 'p1' }
    ];
    localStorage.setItem('users', JSON.stringify(users));

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) setCurrentUser(user);
    setLoading(false);
  }, []);
    

  {/*Login  controller */}
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };
  {/*Logout logic  */}
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const registerUser = ({ email, password, role, patientId }) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(u => u.email === email);
    if (userExists) return false;

    const newUser = {
      id: `u${Date.now()}`,
      email,
      password,
      role,
      ...(role === 'Patient' && { patientId })
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return true;
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      logout,
      loading,
      registerUser
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
