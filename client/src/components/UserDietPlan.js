import axios from 'axios';
import React, { useState, useEffect } from 'react';
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

    if (age < 3 || age > 120) {
      window.alert('Invalid BMI values!');
      return;
    }
    if (height < 50 || height > 250) {
      window.alert('Invalid BMI values!');
      return;
    }
    if (weight < 10 || weight > 180) {
      window.alert('Invalid BMI values!');
      return;
    }
    try {
      // setFormData(prevState => ({
      //   ...prevState,
      //   email: userEmail
      // }));
      // console.log("form", formData, userEmail);

      const res = await axios.post('/requestdiet', formData);

      if (!res) {
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

  const [fullPlan, setFullPlan] = useState({ name: "", type: "", duration: "", details: "" });
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
    // <>
    //   <UserNavbar />
    //   <div className='grey-page'>

    //     <div className='user-diet-main-section'>
    //       <h2 className='recipes-header' style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>View Diet Plan received</h2>
    //         {plan === '' && (
    //           <div>
    //             <br></br>
    //             <br></br>
    //             <br></br>
    //             <h3 style={{ textAlign: 'center', marginBottom: '5rem' }}>No diet plan yet!</h3>
    //           </div>
    //         )}
    //         {fullPlan.name !== "" && (
    //           <br></br>
    //           <h3>Diet Plan Name:</h3>
    //           <h5>{fullPlan.name}</h5>
    //           <br></br>
    //           <h3>Type:</h3>
    //           <h5>{fullPlan.type}</h5>
    //           <br></br>
    //           <h3>Duration:</h3>
    //           <h5>{fullPlan.duration}</h5>
    //           <br></br>
    //           <h3>Details:</h3>
    //           <h5>{fullPlan.details}
    //           </h5>
    //           <br></br>
    //           <br></br>
    //         )}


    //       <h2 className='recipes-header' style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }} >Request a diet plan</h2>

    //       <form className='login-form2' name='dietForm' onSubmit={handleSubmit}>

    //         <label>
    //           Email
    //           <input type='email' name="email" placeholder='john@xyz.com' value={formData.email} onChange={handleChange} required />
    //         </label>

    //         <label>
    //           Height (in cm)
    //           <input type="number" name="height" placeholder='300cm' value={formData.height} onChange={handleChange} required />
    //         </label>

    //         <label>
    //           Weight (in Kg)
    //           <input type="number" name="weight" placeholder='65' value={formData.weight} onChange={handleChange} required />
    //         </label>

    //         <label>
    //           Age
    //           <input type="number" name="age" placeholder='21' value={formData.age} onChange={handleChange} required />
    //         </label>

    //         <label>
    //           Food Preference
    //           <textarea name="prefer" placeholder='Vegetables, Meat, Dairy ...' value={formData.prefer} onChange={handleChange} />
    //         </label>

    //         <label>
    //           Food to Avoid
    //           <textarea name="avoid" placeholder='Vegetables, Meat, Dairy ...' value={formData.avoid} onChange={handleChange} />
    //         </label>

    //         <label>
    //           Goal
    //           <select name="goal" value={formData.goal} onChange={handleChange} required>
    //             <option value="">Goal</option>
    //             <option value="Weight decrease">Weight decrease</option>
    //             <option value="Weight increase">Weight increase</option>
    //           </select>
    //         </label>


    //         <button type="submitDiet">Submit</button>
    //       </form>
    //     </div>


    //   </div>
    //   <Footer />
    // </>
    <>
    <UserNavbar />
  <div className='grey-page'>
    <div className='user-diet-main-section'>
      <h2 className='recipes-header' style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>View Diet Plan received</h2>
      {plan === '' && (
        <div>
          <br />
          <br />
          <br />
          <h3 style={{ textAlign: 'center', marginBottom: '5rem' }}>No diet plan yet!</h3>
        </div>
      )}
      {fullPlan.name !== "" && (
        <div>
          <br />
          <h3>Diet Plan Name:</h3>
          <h5>{fullPlan.name}</h5>
          <br />
          <h3>Type:</h3>
          <h5>{fullPlan.type}</h5>
          <br />
          <h3>Duration:</h3>
          <h5>{fullPlan.duration}</h5>
          <br />
          <h3>Details:</h3>
          <h5>{fullPlan.details}</h5>
          <br />
          <br />
        </div>
      )}

      <h2 className='recipes-header' style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>Request a diet plan</h2>

      <form className='login-form2' name='dietForm' onSubmit={handleSubmit}>

        <label>
          Email
          <input type='email' name="email" placeholder='john@xyz.com' value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Height (in cm)
          <input type="number" name="height" placeholder='170' value={formData.height} onChange={handleChange} required />
        </label>

        <label>
          Weight (in Kg)
          <input type="number" name="weight" placeholder='65' value={formData.weight} onChange={handleChange} required />
        </label>

        <label>
          Age
          <input type="number" name="age" placeholder='21' value={formData.age} onChange={handleChange} required />
        </label>

        <label>
          Food Preference
          <textarea name="prefer" placeholder='Vegetables, Meat, Dairy ...' value={formData.prefer} onChange={handleChange} />
        </label>

        <label>
          Food to Avoid
          <textarea name="avoid" placeholder='Vegetables, Meat, Dairy ...' value={formData.avoid} onChange={handleChange} />
        </label>

        <label>
          Goal
          <select name="goal" value={formData.goal} onChange={handleChange} required>
            <option value="">Goal</option>
            <option value="Weight decrease">Weight decrease</option>
            <option value="Weight increase">Weight increase</option>
          </select>
        </label>

        <button type="submitDiet">Submit</button>
      </form>
    </div>
  </div>
  <Footer />
  </>
  );
};

export default UserDietPlan;

