import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useNavigate, Link } from "react-router";
import "./loginPage.css";
import { Eye, EyeOff } from "lucide-react";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  const tryLogin = async (formData) => {
    setError(null);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await login({ email, password });
      navigate("/"); // brings them to home page
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <Link to="/" className="login-logo">
          Stumped
        </Link>
      </header>
      <main className="login-content">
        <h1>Log into your account</h1>
        <p>Jump back into the fun!</p>
        <form action={tryLogin}>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
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
          <button>Login</button>
          {error && <p role="alert">{error}</p>}
          <Link className="redirect-link" to="/register">
            Need an account? Register here.
          </Link>
        </form>
      </main>
    </div>
  );
}
