import {React,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import m from '../images/m.png';

const AdminHomeNavbar = () => {
const closeButtonStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  border: "none",
  background: "transparent",
  fontSize: "1rem",
  padding: "1rem",
  cursor: "pointer",
  color: "white",
};
const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink
            className="navbar-brand"
            to="#"
            style={{ fontFamily: "Courier New", fontSize: "24px" }}
          >
            <img
              src={m}
              alt="MealMaven Logo"
              style={{ width: "50px", marginRight: "10px" }}
            />
            MealMaven
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`collapse navbar-collapse ${
              isSidebarOpen ? "show" : ""
            }`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto">
              {isSidebarOpen && (
                <img
                  src={m}
                  alt="MealMaven Logo"
                  style={{ width: "50px", marginRight: "10px" }}
                />
              )}

              {isSidebarOpen && (
                <button
                  type="button"
                  style={closeButtonStyle}
                  aria-label="Close"
                  onClick={(event) => {
                    event.preventDefault();
                    setSidebarOpen(false);
                  }}
                >
                  X
                </button>
              )}
              <li className="nav-item" style={{ marginRight: "1rem" }}>
                <NavLink className="nav-link" to="/AdminSignup">
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item login-link">
                <NavLink className="nav-link" to="/AdminLogin">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminHomeNavbar