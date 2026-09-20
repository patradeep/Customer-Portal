import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const LIMIT=10;

function Dashboard() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('name');

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

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div>
      <NavBar/>
      <div className="bg-white rounded border overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-xs border-b">
              <tr>
                <th className="p-3">Customer</th>
                <th className="p-3">Email</th>
                <th className="p-3">Age</th>
                <th className="p-3">Company</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-x-2">
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="border px-3 py-1 rounded disabled:opacity-40">Prev</button>
            <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="border px-3 py-1 rounded disabled:opacity-40">Next</button>
          </div>
    </div>
  )
}

export default Dashboard