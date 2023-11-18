import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from "./UserNavbar";
import img1 from '../images/blog1.jpeg'
import img2 from '../images/blog2.jpg'
import img3 from '../images/Dairy.jpg'
import img4 from '../images/Protein.jpg'
import Footer from "./Footer";
function LifeStyleBlogs() {

    const [articles, setArticles] = useState([]);
  
    useEffect(() => {
      const sampleArticles = [
        {
          id: 1,
          title: 'The Minimum Effective Dose',
          content: 'This is the content of Sample Article 1.',
          imageUrl: img1,
          category: 'lifestyle'
        },
        {
          id: 2,
          title: 'Breaking Muscle',
          content: 'This is the content of Sample Article 2.',
          imageUrl: img2,
          category: 'lifestyle'
  
        },
        {
          id: 3,
          title: 'Well + Good ',
          content: 'This is the content of Sample Article 2.',
          imageUrl: img3,
          category: 'lifestyle'
  
        },
        {
          id: 4,
          title: 'Sample Article 3',
          content: 'This is the content of Sample Article 2.',
          imageUrl: img4,
          category: 'lifestyle'
  
        },
        {
          id: 5,
          title: 'Well + Good ',
          content: 'This is the content of Sample Article 2.',
          imageUrl: img1,
          category: 'lifestyle'
  
        }, {
          id: 6,
          title: 'Well + Good ',
          content: 'This is the content of Sample Article 2.',
          imageUrl: img2,
          category: 'lifestyle'
  
        },
        {
          id: 7,
          title: 'Well + Good ',
          content: 'This is the content of Sample Article 2.',
          imageUrl: img2,
          category: 'lifestyle'
  
        },
        {
          id: 8,
          title: 'Well + Good ',
          content: 'This is the content of Sample Article 2.',
          imageUrl: img1,
          category: 'lifestyle'
  
        },
        {
          id: 9,
          title: 'Well + Good ',
          content: 'This is the content of Sample Article 2.',
          imageUrl: img3,
          category: 'food'
  
        },
        {
          id: 10,
          title: 'Well + Good ',
          content: 'This is the content of Sample Article 2.',
          imageUrl: img1,
          category: 'food'
  
        }
  
  
      ];
  
      setArticles(sampleArticles);
    }, []);
    const articlesByCategory = articles.reduce((acc, article) => {
        acc[article.category] = acc[article.category] || [];
        acc[article.category].push(article);
        
        return acc;
      }, {});
    
      // Get blogs of the "lifestyle" category only
      const lifestyleArticles = articlesByCategory['lifestyle'] || [];
    
      return (
        <div>
          <UserNavbar /> 
          <div key="lifestyle">
            <h2 className='blog-category'>Lifestyle</h2>
            <div className="blog-container">
              {lifestyleArticles.map((article) => (
                <div key={article.id}>
                  <div className='blog-box'>
                    <img src={article.imageUrl} alt={article.title} />
                  </div>
                  <h3 className='article-title'>{article.title}</h3>
                  <Link to={`/article/${article.id}`} className='view-article'>
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
  
  
  