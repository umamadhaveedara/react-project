import React, { useEffect, useState } from 'react'

function DisplayUsers({userlist}) {

  var mainUserData = userlist
  var deleteUserData = userlist

  
  const handelDelete = (index)=>{
    deleteUserData = mainUserData.filter((ecahdata,dataindex)=> dataindex != index)
    mainUserData = deleteUserData;
    console.log(mainUserData)

  }
  useEffect(()=>{

  },[mainUserData])
  return (
    // console.log(userlist)
    mainUserData.map((eachuser,index)=>{
      const {firstname, lastname, email, phone, image} = eachuser
      return(
        <>
        <div className="userBox" key={index}>
          <div className="userIcons">
            <i className="fa-solid fa-pen"></i>
            <i className="fa-solid fa-trash" onClick={()=>handelDelete(index)}></i>
          </div>
          <div className="userMainInfo">
            <div className="userImg"><img src={image} alt="" srcset=""/></div>
            <div className="userdata">
              <p>Name: {firstname} {lastname}</p>
              <p>Email: {email}</p>
              <p>Mobile No:{phone}</p>
            </div>
          </div>
        </div>
        </>
      )
    })
  )
}

export default DisplayUsers