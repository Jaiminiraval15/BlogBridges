import { useState } from "react";

import { useNavigate } from "react-router-dom";
import "../../index.css";
import { useSignup } from "../../hooks/useSignup";

export const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, firstName, lastName, userName);
  
  };

  return (
    <div className="login-container">
      <div className="login-paper">
        <h2 className="login-title">Sign Up</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="login-input"
            />
          </label>
          <label className="login-label">
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="login-input"
            />
          </label>
          <label className="login-label">
            Username
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="login-input"
            />
          </label>
          <label className="login-label">
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </label>
          <label className="login-label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </label>
          <button
            type="submit"
            className={`login-button ${isLoading ? "disabled" : ""}`}
            disabled={isLoading}
          >
            Sign Up
          </button>
          {error && <div className="login-error">{error}</div>}
        </form>
      </div>
    </div>
  );
};
