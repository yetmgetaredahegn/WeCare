import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState<"patient" | "doctor">("patient");

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Create your account
          </h1>
          <p className="text-sm text-slate-600">
            Start your journey with WeCare
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("patient")}
            className={`rounded-lg py-2.5 text-sm font-semibold transition
              ${
                role === "patient"
                  ? "bg-cyan-600 text-white shadow"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
          >
            Patient
          </button>

          <button
            type="button"
            onClick={() => setRole("doctor")}
            className={`rounded-lg py-2.5 text-sm font-semibold transition
              ${
                role === "doctor"
                  ? "bg-cyan-600 text-white shadow"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
          >
            Doctor
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5">

          {/* First name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              First name
            </label>
            <input
              name="first_name"
              type="text"
              placeholder="John"
              className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-200 focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Last name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Last name
            </label>
            <input
              name="last_name"
              type="text"
              placeholder="Doe"
              className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-200 focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-200 focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-200 focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm password
            </label>
            <input
              name="re_password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-200 focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700 hover:shadow-lg active:scale-95"
          >
            Create account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-600 hover:text-cyan-700"
          >
            Sign in
          </Link>
        </p>

        {/* Hidden role mapping (conceptual) */}
        {/* 
          Payload example:
          {
            first_name,
            last_name,
            email,
            password,
            re_password,
            is_patient: role === "patient",
            is_doctor: role === "doctor"
          }
        */}
      </div>
    </section>
  );
};

export default Register;
