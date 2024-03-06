// src/pages/Product.jsx
import React, { useState, useEffect } from 'react';
import AddProductPopup from '../components/AddProduct';
import OrderDialog from '../components/OrderDialog';
import Notification from '../components/Notification'; // Import the Notification component
import './Product.css';
import '../components/OrderDialog.css';
import '../components/Notification.css'; // Import the Notification CSS file

const Product = () => {
  const [isAddProductPopupOpen, setAddProductPopupOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const [showNotificationCircle, setShowNotificationCircle] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await fetch('http://localhost:3001/getProducts');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        setProducts(result.products);
      } else {
        console.error('Failed to fetch product data');
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const openAddProductPopup = () => {
    setAddProductPopupOpen(true);
  };

  const closeAddProductPopup = () => {
    setAddProductPopupOpen(false);
    fetchProductData();
  };

  const handleAddProduct = (productData) => {
    // Handle the product data received from AddProductPopup component
    // You can add logic to update your state or send the data to the server
    console.log('Handling Add Product:', productData);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/deleteProduct/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        fetchProductData();
        console.log('Product deleted successfully');
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleOrderProduct = (productId) => {
    const orderedProduct = products.find((product) => product.pID === productId);
    setOrderedProducts((prevOrderedProducts) => [...prevOrderedProducts, orderedProduct]);

    // Show a notification when an order is added to the cart
    showNotification('Product added to cart🛒🛒🛒');
  };

  const handleDeleteOrder = (productId) => {
    // จะลบ Order ตาม productId ที่รับเข้ามา
    setOrderedProducts((prevOrderedProducts) =>
      prevOrderedProducts.filter((product) => product.pID !== productId)
    );
  };

  const closeOrderDialog = () => {
    setOrderDialogOpen(false);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  const filterProducts = (product) => {
    const categoryMatch = selectedCategory ? product.pCategory === selectedCategory : true;
    const nameMatch = product.pName.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && nameMatch;
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const filteredProducts = products.filter(filterProducts);
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const showNotification = (message) => {
    setNotification(message);
    setShowNotificationCircle(true);

    setTimeout(() => {
      setNotification(null);
      setShowNotificationCircle(false);
    }, 3000); // Clear the notification after 3 seconds
  };

  return (
    <div className="container">
      <h2>Product</h2>

      <button onClick={openAddProductPopup}>Add Product</button>

      <div className='search-bar'>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div>
        <button className='FilterButton' onClick={() => handleCategoryFilter(null)}>All</button>
        <button className='FilterButton' onClick={() => handleCategoryFilter('เครื่องดื่ม')}>เครื่องดื่ม</button>
        <button className='FilterButton' onClick={() => handleCategoryFilter('ขนม')}>ขนม</button>
      </div>

      <button className='HomeButton'>
        <a href="/">Back to Home</a>
      </button>

      <div className="card-grid">
        {currentProducts.map((product) => (
          <div key={product.pID} className="product-card">
            <div className="product-info">
              <img src={product.pImage} alt={product.pName} />
              <h3>{product.pName}</h3>
              <p>ราคา: {product.price}</p>
              <p>ชนิด: {product.pCategory}</p>
            </div>
            <div className="button-container">
              <button className='OrderButton' onClick={() => handleOrderProduct(product.pID)}>Order</button>
              <button className='DelButton' onClick={() => handleDeleteProduct(product.pID)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      <div className="sticky-button-container">
        <button className="CartButton" onClick={() => setOrderDialogOpen(true)}>
          🛒
        </button>
        {showNotificationCircle && <div className="notification-circle"></div>}
      </div>

      <AddProductPopup isOpen={isAddProductPopupOpen} onClose={closeAddProductPopup} onAddProduct={handleAddProduct} />

      <OrderDialog
        isOpen={isOrderDialogOpen}
        onClose={closeOrderDialog}
        orderedProducts={orderedProducts}
        onDeleteOrder={handleDeleteOrder}
      />

      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
    </div>
  );
};

export default Product;
