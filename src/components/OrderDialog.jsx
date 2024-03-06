import React, { useState } from 'react';
import './OrderDialog.css';

const OrderDialog = ({ isOpen, onClose, orderedProducts, onDeleteOrder, onMakeOrder }) => {
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleClose = () => {
    onClose();
    // No need to call setOrderDialogOpen([]) here, as mentioned in the original code.
  };

  const handleDeleteOrder = (productId) => {
    onDeleteOrder(productId);
  };

  const handleMakeOrder = () => {
    onMakeOrder();
    setOrderSuccess(true);
    
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`order-dialog-overlay${orderSuccess ? ' order-success' : ''}`}>
      <div className={`order-dialog${orderSuccess ? ' order-success-dialog' : ''}`}>
        {orderSuccess ? (
          <>
            <h2>Order Successful!</h2>
            <button className="finish-button" onClick={handleClose}>
              FINISH
            </button>
          </>
        ) : (
          <>
            <h2>Your Order</h2>
            <ul>
              {orderedProducts.map((product, index) => (
                <React.Fragment key={product.pID}>
                  <li>
                    <span>{product.pName} - {product.price}</span>
                    <button className="delete-icon" onClick={() => handleDeleteOrder(product.pID)}>
                      🗑️
                    </button>
                  </li>
                  {index < orderedProducts.length - 1 && <hr />}
                </React.Fragment>
              ))}
            </ul>
            <div className="button-container">
              <button onClick={handleMakeOrder} className="make-order-button" disabled={orderedProducts.length === 0}>
                Make Order
              </button>
              <button className='close-dialog-button' onClick={handleClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDialog;
