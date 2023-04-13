import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./register.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const { data } = await axios.post(
        "https://task-app-api-iro1.onrender.com/api/v1/user/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setIsLoading(false);
      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }

  return (
    <div className="registerWrapper">
      <form className="regInputWrapper" onSubmit={loginHandler}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button disabled={isLoading}>Login</button>
        <span>---or---</span>
        <Link to={"/register"}>Register</Link>
      </form>
    </div>
  );
};

export default Login;
