import DataTable from "./DataGrid.js";
import "./Users.css";
import { useState, useEffect } from "react";
import { columns } from "../SuperAdminSideBar/SuperAdminSideBarData.js";
import SuperAdminNavbar from "../SuperAdminNavbar";
import SuperAdminSideBar from "../SuperAdminSideBar/SuperAdminSideBar.js";
import Footer from "../Footer";
import Add from "./Add.js";
import axios from "axios";

const Nutrionists = () => {

 const addField = [
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "email",
    headerName: "Email",
  },
  {
    field: "password",
    headerName: "Password",
  },
];
const [data, setData] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("/getAdmin");
      const usersWithIds = response.data.map((user, index) => ({
        ...user,
        id: index, 
        createdAt: new Date(user.createdAt).toLocaleDateString(), 
        updatedAt: new Date(user.updatedAt).toLocaleDateString(),
        userId: user._id,
      }));
      setData(usersWithIds);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  fetchData();
}, []);
const handleDelete = async (email) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this nutritionist?"
  );
  if (confirmDelete) {
    try {
      await axios.delete(`/nutrionist/${email}`);
      const updatedData = data.filter((user) => user.email !== email);
      setData(updatedData);
    } catch (err) {
      console.log(err);
    }
  }
};


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
          <DataTable
            slug="users"
            columns={columns}
            rows={data}
            handleDelete={handleDelete}
          />
          {open && (
            <Add slug="nutrionist" columns={addField} setOpen={setOpen} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Nutrionists;
