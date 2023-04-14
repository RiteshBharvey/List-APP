import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./header.css";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://task-app-api-iro1.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      );

      setIsLoading(false);
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  return (
    <nav>
      <h2 className="logoText">Task App</h2>
      <div className="navLinks">
        <NavLink
          to={"/"}
          style={({ isActive }) => {
            return { backgroundColor: isActive ? "yellowgreen" : "" };
          }}
        >
          Home
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to={"/userprofile"}
            style={({ isActive }) => {
              return { backgroundColor: isActive ? "yellowgreen" : "" };
            }}
          >
            Profile
          </NavLink>
        )}
        {isAuthenticated ? (
          <button
            className="navBtn"
            onClick={logoutHandler}
            disabled={isLoading}
          >
            Logout
          </button>
        ) : (
          <NavLink
            to={"/login"}
            style={({ isActive }) => {
              return { backgroundColor: isActive ? "yellowgreen" : "" };
            }}
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
