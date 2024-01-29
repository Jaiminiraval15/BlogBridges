import { useState } from "react";
import "../../index.css";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
 
  };

  return (
    <div className="login-container">
      <div className="login-paper">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
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
            Login
          </button>
          {error && <div className="login-error">{error}</div>}
        </form>
      </div>
    </div>
  );
};
