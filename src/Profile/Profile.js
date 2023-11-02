import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const notify = () => toast(" 🦄 Sucessfully Updated");

  const validUserPassedData = JSON.parse(localStorage.getItem("data"));
  const token = JSON.parse(localStorage.getItem("storeTokenInLocal"));

  var firstNameValid = "";
  var lastNameValid = "";
  var emailValid = "";
  // var passwordValid = ""

  const [firstname, setFirstname] = useState(validUserPassedData.firstName);
  const [lastname, setLastname] = useState(validUserPassedData.lastName);
  const [email, setEmail] = useState(validUserPassedData.email);
  // const [password, setPassword] = useState("");

  const [firstnamemgs, setfirstnamemgs] = useState("");
  const [lastnamemgs, setlastnamemgs] = useState("");
  const [emailmgs, setemailmgs] = useState("");
  // const [passwordmgs, setpasswordmgs] = useState("");

  // console.log(firstname)
  // console.log(lastname)
  // console.log(email)
  // console.log(password)

  function handelfirstname() {
    if (firstname === "") {
      setfirstnamemgs("This field is required");
      firstNameValid = false;
    } else {
      setfirstnamemgs("");
      firstNameValid = true;
    }
  }
  function handellastname() {
    if (lastname === "") {
      setlastnamemgs("This field is required");
      lastNameValid = false;
    } else {
      setlastnamemgs("");
      lastNameValid = true;
    }
  }
  function handelemail() {
    if (email === "") {
      setemailmgs("This field is required");
      emailValid = false;
    } else if (
      !email.match(/(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i)
    ) {
      setemailmgs("Please Enter a Valid Email ");
      emailValid = false;
    } else if (email !== "") {
      setemailmgs("");
      emailValid = true;
    }
  }
  // function handelpassword(){
  //   if(password === ""){
  //     setpasswordmgs("This field is required")
  //     passwordValid = false
  //   }else if(!password.match(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
  //     setpasswordmgs("Please Enter a Valid password ")
  //     passwordValid = false
  //   }
  //   else if (password !== ""){
  //     setpasswordmgs("")
  //     passwordValid = true
  //   }
  // }

  let fetchUrl = `http://localhost:3500/api/v1/app/user/${validUserPassedData._id}`;
  const id = validUserPassedData._id;
  const password = validUserPassedData.password;
  const postData = {
    _id: id,
    firstName: firstname,
    lastName: lastname,
    email: email,
    password: password,
  };

  function validSubmit(event) {
    event.preventDefault();
    handelfirstname();
    handellastname();
    handelemail();

    if (emailValid && firstNameValid && lastNameValid) {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
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
            navigate("/profile");
            localStorage.setItem("data", JSON.stringify(postData));
            console.log(validUserPassedData.email);
          }
          console.log(data);
        })
        .catch((error) => {
          console.error("POST request error:", error);
        });

      // setFirstname("");
      // setLastname("");
      // setEmail("");
      // setPassword("");
    } else if (emailValid) {
      setfirstnamemgs("This field is required");
      setlastnamemgs("This field is required");
      // setpasswordmgs("This field is required");
    } else if (firstNameValid) {
      setlastnamemgs("This field is required");
      setemailmgs("This field is required");
      // setpasswordmgs("This field is required");
    } else if (lastNameValid) {
      setfirstnamemgs("This field is required");
      setemailmgs("This field is required");
      // setpasswordmgs("This field is required");
    }
  }

  function changepassword1() {
    navigate("/change-password");
  }
  function profile1() {
    navigate("/profile");
  }
  function logout() {
    navigate("/");
  }
  function gotodashbord() {
    navigate("/dashbord");
  }
  return (
    <div>
      <nav className="navbar">
        <h3 className="logo">LOGO</h3>
        <div className="nav-main">
          <h1 onClick={gotodashbord}>Home</h1>
          <div className="dropdown">
            <button className="dropbtn">
              <i className="fa-solid fa-user"></i>
              <p>{`${validUserPassedData.firstName} ${validUserPassedData.lastName}`}</p>
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="#" onClick={profile1}>
                Profile
              </a>
              <a href="#" onClick={changepassword1}>
                Change Password
              </a>
              <a href="#" onClick={logout}>
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
              onChange={(e) => {
                setFirstname(e.target.value);
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
              onChange={(e) => {
                setLastname(e.target.value);
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
              onChange={(e) => {
                setEmail(e.target.value);
                handelemail();
              }}
            />
            <p id="emailmgs">{emailmgs}</p>

            {/* <input
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
            <p id="passwordmgs">{passwordmgs}</p> */}
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
