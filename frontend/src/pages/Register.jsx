import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form className="card bg-base-100 shadow-lg w-96" onSubmit={handleSubmit}>
        <div className="card-body">
          <h2 className="text-xl font-bold">Register</h2>

          {["username", "fullName", "email", "password"].map((field) => (
            <input
              key={field}
              type={field === "password" ? "password" : "text"}
              placeholder={field}
              className="input input-bordered"
              onChange={(e) =>
                setForm({ ...form, [field]: e.target.value })
              }
            />
          ))}

          <button className="btn btn-primary mt-2">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
