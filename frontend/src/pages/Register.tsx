import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState<"patient" | "doctor">("patient");

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-600">
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
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Form */}
        <form className="space-y-4">

          <input
            type="text"
            placeholder="First name"
            className="w-full rounded-xl border px-4 py-4 text-base
                       placeholder-slate-400
                       focus:ring-2 focus:ring-cyan-200 outline-none"
          />

          <input
            type="text"
            placeholder="Last name"
            className="w-full rounded-xl border px-4 py-4 text-base
                       placeholder-slate-400
                       focus:ring-2 focus:ring-cyan-200 outline-none"
          />

          <input
            type="email"
            placeholder="Email address"
            autoComplete="email"
            className="w-full rounded-xl border px-4 py-4 text-base
                       placeholder-slate-400
                       focus:ring-2 focus:ring-cyan-200 outline-none"
          />

          <input
            type="password"
            placeholder="Create password"
            autoComplete="new-password"
            className="w-full rounded-xl border px-4 py-4 text-base
                       placeholder-slate-400
                       focus:ring-2 focus:ring-cyan-200 outline-none"
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full rounded-xl border px-4 py-4 text-base
                       placeholder-slate-400
                       focus:ring-2 focus:ring-cyan-200 outline-none"
          />

          {/* CTA */}
          <button
            type="submit"
            className="w-full mt-4 rounded-xl bg-cyan-600 py-4 text-base font-semibold text-white"
          >
            Create account
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
