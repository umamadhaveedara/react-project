import React, { useEffect, useRef, useState } from "react";
import "./Dashbord.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
// import profile from "../Profile/Profile";
var cardURL = "";
var users = [];
const notify = () => toast(" 🦄 Sucessfully User Added");
const notifyEdit = () => toast(" 🦄 Sucessfully User Updated");
const notifyDelete = () => toast(" 🦄 User deleted");
const fetchUrl = "http://localhost:3500/api/v1/app/Dashboard";
function Dashbord() {
  const navigate = useNavigate();

  function HandelProfile() {
    // window.open("profile", "_self");
    navigate("/profile");
  }
  function HandelChangePassword() {
    // window.open("change-password", "_self");
    navigate("/change-password");
  }
  function handelLogout() {
    localStorage.clear();
    // window.open("/", "_self");
    navigate("/");
  }
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    image: "",
  });

  const requestOptionsGET = {
    method: "GET",
  };

  useEffect(() => {
    fetch(fetchUrl, requestOptionsGET)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("GET request error:", error);
      });
  }, []);

  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const validUserPassedData = JSON.parse(localStorage.getItem("data"));
  const [_id, setId] = useState("");

  var firstNameValid = "";
  var lastNameValid = "";
  var emailValid = "";
  var PhoneValid = "";

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");

  const [firstnamemgs, setfirstnamemgs] = useState("");
  const [lastnamemgs, setlastnamemgs] = useState("");
  const [emailmgs, setemailmgs] = useState("");
  const [phonemgs, setphonemgs] = useState("");
  const [photomgs, setphotomgs] = useState("");

  let validateUserAdd = (event) => {
    event.preventDefault();
    const user = {
      firstname: { firstname },
      lastname: { lastname },
      email: { email },
      phone: { phone },
      image: { photo },
    };
    users.push(user);
    // displayUser();
    console.log(users);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editMode) {
      // Update user data
      const updatedUsers = [...users];
      updatedUsers[selectedUserIndex] = { ...formData };
      setUsers(updatedUsers);
      {
        notifyEdit();
      }
      const requestOptionsPUT = {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updatedUsers[selectedUserIndex]),
      };

      fetch(
        `http://localhost:3500/api/v1/app/Dashboard/${_id}`,
        requestOptionsPUT
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          return response.json();
        })

        .then((data) => {
          {
            console.log("done!");
          }

          console.log(data);
        })

        .catch((error) => {
          console.error("POST request error:", error);
        });
    } else {
      // Add new user
      setUsers([...users, { ...formData }]);

      const requestOptionsPOST = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      console.log(JSON.stringify(formData));

      fetch(fetchUrl, requestOptionsPOST)
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
          console.log(data);
        })
        .catch((error) => {
          console.error("POST request error:", error);
        });
    }
    clearForm();
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // const imageUrl = URL.createObjectURL(file);
      // setFormData({ ...formData, image: imageUrl });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageUrl = reader.result;
        setFormData({ ...formData, image: imageUrl });
      };
    }
  };

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = (e) => {
  //       const base64String = e.target.result;
  //       setFormData({ ...formData, image: base64String });
  //     };
  //     // reader.readAsDataURL(file);
  //   }
  // };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      image: "",
    });
    setEditMode(false);
    setSelectedUserIndex(null);
    setShowPopup(false);
  };

  const filteredUsers = searchQuery
    ? users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchQuery) ||
          user.lastName.toLowerCase().includes(searchQuery) ||
          user.email.toLowerCase().includes(searchQuery) ||
          user.phoneNumber.toString().toLowerCase().includes(searchQuery)
      )
    : users;
  const renderUserRows = () => {
    if (searchQuery && filteredUsers.length === 0) {
      return <p>No users found</p>;
    }

    return filteredUsers.map((user, index) => (
      <>
        <div className="userBox">
          <div class="userIcons">
            <button onClick={() => editUser(index, user._id)}>
              <i class="fa-solid fa-pen"></i>
            </button>
            <button onClick={() => deleteUser(user._id)}>
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
          <div class="userMainInfo">
            <div class="userImg">
              <img src={user.image} alt="Profile" srcset="" />
            </div>
            <div class="userdata">
              <p>
                Name: {user.firstName}
                {user.lastName}
              </p>
              <p>Email: {user.email}</p>
              <p>Mobile No: {user.phoneNumber}</p>
            </div>
          </div>
        </div>
      </>
    ));
  };

  // const deleteUser = (index) => {
  //   const updatedUsers = [...users];
  //   updatedUsers.splice(index, 1);
  //   setUsers(updatedUsers);
  //   {
  //     notifyDelete();
  //   }
  // };

  const deleteUser = async (_id) => {
    // const updatedUsers = [...users];

    // updatedUsers.splice(index, 1);

    console.log(_id);

    try {
      await fetch(`http://localhost:3500/api/v1/app/Dashboard/${_id}`, {
        method: "DELETE",
      });

      // Remove the deleted item from the local state

      setUsers(users.filter((item) => item._id !== _id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const editUser = (index, id) => {
    setShowPopup(true);
    setEditMode(true);
    setId(id);
    setSelectedUserIndex(index);
    const selectedUser = users[index];
    setFormData({ ...selectedUser });
  };
  return (
    <div className="container-dashbord">
      <nav className="navbar">
        <h3 className="logo">LOGO</h3>
        <div className="nav-main">
          <h1>Home</h1>
          <div className="dropdown">
            <button className="dropbtn">
              <i className="fa-solid fa-user"></i>
              <p>{`${validUserPassedData.firstName} ${validUserPassedData.lastName}`}</p>
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="#" onClick={HandelProfile}>
                Profile
              </a>
              <a href="#" onClick={HandelChangePassword}>
                Change Password
              </a>
              <a href="#" onClick={handelLogout}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="content">
        <div className="addUserOption">
          <div className="search-main">
            <input
              type="type"
              name="search"
              id="search"
              placeholder="Search User"
              onChange={handleSearch}
            />
          </div>
          <button id="addUserBtn" onClick={() => setShowPopup(true)}>
            Add User
          </button>
        </div>
        <div className="dataBox" id="dataBox">
          {renderUserRows()}
        </div>
        {showPopup && (
          <div className="addUserPopUp" id="addUserPopUp">
            <div className="closeBtn">
              <h3 id="popuptitle">Add User</h3>
              <button
                className="btn-close"
                id="PopUpCloseBtn"
                onClick={clearForm}
              >
                &times;
              </button>
            </div>
            <form
              action="/"
              className="addUserPopUpForm"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="firstName"
                id="firstname"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <p id="firstnamemgs">{firstnamemgs}</p>
              <input
                type="text"
                name="lastName"
                id="lastname"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <p id="lastnamemgs">{lastnamemgs}</p>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <p id="emailmgs">{emailmgs}</p>
              <input
                type="text"
                name="phoneNumber"
                id="phone"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <p id="phonemgs">{phonemgs}</p>
              <div id="image-preview-container">
                <img
                  src={formData.image}
                  id="image-preview"
                  alt="Image Preview"
                />
              </div>
              <input
                type="file"
                id="image-input"
                accept="image/*"
                onchange="handleImageUrl(event)"
                // value={photo}
                onChange={handleImageUpload}
              />
              <p id="photomgs">{photomgs}</p>
              <br />
              {editMode ? (
                <input type="submit" value="Update" class="adduserbtn btn" />
              ) : (
                <input
                  type="submit"
                  value="Add User"
                  className="adduserbtn btn"
                />
              )}
            </form>
          </div>
        )}
        <div className="deletePopUp" id="deletePopUp">
          <div className="deletePopUpdata">
            <h3>Are you sure want to delete?</h3>
            <div>
              <button className="deleteyes" onClick="deleteyes(event)">
                <i className="fa-solid fa-thumbs-up"></i>Yes
              </button>
              <button className="deleteno" onClick="deleteno(event)">
                <i className="fa-solid fa-thumbs-down"></i>No
              </button>
            </div>
          </div>
        </div>
        <div className="emptyDataPopUp" id="emptyDataPopUp">
          <p>No data Found!</p>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
