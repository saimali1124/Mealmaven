import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "./UserNavbar";
import food from '../images/CarbFree.jpg'
import Footer from "./Footer";

const CarbFreeRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try{
      const result = await axios.get("/recipes2?type=carb free");
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
          <h1 className="recipes-header">Carb Free Recipes</h1>
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
          Carb-free dishes are those that contain no or very minimal amounts of carbohydrates. These dishes are often preferred by people who follow a ketogenic or low-carb diet to achieve weight loss or manage certain health conditions like diabetes.
              <br></br>
              <br></br>
When making carb-free dishes, it's important to avoid all sources of carbohydrates, including grains, starchy vegetables.
          </h4>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default CarbFreeRecipe;
