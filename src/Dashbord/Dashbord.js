import React, { useEffect, useRef, useState } from "react";
import "./Dashbord.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  deleteUserMain,
  PutUserMain,
  PostUserMain,
  token
} from "../Axiosinterceptor";

const notify = () => toast(" 🦄 Sucessfully User Added");
const notifyEdit = () => toast(" 🦄 Sucessfully User Updated");
const notifyDelete = () => toast(" 🦄 User deleted");
function Dashbord() {
  const navigate = useNavigate();
  const deletePopUp = useRef();
  const [users, setUsers] = useState([]);
  const [sortOrderName, setSortOrderName] = useState("asc");
  const [sortOrderMobile, setSortOrderMobile] = useState("asc");
  const [filtervalue, setfilterValue] = useState("firstName");

  // const [loading, setLoading] = useState(true);

  function HandelProfile() {
    navigate("/profile");
  }
  function HandelChangePassword() {
    navigate("/change-password");
  }
  function handelLogout() {
    localStorage.clear();
    navigate("/");
  }
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    image: "",
  });

  const token = JSON.parse(localStorage.getItem("myData"));
  console.log(token.token, "token");
  
  useEffect(() => {
    getUser()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => [console.log("Get request error", error)]);
  }, [users.length]);

  console.log(users)

  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const validUserPassedData = JSON.parse(localStorage.getItem("myData"));
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

  // let validateUserAdd = (event) => {
  //   event.preventDefault();
  //   const user = {
  //     firstname: { firstname },
  //     lastname: { lastname },
  //     email: { email },
  //     phone: { phone },
  //     image: { photo },
  //   };
  //   users.push(user);
  //   // displayUser();
  //   console.log(users);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editMode) {
      // Update user data
      const updatedUsers = [...users];
      updatedUsers[selectedUserIndex] = { ...formData };
      setUsers(updatedUsers);
      // {
      //   notifyEdit();
      // }
      // const requestOptionsPUT = {
      //   method: "PUT",

      //   headers: {
      //     "Content-Type": "application/json",
      //   },

      //   body: JSON.stringify(updatedUsers[selectedUserIndex]),
      // };

      // fetch(
      //   `http://localhost:3500/api/v1/app/Dashboard/${_id}`,
      //   requestOptionsPUT
      // )
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error("Network response was not ok");
      //     }

      //     return response.json();
      //   })

      //   .then((data) => {
      //     {
      //       console.log("done!");
      //     }

      //     console.log(data);
      //   })

      //   .catch((error) => {
      //     console.error("POST request error:", error);
      //   });

      // await axios
      //   .put(
      //     `http://localhost:3500/api/v1/app/Dashboard/${_id}`,
      //     updatedUsers[selectedUserIndex]
      //   )
      await PutUserMain(_id, updatedUsers[selectedUserIndex])
        .then((response) => {
          console.log("done!");
          {
            notifyEdit();
            // setShowPopup(false)
            clearForm();
          }
          console.log(response.data);
        })

        .catch((error) => {
          console.error("PUT request error:", error);
        });
    } else {
      // Add new user
      setUsers([...users, { ...formData }]);

      // const requestOptionsPOST = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // };

      // console.log(JSON.stringify(formData));

      // fetch(fetchUrl, requestOptionsPOST)
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error("Network response was not ok");
      //     }
      //     return response.json();
      //   })
      //   .then((data) => {
      //     {
      //       notify();
      //     }
      //     console.log(data);
      //   })
      //   .catch((error) => {
      //     console.error("POST request error:", error);
      //   });

      // const postDataToServer = {
      //   method: "post",
      //   url: fetchUrl,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   data: formData,
      // };
      const data = formData;
      await PostUserMain(data)
        .then((response) => {
          {
            notify();
            // setShowPopup(false)
            clearForm();
          }
          console.log(response.data);
        })

        .catch((error) => {
          console.error("POST request error:", error);
        });
    }
  };
  const changeFilter = (event) => {
    setfilterValue(event.target.value);
    sortData(event.target.value);
  };
  const sortData = (key) => {
    const sortedData = [...users].sort((a, b) => {
      if (key === "firstName") {
        return sortOrderName === "asc"
          ? a.firstName.localeCompare(b.firstName)
          : b.firstName.localeCompare(a.firstName);
      } else if (key === "email") {
        return sortOrderMobile === "asc"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      } else if (key === "phoneNumber") {
        return sortOrderMobile === "asc"
          ? a.phoneNumber - b.phoneNumber
          : b.phoneNumber - a.phoneNumber;
      }
    });
    setUsers(sortedData);
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
      // <Card userProp = {user} userIndex = {index} />
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
  // var deleteid;
  const deleteUser = (_id) => {
    deletePopUp.current.style.display = "block";
    // const updatedUsers = [...users];

    // updatedUsers.splice(index, 1);

    // console.log(_id);
    //  deleteid = _id
    //  deleteyes(_id)
    localStorage.setItem("deleteid", JSON.stringify(_id));
  };

  const deleteno = () => {
    deletePopUp.current.style.display = "none";
  };

  const deleteyes = async () => {
    console.log(deleteLocalId);
    try {
      var deleteLocalId = JSON.parse(localStorage.getItem("deleteid"));
      await deleteUserMain(deleteLocalId);
      console.log(deleteLocalId);
      // await axios.delete(
      //   `http://localhost:3500/api/v1/app/Dashboard/${deleteLocalId}`
      // );
      // Remove the deleted item from the local state
      deletePopUp.current.style.display = "none";
      localStorage.removeItem("deleteid");
      setUsers(users.filter((item) => item._id !== deleteLocalId));
      notifyDelete();
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
              <p>{`${validUserPassedData.data.firstName} ${validUserPassedData.data.lastName}`}</p>
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
          <div className="filterBy">
          <label htmlFor="filter">Filter by:</label>
          <select
            name="filter"
            id="filter"
            onChange={changeFilter}
            value={filtervalue}
          >
            <option value="firstName">Name</option>
            <option value="email">Email</option>
            <option value="phoneNumber">Number</option>
          </select>
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
        <div className="deletePopUp" id="deletePopUp" ref={deletePopUp}>
          <div className="deletePopUpdata">
            <h3>Are you sure want to delete?</h3>
            <div>
              <button className="deleteyes" onClick={deleteyes}>
                <i className="fa-solid fa-thumbs-up"></i>Yes
              </button>
              <button className="deleteno" onClick={deleteno}>
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
