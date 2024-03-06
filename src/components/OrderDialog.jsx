import React from 'react';
import './OrderDialog.css';

const OrderDialog = ({ isOpen, onClose, orderedProducts, onDeleteOrder }) => {
  const handleClose = () => {
    onClose();
    // ไม่ต้องเรียก setOrderDialogOpen([]) ในที่นี้ เนื่องจากตัวคุณสมบัตินี้จะถูกปรับเปลี่ยนจากข้างนอก (ใน Product.jsx)
  };

  const handleDeleteOrder = (productId) => {
    onDeleteOrder(productId);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="order-dialog-overlay">
      <div className="order-dialog">
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
              {index < orderedProducts.length - 1 && <hr />} {/* เพิ่มเส้นแบ่งระหว่างรายการสินค้า */}
            </React.Fragment>
          ))}
        </ul>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderDialog;
