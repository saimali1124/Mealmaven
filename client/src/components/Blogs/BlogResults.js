import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';
import UserNavbar from "../UserNavbar";
import { useLocation } from "react-router-dom";
import SearchBar from './SearchBar';



import Footer from "../Footer";

function BlogResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/search?query=${query}&category=${category}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  });


      //  articles by category
      const articlesByCategory = searchResults.reduce((acc, article) => {
        acc[article.category] = acc[article.category] || [];
        acc[article.category].push(article);
        
        return acc;
      }, {});

      if(searchResults.length===0)
      {
        return (
            <>
            <div>
              <UserNavbar /> 
              <SearchBar category={"abc"} />

              <h1 className='search-category'> No Results Found </h1>
<h2 className="article-title"> The page you requested could not be found. Try refining your search, or use the  blogs navigation above to locate the post.!!</h2>

              </div>
                            <Footer /> 
                            </>

        );

      }
      else
      {

      return (
        <div>
          <UserNavbar /> 
          <SearchBar category={"abc"} />

          <h1 className='search-category'> Search Results</h1>
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
      
                {/* <button > More in {category} </button> */}
                </Link>
              </div>     
              )}
            </div>
          ))}
              <Footer /> 
      
        </div>
        
      );
              }
      };
export default BlogResults;
