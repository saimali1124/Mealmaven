import DataTable from "./DataGrid.js";
import "./Users.css";
import { useState } from "react";
import { userRows } from "../SuperAdminSideBar/SuperAdminSideBarData.js";
import { columns } from "../SuperAdminSideBar/SuperAdminSideBarData.js";
import SuperAdminNavbar from "../SuperAdminNavbar";
import SuperAdminSideBar from "../SuperAdminSideBar/SuperAdminSideBar.js";
import Footer from "../Footer";
import Add from "./Add.js";

const Nutrionists = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SuperAdminNavbar />
      <div className="container-box">
        <SuperAdminSideBar />
        <div className="users">
          <div className="info">
            <h1>Manage Nutrionists</h1>
          </div>
          <button className="addButton" onClick={() => setOpen(true)}>
            Add New Nutrionist
          </button>
          <DataTable slug="users" columns={columns} rows={userRows} />
          {open && (
            <Add slug="nutrionist" columns={columns} setOpen={setOpen} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Nutrionists;
