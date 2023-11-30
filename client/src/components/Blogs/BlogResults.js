import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    setIsLoading(true); // 

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/search?query=${query}&category=${category}`);
        setSearchResults(response.data);
        setIsLoading(false); // 

      } catch (error) {
        console.error("Error fetching search results:", error);
        setIsLoading(false); // 

      }
    };

    fetchSearchResults();
  }, [query, category]);




 
  if (isLoading) {
    return ; 
  }

  else if (searchResults.length === 0) {
    return (
      <>
        <UserNavbar />
        <SearchBar category={"abc"} />
        <h1 className='search-category'> No Results Found </h1>
        <h2 className="article-title"> Try refining your search, or use the blogs navigation above to locate the post.</h2>
        <Footer />
      </>
    );
  }

  return (
    <div>
      <UserNavbar />
      <SearchBar category={"abc"} />
      <h1 className='search-category'> Search Results</h1>
      <div className="blog-container">
        {searchResults.map((article) => (
          <div key={article._id} >
          <div className='blog-box'>
            <img
              src={`/image/${article.imagePath.replace(/\\/g, '/').replace('uploads/', '')}`}
              alt={article.title}
              loading="lazy" 
            />
            </div>
            <h3 className='article-title'>{article.title}</h3>
            <p className='article-category'>Category: {article.category}</p>
            <Link to={`/article/${article._id}`} className='view-article'>
              <h2>Read Here</h2>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default BlogResults;