import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";

const ManageRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeData, setRecipeData] = useState({name:"", type:"", ingredients:"", instructions:""});
  const [editRecipeData, setEditRecipeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try{
      const result = await axios.get("/recipes6");
      setRecipes(result.data);
      setEditRecipeData(result.data);
        } catch (err)
        {
            console.log(err);
        }
    };

    fetchData();
  }, []);

  const handleDeleteRecipe = async (recipeId) => {
    window.alert(`Recipe deleted!`);
    try {
      await axios.delete(`/recipes7/${recipeId}`);
      const updatedRecipes = recipes.filter((recipe) => recipe._id !== recipeId);
      setRecipes(updatedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  
  const handleInputs  = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setRecipeData({ ...recipeData, [name]:value })
    }

    const handleInputs2  = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setEditRecipeData({ ...editRecipeData, [name]:value })
        }

  const ManageRecipeForm = async (e) => {
    e.preventDefault();

    const { name, type, ingredients, instructions } = recipeData;
    

    if (!name || !type || !ingredients || !instructions) {
        window.alert('Please enter all fields!');
        return;
    }


    

    const res = await fetch('/recipes8', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, type, ingredients, instructions })
    });

    const data = await res.json();

    if(!data) {
        alert("Recipe not added");
    } else {
        alert("Recipe Added!");
        setRecipeData({...recipeData, name:"", type:"", ingredients:"", instructions:""});
    }
   }

   const EditRecipeForm = async (e) => {
    e.preventDefault();

    const { name, type, ingredients, instructions } = editRecipeData;
    

    if (!name) {
        window.alert('Please enter name of the recipe!');
        return;
    }

    const res = await fetch(`/recipes9/${name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, ingredients, instructions })
      });

    const data = await res.json();

    if(!data) {
        alert("Recipe not edited");
    } else {
        alert("Recipe Edited!");
        setEditRecipeData([]);
    }
   }


  return (
    <>
    <AdminNavbar/>
    <div className="grey-page2">
<div className="recipes-container">
  <h1 className="recipes-header" style={{ marginTop: '1.5rem',marginBottom: '2.5rem'}}>Manage Recipes</h1>
  <ul className="recipes-list">
    {recipes.map((recipe) => (
      <li key={recipe._id} className="recipe">
        <h2 className="recipe-name">{recipe.name}</h2>
        <p className="recipe-type">
          <strong>Type:</strong> {recipe.type}
        </p>
        <p className="recipe-ingredients">
          <strong>Ingredients:</strong> {recipe.ingredients}
        </p>
        <p className="recipe-instructions">
          <strong>Instructions:</strong> {recipe.instructions}
        </p>
        <div className="recipe-actions">
          <button className="recipe-action-btn" onClick={() => handleDeleteRecipe(recipe._id)}>
            <FaTrashAlt />
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>
<div style={{ position: 'absolute', bottom: '-5rem', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '1.5rem' }}>
<h4 style={{ textAlign: 'left', marginLeft: '1rem' }}>Add Recipe:</h4>
      <form method="POST" id="activityForm">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '0.5rem' }}>
      <label style={{ marginBottom: '0.5rem'}} htmlFor="name-textbox">
          
        </label>
        <input style={{ padding: '0.5rem', width: '10rem', marginBottom: '0.5rem' }} type="text" id="name-textbox" placeholder="Name" name="name" value={recipeData.name} onChange={handleInputs} />
        
        <label style={{ marginBottom: '0.5rem', marginTop: '1rem' }} htmlFor="type-dropdown">
            
        </label>
        <select
            style={{ padding: '0.5rem', width: '10rem' }}
            id="type-dropdown"
            name="type"
            onChange={handleInputs}
            value={recipeData.type}
        >
        <option value="">Choose type:</option>
        <option value="sugar free">Sugar Free</option>
        <option value="carb free">Carb Free</option>
        <option value="protein">Protein</option>
        <option value="dairy">Dairy</option>
        <option value="starch free">Starch Free</option>
        </select>
        <br></br>
        <label style={{ marginBottom: '0.5rem' }} htmlFor="Ingred-textbox">
          
        </label>
        <textarea
          style={{ padding: '0.5rem', minHeight: '8rem' }}
          id="big-textbox"
          placeholder="Ingredients"
          name="ingredients"
          value={recipeData.ingredients}
          onChange={handleInputs}/>
        <br></br>
        <label style={{ marginBottom: '0.5rem' }} htmlFor="Inst-textbox">
          
        </label>
        <textarea
          style={{ padding: '0.5rem', minHeight: '8rem' }}
          id="big-textbox"
          placeholder="Instructions"
          name="instructions"
          value={recipeData.instructions}
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
          onClick={ManageRecipeForm}
        >
          Add
        </button>
      </div>
      </form>
    </div>


    <div style={{ position: 'absolute', left:'68rem',bottom: '-5rem', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
<h4 style={{ textAlign: 'left', marginLeft: '0.8rem' }}>Edit Recipe:</h4>
      <form method="POST" id="editForm">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '1rem' }}>
      <label style={{ marginBottom: '0.5rem'}} htmlFor="name-textbox">
          
        </label>
        <input style={{ padding: '0.5rem', width: '10rem', marginBottom: '0.5rem' }} type="text" id="namee-textbox" placeholder="Name" name="name" value={editRecipeData.name} onChange={handleInputs2} />
        
        <label style={{ marginBottom: '0.5rem', marginTop: '1rem' }} htmlFor="type-dropdown">
            
        </label>
        <select
            style={{ padding: '0.5rem', width: '10rem' }}
            id="type-dropdown"
            name="type"
            onChange={handleInputs2}
            value={editRecipeData.type}
        >
        <option value="">Choose type:</option>
        <option value="sugar free">Sugar Free</option>
        <option value="carb free">Carb Free</option>
        <option value="protein">Protein</option>
        <option value="dairy">Dairy</option>
        <option value="starch free">Starch Free</option>
        </select>
        <br></br>
        <label style={{ marginBottom: '0.5rem' }} htmlFor="Ingred-textbox">
        
        </label>
        <textarea
          style={{ padding: '0.5rem', minHeight: '8rem' }}
          id="big-textbox"
          placeholder="Ingredients"
          name="ingredients"
          value={editRecipeData.ingredients}
          onChange={handleInputs2}/>
        <br></br>
        <label style={{ marginBottom: '0.5rem' }} htmlFor="Inst-textbox">
        
        </label>
        <textarea
          style={{ padding: '0.5rem', minHeight: '8rem' }}
          id="big-textbox"
          placeholder="Instructions"
          name="instructions"
          value={editRecipeData.instructions}
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
          onClick={EditRecipeForm}
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

export default ManageRecipe;
