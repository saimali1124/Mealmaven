import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from "../UserNavbar";

import Footer from "../Footer";
import SearchBar from './SearchBar';
import './blogs.css'





function Blogs() {

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/getblogs'); // Adjust the URL as necessary
        if (!response.ok) {
          window.alert("Blogs not found")
        }
        const data = await response.json();
        setArticles(data);
      } 
      catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);



  
    // grouping articles by category
    const articlesByCategory = articles.reduce((acc, article) => {
      acc[article.category] = acc[article.category] || [];
      if (acc[article.category].length < 3) {
        acc[article.category].push(article);
      }
      return acc;
    }, {});
   
  
  
return (
  <div>
    <UserNavbar /> 
    <SearchBar/>
    <h1 className='blog-mainheading'> Our Blogs</h1>
    {Object.keys(articlesByCategory).map((category) => (
      <div key={category}>
        <h2 className='blog-category'>{category}</h2>
        <div className="blog-container">
          {articlesByCategory[category].map((article) => (
            <div key={article._id} >
              <div className='blog-box'>

              <img src={article.imageData} alt={article.title} />
              </div>
              
              <h3 className='article-title'>{article.title}</h3>
              <Link to={`/article/${article._id}`} className='view-article'>
                <h2>Read Here</h2>
              </Link>
            </div>
          ))}
        </div>
        {articlesByCategory[category].length > 0 && (
          // <Link to={`/category/${category}`} className='more-category'>
          //   <h2>   More in {category}  </h2>
          // </Link>
          <div className="button-container">
          <Link to={`/blogscategory/${category}`} >

          <button > More in {category} </button>
          </Link>
        </div>     
        )}
      </div>
    ))}
        <Footer /> 

  </div>
  
);

};



export default Blogs;


