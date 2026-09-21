import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (loginid, password,role) => {
    try{
      const response = await fetch(`https://dummyjson.com/users/${loginid}`);
      if(!response.ok){
        throw new Error('User not found');
      }
      const data = await response.json();
      if(data.password === password){
        if(role === 'admin' && data.role !== 'admin'){
          throw new Error('You are not authorized to login as admin');
        }
        setCurrentUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        return { success: true , id:data.id};
      }
      else{
        throw new Error('Invalid password');
      }
    }catch(error){
      return { success: false, message: error.message };
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