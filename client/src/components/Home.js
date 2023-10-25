import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import HomeP from '../images/HomeP.jpg';
import HomeP2 from '../images/Home2.jpg'
import HomeP3 from '../images/Home3.jpg'

import { Parallax } from 'react-parallax';

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="App">
        <Parallax strength={400} bgImage={HomeP}>
          <div className="content" style={{marginTop: '4rem'}}>
            <div className="text-content" >MealMaven</div>
            <h8>Find the perfect meal for any occasion.</h8>
          </div>
        </Parallax>

        <Parallax strength={5}  bgImage={HomeP2}>
        <div className="content">
          <h9>Buy MealMaven Pro Today</h9>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className='parat' style={{top: '40rem'}}>
          Whether you're a seasoned cook or just starting out in the kitchen, 
          our Ingredient Search Tool is the perfect tool to help you create delicious, satisfying meals with ease.
          So why wait? Try it out today and discover the endless culinary possibilities at your fingertips!
          </div>
        </div>
        </Parallax>

        <Parallax strength={400} bgImage={HomeP3}>
        <div className='content'>
          <div className='AbHead'>About Us</div>
          <div className='AboutUsText'>
           
          Our app is designed to help you achieve your health and fitness goals by recommending 
          delicious and nutritious recipes. At MealMaven, we believe 
          that eating healthy shouldn't be a chore, and that's why we've made it our mission to help people make 
          better food choices with ease. Join us on 
          our journey to a healthier, happier you!
          </div>
        </div> 
        </Parallax>

        <div>
          <Footer/>
        </div>

      </div>
    </>
  );
};

export default Home;
