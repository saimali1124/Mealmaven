import React from 'react'
import { useState } from 'react';
import AdminNavbar from "../AdminNavbar";
import Footer from "../Footer";
import { NavLink, useNavigate } from 'react-router-dom';

const BlogInputForm = () => {
  // State variables to store input values
  const [articleName, setArticleName] = useState('');
  const [articleCategory, setArticleCategory] = useState('');
  const [articleText, setArticleText] = useState('');
  const [articleImage, setArticleImage] = useState(null);


  const handleImageChange = (e) => {

    const file = e.target.files[0];
   setArticleImage(file)
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', articleName);
    formData.append('category', articleCategory);
    formData.append('content', articleText);
    formData.append('image', articleImage); // Append the file directly
  
   
    try {
      const response = await fetch('/uploadblog', { // Adjust URL as needed
        method: 'POST',
        body: formData, // Send formData
      });
      if(response.status===201)
      {
        window.alert("success")

      }
      else{
        window.alert("no success")

      }
  
    } catch (error) {
      window.alert("error uploading blog")
    }
  };
  

  return (
    <>
    <AdminNavbar/>


<h2 className='bloginput'>Blog</h2>

    <div className="article-form-container">
    <form onSubmit={handleSubmit}>
        <label>
        Title:
        </label>

          <input className='forminput'
            type="text"
            value={articleName}
            onChange={(e) => setArticleName(e.target.value)}
            placeholder="Enter the article title"
          />


        <label>
          Category:
          <select
            value={articleCategory}
            className='formcategory'
            onChange={(e) => setArticleCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="fitness">Fitness</option>
            <option value="food">Food</option>
            <option value="lifestyle">LifeStyle</option>
          </select>
        </label>

        <label>
           Content:
          <textarea
            value={articleText}
            className='formtext'
            onChange={(e) => {
              const text = e.target.value;
              const words = text.split(' ');
              if (words.length <= 1000) {
                setArticleText(text);
              }
            }}
            placeholder="Enter the article content"
          />
        </label>
        <label>
            Image:
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              // value={articleImage}
              name="image"
              onChange={handleImageChange}
            />
          </label>

        <button className='formbutton' type="submit">Submit</button>

      </form>
    </div>
    <Footer /> 

    </>

  );
};


export default BlogInputForm;
