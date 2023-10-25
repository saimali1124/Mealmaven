import React, { useEffect, useState } from 'react'
import UserNavbar from './UserNavbar';
import Footer from './Footer';


const DailyActivity = () => {

    const [userData, setUserData] = useState({foodIntake:"", steps:""});
    const [showData, setShowData] = useState({});
    const footerStyle = { marginTop: '25rem'};

    const callDailyActivity = async () => {
      try{
        const res = await fetch('/DailyActivity', {
          method:'GET',
          headers: {
            "Content-Type": "Application/json"
          },
        });
  
        const data = await res.json();
        console.log(data);
        setShowData(data);
        
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
      callDailyActivity();
    }, []);

    const handleInputs  = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setUserData({ ...userData, [name]:value })
    }
    
    const DailyActivityForm = async (e) => {
        e.preventDefault();
        
        const { foodIntake, steps } = userData;

        if (!foodIntake || !steps) {
            window.alert('Please enter all fields!');
            return;
        }

        if (steps<0 || steps>100000) {
          window.alert('Invalid steps!');
          return;
        }

        const res = await fetch ('/DailyActivityPost', {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"  
            },
            body: JSON.stringify({
                foodIntake, steps
            })
        });

        const data = await res.json();

        if(!data) {
            console.log("Activity not added");
        } else {
            alert("Activity Added!");
            setUserData({...userData, foodIntake:"", steps:""});
        }
    }

  return (
    <>
    <UserNavbar/>
    <div>
    <div className='recipes-container'>
    <h1 className='recipes-header'  style={{marginTop: '1.5rem',marginBottom: '2.5rem'}} >Your Daily Activities:</h1>
    
    <ul className="recipes-list">
    {showData.activity && (
  showData.activity.length === 1 ? (
    showData.activity.map((activity, index) => {
      footerStyle.marginTop = '15rem';
      return (
        <li className="recipe" key={index}>
          <div>
            <h5>Food Intake: {activity.foodIntake}</h5>
            <h5>Steps: {activity.steps}</h5>
            <h5>Date: {JSON.stringify(activity.date).substring(1, 11)}</h5>
            <hr /> 
          </div>
        </li>
      );
    })
  ) : (
    showData.activity && (
      showData.activity.length === 2 ? (
        showData.activity.map((activity, index) => {
          footerStyle.marginTop = '3rem';
          return (
            <li className="recipe" key={index}>
              <div>
                <h5>Food Intake: {activity.foodIntake}</h5>
                <h5>Steps: {activity.steps}</h5>
                <h5>Date: {JSON.stringify(activity.date).substring(1, 11)}</h5>
                <hr /> 
              </div>
            </li>
          );
        })
      ) : (
        showData.activity.length > 0 ? (
          showData.activity.map((activity, index) => {
            footerStyle.marginTop = '0rem';
            return (
              <li className="recipe" key={index}>
                <div>
                  <h5>Food Intake: {activity.foodIntake}</h5>
                  <h5>Steps: {activity.steps}</h5>
                  <h5>Date: {JSON.stringify(activity.date).substring(1, 11)}</h5>
                  <hr /> 
                </div>
              </li>
            );
          })
        ) : (
          <h5>No activities found.</h5>
        )
      )
    )
  )
)}




  
  </ul>
    <div style={{ position: 'absolute', bottom: '5rem', left: 0 ,padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '2rem' }}>
      <h3 style={{ textAlign: 'left', marginBottom: '-0.5rem' }}>Add Daily Activity:</h3>
      <form method="POST" id="activityForm">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '2rem' }}>
        <textarea
          style={{ padding: '0.5rem', minHeight: '8rem', marginLeft: '1rem' }}
          id="big-textbox"
          placeholder='Food Intake'
          name="foodIntake"
          value={userData.foodIntake}
          onChange={handleInputs}
        />
        <br></br>
        <input style={{ padding: '0.5rem', width: '10rem', marginLeft: '1.5rem' }} placeholder='Steps' type="number" id="small-textbox" name="steps" value={userData.steps} onChange={handleInputs} step='100'/>
        <button
          style={{
            marginTop: '1rem',
            marginLeft: '4.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '1rem',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
          }}
          type="submit"
          onClick={DailyActivityForm}
        >
          Add
        </button>
      </div>
      </form>
    </div>
    </div> 
    </div>
     <div style={{ position: 'relative', bottom: 0, left: 0, width: '100%', textAlign: 'center', marginTop: footerStyle.marginTop.valueOf().toString()}}>
    <Footer/>
    </div>

    </>
  );
};

export default DailyActivity;