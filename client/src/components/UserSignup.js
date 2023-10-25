import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const UserSignup = () => {
    const history = useNavigate();
    const [user, setUser] = useState({name:"", email:"", phone:"", password:"",cpassword:""});

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value= e.target.value;

        setUser({...user, [name]:value});
    }

    const PostData = async (e) => {
        e.preventDefault();

        if (!user.email || !user.password || !user.cpassword || !user.phone || !user.name) {
            window.alert('Please fill all the fields!');
            return;
        }

        if(user.phone.length < 11 || user.phone.length>14)
        {
            window.alert('Invalid Phone number lenght!');
            return;
        }

        if(user.name.length < 3)
        {
            window.alert('Name must have atleast 3 characters!');
            return;
        }

        if(user.password.length < 8)
        {
            window.alert('Password must have atleast 8 characters!');
            return;
        }

        if(!user.email.includes('@gmail.com'))
        {
            window.alert('Invalid email address!');
            return;
        }

        if(!/[A-Z]/.test(user.password))
        {
            window.alert('Password must have atleast 1 uppercase letter!');
            return;
        }

        if(!/\d/.test(user.password))
        {
            window.alert('Password must have atleast 1 numerical digit!');
            return;
        }

        const { name, email, phone, password, cpassword } = user;
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name, email, phone, password, cpassword
            })
        });
         
        const data= await res.json();
    
        if(res.status === 422 || !data)
        {

            window.alert("Registeration not successful");
            return;
        } else {
            window.alert("Registeration Successful");

            history("/UserLogin");
        }


    }

  return (
    <>
    <Navbar/>
    <div className='home-page'>

<section className='login-section'>
  <div className="container mt-5">
    <div className="login-content row">
    <div className="col-md-6">
      <div className="login-form" >
      <h1 className="form-title">User Sign Up</h1> 
        <form className="register-form" id="register-form">
          <div className="form-group">
            <label htmlFor="name">
              <i class="zmdi zmdi-account material-icons-name"></i>
            </label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              autoComplete='off' 
              value={user.name} 
              onChange={handleInputs}
              placeholder='Your Name' 
              style={{width: "100%", maxWidth: "400px", margin: "0 auto"}}
              className="form-input"
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="email">
              <i class="zmdi zmdi-email material-icons-name"></i>
            </label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              autoComplete='off' 
              value={user.email} 
              onChange={handleInputs}
              placeholder='Your Email' 
              style={{width: "100%", maxWidth: "400px", margin: "0 auto"}}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <i class="zmdi zmdi-phone-in-talk material-icons-name"></i>
            </label>
            <input 
              type="number" 
              name="phone" 
              id="phone" 
              autoComplete='off' 
              value={user.phone} 
              onChange={handleInputs}
              placeholder='Your Phone' 
              style={{width: "100%", maxWidth: "400px", margin: "0 auto"}}
              className="form-input"
              />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i class="zmdi zmdi-lock material-icons-name"></i>
            </label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              autoComplete='off' 
              value={user.password} 
              onChange={handleInputs}
              placeholder='Your Password' 
              style={{width: "100%", maxWidth: "400px", margin: "0 auto"}}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpassword">
              <i class="zmdi zmdi-lock material-icons-name"></i>
            </label>
            <input 
              type="password" 
              name="cpassword" 
              id="cpassword" 
              autoComplete='off' 
              value={user.cpassword} 
              onChange={handleInputs}
              placeholder='Confirm Your Password' 
              style={{width: "100%", maxWidth: "400px", margin: "0 auto"}}
              className="form-input"
            />
          </div>

          <div className="form-group form-button">
            <input 
              type="submit" 
              name="signup" 
              id="signup" 
              className="form-submit button-primary bg-primary"
              value="Register" 
              onClick={PostData}
            />
          </div>
          <br></br>
          <p style={{marginBottom: '-0.8rem'}}>Already on MealMaven?
          <NavLink to="/UserLogin" className="signup-image-link">Sign in</NavLink>
          </p>
        </form>
      </div>
                       </div>
                   </div>
               </div>
           </section>
    </div>
    <Footer/>
           </>
  )
}
export default UserSignup

