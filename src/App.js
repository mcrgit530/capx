import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StockForm from './components/StockForm';
import StockList from './components/StockList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<StockForm />} />
        <Route path="/edit/:id" element={<StockForm />} />
        <Route path="/list" element={<StockList />} />
      </Routes>
    </Router>
  );
}

export default App;
