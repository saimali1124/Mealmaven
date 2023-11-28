import React from "react";
// import React, { useState, useEffect } from "react";
// import { FaSearch } from 'react-icons/fa';



function SearchBar() {
  return (
    <>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Here..."
        // value={searchTerm}
        // onChange={handleChange}
        />

        {/* <div className="search-container">  */}
        <button className="search-button" >Search</button>
        {/* onClick={handleSearch} */}
        {/* </div> */}
        {/* <FaSearch /> */}

      </div>


    </>
  );
};

export default SearchBar;

