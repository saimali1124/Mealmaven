import React, { useState } from 'react'
// import { useNavigate } from "react-router-dom"
import UserNavbar from './UserNavbar';
import Footer from './Footer';

const UserProfile = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <UserNavbar />
      <div className='home-page'>
        <h1 id='manageProfile_H1'>Manage Profile</h1>


        <div className='profile-main-section'>
          <div >

            <h5 >Name:   {formData.name} </h5>
            <br />
            <h5>Email:   {formData.email}</h5>
            <br />
            <h5>Phone:   {formData.phone}</h5>
          </div>

          <h2>Update Profile</h2>
          <form name='profileForm' onSubmit={handleFormSubmit}>

            <label>
              Name
              <input type="text" name="name" placeholder='John Aelia' value={formData.name} onChange={handleInputChange} />
            </label>

            <label>
              Email
              <input type="email" name="email" placeholder='john@xyz.com' value={formData.email} onChange={handleInputChange} />
            </label>

            <label>
              Phone #
              <input type="" name="phone" placeholder='03XX-XXXXXXX' value={formData.phone} onChange={handleInputChange} />
            </label>
            <button type="updateProfile">Update</button>

          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default UserProfile