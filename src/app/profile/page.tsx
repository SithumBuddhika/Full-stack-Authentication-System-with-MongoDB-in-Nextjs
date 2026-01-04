"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import React, { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState("nothing");
  const [loggingOut, setLoggingOut] = React.useState(false);
  const [loadingDetails, setLoadingDetails] = React.useState(false);

  const logout = async () => {
    try {
      setLoggingOut(true);
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoggingOut(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoadingDetails(true);
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
      toast.success("User details loaded");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoadingDetails(false);
    }
  };

  const hasId = data !== "nothing";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="relative w-full max-w-3xl">
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Top header strip */}
          <div className="p-7 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 border border-white/10">
                  {/* user icon */}
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path
                      d="M20 21a8 8 0 10-16 0"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 13a4 4 0 100-8 4 4 0 000 8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-white">Profile</h1>
                  <p className="mt-1 text-sm text-slate-300">
                    Welcome back — manage your account here.
                  </p>
                </div>
              </div>

              {/* Quick actions (top right) */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={getUserDetails}
                  disabled={loadingDetails}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 disabled:cursor-not-allowed disabled:opacity-60 transition"
                >
                  {loadingDetails ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/60 border-t-transparent animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      {/* info icon */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path
                          d="M12 17v-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 7h.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      Get User Details
                    </>
                  )}
                </button>

                <button
                  onClick={logout}
                  disabled={loggingOut}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/15 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 disabled:cursor-not-allowed disabled:opacity-60 transition"
                >
                  {loggingOut ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/60 border-t-transparent animate-spin" />
                      Logging out...
                    </>
                  ) : (
                    <>
                      {/* logout icon */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path
                          d="M10 7V5a2 2 0 012-2h7a2 2 0 012 2v14a2 2 0 01-2 2h-7a2 2 0 01-2-2v-2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path
                          d="M6 9l-3 3 3 3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Logout
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-7 h-px w-full bg-white/10" />

            {/* Cards */}
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {/* Left: Profile summary */}
              <div className="sm:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-wider text-slate-400">Your Account</p>
                <p className="mt-2 text-sm text-slate-300">
                  This is your dashboard area. You can add user details here later.
                </p>

                <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-400">User ID</p>
                      {hasId ? (
                        <div className="mt-1">
                          <Link
                            href={`/profile/${data}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-200 underline underline-offset-4 break-all"
                          >
                            {data}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-80">
                              <path
                                d="M14 5h5v5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M10 14L19 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M19 14v5h-5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M5 10v9h9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </Link>
                        </div>
                      ) : (
                        <p className="mt-1 text-sm text-slate-300">
                          Not loaded yet. Click <span className="font-semibold text-white">Get User Details</span>.
                        </p>
                      )}
                    </div>

                    <span
                      className={
                        "shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border " +
                        (hasId
                          ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-200 border-amber-500/20")
                      }
                    >
                      {hasId ? "Loaded" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Status */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-wider text-slate-400">Status</p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <p className="text-sm font-medium text-white">Active</p>
                </div>

                <p className="mt-2 text-sm text-slate-300">
                  You’re currently signed in.
                </p>

                <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs text-slate-400">Tip</p>
                  <p className="mt-1 text-sm text-slate-300">
                    Keep your session secure — logout on shared devices.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-slate-400">
              • Profile dashboard
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

