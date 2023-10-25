import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "./UserNavbar";
import food from '../images/Dairy.jpg'
import Footer from "./Footer";

const DairyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try{
      const result = await axios.get("/recipes4?type=dairy");
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
          <h1 className="recipes-header">Dairy Recipes</h1>
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
          Dairy products are a rich source of calcium, vitamin D, and other essential nutrients that are important for maintaining healthy bones and teeth.
          <br></br>
              <br></br>
              Dairy recipes are meals that incorporate dairy products such as milk, cheese, and yogurt into their ingredients.
          </h4>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default DairyRecipes;
