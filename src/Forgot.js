// import "./App.css";
import "./Forgot.css";  
import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [mail, setMail] = useState("");
  let [error, setError] = useState("");
  function validateemail() {
    if (!mail.match(/(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i)) {
      setError("Please Enter a Valid Email");
      return false;
    } else {
      setError("");
      return true;
    }
  }
  function validation(event) {
    event.preventDefault();
    validateemail();
    if (mail.length <= 0) {
      setError("Field Should not be Empty");
      return false;
    } else if (
      !mail.match(/(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i)
    ) {
      setError("");
      return false;
    } else {
      setError("");
      console.log("done!");
      return true;
    }
  }
  const notify = () => toast(" 🦄 Sucessfully Mail sent");
  function sucessReset(event) {
    event.preventDefault();
    if (validation(event)) {
      {notify()}
      setMail("");
    }
  }
  function handelLogin(){
    window.open("login", "_self")
  }
  return (
    <div className="center">
      <div class="container-forgot">
      <h1>Forgot Password</h1>
      <form action="/" method="post" class="form" onSubmit={validation}>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          onKeyUp={validateemail}
        />
        <br />
        <p id="emailvalid">{error}</p>
        <button type="submit" class="btn" onClick={sucessReset}>
          Reset
        </button>
      </form>
      <h3 id="login">
        Already have an account? <a href="#" onClick={handelLogin}>Login</a>
      </h3>
    </div>
    </div>
  );
}
