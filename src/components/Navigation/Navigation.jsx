import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../services/firebase";
import { signOut } from "firebase/auth";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import "./navigation.css";

function Navigation() {
  const { currentUser, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error logging out.");
    }
  };

  return (
    <Navbar className="custom-navbar">
      <div className="sidebar-content">
        <Navbar.Brand as={RouterLink} to="/">Senfrost</Navbar.Brand>
        <Nav className="flex-column">
          <Nav.Link as={RouterLink} to="/#home">Home</Nav.Link>
          <Nav.Link as={RouterLink} to="/#services">Services</Nav.Link>
          <Nav.Link as={RouterLink} to="/#pricing">Pricing</Nav.Link>
          <Nav.Link as={RouterLink} to="/#about-us">About Us</Nav.Link>
          {currentUser ? (
            <>
              <span className="nav-link">Hi, {userData?.firstName || currentUser.email}</span>
              <span className="nav-link" style={{ cursor: 'pointer' }} onClick={handleLogout}>Logout</span>
            </>
          ) : (
            <Nav.Link as={RouterLink} to="/auth">Login / Signup</Nav.Link>
          )}
        </Nav>
      </div>
    </Navbar>
  );
}

export default Navigation;
