import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import classes from './CheckoutPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const location = useLocation();
  const { cart } = location.state; // Access the cart data from location 
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(5.00); // Example fee
  const [serviceFee, setServiceFee] = useState(10.00); // Example fee
  const [restaurantDiscount, setRestaurantDiscount] = useState(0.10); // 10% discount
  const [membershipDiscount, setMembershipDiscount] = useState(0.20); // 20% discount on service fee

  const navigate = useNavigate()

  useEffect(() => {
    console.log("Fetching data id:", id);
    axios.get(`http://localhost:8800/customer/${id}`)
      .then((res) => {
        console.log('Data fetched:', res.data);
        if (res.data.length > 0) {
          setUser(res.data[0]); // Assuming the data is an array and we're interested in the first item
        } else {
          console.log('No user found');
        }
      })
      .catch(err => console.log(err));
  }, [id]);


  if (!user) {
    return <div>Loading...</div>;
  }


  const subtotal = cart.reduce((total, item) => total + item.amount * item.price, 0);
  const discountAmount = subtotal * restaurantDiscount;
  let totalServiceFee = serviceFee;
  let membershipMessage = null;

  if (user.membership) {
    totalServiceFee -= serviceFee * membershipDiscount;
    membershipMessage = <span className={classes.membershipApplied}>20% off applied</span>;
  } else {
    membershipMessage = <span className={classes.membershipMessage}>Become a member to receive 20% off on service fee</span>;
  }

  const total = (subtotal - discountAmount) + deliveryFee + totalServiceFee;


  const insertOrderData = async (orderData) => {
    try {
      const response = await axios.post(`http://localhost:8800/${id}/orders`, orderData);
      console.log('Order inserted:', response.data);
      // Handle success case
    } catch (error) {
      console.error('Error inserting order:', error);
      // Handle error case
    }
  };

  console.log('Cart data: ', cart)

  const handleCheckout = () => {
    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Prepare the order data
    const orderData = {
      iduser: id, // Assuming the user object has an `idCustomer` property
      idrest: cart[0].idRest, // Assuming the cart items have an `idrestaurant` property
      totalAmount: total,
      status: 'pending',
      created_at: created_at,
      items: cart.map((item) => ({
        idfood: item.idmenu, // Assuming the cart items have an `idmenu` property
        quantity: item.amount,
        price: item.price,
        foodName: item.foodName
      })),
    };

    console.log('Order Data:', orderData);

    // Insert the order data
    insertOrderData(orderData);

    // Show the alert and navigate to the "/OrderHistory" page after 3 seconds
    setTimeout(() => {
      alert('Your order is waiting to be accepted. View your order here');
      navigate(`/${id}/OrderHistory`);
    }, 3000);
  };

  return (
    <div className={classes.checkoutContainer}>
      <h2>Checkout for User: {user.name}</h2>
      <div className={classes.cartSummary}>
        <h3>Order Summary</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index} className={classes.cartItem}>
              <img src={item.image} alt={item.foodName} className={classes.cartImage} />
              <div className={classes.itemDetails}>
                <span className={classes.itemName}>{item.foodName}</span>
                <span className={classes.itemAmount}>Quantity: {item.amount}</span>
                <span className={classes.itemPrice}>Price: ${(item.price * item.amount).toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className={classes.subtotal}>
          Subtotal: ${subtotal.toFixed(2)}
        </div>
        <div className={classes.discounts}>
          Restaurant Discount: -${discountAmount.toFixed(2)}
        </div>
        <div className={classes.fees}>
          Delivery Fee: ${deliveryFee.toFixed(2)}
          <br />
          Service Fee: ${totalServiceFee.toFixed(2)} {membershipMessage}
        </div>
        <div className={classes.totalPrice}>
          Total: ${total.toFixed(2)}
        </div>
      </div>
      <div className={classes.paymentSection}>
        <h3>Payment Information</h3>
        <form className={classes.paymentForm}>
          <label htmlFor="cardName">Cardholder Name</label>
          <input type="text" id="cardName" name="cardName" required />

          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" name="cardNumber" required />

          <div className={classes.cardDetails}>
            <div>
              <label htmlFor="expiryDate">Expiry Date</label>
              <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required />
            </div>
            <div>
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" name="cvv" required />
            </div>
          </div>

          <label htmlFor="billingAddress">Billing Address</label>
          <input type="text" id="billingAddress" name="billingAddress" required />

          <button type="button" className={classes.checkoutButton} onClick={handleCheckout}>Complete Checkout</button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;
