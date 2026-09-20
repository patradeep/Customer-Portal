import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {

    const targetId = currentUser?.role === 'user' ? currentUser.id : id;

    fetch(`https://dummyjson.com/users/${targetId}`)
      .then((res) => res.json())
      .then((data) => setCustomer(data));
  }, [id, currentUser]);

  if (!customer) return <div className="p-8 text-center text-sm">Loading details...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      {/* Dynamic Header: Admin sees "Back to Dashboard", User sees "Logout" */}
      <div className="flex justify-between items-center">
        {currentUser?.role === 'admin' ? (
          <button onClick={() => navigate('/dashboard')} className="text-xs text-blue-600 underline font-medium">
            ← Back to Dashboard
          </button>
        ) : (
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">My Account</span>
        )}

        <button onClick={logout} className="text-xs border border-slate-300 px-3 py-1 rounded hover:bg-slate-100">
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm space-y-3 text-sm">
        <div className="flex items-center gap-4 border-b pb-4">
          <img src={customer.image} alt="" className="w-16 h-16 rounded-full border bg-slate-100" />
          <div>
            <h2 className="font-bold text-lg">{customer.firstName} {customer.lastName}</h2>
            <p className="text-slate-500 text-xs">{customer.email}</p>
          </div>
        </div>
        <p><span className="font-semibold text-slate-600">Phone:</span> {customer.phone}</p>
        <p><span className="font-semibold text-slate-600">Age </span> {customer.age}</p>
        <p><span className="font-semibold text-slate-600">Gender </span>{customer.gender}</p>
        <p><span className="font-semibold text-slate-600">Company:</span> {customer.company?.name} ({customer.company?.title})</p>
        <p><span className="font-semibold text-slate-600">Address:</span> {customer.address?.address}, {customer.address?.city}</p>
        <p><span className="font-semibold text-slate-600">Bank Card:</span> {customer.bank?.cardType} (Expires: {customer.bank?.cardExpire})</p>
      </div>

      <div>
        
      </div>
    </div>
  );
}