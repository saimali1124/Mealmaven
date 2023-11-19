import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import SuperAdminNavbar from "./SuperAdminNavbar";
import SuperAdminSideBar from "./SuperAdminSideBar/SuperAdminSideBar";
import Footer from "./Footer";

const ManageRecipe = () => {
  const [displayAddRecipe, setDisplayAddRecipe] = useState(false)
  const [displayEditRecipe, setDisplayEditRecipe] = useState(false)
  const [recipes, setRecipes] = useState([]);
  const [recipeData, setRecipeData] = useState({
    name: "",
    type: "",
    ingredients: "",
    instructions: "",
  });
  const [editRecipeData, setEditRecipeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/recipes6");
        let t = result.data;
        t = t.map((obj) => {
          obj.isExpanded = false
          return obj
        })
        setRecipes(t);
        setEditRecipeData(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleDeleteRecipe = async (recipeId) => {
    window.alert(`Recipe deleted!`);
    try {
      await axios.delete(`/recipes7/${recipeId}`);
      const updatedRecipes = recipes.filter(
        (recipe) => recipe._id !== recipeId
      );
      setRecipes(updatedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleInputs2 = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEditRecipeData({ ...editRecipeData, [name]: value });
  };

  const ManageRecipeForm = async (e) => {
    e.preventDefault();

    const { name, type, ingredients, instructions } = recipeData;

    if (!name || !type || !ingredients || !instructions) {
      window.alert("Please enter all fields!");
      return;
    }

    const res = await fetch("/recipes8", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, type, ingredients, instructions }),
    });

    const data = await res.json();

    if (!data) {
      alert("Recipe not added");
    } else {
      setDisplayAddRecipe(false)
      setRecipeData({})
      alert("Recipe Added!");
      setRecipeData({
        ...recipeData,
        name: "",
        type: "",
        ingredients: "",
        instructions: "",
      });
    }
  };

  const EditRecipeForm = async (e) => {
    e.preventDefault();

    const { name, type, ingredients, instructions } = editRecipeData;
    console.log(editRecipeData)
    if (!name) {
      window.alert("Please enter name of the recipe!");
      return;
    }

    const res = await fetch(`/recipes9/${name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, ingredients, instructions }),
    });

    const data = await res.json();

    if (!data) {
      alert("Recipe not edited");
    } else {
      setDisplayEditRecipe(false)
      alert("Recipe Edited!");
      setEditRecipeData([]);
    }
  };


  const toggleRecipe = (index) => {
    setRecipes((prevRecipes) => {

      return prevRecipes.map((recipe, i) => {
        if (i === index) {
          return { ...recipe, isExpanded: !recipe.isExpanded };
        } else {
          return recipe;
        }
      });
    });

  }

  const onEditRecipeClick = (index) => {
    setEditRecipeData(recipes[index])
    setDisplayEditRecipe(true)
  }

  return (
    <>
      <SuperAdminNavbar />
      <div className="container-box">
        <SuperAdminSideBar />


        <div className='grey-page'>

          {displayAddRecipe &&
            <div className="modal-overlay" onClick={() => { setDisplayAddRecipe(false); setRecipeData({}) }}>
              <div id="add-diet" onClick={(event) => event.stopPropagation()}>

                <h4 >Add Recipe</h4>
                <form method="POST" id="activityForm">

                  <label htmlFor="name-textbox">
                    Recipe Name
                    <input type="text" placeholder='Pizza' name="name" value={recipeData.name} onChange={handleInputs} />
                  </label>

                  <label htmlFor="type-dropdown">
                    Recipe Type
                    <select
                      name="type"
                      onChange={handleInputs}
                      value={recipeData.type}
                    >
                      <option value="">Choose Type</option>
                      <option value="sugar free">Sugar Free</option>
                      <option value="carb free">Carb Free</option>
                      <option value="protein">Protein</option>
                      <option value="dairy">Dairy</option>
                      <option value="starch free">Starch Free</option>
                    </select>
                  </label>

                  <label htmlFor="Inst-textbox">
                    Ingredients
                    <textarea
                      placeholder="Ingredients"
                      name="ingredients"
                      value={recipeData.ingredients}
                      onChange={handleInputs}
                    />
                  </label>

                  <label htmlFor="Inst-textbox">
                    Instructions
                    <textarea
                      placeholder="Instructions"
                      name="instructions"
                      value={recipeData.instructions}
                      onChange={handleInputs}
                    />
                  </label>

                  <button

                    type="submit"
                    onClick={ManageRecipeForm}
                  >
                    Add
                  </button>
                </form>

              </div>

            </div>
          }

          <div className="recipes-container">

            <h1 className="recipes-header" style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>Manage Recipes</h1>

            <button id="add-diet-button" onClick={() => setDisplayAddRecipe(true)}> Add Recipe </button>

            <ul className="recipes-list">
              {
                recipes.map((recipe, i) => (

                  <div>

                    <li key={recipe._id} className="recipe dietRow" onClick={() => toggleRecipe(i)}>
                      <h2 className="recipe-name" >{recipe.name}</h2>

                      <div className="recipe-actions" onClick={(event) => event.stopPropagation()}>
                        <button className="recipe-action-btn" onClick={() => handleDeleteRecipe(recipe._id)}>
                          <FaTrashAlt />
                        </button>
                        <button className="recipe-action-btn" onClick={() => onEditRecipeClick(i)}>
                          <FaEdit />
                        </button>
                      </div>

                    </li>



                    {recipe.isExpanded && (

                      <div id="recipe-details">
                        <p className="recipe-type">
                          <strong>Type:</strong> <br />{recipe.type}
                        </p>
                        <p className="recipe-duration">
                          <strong>Ingredients:</strong><br /> {recipe.ingredients}
                        </p>
                        <p className="recipe-details">
                          <strong>Instructions:</strong> <br />{recipe.instructions}
                        </p>
                      </div>
                    )}
                  </div>

                ))}
            </ul>
          </div>


          {displayEditRecipe &&
            <div className="modal-overlay" onClick={() => setDisplayEditRecipe(false)}>
              <div id="add-diet" onClick={(event) => event.stopPropagation()}>

                <h4 >Edit Recipe</h4>
                <form method="POST" id="activityForm">

                  <label htmlFor="name-textbox">
                    Recipe Name
                    <input type="text" placeholder='Name' name="name" value={editRecipeData.name} onChange={handleInputs2} />
                  </label>

                  <label htmlFor="type-dropdown">
                    Recipe Type
                    <select
                      name="type"
                      onChange={handleInputs2}
                      value={editRecipeData.type}
                    >
                      <option value="">Choose Type</option>
                      <option value="sugar free">Sugar Free</option>
                      <option value="carb free">Carb Free</option>
                      <option value="protein">Protein</option>
                      <option value="dairy">Dairy</option>
                      <option value="starch free">Starch Free</option>
                    </select>
                  </label>

                  <label htmlFor="Inst-textbox">
                    Ingredients
                    <textarea
                      placeholder="Ingredients"
                      name="ingredients"
                      value={editRecipeData.ingredients}
                      onChange={handleInputs2}
                    />
                  </label>

                  <label htmlFor="Inst-textbox">
                    Instructions
                    <textarea
                      placeholder="Instructions"
                      name="instructions"
                      value={editRecipeData.instructions}
                      onChange={handleInputs2}
                    />
                  </label>

                  <button

                    type="submit"
                    onClick={EditRecipeForm}
                  >
                    Submit
                  </button>
                </form>


              </div>

            </div>
          }

        </div>

      </div>
      <Footer />
    </>
  );
};

export default ManageRecipe;
