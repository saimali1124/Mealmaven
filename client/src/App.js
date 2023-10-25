import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import "./App.css";
import UserSignup from './components/UserSignup';
import UserLogin from './components/UserLogin';
import ErrorPage from './components/ErrorPage';
import UserHome from './components/UserHome';
import DailyActivity from './components/DailyActivity';
import SugarFreeRecipe from './components/SugarFreeRecipe';
import CarbFreeRecipe from './components/CarbFreeRecipe';
import ProteinRecipe from './components/ProteinRecipe';
import DairyRecipe from './components/DairyRecipe';
import StarchFreeRecipe from './components/StarchFreeRecipe';
import ManageRecipe from './components/ManageRecipe';
import ManageDiet from './components/ManageDiet';
import AdminSignup from './components/AdminSignup';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';
import UserDietPlan from './components/UserDietPlan';
import AdminDietPlan from './components/AdminDietPlan';
import CustomRecipe from './components/CustomRecipe';
import PaymentForm from './components/PaymentForm';

const App = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<><Home/></>}/>
        <Route path="/UserSignup" element={<><UserSignup/></>}/>
        <Route path="/UserLogin" element={<><UserLogin/></>}/>
        <Route path="/UserHome" element={<UserHome/>}/>
        <Route path="/DailyActivity" element={<DailyActivity/>}/>
        <Route path="/SugarFreeRecipe" element={<SugarFreeRecipe/>}/>
        <Route path="/CarbFreeRecipe" element={<CarbFreeRecipe/>}/>
        <Route path="/ProteinRecipe" element={<ProteinRecipe/>}/>
        <Route path="/StarchFreeRecipe" element={<StarchFreeRecipe/>}/>
        <Route path="/DairyRecipe" element={<DairyRecipe/>}/>
        <Route path="/ManageRecipe" element={<ManageRecipe/>}/>
        <Route path="/ManageDiet" element={<ManageDiet/>}/>
        <Route path="/AdminSignup" element={<AdminSignup/>}/>
        <Route path="/AdminLogin" element={<AdminLogin/>}/>
        <Route path="/AdminHome" element={<AdminHome/>}/>
        <Route path="/UserDietPlan" element={<UserDietPlan/>}/>
        <Route path="/AdminDietPlan" element={<AdminDietPlan/>}/>
        <Route path="/CustomRecipe" element={<CustomRecipe/>}/>
        <Route element={<ErrorPage/>}/>
        <Route path='/Payment' element={<PaymentForm/>}/>
    </Routes>
    </>
  )
  
}


export default App