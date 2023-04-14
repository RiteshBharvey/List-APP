import React, { useContext, useEffect } from "react";
import "./userProfile.css";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  const { setUser, setIsAuthenticated } =
  useContext(AuthContext);
useEffect(() => {
  if(user){
    return;
  }
  //console.log("called 1");
  axios
    .get("https://task-app-api-iro1.onrender.com/api/v1/user/myProfile", {
      withCredentials: true,
    })
    .then((res) => {
      setUser(res.data.userDetails);
      setIsAuthenticated(true);
    })
    .catch((err) => {
      //setUser({});
      //console.log("called");
      setIsAuthenticated(false);
    });
}, [setIsAuthenticated, user, setUser]);
 
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
