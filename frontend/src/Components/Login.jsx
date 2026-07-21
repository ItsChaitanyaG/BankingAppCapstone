import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await toast.promise(
        axios.post(
          "http://localhost:8000/api/v1/auth/login",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        ),
        {
          loading: "Logging in...",
          success: "Login successful!",
          error: (err) =>
            err.response?.data?.message || "Login failed",
        }
      );

      const role = res.data.data.user.role;

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="m-15">
        <button className="btn btn-ghost mb-6 flex justify-self-start" onClick={() => navigate("/")}>← Back</button>
        <div className="flex justify-center">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-neutral mt-4" onClick={login}>
              Login
            </button>

            <div>
              Don't have an account?{" "}
              <a className="underline" href="/register">
                Register
              </a>
            </div>
          </fieldset>
        </div>

      </div>

    </>
  );
};

export default Login;
