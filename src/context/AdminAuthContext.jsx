import { createContext, useContext, useState, useEffect } from 'react';


const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (username, password) => {
    // ✅ For now, hardcoded credentials
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const checkStoredAuth = () => {
    if (localStorage.getItem('isAdmin') === 'true') {
      setIsAdmin(true);
    }
  };

    useEffect(() => {
    checkStoredAuth();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout, checkStoredAuth }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
