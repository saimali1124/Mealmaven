
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "./UserNavbar";
import food from '../images/SugarFree.jpg'
import Footer from "./Footer";

const SugarFreeRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const result = await axios.get("/recipes?type=sugar free");
          setRecipes(result.data);
        } catch (err) {
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
          <h1 className="recipes-header">Sugar Free Recipes</h1>
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
          Sugar-free dishes are those that contain no added sugars or sweeteners. This can be beneficial for individuals who are looking to reduce their sugar intake for health reasons.
          <br></br>
              <br></br>
          To make sugar-free dishes, it's important to avoid using sugar and other sweeteners such as honey, maple syrup, agave nectar etc.
          </h4>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default SugarFreeRecipe;

