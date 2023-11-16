import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "./UserNavbar";
import food from '../images/StarchFree.jpg'
import Footer from "./Footer";

const StarchFreeRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.get("/recipes5?type=starch free");
        let t = result.data;
        t = t.map((obj) => {
          obj.isExpanded = false
          return obj
        })
        setRecipes(t);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

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



  return (
    <>
      <UserNavbar />
      <div id="recipe-parent">
        <div className="food-info">
          <img
            className="food-image"
            src={food}
            alt="Sugar-free food"
          />

          <div>

            <h2 className="food-text2">About</h2>
            <p className="food-text">
              Starch-free dishes are those that do not contain starchy foods such as grains, potatoes, and legumes. These dishes are often preferred by people who are on a low-carb or ketogenic diet, or those with celiac disease or other gluten sensitivities.
              When making starch-free dishes, it's important to avoid ingredients such as wheat, corn, rice, potatoes etc.
            </p>
          </div>

        </div>


        <div className="recipes">
          <h1 className="recipes-header">Starch Free Recipes</h1>
          <ul className="recipes-list">
            {recipes.map((recipe, i) => (
              <div>

                <li key={recipe._id} className="recipe" onClick={() => toggleRecipe(i)}>
                  <h2 className="recipe-name">{recipe.name}</h2>
                </li>

                {recipe.isExpanded && (

                  <div id="recipe-details">
                    <p className="recipe-ingredients">
                      <strong>Ingredients:</strong> <br />{recipe.ingredients}
                    </p>
                    <br />
                    <p className="recipe-instructions">
                      <strong>Instructions:</strong> <br />{recipe.instructions}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </ul>
        </div>


      </div>
      <Footer />
    </>
  );
};

export default StarchFreeRecipe;
