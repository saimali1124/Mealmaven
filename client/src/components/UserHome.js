import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import UserNavbar from './UserNavbar';
import Footer from './Footer';

import { setNotification } from './Notifications';

const UserHome = () => {

  useEffect(() => {
    setNotification();
  }, []);

  const history = useNavigate();
  const [userData, setUserData] = useState({});

  const callUserHome = async () => {
    try{
      const res = await fetch('/UserHome', {
        method:'GET',
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json"
        },
        credentials: "include" 
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if(!res.status===200)
      {
        const error= new Error(res.error);
        throw error;
      }

    } catch(err) {
      console.log(err);
      history("/UserLogin");
    }
  }

  useEffect(()=> {
    callUserHome();
  });

  return (
    <>
    <UserNavbar/>
      <div className='home-page'>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
  <div className="text-center mb-7">
    <h1 className="lead" style={{ fontSize: '2rem', color: 'black' }}>Welcome</h1>
    <h1 className="display-4" style={{ fontSize: '4rem', color: 'black' }}>{userData.name}</h1>
    <h1 className="lead" style={{ fontSize: '2rem', color: 'black' }}>Happy to see you back</h1>
  </div>
</div>


</div>
<Footer/>
    </>
  )
}
export default UserHome