import React from 'react'
import { useState,useEffect } from 'react';
import AdminNavbar from "../AdminNavbar";
import Footer from "../Footer";
import './blogs.css'
import { Link } from 'react-router-dom';




const AdminBlogs =  () => {

    const [articles, setArticles] = useState([]);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);


//delete article
    const handleDeleteClick = async (articleId) => {
        try {
            const response = await fetch(`/deletearticle/${articleId}`,{method: "DELETE"});

            if (response.ok) {
                window.alert("Deleted")
            } else {
                window.alert("Not Deleted")
              // return; 
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
            // return; 
          }
    }
        

        
      
    



  //get admin email
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/AdminHome');
        if (response.ok) {
          const adminData = await response.json();
          setEmail(adminData.email)
          setName(adminData.name)
          
          
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  //get all blogs
  useEffect(() => {
    const fetchSearchResults = async () => {
        try {
            const response = await fetch(`/blogsByEmail/${email}`);
            if (!response.ok) {
              // window.alert('Article not found');
            }
            const data = await response.json();
            setArticles(data);
          } catch (error) {
            console.error('Error fetching article:', error);
          }
        };

    fetchSearchResults();
  });

  const articlesByCategory = articles.reduce((acc, article) => {
    acc[article.category] = acc[article.category] || [];
      acc[article.category].push(article);
    
    return acc;
  }, {});




  return (
    <div>
      <AdminNavbar /> 
      <h1 className='adminblog-mainheading'> {name} 's Blogs</h1>
      {Object.keys(articlesByCategory).map((category) => (
        <div key={category}>
          <h2 className='blog-category'>{category}</h2>
          <div className="blog-container">
            {articlesByCategory[category].map((article) => (
              <div key={article._id} >
                <div className='blog-box'>
  
                <img src={`/image/${article.imagePath.replace(/\\/g, '/').replace('uploads/', '')}`} alt={article.title} />
                </div>
                
                <h3 className='article-title'>{article.title}</h3>
                <Link to={`/article/${article._id}`} className='view-article' >
                  <h2>Read </h2>
                </Link>



                <div>
      <a
        href="#"
        className="view-article"
        onClick={() => handleDeleteClick(article._id)}
      >
        <h2>Delete</h2>
      </a>
    </div>

                
                
              </div>
            ))}
          </div>
         
        </div>
      ))}
          <Footer /> 
  
    </div>
    
  );
  
  };
export default AdminBlogs;
