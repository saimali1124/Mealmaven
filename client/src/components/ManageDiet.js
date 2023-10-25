import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";

const ManageDiet = () => {
  const [diet, setDiet] = useState([]);
  const [dietData, setDietData] = useState({name:"", type:"", duration:"", details:""});
  const [editDietData, setEditDietData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try{
      const result = await axios.get("/diet");
      setDiet(result.data);
      setEditDietData(result.data);
        } catch (err)
        {
            console.log(err);
        }
    };

    fetchData();
  }, []);

  const handleDeleteDiet = async (dietId) => {
    window.alert(`Diet Plan deleted!`);
    try {
      await axios.delete(`/diet7/${dietId}`);
      const updatedDiet = diet.filter((dietplan) => dietplan._id !== dietId);
      setDiet(updatedDiet);
    } catch (err) {
      console.log(err);
    }
  };

  
  const handleInputs  = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setDietData({ ...dietData, [name]:value })
    }

    const handleInputs2  = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setEditDietData({ ...editDietData, [name]:value })
        }

  const ManageDietForm = async (e) => {
    e.preventDefault();

    const { name, type, duration, details } = dietData;
    

    if (!name || !type || !duration || !details) {
        window.alert('Please enter all fields!');
        return;
    }


    

    const res = await fetch('/diet8', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, type, duration, details })
    });

    const data = await res.json();

    if(!data) {
        alert("Diet not added");
    } else {
        alert("Diet Added!");
        setDietData({...dietData, name:"", type:"", duration:"", details:""});
    }
   }

   const EditDietForm = async (e) => {
    e.preventDefault();

    const { name, type, duration, details } = editDietData;
    

    if (!name) {
        window.alert('Please enter name of the diet!');
        return;
    }

    const res = await fetch(`/diet9/${name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, duration, details })
      });

    const data = await res.json();

    if(!data) {
        alert("Diet not edited");
    } else {
        alert("Diet Edited!");
        setEditDietData([]);
    }
   }


  return (
    <>
    <AdminNavbar/>
    <div className='grey-page2'>
<div className="recipes-container">
  <h1 className="recipes-header" style={{ marginTop: '1.5rem',marginBottom: '2.5rem'}}>Manage Diet Plans</h1>
  <ul className="recipes-list">
    {diet.map((dietplan) => (
      <li key={dietplan._id} className="recipe">
        <h2 className="recipe-name">{dietplan.name}</h2>
        <p className="recipe-type">
          <strong>Type:</strong> {dietplan.type}
        </p>
        <p className="recipe-duration">
          <strong>Duration:</strong> {dietplan.duration}
        </p>
        <p className="recipe-details">
          <strong>Details:</strong> {dietplan.details}
        </p>
        <div className="recipe-actions">
          <button className="recipe-action-btn" onClick={() => handleDeleteDiet(dietplan._id)}>
            <FaTrashAlt />
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>
<div style={{ position: 'absolute', bottom: '2rem', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '1.5rem' }}>
<h4 style={{ textAlign: 'left', marginLeft: '1.5rem' }}>Add Diet:</h4>
      <form method="POST" id="activityForm">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '2rem' }}>
      <label style={{ marginBottom: '0.5rem', marginTop: '-1.5rem'}} htmlFor="name-textbox">
          
        </label>
        <input style={{ padding: '0.5rem', width: '10rem' }} type="text" id="name-textbox" placeholder='Name' name="name" value={dietData.name} onChange={handleInputs} />
        
        <label style={{ marginBottom: '0.5rem', marginTop: '1rem' }} htmlFor="type-dropdown">
            
        </label>
        <select
            style={{ padding: '0.5rem', width: '10rem' }}
            id="type-dropdown"
            name="type"
            onChange={handleInputs}
            value={dietData.type}
        >
        <option value="">Choose type:</option>
        <option value="weight gain">Weight Gain</option>
        <option value="weight loss">Weight Loss</option>

        </select>
        <br></br>
        <label style={{ marginBottom: '0.5rem' }} htmlFor="Ingred-textbox">
          
        </label>
        <input
          style={{ padding: '0.5rem', width: '10rem' }} 
          id="big-textbox"
          placeholder='Duration'
          name="duration"
          value={dietData.duration}
          onChange={handleInputs}/>
          <br></br>
        <label style={{ marginBottom: '0.5rem' }} htmlFor="Inst-textbox">
        
        </label>
        <textarea
          style={{ padding: '0.5rem', minHeight: '8rem' }}
          id="big-textbox"
          placeholder='Details'
          name="details"
          value={dietData.details}
          onChange={handleInputs}/>
        <br></br>
        <button
          style={{
            marginTop: '1rem',
            padding: '0.5rem 4rem',
            borderRadius: '1rem',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
          }}
          type="submit"
          onClick={ManageDietForm}
        >
          Add
        </button>
      </div>
      </form>
    </div>


    <div style={{ position: 'absolute', left:'68rem',bottom: '2rem', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
<h4 style={{ textAlign: 'left', marginLeft: '1.5rem' }}>Edit Diet:</h4>
      <form method="POST" id="editForm">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '2rem' }}>
      <label style={{ marginBottom: '0.5rem', marginTop: '-1.5rem'}} htmlFor="name-textbox">
        </label>
        <input style={{ padding: '0.5rem', width: '10rem' }} type="text" placeholder='Name' id="namee-textbox" name="name" value={editDietData.name} onChange={handleInputs2} />
        
        <label style={{ marginBottom: '0.5rem', marginTop: '1rem' }} htmlFor="type-dropdown">
        </label>
        <select
            style={{ padding: '0.5rem', width: '10rem' }}
            id="type-dropdown"
            name="type"
            onChange={handleInputs2}
            value={editDietData.type}
        >
        <option value="">Choose type:</option>
        <option value="weight gain">Weight Gain</option>
        <option value="weight loss">Weight Loss</option>

        </select>
        <br></br>
        <label style={{ marginBottom: '0.5rem' }} htmlFor="Ingred-textbox">
        </label>
        <input
          style={{ padding: '0.5rem', width: '10rem' }} 
          id="big-textbox"
          placeholder='Duration'
          name="duration"
          value={editDietData.duration}
          onChange={handleInputs2}/>
        <br></br>
        <label style={{ marginBottom: '0.5rem' }} htmlFor="Inst-textbox">
        </label>
        <textarea
          style={{ padding: '0.5rem', minHeight: '8rem' }}
          id="big-textbox"
          placeholder='Details'
          name="details"
          value={editDietData.details}
          onChange={handleInputs2}/>
        <br></br>
        <button
          style={{
            marginTop: '1rem',
            padding: '0.5rem 4rem',
            borderRadius: '1rem',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
          }}
          type="submit"
          onClick={EditDietForm}
        >
          Edit
        </button>
      </div>
      </form>
    </div>
    </div>
    <Footer/>
</>
  );
};

export default ManageDiet;
