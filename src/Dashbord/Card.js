import React from 'react'

function Card() {
  return (
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
  )
}

export default Card