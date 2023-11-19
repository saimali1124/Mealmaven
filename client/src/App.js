import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import "./blogs.css";
import UserSignup from "./components/UserSignup";
import UserLogin from "./components/UserLogin";
import ErrorPage from "./components/ErrorPage";
import UserHome from "./components/UserHome";
import DailyActivity from "./components/DailyActivity";
import SugarFreeRecipe from "./components/SugarFreeRecipe";
import CarbFreeRecipe from "./components/CarbFreeRecipe";
import ProteinRecipe from "./components/ProteinRecipe";
import DairyRecipe from "./components/DairyRecipe";
import StarchFreeRecipe from "./components/StarchFreeRecipe";
import ManageRecipe from "./components/ManageRecipe";
import ManageDiet from "./components/ManageDiet";
import AdminSignup from "./components/AdminSignup";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./components/AdminHome";
import UserDietPlan from "./components/UserDietPlan";
import AdminDietPlan from "./components/AdminDietPlan";
import CustomRecipe from "./components/CustomRecipe";
import PaymentForm from "./components/PaymentForm";
import SuperAdminSignup from "./components/SuperAdminSignup";
import SuperAdminLogin from "./components/SuperAdminLogin";
import SuperAdminHome from "./components/SuperAdminHome";
import UserProfile from "./components/UserProfile";
import Blogs from "./components/Blogs";
import Article from "./components/Article";
import LifeStyleBlogs from "./components/LifeStyleBlogs";
import FitnessBlogs from "./components/FitnessBlogs";
import FoodBlogs from "./components/FoodBlogs";
import BlogInputForm from "./components/BlogInputForm";
import Charts from "./components/SuperAdminCharts/Charts";
import AdminProfile from "./components/AdminProfile";
import SuperAdminProfile from "./components/SuperAdminProfile";
import Users from "./components/SuperAdminUsers/Users";
import Nutrionists from "./components/SuperAdminUsers/Nutrionists";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/UserSignup"
          element={
            <>
              <UserSignup />
            </>
          }
        />
        <Route
          path="/UserLogin"
          element={
            <>
              <UserLogin />
            </>
          }
        />
        <Route path="/UserHome" element={<UserHome />} />
        <Route path="/DailyActivity" element={<DailyActivity />} />
        <Route path="/SugarFreeRecipe" element={<SugarFreeRecipe />} />
        <Route path="/CarbFreeRecipe" element={<CarbFreeRecipe />} />
        <Route path="/ProteinRecipe" element={<ProteinRecipe />} />
        <Route path="/StarchFreeRecipe" element={<StarchFreeRecipe />} />
        <Route path="/DairyRecipe" element={<DairyRecipe />} />
        <Route path="/ManageRecipe" element={<ManageRecipe />} />
        <Route path="/ManageDiet" element={<ManageDiet />} />
        <Route path="/AdminSignup" element={<AdminSignup />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/UserDietPlan" element={<UserDietPlan />} />
        <Route path="/AdminDietPlan" element={<AdminDietPlan />} />
        <Route path="/CustomRecipe" element={<CustomRecipe />} />
        <Route element={<ErrorPage />} />
        <Route path="/Payment" element={<PaymentForm />} />
        <Route path="/SuperAdminSignup" element={<SuperAdminSignup />} />
        <Route path="/SuperAdminLogin" element={<SuperAdminLogin />} />
        <Route path="/SuperAdminHome" element={<SuperAdminHome />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/blogscategory/lifestyle" element={<LifeStyleBlogs />} />
        <Route path="/blogscategory/fitness" element={<FitnessBlogs />} />
        <Route path="/blogscategory/food" element={<FoodBlogs />} />
        <Route path="/BlogInput" element={<BlogInputForm />} />
        <Route path="/AdminProfile" element={<AdminProfile />} />
        <Route path="/SuperAdminProfile" element={<SuperAdminProfile />} />
        <Route path="/Charts" element={<Charts />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Nutrionists" element={<Nutrionists />} />
      </Routes>
    </>
  );
};

export default App;
