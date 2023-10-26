import React, { useEffect, useState } from 'react'
import SuperAdminNavbar from './SuperAdminNavbar';
import Footer from './Footer';

const SuperAdminHome = () => {

  const [SuperAdminData, setSuperAdminData] = useState({});

  const callSuperAdminHome = async () => {
    try{
      const res = await fetch('/SuperAdminHome', {
        method:'GET',
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json"
        },
        credentials: "include" 
      });

      const data = await res.json();
      console.log(data);
      setSuperAdminData(data);

      if(!res.status===200)
      {
        const error= new Error(res.error);
        throw error;
      }

    } catch(err) {
      console.log(err);
    }
  }

  useEffect(()=> {
    callSuperAdminHome();
  });

  return (
    <>
    <SuperAdminNavbar/>
<div className='home-page'>

<div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
  <div className="text-center mb-7">
    <h5 className="lead" style={{ fontSize: '2.5rem', color: 'black' }}>Welcome Admin</h5>
    <h5 className="display-4" style={{ fontSize: '4rem', color: 'black' }}>{SuperAdminData.name}</h5>
    <h5 className="lead" style={{ fontSize: '2.5rem', color: 'black' }}>Happy to see you back</h5>
  </div>
</div>
</div>
<Footer/>
    </>
  )
}
export default SuperAdminHome