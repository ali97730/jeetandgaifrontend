import React from 'react'
import "./Home.css";
import Navbar from './Navbar';
import { Link } from "react-router-dom";


export default function Home() {
    return (

       <div>
           <button><Link to="/studentlogin">Student Login</Link></button>
           <button><Link to="/facultylogin">Faculty Login</Link></button>
       </div>
    )
}
