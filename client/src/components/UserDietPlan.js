import axios from 'axios';
import React, { useState, useEffect  } from 'react';
import UserNavbar from './UserNavbar';
import Footer from './Footer';

const UserDietPlan = () => {

  const [formData, setFormData] = useState({
    email: '',
    height: '',
    weight: '',
    age: '',
    prefer: '',
    avoid: '',
    goal: '',
    complete: false,
    plan: ''
  });

  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    fetch('/UserHome')
      .then(res => res.json())
      .then(data => {
        setUserEmail(data.email);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { age, height, weight } = formData;

    if (age<3 || age>120){
        window.alert('Invalid BMI values!');
        return;
    }
    if (height<50 || height>250) {
        window.alert('Invalid BMI values!');
        return;
    }
    if (weight<10 || weight>180) {
        window.alert('Invalid BMI values!');
        return;
    }
    try {
      const res = await axios.post('/requestdiet', formData);

      if(!res) {
          alert("Error. Request not sent!");
      }
      else {
          alert("Diet Plan Request sent successfully!");
      }
      console.log(res.data);
      setFormData({
        email: '',
        height: '',
        weight: '',
        age: '',
        prefer: '',
        avoid: '',
        goal: '',
        complete: false,
        plan: ''
      });
    } catch (err) {
      console.error(err);
      alert("You have already requested a diet plan request!");
    }
  };

  const [plan, setPlan] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`/dietplann/${userEmail}`);
        setPlan(res.data.plan);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlan();
  }, [userEmail]);

  const [fullPlan, setFullPlan] = useState({name:"", type:"", duration:"", details:""});
  useEffect(() => {
    const fetchFullPlan = async () => {
      try {
        console.log(plan);
        const res = await axios.get(`/dietplanfull/${plan}`);
        setFullPlan(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFullPlan();
  }, [plan]);
    
  return (
<>
    <UserNavbar/>
    <div className='grey-page'>
    <div className='container'>
    
  <div className='left-section'>
  <h2  style={{marginLeft: '4rem', marginBottom: '2rem', marginTop: '2rem'}}>Request a diet plan</h2>
    <div className='login-form2'  style={{marginRight: '7rem'}}>
      <form name='dietForm' onSubmit={handleSubmit}>
        <div className='c9'>
          <input type='email' name="email" placeholder='Email' style={{ marginBottom:'0.5rem', width: '69%', border: '0.1rem solid #ccc' }}  value={formData.email} onChange={handleChange} required />
        </div>
        <br></br>
        <div className='c1' >
          <input type="number" name="height" placeholder='Height (in cm)' value={formData.height} onChange={handleChange} required />
        </div>
        <br></br>
        <div classname='c2'>
          <input type="number" name="weight" placeholder='Weight (in kg)' value={formData.weight} onChange={handleChange} required />
        </div>
        <br></br>
        <div classname='c3'>
          <input type="number" name="age" placeholder='Age' value={formData.age} onChange={handleChange} required />
        </div>
        <br></br>
        <div classname='c4'>
          <textarea name="prefer" placeholder='Your Food Preferance' value={formData.prefer} onChange={handleChange} />
        </div>
        <br></br>
        <div classname='c5'>
          <textarea name="avoid" placeholder='Food to Avoid' value={formData.avoid} onChange={handleChange} />
        </div>
        <br></br>
        <div classname='c6'>
          <select name="goal" value={formData.goal} onChange={handleChange} required>
            <option value="">Goal:</option>
            <option value="Weight decrease">Weight decrease</option>
            <option value="Weight increase">Weight increase</option>
          </select>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <button type="submitDiet" style={{marginLeft: '0.8rem', marginTop: '-3rem'}}>Submit</button>
      </form>
    </div>
  </div>
  <div className='right-section'>
  <h2 style={{marginLeft: '5.3rem', marginBottom: '2rem', marginTop: '2rem'}}>View Diet Plan received</h2>
  {plan==='' && (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <h3 style={{marginLeft: '10rem', marginTop: '6rem'}}>No diet plan yet!</h3>
      </div>
  )}
  {fullPlan.name!=="" && (
    <div className='c8'>
      <br></br>
      <br></br>
      <h3>Diet Plan Name:</h3>
      <h5>{fullPlan.name}</h5>
      <br></br>
      <h3>Type:</h3>
      <h5>{fullPlan.type}</h5>
      <br></br>
      <h3>Duration:</h3>
      <h5>{fullPlan.duration}</h5>
      <br></br>
      <h3>Details:</h3>
      <h5>{fullPlan.details}</h5>
    </div>
  )}
</div>

</div>
</div>
<Footer/>
    </>
  );
};

export default UserDietPlan;

