import React from 'react'
import { useState } from 'react';
import AdminNavbar from "../AdminNavbar";
import Footer from "../Footer";
import {  useNavigate } from 'react-router-dom';



const BlogInputForm = () => {
  const history = useNavigate();

  const [articleName, setArticleName] = useState('');
  const [articleCategory, setArticleCategory] = useState('');
  const [articleText, setArticleText] = useState('');
  const [articleImage, setArticleImage] = useState(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (!file) {
      return; 
    }
  
    const maxSize = 2 * 1024 * 1024; 
    if (file.size > maxSize) {
      window.alert("File size should be less than 2MB");
      e.target.value = ''; 

      return;
    }
  
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
      window.alert("Invalid file type. Only JPG, JPEG, and PNG files are allowed.");
      e.target.value = ''; 

      return;
    }
  
    setArticleImage(file);
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!articleName || !articleText || !articleCategory || !articleImage) {
      window.alert('Please enter all fields!');
      return;
  }
  if (articleText.length > 1000) {
    window.alert('Article text must be less than 500 words!');
    return;
} 
    const formData = new FormData();

    try {
      const userResponse = await fetch('/AdminHome');
      if (userResponse.ok) {
        const adminData = await userResponse.json();
        formData.append('email', adminData.email);
        formData.append('author', adminData.name);
      } else {
        console.error('Failed to fetch user data');
        // return; 
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // return; 
    }

    // Append other form data
    formData.append('image', articleImage);
    formData.append('title', articleName);
    formData.append('category', articleCategory);
    formData.append('content', articleText);

    try {
      const blogResponse = await fetch('/uploadblog', {
        method: 'POST',
        body: formData,
      });

      if (blogResponse.ok) {
        window.alert("Blog uploaded successfully");
        history("/ViewBlogs");

        console.log('Blog uploaded successfully');
      } else {
        console.error('Failed to upload blog');
        console.log('Blog not uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading blog:', error);
    }
};



  return (
    <>
    <AdminNavbar/>
    <div className='grey-page'>


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
            <option value="Fitness">Fitness</option>
            <option value="Food">Food</option>
            <option value="Lifestyle">LifeStyle</option>
          </select>
        </label>

        <label>
           Content:
          <textarea
            value={articleText}
            className='formtext'
            onChange={(e) => {
              const text = e.target.value;
              setArticleText(text);
              
            }}
            placeholder="Enter the article content"
          />
        </label>
        <label>
            Image:
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              name="image"
              onChange={handleImageChange}
            />
          </label>

        <button className='formbutton' type="submit">Submit</button>

      </form>
    </div>
    </div>
    <Footer /> 
      
    </>

  );
};


export default BlogInputForm;
