import React from "react";
import "./login.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
    const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
    } catch (err) {
      console.log(err.response);
    console.log(err.response?.data);
    console.log(err);

    setError(err.response?.data?.message || "Login failed");
    }}
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
        <span className="error">
          {error}
        </span>
      )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;






