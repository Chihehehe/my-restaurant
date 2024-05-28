import React, { useState, useEffect } from 'react';
import styles from './OrderRequest.module.css'; // Import your CSS styles here
import axios from 'axios';

const OrderRequest = ({ id }) => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderItems, setExpandedOrderItems] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8800/restpage/${id}/orderRequest`)
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, [id]);

  const fetchOrderItems = async (orderId) => {
    console.log('Fetching order items for order ID:', orderId); // Debug: Check if function is called
    try {
      const response = await axios.get(`http://localhost:8800/orders/${orderId}/items`);
      console.log('Fetched order items:', response.data); // Debug: Log fetched data
      return response.data;
    } catch (error) {
      console.error('Error fetching order items:', error); // Debug: Log any errors
      return [];
    }
  };

  const handleAccept = async (orderId) => {
    try {
      await axios.put(`http://localhost:8800/restPage/${orderId}/status`, { status: 'accepted' });
      const updatedOrders = orders.map(order =>
        order.idorder === orderId ? { ...order, status: 'accepted' } : order
      );
      console.log(updatedOrders);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      await axios.put(`http://localhost:8800/restPage/${orderId}/status`, { status: 'cancelled' });
      const filteredOrders = orders.filter(order => order.idorder !== orderId);
      setOrders(filteredOrders);
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:8800/restPage/${orderId}/status`, { status: 'completed' });
      const filteredOrders = orders.filter(order => order.idorder !== orderId);
      setOrders(filteredOrders);
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  const toggleExpandOrder = async (orderId) => {
    if (expandedOrderItems[orderId]) {
      setExpandedOrderItems(prevItems => {
        const newItems = { ...prevItems };
        delete newItems[orderId];
        return newItems;
      });
    } else {
      const orderItems = await fetchOrderItems(orderId);
      setExpandedOrderItems(prevItems => ({ ...prevItems, [orderId]: orderItems }));
    }
  };

  const expandedRowRender = (orderItems) => {
    return (
      <div>
        <p>Customer: Evelyn</p>
        <table className={styles.innerTable}>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Food Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map(item => (
              <tr key={item.idorder_items}>
                <td>{item.idorder_items}</td>
                <td>{item.foodName}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return styles.pending;
      case 'accepted':
        return styles.accepted;
      case 'completed':
        return styles.completed;
      case 'cancelled':
        return styles.cancelled;
      default:
        return '';
    }
  };

  return (
    <div className={styles.orderRequest}>
      <h2>Order Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <React.Fragment key={order.idorder}>
                <tr className={styles.orderRow}>
                  <td>{order.idorder}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td className={getStatusClass(order.status)}>{order.status}</td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      {order.status === 'pending' ? (
                        <>
                          <button className={styles.acceptButton} onClick={() => handleAccept(order.idorder)}>Accept</button>
                          <button className={styles.cancelButton} onClick={() => handleCancel(order.idorder)}>Cancel</button>
                        </>
                      ) : (
                        <button className={styles.completeButton} onClick={() => handleCompleteOrder(order.idorder)}>Complete Order</button>
                      )}
                      <button className={styles.detailsButton} onClick={() => toggleExpandOrder(order.idorder)}>
                        {expandedOrderItems[order.idorder] ? 'Hide Details' : 'Show Details'}
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedOrderItems[order.idorder] && (
                  <tr className={styles.orderDetailsRow}>
                    <td colSpan="5">{expandedRowRender(expandedOrderItems[order.idorder])}</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderRequest;
