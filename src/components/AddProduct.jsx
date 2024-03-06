// src/components/AddProduct.jsx
import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = ({ isOpen, onClose, onAddProduct }) => {
  const [productData, setProductData] = useState({
    pID: '',
    pName: '',
    price: '',
    pCategory: '',
    pImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const inputValue = type === 'file' ? files[0] : value;

    setProductData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch('http://localhost:3001/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        console.log('Product added successfully');
        onAddProduct(productData);
  
        setProductData({
          pID: '',
          pName: '',
          price: '',
          pCategory: '',
          pImage: '',
        });
  
        onClose();
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };
  
  

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <div className="popup-header">
          <h2>Product</h2>
        </div>
        <form>
          <label>
            Product ID:
            <input
              type="text"
              name="pID"
              value={productData.pID}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Product Name:
            <input
              type="text"
              name="pName"
              value={productData.pName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="pCategory"
              value={productData.pCategory}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Image:
            <input
              type="URL"
              name="pImage"
              onChange={handleInputChange}
            />
          </label>
          <button className='AddButton' type="button" onClick={handleAddProduct}>
            Add Product
          </button>
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
