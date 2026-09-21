import React from 'react';

function TransactionModal({ isOpen, onClose, onSubmit, modalType, amount, setAmount }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl">
        <h2 className="text-xl font-semibold mb-4">{modalType} Amount</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Amount ($)</label>
            <input 
              type="number" 
              step="0.01"
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              autoFocus
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={`px-4 py-2 text-white rounded-md cursor-pointer ${modalType === 'Credit' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
            >
              Confirm {modalType}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionModal;
