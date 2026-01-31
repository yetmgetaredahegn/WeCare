import React, { useState } from "react";
import { api } from "@/lib/api";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"patient" | "doctor">("patient");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/auth/users/", {
        ...formData,
        is_doctor: role === "doctor",
        is_patient: role === "patient",
      });

      // successful registration → go to login
      navigate("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
        "Registration failed. Please check your input."
      );
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
    transition-colors duration-300 ">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Register in a few easy steps
          </p>
        </div>

        {/* Role selection */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          {["patient", "doctor"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r as "patient" | "doctor")}
              className={`rounded-xl py-4 text-base font-semibold transition
                ${
                  role === r
                    ? "bg-cyan-600 text-white dark:bg-cyan-500"
                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-900 dark:border-s-cyan-700"
                }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="mb-3 text-sm text-red-600 text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="first_name"
            type="text"
            placeholder="First name"
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-4 text-base text-slate-900
                       placeholder-slate-400
                       focus:ring-2 focus:ring-cyan-200 outline-none dark:placeholder-slate-500 dark:text-slate-100"
          />

          <input
            name="last_name"
            type="text"
            placeholder="Last name"
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-4 text-base text-slate-900
                       placeholder-slate-400
                       focus:ring-2 focus:ring-cyan-200 outline-none dark:placeholder-slate-500 dark:text-slate-100"
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-4 text-base text-slate-900
                       placeholder-slate-400
                       focus:ring-2 focus:ring-cyan-200 outline-none dark:placeholder-slate-500 dark:text-slate-100"
          />

          <input
            name="password"
            type="password"
            placeholder="Create password"
            autoComplete="new-password"
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-4 text-base text-slate-900
                       placeholder-slate-400
                       focus:ring-2 focus:ring-cyan-200 outline-none dark:placeholder-slate-500 dark:text-slate-100"
          />

          <input
            name="re_password"
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-4 text-base text-slate-900
                       placeholder-slate-400
                       focus:ring-2 focus:ring-cyan-200 outline-none dark:placeholder-slate-500 dark:text-slate-100"
          />

          {/* CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 rounded-xl bg-cyan-600 py-4 text-base font-semibold text-white disabled:opacity-60 dark:bg-cyan-500
                       transition active:scale-95"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-cyan-600">
            Sign in
          </Link>
        </p>

      </div>
    </section>
  );
};

export default Register;
