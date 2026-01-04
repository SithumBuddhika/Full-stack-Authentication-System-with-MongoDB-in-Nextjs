"use client";

import axios from "axios";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", { email });
      setSent(true);
      toast.success("If an account exists, a reset link has been sent.");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const disabled = !email.trim() || loading;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="relative w-full max-w-md">
        <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-7 sm:p-8">
          <h1 className="text-2xl font-semibold text-white">Forgot password</h1>
          <p className="mt-2 text-sm text-slate-300">
            Enter your email address and we’ll send you a reset link.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                type="email"
                className="w-full rounded-xl border border-white/10 bg-white/90 text-slate-900 placeholder:text-slate-500 px-3 py-2.5 outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-transparent transition"
              />
            </div>

            <button
              onClick={onSubmit}
              disabled={disabled}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/15 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 disabled:cursor-not-allowed disabled:opacity-60 transition"
            >
              {loading ? "Sending..." : sent ? "Link sent" : "Send reset link"}
            </button>

            <div className="text-center text-sm text-slate-300">
              Remembered your password?{" "}
              <Link href="/login" className="font-semibold text-white underline underline-offset-4 hover:text-cyan-200">
                Login
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            Secure reset • Link expires in 1 hour
          </div>
        </div>
      </div>
    </div>
  );
}
