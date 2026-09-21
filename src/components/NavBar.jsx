import React from 'react'
import { useAuth } from '../context/AuthContext';
function NavBar() {
  const { currentUser, logout } = useAuth();
  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-slate-100">
        <div className="flex items-center gap-3">
          <img src={currentUser?.image} alt="" className="w-8 h-8 rounded-full bg-slate-200" />
          <span className="font-semibold text-sm">{currentUser?.firstName} {currentUser?.lastName}</span>
          <p className="text-xs text-gray-500">{currentUser?.role}</p>
        </div>
        <button onClick={logout} className="text-xs border px-3 py-1.5 rounded hover:bg-slate-50">Logout</button>
      </header>
    </div>
  )
}

export default NavBar