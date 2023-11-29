import "./TopBox.css";
import { topNutrionists } from "../SuperAdminSideBar/SuperAdminSideBarData";
import usericon from "../../images/UserIcon.svg";
import { useState, useEffect } from "react";


const TopBox = () => {
const [topUsers, setTopUsers] = useState([]);
useEffect(() => {
  fetch("/topUsers")
    .then((response) => response.json())
    .then((data) => {
      const WithIcons = data.map((user) => ({
        ...user,
        img: { usericon },
      }));
      setTopUsers(WithIcons);
    })
    .catch((error) => console.error("Error fetching data:", error));
}, []);
  return (
    <div className="topBox">
      <h2>Top Users</h2>
      <div className="list">
        {topUsers.map((user) => (
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={Object.values(user.img)[0]} alt="" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
