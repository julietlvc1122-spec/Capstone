import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router";
import "./register.css";
import { Eye, EyeOff } from "lucide-react";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    setError(null);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ email, username, password });
      navigate("/"); // should bring user home
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="register-page">
      <header className="register-header">
        <Link to="/" className="register-logo">
          Stumped
        </Link>

        <Link to="/" className="home-link">
          Home
        </Link>
      </header>
      <main className="register-content">
        <h1>Create your account</h1>
        <p>Join Stumped and find your next woodworking project.</p>
        <form action={tryRegister}>
          <label>
            Email
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
            />
          </label>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              placeholder="Enter your username"
            />
          </label>
          <label>
            Password
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </label>
          <button>Register</button>
          {error && <p role="alert">{error}</p>}
          <Link className="redirect-link" to="/login">
            Already have an account? Log in here.
          </Link>
        </form>
      </main>
    </div>
  );
}
