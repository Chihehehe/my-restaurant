import React from 'react';
import styles from './OrderDetails.module.css';

const OrderDetails = ({ items }) => {
  return (
    <div className={styles.orderDetails}>
      {items.map(item => (
        <div key={item.idorder_items}>
          <strong>Food name:</strong> {item.foodName}<br />
          <strong>Quantity:</strong> {item.quantity}<br />
          <strong>Price:</strong> ${item.price}
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
