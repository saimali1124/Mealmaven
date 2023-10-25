import React from "react";


const Footer = () => {
  return (
    <>
       <div className="pt-5 pb-5 footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-xs-12 about-company">
              <h2>MealMaven</h2>
              <p className="pr-5 text-white-50">Healthy eating is a journey, not a destination. Every healthy choice you make is a step in the right direction</p>
              <p><a href="/"><i className="fa fa-facebook-square mr-1" /></a><a href="/"><i className="fa fa-linkedin-square" /></a></p>
            </div>
            <div className="col-lg-3 col-xs-12 links">
              <h4 className="mt-lg-0 mt-sm-3">Useful Links</h4>
              <ul className="m-0 p-0">
                <li>- <a href="https://www.healthline.com/nutrition/50-super-healthy-foods">Fifty Healthy Foods</a></li>
                <li>- <a href="https://www.who.int/initiatives/behealthy/healthy-diet#:~:text=A%20healthy%20diet%20is%20essential,are%20essential%20for%20healthy%20diet.">Healthy Diet Importance</a></li>
                <li>- <a href="https://www.nhsinform.scot/healthy-living/food-and-nutrition/eating-well/health-benefits-of-eating-well">Benefits of Eating Well</a></li>
                <li>- <a href="https://gethealthyu.com/101-fitness-tips-that-rock/">101 Fitness Tips</a></li>
              </ul>
            </div>
            <div className="col-lg-4 col-xs-12 location">
              <h4 className="mt-lg-0 mt-sm-4">Location</h4>
              <p> 90, Sheldom Street, Lahore, Pakistan</p>
              <p className="mb-0"><i className="fa fa-phone mr-3" />(+92) 423-57689</p>
              <p><i className="fa fa-envelope-o mr-3" />info@MealMaven.com</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col copyright">
              <p className><small className="text-white-50">Copyright © 2023, MealMaven. All Rights Reserved.</small></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer