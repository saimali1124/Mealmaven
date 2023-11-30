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
    const [isLoading, setIsLoading] = useState(true);




//delete article
    const handleDeleteClick = async (articleId) => {
        try {
            const response = await fetch(`/deletearticle/${articleId}`,{method: "DELETE"});

            if (response.ok) {
                window.alert("Article Deleted")
                setArticles(articles.filter(article => article._id !== articleId));

            } else {
                window.alert("Article not Deleted")
              // return; 
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
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
    if (email) { // 
      setIsLoading(true); //

      const fetchSearchResults = async () => {
        try {
          const response = await fetch(`/blogsByEmail/${email}`);
          if (response.ok) {
            const data = await response.json();
            setArticles(data);
            
          } else {
            console.error('Error fetching articles');
          }
        } catch (error) {
          console.error('Error fetching article:', error);
        }
        finally {
          setIsLoading(false); 
  }
      };
  
      fetchSearchResults();
    }
  }, [email]); 

  return (
    <>
      <div>
        <AdminNavbar /> 
        <h1 className='adminblog-mainheading'>{name}'s Blogs</h1>
        <div className="blog-container">
          {isLoading ? (
            <p></p> 
          ) : articles.length > 0 ? (
            articles.map((article) => (
              <div key={article._id}>
              <div className='blog-box'>
                <img src={`/image/${article.imagePath.replace(/\\/g, '/').replace('uploads/', '')}`} alt={article.title} />
              </div>
              <h3 className='article-title'>{article.title}</h3>
              <p className='article-category'>Category: {article.category}</p> 
              <div className='article-actions'>
      <Link to={`/adminarticle/${article._id}`} className='read-button'>
        Read
      </Link>
      <button className="delete-button" onClick={() => handleDeleteClick(article._id)}>
        Delete
      </button>
    </div>
            </div>        
  
            ))

          ) : (
            <div> 
              <h1 className="search-category">No blogs found.</h1>
              <h2 className="article-title"> Start by creating a new blog.</h2>
            </div>
          )}
        </div>
      </div>
      <Footer /> 
    </>
  );
  
 
  }
        
export default AdminBlogs;
