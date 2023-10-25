import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';

const AdminHome = () => {

  const [adminData, setAdminData] = useState({});

  const callAdminHome = async () => {
    try{
      const res = await fetch('/AdminHome', {
        method:'GET',
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json"
        },
        credentials: "include" 
      });

      const data = await res.json();
      console.log(data);
      setAdminData(data);

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
    callAdminHome();
  });

  return (
    <>
    <AdminNavbar/>
<div className='home-page'>

<div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
  <div className="text-center mb-7">
    <h5 className="lead" style={{ fontSize: '2.5rem', color: 'black' }}>Welcome Admin</h5>
    <h5 className="display-4" style={{ fontSize: '4rem', color: 'black' }}>{adminData.name}</h5>
    <h5 className="lead" style={{ fontSize: '2.5rem', color: 'black' }}>Happy to see you back</h5>
  </div>
</div>
</div>
<Footer/>
    </>
  )
}
export default AdminHome