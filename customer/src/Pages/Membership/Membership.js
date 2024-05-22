// MembershipPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import classes from './MembershipPage.module.css';

function MembershipPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [membershipUpdated, setMembershipUpdated] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:8800/customer/${id}`)
      .then((res) => {
        if (res.data.length > 0) {
          setUser(res.data[0]);
          setIsMember(res.data[0].membership);
        } else {
          console.log('No user found');
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCancelMembership = () => {
    axios.put(`http://localhost:8800/customer/${id}/membership`, { membership: 0 })
        .then((res) => {
            alert('Your membership has been cancelled.');
            setMembershipUpdated(!membershipUpdated);
        })
        .catch(err => console.log(err));
};

  const handleJoinNow = () => {
    axios.put(`http://localhost:8800/customer/${id}/membership`, { membership: 1 })
      .then((res) => {
        console.log('Membership updated:', res.data);
        setIsMember(true);
        alert('You have successfully joined the membership program!');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={classes.membershipContainer}>
      <h1>Membership Page</h1>
      {user ? (
        isMember ? (
          <div className={classes.membershipDetails}>
            <h2>Membership Status: Active</h2>
            <p>As a valued member, you receive the following benefits:</p>
            <ul>
              <li>20% discount on service fees</li>
              <li>Priority support</li>
              <li>Exclusive member-only deals</li>
            </ul>
            <button onClick={handleCancelMembership}>Cancel Membership</button>
          </div>
        ) : (
          <div className={classes.membershipPromotion}>
            <h2>Become a Member!</h2>
            <p>Join our membership program today and enjoy exclusive benefits:</p>
            <ul>
              <li>20% discount on service fees</li>
              <li>Priority support</li>
              <li>Exclusive member-only deals</li>
            </ul>
            <p className={classes.promotionPrice}>Price: <strong>$10/month</strong></p>
            <div className={classes.paymentForm}>
              <h3>Enter Payment Details</h3>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="expiryDate"
                placeholder="Expiry Date"
                value={paymentDetails.expiryDate}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
              />
              <button className={classes.joinButton} onClick={handleJoinNow}>Join Now</button>
            </div>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MembershipPage;
