"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    setToken(urlToken || "");
  }, []);

  const tokenPreview = useMemo(() => {
    if (!token) return "No token found";
    return token.length <= 18 ? token : `${token.slice(0, 10)}...${token.slice(-8)}`;
  }, [token]);

  const disabled = useMemo(() => {
    if (!token) return true;
    if (!password || !confirm) return true;
    if (password !== confirm) return true;
    if (password.length < 6) return true;
    return loading;
  }, [token, password, confirm, loading]);

  const onReset = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/resetpassword", { token, password });
      toast.success("Password reset successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="relative w-full max-w-md">
        <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-7 sm:p-8">
          <h1 className="text-2xl font-semibold text-white">Reset password</h1>
          <p className="mt-2 text-sm text-slate-300">Create a new password for your account.</p>

          <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-3">
            <p className="text-xs uppercase tracking-wider text-slate-400">Token</p>
            <p className="mt-1 text-xs text-slate-200 break-all">{tokenPreview}</p>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">New password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={show ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full rounded-xl border border-white/10 bg-white/90 text-slate-900 placeholder:text-slate-500 px-3 py-2.5 outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-transparent transition"
              />
              <p className="mt-1 text-xs text-slate-400">Minimum 6 characters.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">Confirm password</label>
              <input
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type={show ? "text" : "password"}
                placeholder="Re-enter new password"
                className="w-full rounded-xl border border-white/10 bg-white/90 text-slate-900 placeholder:text-slate-500 px-3 py-2.5 outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-transparent transition"
              />
              {confirm && password !== confirm && (
                <p className="mt-1 text-xs text-rose-200">Passwords do not match.</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="text-xs text-slate-300 hover:text-white underline underline-offset-4"
            >
              {show ? "Hide password" : "Show password"}
            </button>

            <button
              onClick={onReset}
              disabled={disabled}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/15 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 disabled:cursor-not-allowed disabled:opacity-60 transition"
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>

            <div className="text-center text-sm text-slate-300">
              <Link href="/login" className="font-semibold text-white underline underline-offset-4 hover:text-cyan-200">
                Back to Login
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

