import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppStateContext from "hooks/useAppStateContext";
import "styles/Navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { appState, dispatch } = useAppStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "Logout" });
    navigate("/login");
  };

  return (
    <nav className={`nav ${isScrolled ? "nav_black" : ""}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        onClick={() => navigate("/home")}
      />

      <img
        className="nav_avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="User Avatar"
        onClick={() => setShowDropdown(!showDropdown)}
      />

      {showDropdown && (
        <div className="dropdown">
          <span>{appState?.user?.name || "User"}</span>
          <span onClick={handleLogout}>Logout</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
