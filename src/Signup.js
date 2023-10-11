import "./Signup.css";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const fetchUrl = "http://localhost:3500/api/v1/app/post";
export default function App() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  let [ferror, setFerror] = useState("");
  let [lerror, setLerror] = useState("");
  let [mailerror, setMailerror] = useState("");
  let [passerror, setPasserror] = useState("");
  var validfnamedata;
  var validlnamedata;
  var validmaildata;
  var validpassdata;

  const notify = () => toast(" 🦄 Sucessfully Registered");

  const checkfname = () => {
    if (fname.trim() === "") {
      setFerror("");
      validfnamedata = false;
    } else {
      setFerror("");
      validfnamedata = true;
    }
  };
  function handelLogin() {
    window.open("login", "_self");
  }

  const checklname = () => {
    if (lname.trim() === "") {
      setLerror("");
      validlnamedata = false;
    } else {
      setLerror("");
      validlnamedata = true;
    }
  };
  const checkmail = () => {
    if (mail.trim() === "") {
      setMailerror("");
      validmaildata = false;
    } else if (
      !mail.match(/(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i)
    ) {
      setMailerror("Please Enter a Valid Email ");
      validmaildata = false;
    } else {
      setMailerror("");
      validmaildata = true;
    }
  };
  const checkpass = () => {
    if (pass.trim() === "") {
      setPasserror("");
      validpassdata = false;
    } else if (
      !pass.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    ) {
      setPasserror("Please Enter a Valid Password ");
      validpassdata = false;
    } else {
      setPasserror("");
      validpassdata = true;
    }
  };
  function validation(event) {
    event.preventDefault();
    checkfname();
    checklname();
    checkmail();
    checkpass();
    if (validmaildata && validfnamedata && validlnamedata && validpassdata) {
      event.preventDefault();


      const postData = {
        firstName: fname,
        lastName: lname,
        email: mail,
        password: pass,
      };

      const requestOptions = {
        method: "POST",
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
          }
          console.log(data)
        })
        .catch((error) => {
          console.error("POST request error:", error);
        });

      console.log("done!");
      setFname("");
      setLname("");
      setMail("");
      setPass("");
      
      // window.location.reload()
      // window.open('password.html');
      // location.reload();

      // fname.value = "";

      // lname.value = "";

      // emailfield.value = "";
    } else if (validmaildata && validfnamedata) {
      event.preventDefault();
      setPasserror("This field is required");
      setLerror("This field is required");
    } else if (validmaildata && validlnamedata) {
      event.preventDefault();
      setPasserror("This field is required");
      setFerror("This field is required");
    } else if (validfnamedata && validlnamedata) {
      event.preventDefault();
      setPasserror("This field is required");
      setMailerror("This field is required");
    } else if (validmaildata) {
      event.preventDefault();
      setFerror("This field is required");
      setLerror("This field is required");
      setPasserror("This field is required");
      event.preventDefault();
    } else if (validpassdata) {
      setFerror("This field is required");
      setMailerror("Please Enter a Valid Email");
      setLerror("This field is required");
    } else if (validfnamedata) {
      event.preventDefault();
      setMailerror("Please Enter a Valid Email");
      setLerror("This field is required");
      setPasserror("This field is required");
      event.preventDefault();
    } else if (validlnamedata) {
      event.preventDefault();
      setPasserror("This field is required");
      setMailerror("Please Enter a Valid Email");
      setFerror("This field is required");
      event.preventDefault();
    } else {
      // alert("Please fill all the details")
      event.preventDefault();
      setFerror("This field is required");
      setLerror("This field is required");
      setMailerror("This field is required");
      setPasserror("This field is required");
    }
  }
  return (
    <div className="center">
      <div class="container-signup ">
        <h1 style={{ textalign: "center" }}>Create your account</h1>
        <form action="/" method="post" class="form" onSubmit={validation}>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            onInput={checkfname}
          />
          <p id="firstnamemgs">{ferror}</p>
          <br />
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            onInput={checklname}
          />
          <p id="lastnamemgs">{lerror}</p>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            onInput={checkmail}
          />
          <p id="emailmgs">{mailerror}</p>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password
            "
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onInput={checkpass}
          />
          <p id="passwordmgs">{passerror}</p>
          <br />
          <button type="submit" class="btn">
            Submit
          </button>
        </form>
        <h3 id="login" style={{ textalign: "center" }}>
          Already have an account?{" "}
          <a href="#" onClick={handelLogin}>
            Login
          </a>
        </h3>
      </div>
    </div>
  );
}
