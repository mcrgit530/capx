import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import stockService from '../services/stockService';

function StockForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState({ name: '', ticker: '', buyPrice: '' });

  useEffect(() => {
    if (id) {
      stockService.getStockById(id).then(setStock);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      stockService.updateStock(id, stock).then(() => navigate('/list'));
    } else {
      stockService.addStock(stock).then(() => navigate('/list'));
    }
  };
  const handleViewList = () => {
    navigate('/list'); // Navigate to the stock list page
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl font-extrabold text-blue-600">Portfolio Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={handleViewList}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition"
          >
            View Stock List
          </button>
        </div>
      </header>

      <div className="p-8 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            {id ? 'Update Stock' : 'Add Stock'}
          </h2>
          <input
            type="text"
            value={stock.name}
            placeholder="Stock Name"
            onChange={(e) => setStock({ ...stock, name: e.target.value })}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          <input
            type="text"
            value={stock.ticker}
            placeholder="Ticker"
            onChange={(e) => setStock({ ...stock, ticker: e.target.value })}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          <input
            type="number"
            value={stock.buyPrice}
            placeholder="Buy Price"
            onChange={(e) => setStock({ ...stock, buyPrice: e.target.value })}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {id ? 'Update' : 'Add'} Stock
          </button>
        </form>
      </div>
    </div>
  );
}

export default StockForm;
