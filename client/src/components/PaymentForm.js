import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Footer from './Footer';
import UserNavbar from './UserNavbar';


const PaymentForm = () => {
  const [paymentError, setPaymentError] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/UserHome', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };
 
    fetchData();
  }, []);

  const handleToken = async () => {
    const response = await fetch('/Payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: 500, // in cents
        userData: userData
      })
    });

    const data = await response.json();

    console.log('data:', data);

    if (data.success) {
      console.log('success');
      // Update app state to indicate that the user has premium access
      // ...
    } else {
      setPaymentError(data.error.message);
      console.log('payment error:', data.error.message);
    }
  };

  return (
    <>
  <UserNavbar />
  <div className="hero">
    <h1>Introducing Our Latest and Most Exciting Feature Yet!</h1>
    <br></br>
    <br></br>
    <h4>Say goodbye to the days of staring at an empty fridge, wondering what to make for dinner. With just a few clicks, our website can provide you with delicious recipe options based on the ingredients you already have at home!</h4>
  <div>
    <StripeCheckout
      stripeKey="pk_test_51N2TpHJVoaHWZoMRPTzIfdejGQd01KAlgY6V63F2T2Ql41t13U1ASeSScv7JdfbqxWbvxxeWpgbHUwpBe1Jzx7TY00OlDq4kfe"
      token={handleToken}
      amount={500} // in cents
      name="Daily Activity/Diet Plan Tracker"
      description="Premium Feature"
    >
      <button className="btn btn-primary btn-lg" style={{marginBottom: '15rem', marginLeft: '1rem', marginTop: '8rem'}}>Buy Premium Feature</button>
    </StripeCheckout>
    {paymentError && (
      <div className="alert alert-danger mt-3" role="alert">
        {paymentError}
      </div>
    )}
  </div>
  </div>
    <Footer />
</>

  );
};

export default PaymentForm;
