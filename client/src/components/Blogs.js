import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from "./UserNavbar";
import img1 from '../images/blog1.jpeg'
import img2 from '../images/blog2.jpg'
import img3 from '../images/Dairy.jpg'
import img4 from '../images/Protein.jpg'
import Footer from "./Footer";
import SearchBar from './SearchBar';





function Blogs() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch your articles from an API or a local data source.
    // For this example, we'll use a static array of articles.
    const sampleArticles = [
      {
        id: 1,
        title: 'The Minimum Effective Dose',
        content: 'This is the content of Sample Article 1.',
        imageUrl: img1,
        category: 'fitness'
      },
      {
        id: 2,
        title: 'Breaking Muscle',
        content: 'This is the content of Sample Article 2.',
        imageUrl: img2,
        category: 'fitness'

      },
      {
        id: 3,
        title: 'Well + Good ',
        content: 'This is the content of Sample Article 2.',
        imageUrl: img3,
        category: 'fitness'

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
        category: 'food'

      },
      {
        id: 8,
        title: 'Well + Good ',
        content: 'This is the content of Sample Article 2.',
        imageUrl: img1,
        category: 'food'

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
    <div className='grey-page'> 
    <SearchBar/>
    <h1 className='blog-mainheading'> Our Blogs</h1>
    {Object.keys(articlesByCategory).map((category) => (
      <div key={category}>
        <h2 className='blog-category'>{category}</h2>
        <div className="blog-container">
          {articlesByCategory[category].map((article) => (
            <div key={article.id} >
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
    </div>
        <Footer /> 

  </div>
  
);

};



export default Blogs;


