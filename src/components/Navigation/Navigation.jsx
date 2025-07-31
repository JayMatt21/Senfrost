import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

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
    <Navbar expand="lg" className="custom-navbar" sticky="top">
      <Container fluid>
        <Navbar.Brand as={RouterLink} to="/" className="brand-logo me-auto">
          Senfrost
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={RouterLink} to="/">Home</Nav.Link>
            <Nav.Link as={RouterLink} to="/services">Services</Nav.Link>
            <Nav.Link as={RouterLink} to="/pricing">Pricing</Nav.Link>
            <Nav.Link as={RouterLink} to="/about-us">About Us</Nav.Link>
            {currentUser ? (
              <>
                <span className="nav-link">Hi, {userData?.firstName || currentUser.email}</span>
                <span className="nav-link" style={{ cursor: 'pointer' }} onClick={handleLogout}>Logout</span>
              </>
            ) : (
              <Nav.Link as={RouterLink} to="/auth">Login / Signup</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
