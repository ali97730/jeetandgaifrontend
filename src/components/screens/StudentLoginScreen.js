import { useState, useEffect } from "react";
import { toast,ToastContainer } from "react-toastify";

import Navbar from "./Navbar";


import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";



const StudentLoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/studentlogin");
    }
  }, [history]);


  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/student/login",
        { email, password },
        config
      );
      
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("studentid", data.student_id);
      history.push(`/scanqr/`);
    } catch (error) {
      // setError(error.response.data.error);
      toast(error.response.data.error,{type:"error"})
      setTimeout(() => {
        // setError("");
      }, 5000);
    }
  };

  return (

    <div className="container-fluid ps-md-0">
      <Navbar/>
      <ToastContainer/>
  <div className="row g-0">
    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
    <div className="col-md-8 col-lg-6">
      <div className="login d-flex align-items-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-lg-8 mx-auto">
              <h3 className="login-heading mb-4">Welcome back!</h3>

              
              <form onSubmit={loginHandler}>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  tabIndex={1}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                  required
                  autoComplete="true"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  tabIndex={2}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-check mb-3">
                <span className="login-screen__subtext">
                  Don't have an account? <Link to="/register">Register</Link>
                </span>
                </div>

                <div className="d-grid">
                  <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit">Sign in</button>
                  <div className="text-center">
                  <Link to="/forgotpassword" className="login-screen__forgotpassword ">
                      Forgot Password?
                  </Link>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default StudentLoginScreen;


// <div  className="top" style={{display:"flex",justifyContent:"center"}}>
//       <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
//           <img  className="loginimage" src={logoimage} alt="logoimage"/>
//       </div>
//       <div className="login-screen">
//       <form onSubmit={loginHandler} className="login-screen__form">
//         <h3 className="login-screen__title">Login<ToastContainer/></h3>
//         <div className="form-group form-groupLogin">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             required
//             id="email"
//             placeholder="Email address"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             tabIndex={1}
//           />
//         </div>
//         <div className="form-group form-groupLogin">
//           <label htmlFor="password">
//             Password:{" "}
//             <Link to="/forgotpassword" className="login-screen__forgotpassword">
//               Forgot Password?
//             </Link>
//           </label>
//           <input
//             type="password"
//             required
//             id="password"
//             autoComplete="true"
//             placeholder="Enter password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             tabIndex={2}
//           />
//         </div>
//         <button type="submit" className="btn btn-success">
//           Login
//         </button>

//         <span className="login-screen__subtext">
//           Don't have an account? <Link to="/register">Register</Link>
//         </span>
//       </form>
//     </div>
//     </div>