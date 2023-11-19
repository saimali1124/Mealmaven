import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";

const ManageDiet = () => {
  const [diet, setDiet] = useState([]);
  const [dietData, setDietData] = useState({ name: "", type: "", duration: "", details: "" });
  const [editDietData, setEditDietData] = useState([]);
  const [displayAddDiet, setDisplayAddDiet] = useState(false)
  const [displayEditDiet, setDisplayEditDiet] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/diet");
        let t = result.data;
        t = t.map((obj) => {
          obj.isExpanded = false
          return obj
        })
        setDiet(t);
        setEditDietData(result.data);
      } catch (err) {
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


  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDietData({ ...dietData, [name]: value })
  }

  const handleInputs2 = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEditDietData({ ...editDietData, [name]: value })
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

    if (!data) {
      alert("Diet not added");
    } else {
      setDisplayAddDiet(false)
      alert("Diet Added!");
      setDietData({ ...dietData, name: "", type: "", duration: "", details: "" });
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

    if (!data) {
      alert("Diet not edited");
    } else {
      setDisplayEditDiet(false);
      alert("Diet Edited!");
      setEditDietData([]);
    }
  }

  const toggleDiet = (index) => {
    setDiet((prevDiets) => {

      return prevDiets.map((diet, i) => {
        if (i === index) {
          return { ...diet, isExpanded: !diet.isExpanded };
        } else {
          return diet;
        }
      });
    });

  }

  const onEditDietClick = (index) => {
    setEditDietData(diet[index])
    setDisplayEditDiet(true)
  }



  return (
    <>
      <AdminNavbar />
      <div className='grey-page'>

        {displayAddDiet &&
          <div className="modal-overlay" onClick={() => setDisplayAddDiet(false)}>
            <div id="add-diet" onClick={(event) => event.stopPropagation()}>

              <h4 >Add Diet</h4>
              <form method="POST" id="activityForm">

                <label htmlFor="name-textbox">
                  Name
                  <input type="text" placeholder='Name' name="John Smith" value={dietData.name} onChange={handleInputs} />
                </label>

                <label htmlFor="type-dropdown">
                  Plan Type
                  <select
                    name="type"
                    onChange={handleInputs}
                    value={dietData.type}
                  >
                    <option value="">Choose Type</option>
                    <option value="weight gain">Weight Gain</option>
                    <option value="weight loss">Weight Loss</option>

                  </select>
                </label>

                <label htmlFor="Ingred-textbox">
                  Duration
                  <input
                    placeholder='2 month/week'
                    name="duration"
                    value={dietData.duration}
                    onChange={handleInputs} />
                </label>

                <label htmlFor="Inst-textbox">
                  Details
                  <textarea
                    placeholder='Detail in bullets points.'
                    name="details"
                    value={dietData.details}
                    onChange={handleInputs} />
                </label>

                <button

                  type="submit"
                  onClick={ManageDietForm}
                >
                  Add
                </button>
              </form>

            </div>

          </div>
        }

        <div className="recipes-container">

          <h1 className="recipes-header" style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>Manage Diet Plans</h1>

          <button id="add-diet-button" onClick={() => setDisplayAddDiet(true)}> Add Diet </button>
          {console.log(diet.length)}
          <ul className="recipes-list">
            {
              diet.map((dietplan, i) => (

                <div>

                  <li key={dietplan._id} className="recipe dietRow" onClick={() => toggleDiet(i)}>
                    <h2 className="recipe-name" >{dietplan.name}</h2>

                    <div className="recipe-actions" onClick={(event) => event.stopPropagation()}>
                      <button className="recipe-action-btn" onClick={() => handleDeleteDiet(dietplan._id)}>
                        <FaTrashAlt />
                      </button>
                      <button className="recipe-action-btn" onClick={() => onEditDietClick(i)}>
                        <FaEdit />
                      </button>
                    </div>

                  </li>



                  {dietplan.isExpanded && (

                    <div id="recipe-details">
                      <p className="recipe-type">
                        <strong>Type:</strong> <br />{dietplan.type}
                      </p>
                      <p className="recipe-duration">
                        <strong>Duration:</strong><br /> {dietplan.duration}
                      </p>
                      <p className="recipe-details">
                        <strong>Details:</strong> <br />{dietplan.details}
                      </p>
                    </div>
                  )}
                </div>

              ))}
          </ul>
        </div>


        {displayEditDiet &&
          <div className="modal-overlay" onClick={() => setDisplayEditDiet(false)}>
            <div id="add-diet" onClick={(event) => event.stopPropagation()}>

              <h4 >Edit Diet</h4>
              <form method="POST" id="activityForm">

                <label htmlFor="name-textbox">
                  Name
                  <input type="text" placeholder='Name' name="name" value={editDietData.name} onChange={handleInputs2} />
                </label>

                <label htmlFor="type-dropdown">
                  Plan Type
                  <select
                    name="type"
                    onChange={handleInputs2}
                    value={editDietData.type}
                  >
                    <option value="">Choose type:</option>
                    <option value="weight gain">Weight Gain</option>
                    <option value="weight loss">Weight Loss</option>

                  </select>
                </label>

                <label htmlFor="Ingred-textbox">
                  Duration
                  <input
                    placeholder='Duration'
                    name="duration"
                    value={editDietData.duration}
                    onChange={handleInputs2} />
                </label>

                <label htmlFor="Inst-textbox">
                  Details
                  <textarea
                    placeholder='Details'
                    name="details"
                    value={editDietData.details}
                    onChange={handleInputs2} />
                </label>

                <button

                  type="submit"
                  onClick={EditDietForm}
                >
                  Submit
                </button>
              </form>

            </div>

          </div>
        }

      </div>
      <Footer />
    </>
  );
};

export default ManageDiet;
