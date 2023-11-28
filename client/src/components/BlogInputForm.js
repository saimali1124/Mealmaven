import React, { useState } from 'react';
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";

const BlogInputForm = () => {
  // State variables to store input values
  // const [articleName, setArticleName] = useState('');
  const [articleCategory, setArticleCategory] = useState('');
  const [articleText, setArticleText] = useState('');


  return (
    <>
      <AdminNavbar />
      <div className='grey-page'>

        <h2 className='bloginput'>Blog</h2>

        <div className="article-form-container">
          <form >
            <label>
              Title:
            </label>

            <input className='forminput'
              type="text"
              // value={articleName}
              // onChange={(e) => setArticleName(e.target.value)}
              placeholder="Enter the article title"
            />


            <label>
              Category:
              <select
                value={articleCategory}
                className='formcategory'
              // onChange={(e) => setArticleCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="science">Science</option>
                <option value="business">Business</option>
              </select>
            </label>

            <label>
              Content:
              <textarea
                value={articleText}
                className='formtext'
                onChange={(e) => {
                  const text = e.target.value;
                  const words = text.split(' ');
                  if (words.length <= 1000) {
                    setArticleText(text);
                  }
                }}
                placeholder="Enter the article content"
              />
            </label>

            <button className='formbutton' type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Footer />

    </>

  );
};


export default BlogInputForm;
