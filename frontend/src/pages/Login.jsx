import { useState } from "react";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      setUser(res.data.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-lg w-96"
      >
        <div className="card-body">
          <h2 className="text-xl font-bold">Login</h2>

          {error && <p className="text-error text-sm">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="btn btn-primary mt-2">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
