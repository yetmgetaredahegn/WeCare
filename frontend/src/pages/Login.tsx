import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back
          </h1>
          <p className="text-slate-600 text-sm">
            Sign in to continue to your healthcare dashboard
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
            />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-600 py-3 text-base font-semibold text-white transition hover:bg-cyan-700 hover:shadow-lg active:scale-95"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-slate-400">
              New to WeCare?
            </span>
          </div>
        </div>

        {/* Signup link */}
        <p className="text-center text-sm text-slate-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-600 hover:text-cyan-700"
          >
            Create one
          </Link>
        </p>

      </div>
    </section>
  );
};

export default Login;
