import React, { useState } from 'react';
import Footer from './Footer';
import UserNavbar from './UserNavbar';

function CustomRecipe() {
  const [text, setText] = useState('');
  const [recipe, setRecipe] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    fetch('/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: text }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data successfully sent:', data);
        setRecipe(data.data);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  }

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function renderRecipe() {
    const lines = recipe.split('\n').filter(line => line.trim() !== '');
  
    return (
      <div>
        {lines.map((line, index) => (
          <p key={index}>
            {line}{index < lines.length - 1 && <br />}
          </p>
        ))}
      </div>
    );
  }
  
  

  return (
    <>
    <UserNavbar/>
    <div className='grey-page3'>
      <h1 style={{marginTop: '2rem', marginLeft: '33.6rem', marginBottom: '4rem'}}>Custom Recipes</h1>
      <form onSubmit={handleSubmit} className='login-form3'>
        <h4 >
          Enter available ingredients:
          <br></br>
          <br></br>
          <textarea type="text" value={text} onChange={handleTextChange} />
        </h4>
        <br></br>
        <button type="submit" style={{backgroundColor: 'blue', marginLeft: '0.8rem', width: '15rem', borderRadius: '5rem'}}>Submit</button>
      </form>
      {recipe && (
        <div className='custrecipe' style={{marginTop: '-3rem', textAlign: 'center'}}>
          <h2 style={{marginBottom: '2.5rem', marginRight: '70rem'}}>Recipe:</h2>
          <h6 style={{fontStyle: 'italic', textAlign: 'left', marginLeft: '3rem'}}>
          {renderRecipe()}
          </h6>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default CustomRecipe;
