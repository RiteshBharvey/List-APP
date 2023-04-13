import React, { useContext } from "react";
import "./userProfile.css";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
 
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="userDetails">
      <h1>hello {user?.name}</h1>
    </div>
  );
};

export default UserProfile;
