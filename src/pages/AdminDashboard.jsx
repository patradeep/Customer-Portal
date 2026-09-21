import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const LIMIT=10;

function AdminDashboard() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('sort by');

  useEffect(() => {
    const skip = (page - 1) * LIMIT;
    const url = search.trim()
      ? `https://dummyjson.com/users/search?q=${search}&limit=${LIMIT}&skip=${skip}`
      : `https://dummyjson.com/users?limit=${LIMIT}&skip=${skip}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setTotal(data.total || 0);
      });

  }, [search, page]);

  const handleSort = (key) => {
    setSortKey(key);
    setPage(1);
    users.sort((a, b) => {
      if(key === "name") {
        return a.firstName.localeCompare(b.firstName);
      }
      if(key === "age") {
        return a.age - b.age;
      }
    });
  };

  const totalPages = Math.ceil(total / LIMIT);

  const allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
  const getBalance = (userId) => {
    const userTransactions = allTransactions
      .filter((t) => t.userId === userId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (userTransactions.length > 0) {
      return `$${userTransactions[0].balance.toFixed(2)}`;
    }
    return '_';
  };

  return (
    <div className='min-h-screen bg-slate-50 w-screen '>
      <NavBar/>
      <div className="flex justify-center">
      <input type="text" value={search}  placeholder='Search' onChange={(e) => setSearch(e.target.value)} className="px-3 py-1 rounded m-4 bg-white border w-2/5" />
        <select value={sortKey} onChange={(e) => handleSort(e.target.value)} className="px-3 py-1 rounded m-4 bg-white border">
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>
      </div>
      <div className="bg-white rounded border overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-xs border-b">
              <tr>
                <th className="p-3">Customer</th>
                <th className="p-3">Email</th>
                <th className="p-3">Age</th>
                <th className="p-3">Company</th>
                <th className="p-3">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.id} onClick={() => navigate(`/customers/${u.id}`)} className="cursor-pointer hover:bg-slate-50">
                  <td className="p-3 flex items-center gap-2">
                    <img src={u.image} alt="" className="w-6 h-6 rounded-full" />
                    <span>{u.firstName} {u.lastName}</span>
                  </td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.age}</td>
                  <td className="p-3">{u.company?.name}</td>
                  <td className="p-3 font-medium text-gray-700">{getBalance(u.id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center my-4 gap-8 items-center">
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="border px-3 py-1 rounded disabled:opacity-40">Prev</button>
            <p className='text-sm text-gray-500'>Page {page} of {totalPages}</p>
            <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="border px-3 py-1 rounded disabled:opacity-40">Next</button>
        </div>
    </div>
  )
}

export default AdminDashboard