import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import stockService from '../services/stockService';

function StockList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    stockService.getAllStocks().then(setStocks);
  }, []);

  const handleDelete = (id) => {
    stockService.deleteStock(id).then(() => {
      setStocks(stocks.filter((stock) => stock.id !== id));
    });
  };

  return (
    <div className="p-8 bg-gradient-to-r from-green-400 to-blue-500 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-white mb-6">
        Stock Holdings
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-black">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Ticker</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Buy Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{stock.name}</td>
                <td className="px-4 py-2">{stock.ticker}</td>
                <td className="px-4 py-2">{stock.quantity}</td>
                <td className="px-4 py-2">${stock.buyPrice.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/edit/${stock.id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(stock.id)}
                    className="px-4 py-2 bg-red-500 text-black rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockList;
