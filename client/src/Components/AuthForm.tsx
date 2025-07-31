import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import GoogleButton from "./GoogleButton";

type AuthFormProps = {
  isSignup?: boolean;
};

const AuthForm = ({ isSignup = false }: AuthFormProps) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "youtuber";
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-1">
          {isSignup ? `Join as a ${role}` : `Welcome back, ${role}`}
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          {isSignup ? "Create your account" : "Login to your dashboard"}
        </p>

        {isSignup && (
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-3 p-3 border rounded-xl"
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-xl"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-5 p-3 border rounded-xl"
        />

        <button className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition mb-4">
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <GoogleButton />

        <div className="text-center text-sm mt-4 text-gray-600">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <Link
                to={`/login?role=${role}`}
                className="text-indigo-600 hover:underline"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <Link
                to={`/signup?role=${role}`}
                className="text-indigo-600 hover:underline"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
