// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    // เมื่อคลิก Order, ให้ทำการนำทางไปยังหน้า Order
    navigate('/order');
  };

  return (
    <div>
      <h2>สั่งออเดอร์ผ่านปุ่ม "Order Now"</h2>
      <button onClick={handleOrderClick}>Order Now</button>
    </div>
  );
};

export default Product;
