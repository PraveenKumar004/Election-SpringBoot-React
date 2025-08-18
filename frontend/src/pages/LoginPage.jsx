import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/users/login?email=${email}&password=${password}`
      );

      if (response.status === 201) {
        const user = response.data;
        sessionStorage.setItem("id", user.id); // store user.id
        alert("Login successful!");
        console.log("User logged in:", user);
        navigate('/'); // redirect to homepage
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Invalid email or password!");
      } else {
        console.error("Login error:", error);
        alert("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
