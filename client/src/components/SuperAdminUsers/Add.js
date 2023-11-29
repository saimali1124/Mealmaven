import "./Add.css";
import { useState } from "react";
import axios from "axios";

const Add = (props) => {
const [form, setForm] = useState({});
const validatForm = () => {
 if (!form.email || !form.password || !form.cpassword || !form.name) {
   window.alert("Please fill all the fields!");
   return;
 }

 if (form.name.length < 3) {
   window.alert("Name must have atleast 3 characters!");
   return;
 }

 if (form.password.length < 8) {
   window.alert("Password must have atleast 8 characters!");
   return;
 }

 if (!form.email.includes("@gmail.com")) {
   window.alert("Invalid email address!");
   return;
 }

 if (!/[A-Z]/.test(form.password)) {
   window.alert("Password must have atleast 1 uppercase letter!");
   return;
 }

 if (!/\d/.test(form.password)) {
   window.alert("Password must have atleast 1 numerical digit!");
   return;
 }
}
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    form.cpassword = form.password
    validatForm();
    let res;
    if( props.slug === "nutrionist"){
    const { name, email, password, cpassword } = form;
    res = await fetch("/registerAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    });}
    else{
    const { name, email,phone, password, cpassword } = form;
    res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
      }),
    });
    }
    
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Registeration not successful");
      return;
    } else {
      props.setOpen(false);
      window.alert("Registeration Successful");     
    }
  };

  return (
    <div className="addForm">
      <div className="modalForm">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1 className="form-title">Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .map((column) => (
              <div className="form-group">
                <label>
                  <i className="zmdi zmdi-email material-icons-name"></i>
                </label>
                <input
                  type={column.type}
                  placeholder={column.field}
                  name={column.field}
                  className="form-input"
                  onChange = {handleChange}
                />
              </div>
            ))}
          <div className="form-group form-button">
            <input
              type="submit"
              className="form-submit button-primary bg-primary"
              value="Add"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
