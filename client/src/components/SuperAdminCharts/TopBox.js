import "./TopBox.css";
import { topNutrionists } from "../SuperAdminSideBar/SuperAdminSideBarData";

const TopBox = () => {
  return (
    <div className="topBox">
      <h2>Top Nutritionists</h2>
      <div className="list">
        {topNutrionists.map((user) => (
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
