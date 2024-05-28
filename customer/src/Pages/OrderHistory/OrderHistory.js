import React, { useEffect, useState } from 'react';
import styles from './OrderHistory.module.css';
import OrderDetails from '../OrderDetails/OrderDetails';
import FeedbackForm from '../Feedback/FeedbackForm';
import Receipt from '../Receipt/Receipt'; // Assuming you have a Receipt component
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [feedbackOrderId, setFeedbackOrderId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/${id}/ordersHistory`);
        if (res.data.length > 0) {
          setOrders(res.data);
        } else {
          console.error("API response is not an array", res.data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchAllOrders();
  }, [id]);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return styles.pending;
      case 'completed':
        return styles.completed;
      case 'cancelled':
        return styles.cancelled;
      case 'accepted':
        return styles.accepted;
      default:
        return '';
    }
  };

  const handleFeedbackSubmit = async ({ feedbackText }) => {
    try {
      const rating = 5; // Default rating
      await axios.post(`http://localhost:8800/orders/${feedbackOrderId}/feedback`, {
        feedback: feedbackText
      });
      alert('Feedback sent successfully');
      setShowFeedbackForm(false);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setErrorMessage('Error submitting feedback: ' + (err.response?.data?.details || err.message));
    }
  };

  const handleViewReceipt = (e, orderId) => {
    e.stopPropagation();
    setSelectedOrder(orders.find(order => order.idorder === orderId));
    setShowReceipt(true);
  };

  return (
    <div className={styles.orderHistory}>
      <h1>Order History</h1>
      {orders.map(order => (
        <div
          key={order.idorder}
          className={styles.order}
          onClick={() => setSelectedOrder(selectedOrder && selectedOrder.idorder === order.idorder ? null : order)}
        >
          <div>
            <strong>Order ID:</strong> {order.idorder}<br />
            <strong>Total Amount:</strong> ${order.totalAmount}<br />
            <strong>Status:</strong> <span className={`${styles.status} ${getStatusClass(order.status)}`}>{order.status}</span><br />
            <strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}
            {order.status.toLowerCase() === 'cancelled' && (
              <span className={styles.cancelledMessage}> - Your money will be refunded</span>
            )}
            {order.status.toLowerCase() === 'completed' && (
              <>
                <button
                  className={styles.feedbackButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFeedbackOrderId(order.idorder);
                    setShowFeedbackForm(true);
                  }}
                >
                  Send Feedback
                </button>
                <button
                  className={styles.receiptButton}
                  onClick={(e) => handleViewReceipt(e, order.idorder)}
                >
                  View Receipt
                </button>
              </>
            )}
          </div>
          {selectedOrder && selectedOrder.idorder === order.idorder && (
            <OrderDetails items={order.items} />
          )}
        </div>
      ))}
      {showFeedbackForm && (
        <FeedbackForm
          onSubmit={handleFeedbackSubmit}
        />
      )}
      {showReceipt && selectedOrder && (
        <Receipt order={selectedOrder} onClose={() => setShowReceipt(false)} />
      )}
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default OrderHistory;
