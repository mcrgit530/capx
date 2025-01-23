import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import stockService from '../services/stockService';

function Dashboard() {
  const [portfolio, setPortfolio] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    stockService.getAllStocks().then((data) => {
      setPortfolio(data);
      const value = data.reduce((acc, stock) => acc + stock.currentValue, 0);
      setTotalValue(value);
    });
  }, []);

  const handleViewList = () => {
    navigate('/list'); // Navigate to the stock list page
  };

  const handleAddStock = () => {
    navigate('/add'); // Navigate to the add stock page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500">
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl font-extrabold text-blue-600">Portfolio Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={handleViewList}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
          >
            View Stock List
          </button>
          <button
            onClick={handleAddStock}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition"
          >
            Add Stock
          </button>
        </div>
      </header>

      <main className="p-8">
        <div className="text-center mb-8">
          <p className="text-xl font-semibold text-white">
            Total Portfolio Value:
            <span className="text-yellow-300 font-bold"> ${totalValue.toFixed(2)}</span>
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((stock) => (
            <div
              key={stock.id}
              className="p-6 bg-white border rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-lg font-bold text-gray-800">
                {stock.name} ({stock.ticker})
              </h3>
              <p className="text-gray-600 mt-2">
                Current Value:
                <span className="text-green-500 font-bold"> ${stock.currentValue.toFixed(2)}</span>
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
