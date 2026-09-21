import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { useAuth } from '../context/AuthContext'
import TransactionModal from '../components/TransactionModal'

function CustomerDashboard() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [amount, setAmount] = useState('');
  
  useEffect(() => {
    const allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const userTransactions = allTransactions
      .filter((t) => t.userId === currentUser.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
      
    setTransactions(userTransactions);
    
    if (userTransactions.length > 0) {
      setBalance(userTransactions[0].balance);
    } else {
      setBalance(0);
    }
  }, [currentUser.id]);

  const handleOpenModal = (type) => {
    setModalType(type);
    setAmount('');
    setIsModalOpen(true);
  };

  const handleSubmitTransaction = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }
    
    let newBalance = balance;
    if (modalType === 'Credit') {
      newBalance += parsedAmount;
    } else if (modalType === 'Debit') {
      if (parsedAmount > balance) {
        alert("Insufficient balance.");
        return;
      }
      newBalance -= parsedAmount;
    }

    const newTransaction = {
      id: Date.now().toString(),
      userId: currentUser.id,
      type: modalType,
      amount: parsedAmount,
      date: new Date().toISOString(),
      balance: newBalance
    };

    const allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    allTransactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(allTransactions));

    setTransactions([newTransaction, ...transactions]);
    setBalance(newBalance);
    setIsModalOpen(false);
  };

  return (
    <>
      <NavBar/>

      <div className='p-5 flex flex-col m-auto max-w-[1000px] justify-center items-center bg-slate-200 rounded-xl mt-5'>
      <div className='flex flex-col justify-start m-5'>
        <label className='text-gray-500 font-semibold'>Current Balance</label>
        <div className='p-2 text-3xl font-semibold'>${balance.toFixed(2)}</div>
      </div>
      <div className='flex justify-around w-full m-5 gap-4'>
          <button onClick={() => handleOpenModal('Credit')} className="px-3 py-2 bg-green-50 text-green-700 border border-green-200 rounded-md w-2/5 cursor-pointer text-lg font-semibold hover:bg-green-100 transition-colors">+ Credit</button>
          <button onClick={() => handleOpenModal('Debit')} className="px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-md w-2/5 cursor-pointer text-lg font-semibold hover:bg-red-100 transition-colors">- Debit</button>
      </div>

      <div className='flex flex-col w-full'>
        <div className='text-lg font-semibold m-2'>Transactions</div>
        <div className='flex flex-col gap-3 w-full'>
          {transactions?.length > 0 ?  transactions.map((t) => (
            <div key={t.id} className='flex flex-col bg-white border border-gray-200 rounded-md p-4 shadow-sm'>
              <div className='flex justify-between'>
                <span className={`text-sm font-bold ${t.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>{t.type}</span>
                <span className='text-sm text-gray-500'>{new Date(t.date).toLocaleString()}</span>
              </div>
              <div className='flex justify-between mt-2'>
                <span className='text-lg font-semibold'>${t.amount.toFixed(2)}</span>
                <span className='text-lg font-semibold text-gray-700'>Bal: ${t.balance.toFixed(2)}</span>
              </div>
            </div>
          )) : <div className='text-center p-4 text-gray-500'>No Transactions</div>}
        </div>
      </div>
    </div>

    <TransactionModal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmitTransaction}
      modalType={modalType}
      amount={amount}
      setAmount={setAmount}
    />
    </>
  )
}

export default CustomerDashboard