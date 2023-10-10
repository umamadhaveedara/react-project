import React, { useState } from "react";
import "./ChangePassword.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => toast(" 🦄 Sucessfully Changed");

function ChangePassword() {
  function gotodashbord() {
    window.open("dashbord", "_self");
  }
  function gotoprofile() {
    window.open("profile", "_self");
  }
  function gologout() {
    window.open("/", "_self");
  }
  function gochangepassword() {
    window.open("change-password", "_self");
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
    if (confirmPassword == "") {
      validconfirmPassword = false;
      setConfirmPasswordMgs("This field is required");
    } else if (confirmPassword !== newPassword) {
      validconfirmPassword = false;
      setConfirmPasswordMgs("Confirm password did't match");
    } else if (confirmPassword === newPassword) {
      validconfirmPassword = true;
      setConfirmPasswordMgs("");
    }
  }
  function validSubmit(e){
    e.preventDefault();
    handelCurrentPasswordMgs();
    handelNewPasswordMgs();
    handelConfirmPasswordMgs();
    if(validcurrentPassword && validnewPassword && validconfirmPassword){
      setConfirmPassword("")
      setNewPassword("")
      setCurrentPassword("")
      {notify()}
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
              <p>Mr. Uma</p>
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
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                handelCurrentPasswordMgs();
              }}
            />
            <p id="currentpasswordmgs">{CurrentPasswordMgs}</p>
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                handelNewPasswordMgs();
              }}
            />
            <p id="newpasswordmgs">{newPasswordMgs}</p>
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                handelConfirmPasswordMgs();
              }}
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
