import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {

  const notify = () => toast(" 🦄 Sucessfully Updated");


  var firstNameValid = "" 
  var lastNameValid = "" 
  var emailValid = "" 
  var passwordValid = "" 

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstnamemgs, setfirstnamemgs] = useState("");
  const [lastnamemgs, setlastnamemgs] = useState("");
  const [emailmgs, setemailmgs] = useState("");
  const [passwordmgs, setpasswordmgs] = useState("");


  // console.log(firstname)
  // console.log(lastname)
  // console.log(email)
  // console.log(password)

  function handelfirstname(){
    if(firstname === ""){
      setfirstnamemgs("This field is required")
      firstNameValid = false
    }else{
      setfirstnamemgs("")
      firstNameValid = true
    }
  }
  function handellastname(){
    if(lastname === ""){
      setlastnamemgs("This field is required")
      lastNameValid = false
    }else{
      setlastnamemgs("")
      lastNameValid = true
    }
  }
  function handelemail(){
    if(email === ""){
      setemailmgs("This field is required")
      emailValid = false
    }else if(!email.match(/(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i)){
      setemailmgs("Please Enter a Valid Email ")
      emailValid = false
    }
    else if(email !== ""){
      setemailmgs("")
      emailValid = true
    }
  }
  function handelpassword(){
    if(password === ""){
      setpasswordmgs("This field is required")
      passwordValid = false
    }else if(!password.match(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
      setpasswordmgs("Please Enter a Valid password ")
      passwordValid = false
    }
    else if (password !== ""){
      setpasswordmgs("")
      passwordValid = true
    }
  }

  function validSubmit(event){
    event.preventDefault();
    handelfirstname();
    handellastname();
    handelpassword();
    handelemail();
    
    if(emailValid && passwordValid && firstNameValid && lastNameValid){
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      {notify()}
    }else if(emailValid){
      setfirstnamemgs("This field is required");
      setlastnamemgs("This field is required");
      setpasswordmgs("This field is required");
    }else if(passwordValid){
      setfirstnamemgs("This field is required");
      setlastnamemgs("This field is required");
      setemailmgs("This field is required");
    }else if(firstNameValid){
      setlastnamemgs("This field is required");
      setemailmgs("This field is required");
      setpasswordmgs("This field is required");
    }else if(lastNameValid){
      setfirstnamemgs("This field is required");
      setemailmgs("This field is required");
      setpasswordmgs("This field is required");
    }

  }

  return (
    <div>
      <nav className="navbar">
        <h3 className="logo">LOGO</h3>
        <div className="nav-main">
          <h1 onclick="gotodashbord()">Home</h1>
          <div className="dropdown">
            <button className="dropbtn">
              <i className="fa-solid fa-user"></i>
              <p>Mr. Uma</p>
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="#" onclick="profile()">
                Profile
              </a>
              <a href="#" onclick="changepassword1()">
                Change Password
              </a>
              <a href="#" onclick="logout1()">
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="content-cp">
        <div className="container-profile">
          <form action="/" method="post" className="form-profile">
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter First Name"
              value={firstname}
              onChange={(e)=>{
                setFirstname(e.target.value)
                handelfirstname();
              }}
            />
            <p id="firstnamemgs">{firstnamemgs}</p>

            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter Last Name"
              value={lastname}
              onChange={(e)=>{
                setLastname(e.target.value)
                handellastname();

              }}
            />
            <p id="lastnamemgs">{lastnamemgs}</p>

            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
                handelemail();
              }}
            />
            <p id="emailmgs">{emailmgs}</p>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
                handelpassword();
              }}
            />
            <p id="passwordmgs">{passwordmgs}</p>
            <br />
            <button type="submit" className="btn" onClick={validSubmit}>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
