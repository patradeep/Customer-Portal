import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (username, password) => {
    const cleanUser = username.trim();
    const cleanPass = password.trim();

    // 1. Check Admin Credentials
    if (cleanUser === 'admin' && cleanPass === 'admin123') {
      const adminProfile = {
        id: 'admin',
        username: 'admin',
        firstName: 'System',
        lastName: 'Admin',
        role: 'admin',
      };
      localStorage.setItem('user', JSON.stringify(adminProfile));
      setCurrentUser(adminProfile);
      return { success: true, role: 'admin' };
    }

    // 2. Check Customer Credentials from DummyJSON
    try {
      const res = await fetch(`https://dummyjson.com/users/search?q=${cleanUser}`);
      const data = await res.json();

      const matchedUser = data.users.find(
        (u) =>
          (u.username.toLowerCase() === cleanUser.toLowerCase() ||
           u.email.toLowerCase() === cleanUser.toLowerCase()) &&
          u.password === cleanPass
      );

      if (!matchedUser) {
        return { success: false, message: 'Invalid credentials.' };
      }

      // Tag as regular user
      const userProfile = { ...matchedUser, role: 'user' };
      localStorage.setItem('user', JSON.stringify(userProfile));
      setCurrentUser(userProfile);
      return { success: true, role: 'user', id: userProfile.id };
    } catch {
      return { success: false, message: 'Login failed. Try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);