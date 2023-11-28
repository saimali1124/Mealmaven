// Import necessary libraries and styles
import React, { useState } from 'react';
import Footer from './Footer';
import UserNavbar from './UserNavbar';
import searchBtn from '../images/searchButton.png';

// Define the CustomRecipe component
const CustomRecipe = () => {

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
    console.log(lines)
    return (
      <>
        {lines.map((line, index) => (
          <p key={index}>
            {line}{index < lines.length - 1 && <br />}
          </p>
        ))}
      </>
    );
  }

  return (
    <div>
      <UserNavbar />
      <div className='grey-page3'>
        <div className='custrecipe'>
          <h1>Custom Recipes</h1>
          <div className='login-form3'>
            <p>

              {/* {" So here's your recipe using the following ingredients!"}
              <br />
              {"Set your Simulator to use a 64-bit device (iPhone 5s or later). From Xcode, choose a simulator device type. Go to Product > Destination > Choose your target device. From the Simulator app, go to File > Open Simulator > Choose your target iOS device To check the device version in the Simulator, open the Settings app > General > About. The simulated high-screen density iOS devices might overflow your screen. If that appears true on your Mac, change the presented size in the Simulator app To display the Simulator at a small size, go to Window > Physical Size or press Cmd + 1. To display the Simulator at a moderate size, go to Window > Point Accurate or press Cmd + 2. To display the Simulator at an HD representation, go to Window > Pixel Accurate or press Cmd + 3. The Simulator defaults to this size. The Simulator defaults to Fit Screen. If you need to return to that size, go to Window > Fit Screen or press Cmd + 4. Set your Simulator to use a 64-bit device (iPhone 5s or later). From Xcode, choose a simulator device type. Go to Product > Destination > Choose your target device. From the Simulator app, go to File > Open Simulator > Choose your target iOS device To check the device version in the Simulator, open the Settings app > General > About. The simulated high-screen density iOS devices might overflow your screen. If that appears true on your Mac, change the presented size in the Simulator app To display the Simulator at a small size, go to Window > Physical Size or press Cmd + 1. To display the Simulator at a moderate size, go to Window > Point Accurate or press Cmd + 2. To display the Simulator at an HD representation, go to Window > Pixel Accurate or press Cmd + 3. The Simulator defaults to this size. The Simulator defaults to Fit Screen. If you need to return to that size, go to Window > Fit Screen or press Cmd + 4"} */}
              {recipe && renderRecipe()}
            </p>
          </div>
          <form id="ingredients-input-form" onSubmit={handleSubmit} >
            <input type="text" placeholder="Comma Separated Ingredients" name="search" onChange={handleTextChange} />
            <button type="submit" ><img id="searchIcon" src={searchBtn} alt="" /></button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CustomRecipe;
