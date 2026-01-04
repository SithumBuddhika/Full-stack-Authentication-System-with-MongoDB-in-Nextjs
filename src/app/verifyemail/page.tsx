"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const tokenPreview = useMemo(() => {
    if (!token) return "No token found";
    if (token.length <= 18) return token;
    return `${token.slice(0, 10)}...${token.slice(-8)}`;
  }, [token]);

  const verifyUserEmail = async (t: string) => {
    try {
      setVerifying(true);
      setError(false);
      await axios.post("/api/users/verifyemail", { token: t });
      setVerified(true);
      toast.success("Email verified successfully");
    } catch (err: any) {
      setError(true);
      console.log(err?.response?.data || err?.message);
      toast.error(err?.response?.data?.error || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token) verifyUserEmail(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="relative w-full max-w-lg">
        {/* glow */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-7 sm:p-9">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 border border-white/10">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path
                  d="M4 7l8 6 8-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Verify your email
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                We’re confirming your email address to activate your account.
              </p>
            </div>
          </div>

          <div className="mt-6 h-px w-full bg-white/10" />

          <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">Token</p>
                <p className="mt-1 text-sm text-slate-200 break-all">{tokenPreview}</p>
              </div>

              <span
                className={
                  "shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border " +
                  (verified
                    ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
                    : error
                    ? "bg-rose-500/10 text-rose-200 border-rose-500/20"
                    : verifying
                    ? "bg-amber-500/10 text-amber-200 border-amber-500/20"
                    : "bg-slate-500/10 text-slate-200 border-white/10")
                }
              >
                {verified ? "Verified" : error ? "Failed" : verifying ? "Verifying..." : "Pending"}
              </span>
            </div>

            <div className="mt-4">
              {verifying && (
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="h-4 w-4 rounded-full border-2 border-white/60 border-t-transparent animate-spin" />
                  Verifying your email…
                </div>
              )}

              {!verifying && verified && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <p className="text-sm font-semibold text-white">Email verified successfully</p>
                  <p className="mt-1 text-sm text-slate-200">
                    You can now login and continue.
                  </p>
                  <Link
                    href="/login"
                    className="mt-3 inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 transition"
                  >
                    Go to Login
                  </Link>
                </div>
              )}

              {!verifying && error && (
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4">
                  <p className="text-sm font-semibold text-white">Verification failed</p>
                  <p className="mt-1 text-sm text-slate-200">
                    This link may be invalid or expired.
                  </p>
                  <Link
                    href="/login"
                    className="mt-3 inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 transition"
                  >
                    Back to Login
                  </Link>
                </div>
              )}

              {!verifying && !verified && !error && (
                <p className="text-sm text-slate-300">
                  Waiting for token… (URL must contain <span className="text-white font-semibold">?token=</span>)
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">Secure verification • One-time link</div>
        </div>
      </div>
    </div>
  );
}
