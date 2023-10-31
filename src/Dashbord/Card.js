// import React from 'react'

// function Card({userProp, userIndex}) {
//     console.log(userProp)
//     const {_id,phoneNumber,lastName,image,firstName,email}  = userProp
//     // console.log(props)
//     // console.log(userIndex)

//   return (
//       <>
//         <div className="userBox">
//           <div class="userIcons">
//             <button onClick={() => editUser(userIndex, _id)}>
//               <i class="fa-solid fa-pen"></i>
//             </button>
//             <button onClick={() => deleteUser(_id)}>
//               <i class="fa-solid fa-trash"></i>
//             </button>
//           </div>
//           <div class="userMainInfo">
//             <div class="userImg">
//               <img src={image} alt="Profile" srcset="" />
//             </div>
//             <div class="userdata">
//               <p>
//                 Name: {firstName}
//                 {lastName}
//               </p>
//               <p>Email: {email}</p>
//               <p>Mobile No: {phoneNumber}</p>
//             </div>
//           </div>
//         </div>
//     </>
//   )
// }

// export default Card