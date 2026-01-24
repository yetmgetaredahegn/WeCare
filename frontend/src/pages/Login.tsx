import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.tsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- get login function from context

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/jwt/create/",
        formData
      );

      const { access, refresh } = response.data;

      // ✅ Update global auth state instead of localStorage directly
      login(access, refresh);

      // redirect after login
      navigate("/");
    } catch (err: any) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 text-slate-900
        dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300 px-4">
      <div className="w-full max-w-md rounded-2xl p-6 shadow-xl dark:shadow-cyan-600/30
        bg-white dark:bg-slate-900
        text-slate-900 dark:text-slate-100
        transition-colors duration-300">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Sign in to continue to WeCare
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 outline-none">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-4 text-base text-slate-900
              placeholder-slate-400 dark:placeholder-slate-500 dark:text-slate-100 dark:focus:bg-slate-800
              focus:ring-2 focus:ring-cyan-200 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-4 text-base text-slate-900
              placeholder-slate-400 dark:placeholder-slate-500 dark:text-slate-100
              focus:ring-2 focus:ring-cyan-200 outline-none"
          />

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-cyan-600">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-600 py-4 text-base font-semibold text-white
              transition active:scale-95 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          New to WeCare?{" "}
          <Link to="/register" className="font-semibold text-cyan-600">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
