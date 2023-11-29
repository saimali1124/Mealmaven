
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "./UserNavbar";
import food from '../images/Protein.jpg'
import Footer from "./Footer";
import html2pdf from "html2pdf.js";
const ProteinRecipe = () => {
const downloadRecipe = (recipe) => {
  const recipeText = `<h2>Recipe Name:</h2><p>${recipe.name}</p><h2>Ingredients:</h2><p>${recipe.ingredients}</p><h2>Instructions:</h2><p>${recipe.instructions}</p>`;
  const pdfElement = document.createElement("div");
  pdfElement.innerHTML = recipeText;
  html2pdf(pdfElement, {
    margin: 10,
    filename: `${recipe.name}_recipe.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  });
};
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.get("/recipes3?type=protein");
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
          <img className="food-image" src={food} alt="Sugar-free food" />

          <div>
            <h2 className="food-text2">About</h2>
            <p className="food-text">
              Proteins are essential macronutrients that play a crucial role in
              building, repairing, and maintaining tissues in the human body
              Protein dishes are meals that contain a significant amount of
              protein, either from animal sources such as meat, poultry, and
              fish.
            </p>
          </div>
        </div>

        <div className="recipes">
          <h1 className="recipes-header">Starch Free Recipes</h1>
          <ul className="recipes-list">
            {recipes.map((recipe, i) => (
              <div>
                <li
                  key={recipe._id}
                  className="recipe"
                  onClick={() => toggleRecipe(i)}
                >
                  <h2 className="recipe-name">{recipe.name}</h2>
                </li>

                {recipe.isExpanded && (
                  <div id="recipe-details">
                    <p className="recipe-ingredients">
                      <strong>Ingredients:</strong> <br />
                      {recipe.ingredients}
                    </p>
                    <br />
                    <p className="recipe-instructions">
                      <strong>Instructions:</strong> <br />
                      {recipe.instructions}
                    </p>
                    <button onClick={() => downloadRecipe(recipe)}>
                      Download Recipe
                    </button>
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

export default ProteinRecipe;

