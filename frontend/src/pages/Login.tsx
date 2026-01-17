import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to continue to WeCare
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              autoComplete="email"
              className="w-full rounded-xl border border-slate-300 px-4 py-4 text-base
                         placeholder-slate-400
                         focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-300 px-4 py-4 text-base
                         placeholder-slate-400
                         focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
            />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-cyan-600"
            >
              Forgot password?
            </Link>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="w-full mt-2 rounded-xl bg-cyan-600 py-4 text-base font-semibold text-white
                       transition active:scale-95"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
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
