import DataTable from "./DataGrid.js";
import Add from "./Add.js";
import { useState } from "react";
import "./Users.css";
import { userRows } from "../SuperAdminSideBar/SuperAdminSideBarData.js";
import { columns } from "../SuperAdminSideBar/SuperAdminSideBarData.js";
import SuperAdminNavbar from "../SuperAdminNavbar";
import SuperAdminSideBar from "../SuperAdminSideBar/SuperAdminSideBar.js";
import Footer from "../Footer";

const Users = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SuperAdminNavbar />
      <div className="container-box">
        <SuperAdminSideBar />
        <div className="users">
          <div className="info">
            <h1>Manage Users</h1>
          </div>
          <button className="addButton" onClick={() => setOpen(true)}>
            Add New User
          </button>
          <DataTable slug="users" columns={columns} rows={userRows} />

          {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Users;
