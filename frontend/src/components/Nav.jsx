// import React from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios';

// const Nav = () => {
//   const logoutsystem = async () => {
//     try { 
//       const response = await axios.get('http://localhost:8000/api/logout',{
//         withCredentials: true,  
//       });  
//       console.log("Logout Done")
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   }
//   return (
//     <div>
//       <nav>
//       <Link  to='/api/login'>Login</Link>
//       <Link   to='/api/registration'>RegisterEmployee</Link> 
//       <button onClick={()=>{logoutsystem()}}>LogOut</button>
//       </nav>
//     </div>
//   )
// }

// export default Nav
