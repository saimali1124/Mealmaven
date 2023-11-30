import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from "../UserNavbar";
import SearchBar from './SearchBar';
import Footer from "../Footer";
function LifeStyleBlogs() {

   
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/getblogs');
        const data = await response.json();
        setArticles(data);
        console.log(data); 

      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);
  const articlesByCategory = articles.reduce((acc, article) => {
    acc[article.category] = acc[article.category] || [];
    acc[article.category].push(article);
    
    return acc;
  }, {});

    
      const lifestyleArticles = articlesByCategory['Lifestyle'] || [];
    
      return (
        <div>
          <UserNavbar /> 
          <SearchBar category="Lifestyle" />

          <div key="lifestyle">
            <h2 className='blog-category'>Lifestyle</h2>
            <div className="blog-container">
              {lifestyleArticles.map((article) => (
                <div key={article._id}>
                  <div className='blog-box'>
                  <img
              src={`/image/${article.imagePath.replace(/\\/g, '/').replace('uploads/', '')}`}
              alt={article.title}
              loading="lazy" 
            />                  </div>
                  <h3 className='article-title'>{article.title}</h3>
                  <Link to={`/article/${article._id}`} className='view-article'>
                    <h2>Read Here</h2>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <Footer /> 
        </div>
      );
    };
    
  
  
  export default LifeStyleBlogs;
  
  
  