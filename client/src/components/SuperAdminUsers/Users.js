import DataTable from "./DataGrid.js";
import Add from "./Add.js";
import { useState, useEffect } from "react";
import "./Users.css";
import { columns } from "../SuperAdminSideBar/SuperAdminSideBarData.js";
import SuperAdminNavbar from "../SuperAdminNavbar";
import SuperAdminSideBar from "../SuperAdminSideBar/SuperAdminSideBar.js";
import Footer from "../Footer";
import axios from "axios";

const Users = () => {
console.log("I am getting rendered");
  const [open, setOpen] = useState(false);
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
  {
    field: "phone",
    headerName: "Phone Number",
  },
];
const [data, setData] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("/getUsers");
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
  const confirmDelete = true;
//  window.confirm(
//     "Are you sure you want to delete this user?"
//   );
  if (confirmDelete) {
    try {
      await axios.delete(`/user/${email}`);
      const updatedData = data.filter((user) => user.email !== email);
      setData(updatedData);
    } catch (err) {
      console.log(err);
    }
  }
};
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
          <DataTable
            slug="users"
            columns={columns}
            rows={data}
            handleDelete={handleDelete}
          />

          {open && (
            <Add
              slug="user"
              columns={addField}
              setOpen={setOpen}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Users;
