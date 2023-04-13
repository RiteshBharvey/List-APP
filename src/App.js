import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import UserProfile from "./components/UserProfile";

function App() {
  const { setUser, setIsAuthenticated } =
    useContext(AuthContext);
  useEffect(() => {
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
        setIsAuthenticated(false);
      });
  }, [setIsAuthenticated, setUser]);
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
