// Article.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserNavbar from "../UserNavbar";


function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/getarticle/${id}`);
        if (!response.ok) {
          // window.alert('Article not found');
        }
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  },[id]); 
  if (!article) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div>
      <UserNavbar />
      <div className='articledetails'>
        <h1 className='article-heading'>{article.title}</h1>
        <h2 className='article-author'>Written By: {article.author}</h2>
        <h3 className='article-date'>Date: {article.date}</h3>
        <h4 className='article-cat'>Category: {article.category}</h4>
      </div>
      <div className='articleheader'>
      <img src={`/image/${article.imagePath.replace(/\\/g, '/').replace('uploads/', '')}`} alt={article.title} />

      </div>
      <p className='article-content'>{article.content}</p>
    </div>
  );
}
export default Article;
