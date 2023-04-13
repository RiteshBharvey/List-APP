import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [isRegistered,setIsRegistered] = useState(false);


  const registerHandler = async (e) => {
    try{
      e.preventDefault();
      setIsLoading(true);
      if (password !== checkPassword) {
        toast.error("Password not matched");
        setIsLoading(false);
        return;
      }
    
      const {data} = await axios.post(
        "https://task-app-api-iro1.onrender.com/api/v1/user/new",
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setIsLoading(false);
      toast.success(data.message)
      setIsRegistered(true)
    
    }catch(e){
      setIsLoading(false);
      toast.error(e.response.data.message);
      setIsRegistered(false)
    }
  };

  if(isRegistered){
    return <Navigate to={"/login"}/>
  }

  return (
    <div className="registerWrapper">
      <form className="regInputWrapper" onSubmit={registerHandler}>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <input
          type="password"
          required
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
          placeholder="Confirm your password"
        />
        <button disabled={isLoading}>Register</button>
        <span>---or---</span>
        <Link to={"/login"}>Login</Link>
      </form>
    </div>
  );
};

export default Register;
