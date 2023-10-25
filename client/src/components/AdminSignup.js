import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AdminHomeNavbar from './AdminHomeNavbar';
import Footer from './Footer';

const AdminSignup = () => {
    const history = useNavigate();
    const [Admin, setAdmin] = useState({name:"", email:"", password:"",cpassword:""});

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value= e.target.value;

        setAdmin({...Admin, [name]:value});
    }

    const PostData = async (e) => {
        e.preventDefault();

        if (!Admin.email || !Admin.password || !Admin.cpassword || !Admin.name) {
            window.alert('Please fill all the fields!');
            return;
        }

        if(Admin.name.length < 3)
        {
            window.alert('Name must have atleast 3 characters!');
            return;
        }

        if(Admin.password.length < 8)
        {
            window.alert('Password must have atleast 8 characters!');
            return;
        }

        if(!Admin.email.includes('@gmail.com'))
        {
            window.alert('Invalid email address!');
            return;
        }

        if(!/[A-Z]/.test(Admin.password))
        {
            window.alert('Password must have atleast 1 uppercase letter!');
            return;
        }

        if(!/\d/.test(Admin.password))
        {
            window.alert('Password must have atleast 1 numerical digit!');
            return;
        }

        const { name, email, password, cpassword } = Admin;
        const res = await fetch("/registerAdmin", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name, email, password, cpassword
            })
        });
         
        const data= await res.json();
    
        if(res.status === 422 || !data)
        {

            window.alert("Registeration not successful");
            return;
        } else {
            window.alert("Registeration Successful");

            history("/AdminLogin");
        }


    }

  return (
    <>
    <AdminHomeNavbar/>
    <div className='home-page'>

<section className='login-section'>
  <div className="container mt-5">
    <div className="login-content row">
    <div className="col-md-6">
      <div className="login-form" >
        <h2 className="form-title">Admin Sign Up</h2>
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
              value={Admin.name} 
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
              value={Admin.email} 
              onChange={handleInputs}
              placeholder='Your Email' 
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
              value={Admin.password} 
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
              value={Admin.cpassword} 
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
          <NavLink to="/AdminLogin" className="signup-image-link">Sign in</NavLink>
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
export default AdminSignup