import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "./UserNavbar";
import food from '../images/Protein.jpg'
import Footer from "./Footer";

const ProteinRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try{
      const result = await axios.get("/recipes3?type=protein");
      setRecipes(result.data);
        } catch (err)
        {
            console.log(err);
        }
    };

    fetchData();
  }, []);

  return (
    <>
      <UserNavbar/>
      <div className="grey-page">
      <div className="recipe-container">
        <div className="recipes">
          <h1 className="recipes-header">Protein Recipes</h1>
          <ul className="recipes-list">
            {recipes.map((recipe) => (
              <li key={recipe._id} className="recipe">
                <h2 className="recipe-name">{recipe.name}</h2>
                <p className="recipe-ingredients">
                  <strong>Ingredients:</strong> {recipe.ingredients}
                </p>
                <p className="recipe-instructions">
                  <strong>Instructions:</strong> {recipe.instructions}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="food-info">
        <h2 className="food-text2">About:</h2>
          <img
            className="food-image"
            src={food}
            alt="Sugar-free food"
          />
          <h4 className="food-text">
          Proteins are essential macronutrients that play a crucial role in building, repairing, and maintaining tissues in the human body
          <br></br>
              <br></br>
              Protein dishes are meals that contain a significant amount of protein, either from animal sources such as meat, poultry, and fish.
          </h4>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProteinRecipe;
