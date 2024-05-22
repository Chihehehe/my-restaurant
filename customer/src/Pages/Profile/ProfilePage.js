// ProfilePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import classes from './Profile.module.css';

function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    gmail: '',
    phone: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8800/customer/${id}`)
      .then((res) => {
        if (res.data.length > 0) {
          const userData = res.data[0];
          setUser(userData);
          setFormData({
            name: userData.name,
            gmail: userData.gmail, // Assuming the server response has 'gmail' property
            phone: userData.phone,
          });
        } else {
          console.log('No user found');
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:8800/customer/${id}`, formData)
      .then((res) => {
        alert('Profile updated successfully!');
        setUser(formData);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={classes.profileContainer}>
      {user ? (
        <div className={classes.profileDetails}>
          <h3>Profile for {user.name}</h3>
          <div className={classes.profileField}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.profileField}>
            <label>Gmail</label>
            <input
              type="gmail"
              name="gmail"
              value={formData.gmail}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.profileField}>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <button className={classes.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePage;