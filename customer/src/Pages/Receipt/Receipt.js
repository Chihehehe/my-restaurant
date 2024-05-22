import React from 'react';
import styles from './Receipt.module.css';

const Receipt = ({ order, onClose }) => {
  return (
    <div className={styles.receiptOverlay}>
      <div className={styles.receiptContainer}>
        <h2>Receipt</h2>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <div><strong>Order ID:</strong> {order.idorder}</div>
        <div><strong>Total Amount:</strong> ${order.totalAmount}</div>
        <div><strong>Status:</strong> {order.status}</div>
        <div><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</div>
        <div className={styles.orderItems}>
          {order.items.map(item => (
            <div key={item.idfood} className={styles.orderItem}>
              <div><strong>{item.foodName}</strong></div>
              <div>Quantity: {item.quantity}</div>
              <div>Price: ${item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Receipt;
