import { useState } from "react";
import { useAuth } from "./Auth/AuthContext";
import { useNavigate, Link } from "react-router";

/** A form that allows users to log into an existing account. */
export default function Login() {
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
    <>
      <h1>Log in to your account</h1>
      <form action={tryLogin}>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Login</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <Link to="/register">Need an account? Register here.</Link>
    </>
  );
}
