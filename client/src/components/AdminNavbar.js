import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import m from '../images/m.png';

const AdminNavbar = () => {
  return (<>
<nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#" style={{ fontFamily: "Courier New", fontSize: "24px"}}>
            <img src={m} alt="MealMaven Logo" style={{width: "50px", marginRight: "10px"}} />
            MealMaven
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/AdminHome">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ManageRecipe">Manage Recipe</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ManageDiet">Manage Diet</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/AdminDietPlan">Assign Diet</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/AdminLogin">Log Out</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>)
}
export default AdminNavbar