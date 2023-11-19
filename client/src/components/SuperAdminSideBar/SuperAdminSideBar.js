import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./SuperAdminSideBar.css";
import { menu } from "./SuperAdminSideBarData.js";

const SideBar = () => {
  const location = useLocation();

  return (
    <div className="menuContainer">
      <div className="menu">
        {menu.map((item) => (
          <div className="item" key={item.id}>
            <span className="title">{item.title}</span>
            {item.listItems.map((listItem) => (
              <NavLink
                to={listItem.url}
                className={`listItem ${location.pathname === listItem.url ? "selected" : ""
                  }`}
                key={listItem.id}
              >
                <img src={Object.values(listItem.icon)[0]} alt="" />
                <span className="listItemTitle">{listItem.title}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
