import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "./UserNavbar";
import food from '../images/StarchFree.jpg'
import Footer from "./Footer";

const StarchFreeRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try{
      const result = await axios.get("/recipes5?type=starch free");
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
          <h1 className="recipes-header">Starch Free Recipes</h1>
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
          Starch-free dishes are those that do not contain starchy foods such as grains, potatoes, and legumes. These dishes are often preferred by people who are on a low-carb or ketogenic diet, or those with celiac disease or other gluten sensitivities.
          <br></br>
              <br></br>
When making starch-free dishes, it's important to avoid ingredients such as wheat, corn, rice, potatoes etc.
          </h4>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default StarchFreeRecipe;
