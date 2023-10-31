import React, { useState } from "react";
import "./ChangePassword.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const notify = () => toast(" 🦄 Sucessfully Changed");


function ChangePassword() {
const navigate = useNavigate();
  const validUserPassedData = JSON.parse(localStorage.getItem('data'));
  const fetchUrl = `http://localhost:3500/api/v1/app/${validUserPassedData._id}`
  const validPassword = validUserPassedData.password
  function gotodashbord() {
    // window.open("dashbord", "_self");
    navigate("/dashbord")

  }
  function gotoprofile() {
    navigate("/profile")

  }
  function gologout() {
    navigate("/")
  }
  function gochangepassword() {
    navigate("/chnage-password")

  }
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [CurrentPasswordMgs, setCurrentPasswordMgs] = useState("");
  const [newPasswordMgs, setnewPasswordMgs] = useState("");
  const [confirmPasswordMgs, setConfirmPasswordMgs] = useState("");

  var validcurrentPassword = "";
  var validnewPassword = "";
  var validconfirmPassword = "";
  var validPasswordMatchWithLocal = "";

function passwordhandler(){
  if(currentPassword === validPassword){
    validPasswordMatchWithLocal = true
  }else{
    validPasswordMatchWithLocal = false
  }
}
  function handelCurrentPasswordMgs() {
    if (currentPassword == "") {
      validcurrentPassword = false;
      setCurrentPasswordMgs("This field is required");
    } else if (currentPassword != "") {
      validcurrentPassword = true;
      setCurrentPasswordMgs("");
    }
  }
  function handelNewPasswordMgs() {
    if (newPassword == "") {
      validnewPassword = false;
      setnewPasswordMgs("This field is required");
    } else if (!newPassword.match(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
      validnewPassword = false;
      setnewPasswordMgs(
        <ul>
          <p>Password Should contain</p>
          <li>length should be between 6 and 16</li>
          <li>One Special Char</li>
          <li>One Uppercase & Number</li>
        </ul>
      );
    } else if (newPassword != "") {
      validnewPassword = true;
      setnewPasswordMgs("");
    }
  }
  function handelConfirmPasswordMgs() {
    if (newPassword ===  confirmPassword) {
      setConfirmPasswordMgs("");
      validconfirmPassword = true;
    }  else{
      setConfirmPasswordMgs("This field is required");
      validconfirmPassword = false;
    }
  }
  function validSubmit(e){
    e.preventDefault();
    handelCurrentPasswordMgs();
    handelNewPasswordMgs();
    handelConfirmPasswordMgs();
    passwordhandler();
    const postData ={
      password:confirmPassword,
      email:validUserPassedData.email,
      firstName:validUserPassedData.firstName,
      lastName:validUserPassedData.lastName,
      _id:validUserPassedData._id
    }
    if(validcurrentPassword && validnewPassword && validconfirmPassword && validPasswordMatchWithLocal){
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      };

      fetch(fetchUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          {
            notify();
            localStorage.setItem('data', JSON.stringify(postData));
            console.log(validUserPassedData.email)
          }
          console.log(data)
        })
        .catch((error) => {
          console.error("POST request error:", error);
        });

      setConfirmPassword("")
      setNewPassword("")
      setCurrentPassword("")
    }else if (validcurrentPassword){
      setnewPasswordMgs("This field is required");
      setConfirmPasswordMgs("This field is required");
    }else if (validnewPassword){
      setCurrentPasswordMgs("This field is required");
      setConfirmPasswordMgs("This field is required");
    }else if(validconfirmPassword){
      setnewPasswordMgs("This field is required");
      setCurrentPasswordMgs("This field is required");
    }
  }

  return (
    <div>
      <nav class="navbar">
        <h3 class="logo">LOGO</h3>
        <div class="nav-main">
          <h1 onClick={gotodashbord}>Home</h1>
          <div class="dropdown">
            <button class="dropbtn">
              <i class="fa-solid fa-user"></i>
              <p>{`${validUserPassedData.firstName} ${validUserPassedData.lastName}`}</p>
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="#" onClick={gotoprofile}>
                Profile
              </a>
              <a href="#" onClick={gochangepassword}>
                Change Password
              </a>
              <a href="#" onClick={gologout}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div class="content-cp">
        <div class="container-cp">
          <h2>Change Password</h2>
          <form action="" class="form">
            <input
              type="password"
              name="currentpassword"
              id="currentpassword"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e)=>setCurrentPassword(e.target.value)}
              onInput={
                handelCurrentPasswordMgs
              }
            />
            <p id="currentpasswordmgs">{CurrentPasswordMgs}</p>
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              onInput={
                handelNewPasswordMgs
              }
            />
            <p id="newpasswordmgs">{newPasswordMgs}</p>
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              onInput={
                handelConfirmPasswordMgs
              }
            />
            <p id="confirmpasswordmgs">{confirmPasswordMgs}</p>
            <button type="submit" id="btn" onClick={validSubmit}>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;