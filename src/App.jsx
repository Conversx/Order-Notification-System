// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // แก้จาก Product เป็น Home
import Product from './pages/Product'; // แก้จาก Order เป็น Product
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Order Notification System</h1>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
