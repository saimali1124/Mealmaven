import React, { useState, useEffect } from 'react';
import UserNavbar from './UserNavbar';
import Footer from './Footer';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: ''
  });

  const [showData, setShowData] = useState({
    email: '',
    name: '',
    phone: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/UserHome');
        if (response.ok) {
          const userData = await response.json();
          setShowData({
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
          });
          setFormData({
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
          });
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { email, name, phone } = formData;
    if (phone.length<10 || phone.length>13) {
      window.alert('Invalid Phone Number Length!');
      return;
    }

    const res = await fetch(`/updateProfileUser/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone }),
    });

    const data = await res.json();

    if (!data) {
      alert("Profile not edited! Try again later.");
    } else {
      alert("Profile Edited!");
    }
  };
  

  return (
    <>
      <UserNavbar />
      <div className='home-page'>
        <h1 id='manageProfile_H1'>Manage Profile</h1>

        <div className='profile-main-section'>
          <div>
            <h5>Name: {showData.name}</h5>
            <br />
            <h5>Phone: {showData.phone}</h5>
          </div>

          <h2>Update Profile</h2>
          <form name='profileForm' onSubmit={handleFormSubmit}>
            <label>
              Name
              <input
                type='text'
                name='name'
                placeholder='John Doe'
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Phone #
              <input
                type='text'
                name='phone'
                placeholder='03XX-XXXXXXX'
                value={formData.phone}
                onChange={handleInputChange}
              />
            </label>
            <button type='updateProfile'>Update</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
