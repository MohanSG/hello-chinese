import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/navbar.css";

function NavBar() {
    const [selected, setSelected] = useState("")

    const handleClick = (event) => {
        
    }

    return (
        <nav className="navbar-container">
            <div className="logo-container">
                <img className="logo" src="../src/assets/logo.png" alt="logo" />
            </div>

            <div className="navlinks-container">
                <ul>
                    <li>
                        <NavLink to="/" >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/About">About Us</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Book">Book a Class</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Contact">Contact</NavLink>
                    </li>
                </ul>
            </div>

        </nav>
    )
}

export default NavBar;