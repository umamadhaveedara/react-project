import "./App.css";
import React, { useState } from "react";
import "./LoginPage.css";


export default function App() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  let [emailerror, setemailerror] = useState("");
  let [passerror, setpasserror] = useState("");
  var validmaildata;
  var validpassdata;
  const checkmail = () => {
    if (mail.trim() === "") {
      setemailerror("");
      validmaildata = false;
    } else if (!mail.match(/(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i)) {
      setemailerror("Please Enter a Valid Email ");
      validmaildata = false;
    } else {
      setemailerror("");
      validmaildata = true;
    }
  };

  const checkpass = () => {
    if (pass.trim() === "") {
      setpasserror("");
      validpassdata = false;
    } else {
      setpasserror("");
      validpassdata = true;
    }
  };
  function handelForgot(){
    window.open("forgot", "_self")
  }
  function handelSignup(){
    window.open("signup", "_self")
  }
  function validation(event) {
    event.preventDefault();
    checkmail();
    checkpass();

    if (validmaildata && validpassdata) {
      console.log("done!");
      window.open("dashbord", "_self")

    } else if (validmaildata) {
      event.preventDefault();
      setpasserror("Field is required");
    } else if (validpassdata) {
      event.preventDefault();
      setemailerror("Field is required");
    } else {
      event.preventDefault();
      setpasserror("Field is required");
      setemailerror("Field is required");
    }
  }
  return (
    <div className="center">
      <div className="container">
      <div className="main-form">
        <h1>Logo</h1>
        <h2>Welcome Back!</h2>
        <button className="btn-loginPage">
          <i className="fa-brands fa-google"></i> Log in with Google
        </button>
        <h2 className="normal_text">Or Login with Email</h2>
        <form action="#" className="form" id="form" onSubmit={validation}>
          <input
            type="text"
            name="mail"
            id="mail-index"
            placeholder="Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            onInput={checkmail}
          />
          <p id="emailvalid">{emailerror}</p>
          <br />
          <input
            type="password"
            name="password"
            id="password-index"
            placeholder="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onInput={checkpass}
          />
          <p id="passvalid">{passerror}</p>
          <div className="other-info">
            <div className="keepinfo-data">
              <input type="checkbox" name="keepme" id="keepme" />
              <h3 className="keepmedata">Keep me logged in</h3>
            </div>
            <div className="forgot">
              <a id="forgot" href="#" onClick={handelForgot}>
                Forgot password
              </a>
            </div>
          </div>
          <button id="submit-btn" type="submit">
            Log in
          </button>
        </form>
        <h3 className="noaccount">
          Don't have an account?{" "}
          <a href="#" id="noaccount" onClick={handelSignup}>
            Sign up
          </a>
        </h3>
      </div>
      <div className="main-img">
        <img src="undraw_Mobile_login_re_9ntv (1).png" alt="img" srcset="" />
      </div>
    </div>
    </div>
    
  );
}