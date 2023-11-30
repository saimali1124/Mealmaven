import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';



function SearchBar({ category }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const queryParam = `query=${encodeURIComponent(searchTerm)}`;
    const categoryParam = category ? `&category=${encodeURIComponent(category)}` : '';

  navigate(`/blogslist?${queryParam}&${categoryParam}`);
  };


  
  
  return (
    <> 
    <div className="search-box">
      <input
        type="text"
        placeholder="Search Here..."
        onChange={handleChange}
      />

      <button className="search-button"  onClick={handleSearch}>Search</button>   
      {/* </div> */}
      {/* <FaSearch /> */}

      </div>




    </>
  );
};

    export default SearchBar;
    
