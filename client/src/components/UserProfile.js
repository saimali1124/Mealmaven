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
    <UserNavbar/>
    <div className='grey-page'>
    <div className='container'>
    
  <div className='left-section'>
  <h2  style={{marginLeft: '6.8rem', marginBottom: '4rem', marginTop: '1.5rem', fontSize:'42px',  transform: 'translateX(calc(100% - 130px))'}}>Manage Profile</h2>
    <h3 style={{marginTop: '10rem'}}>Name: {formData.name} </h3>
    <br></br>
    <br></br>
    <h3>Email: {formData.email}</h3>
    <br></br>
    <br></br>
    <h3>Phone: {formData.phone}</h3>
  </div>
    <div className='right-section'>
    <div className='profile-form'  style={{marginRight: '1rem', marginTop: '12rem', marginLeft: '10rem', marginBottom: '5rem'}}>
      
      <form name='profileForm' onSubmit={handleFormSubmit}>
        <div className='c1' >
          <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleInputChange}/>
        </div>
        <br></br>
        <div classname='c2'>
          <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleInputChange}/>
        </div>
        <br></br>
        <div classname='c3'>
          <input type="" name="phone" placeholder='Phone' value={formData.phone} onChange={handleInputChange}/>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <button type="updateProfile" style={{marginLeft: '0.8rem', marginTop: '-3rem'}}>Update</button>
      </form>
    </div>
    </div>
</div>
</div>
<Footer/>
    </>
  );
};
export default UserProfile