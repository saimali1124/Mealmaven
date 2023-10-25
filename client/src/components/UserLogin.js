import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import "../App.css";
import Navbar from './Navbar';
import Footer from './Footer';

const UserLogin= () => {

    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            window.alert('Please enter both Email and Password!');
            return;
        }

        const res= await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();

        if(res.status === 400 || !data)
        {
            window.alert("Invalid Credentials");
        }  else{
            window.alert("Login Successful");
            history("/UserHome");
        }
        
    }
    

    return (
      <>
      <Navbar />
      <div className="home-page">

      <section className="login-section">
        <div className="container mt-5">
          <div className="login-content row">
            <div className="col-md-15">
              <div className="login-form">
                <h2 className="form-title">User Login</h2>
                <form method="POST" className="register-form" id="register-form">
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email material-icons-name"></i>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email"
                      className="form-input"
                    />
                  </div>
    
                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="zmdi zmdi-lock material-icons-name"></i>
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your Password"
                      className="form-input"
                    />
                  </div>
    
                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signin"
                      id="signin"
                      className="form-submit button-primary bg-primary"
                      value="Login"
                      onClick={loginUser}
                    />
                  </div>
                  <br></br>
                  <p style={{marginBottom: '-0.8rem'}}>New to MealMaven?
                  <NavLink to="/UserSignup" className="signup-image-link">Join now</NavLink>
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
export default UserLogin