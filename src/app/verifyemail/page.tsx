// "use client";

// import axios from "axios";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// export default function verifyEmailPage(){
//     const [token, setToken] = useState("");
//     const [verified, setVerified] = useState(false);
//     const [error, setError] = useState(false);

//     const verifyUserEmail = async () => {
//         try {
//             await axios.post('/api/users/verifyemail', {token})
//             setVerified(true);
//         } catch (error: any) {
//             setError(true);
//             console.log(error.response.data);
//         }
//     }

//     useEffect(() => {
//         const urlToken = window.location.search.split("=")[1];
//         setToken(urlToken || "");
//     }, []);

//     useEffect(() => {
//         if(token.length > 0){
//             verifyUserEmail();
//         }
//     }, [token]);

//     return(
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1 className="text-4xl">Verify Email</h1>
//             <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

//             {verified && (
//                 <div>
//                     <h2 className="text-2xl">
//                         Email Verified
//                     </h2>
//                     <Link href={"/login"}>
//                         Login
//                     </Link>
//                 </div>
//             )}

//             {error && (
//                 <div>
//                     <h2 className="text-2xl bg-red-500 text-black">
//                         Error!!
//                     </h2>
//                 </div>
//             )}
//         </div>
//     )
// }

"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const shortToken = useMemo(() => {
    if (!token) return "";
    if (token.length <= 18) return token;
    return `${token.slice(0, 10)}...${token.slice(-8)}`;
  }, [token]);

  const verifyUserEmail = async () => {
    try {
      setVerifying(true);
      setError(false);
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (err: any) {
      setError(true);
      console.log(err?.response?.data || err?.message);
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) verifyUserEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="relative w-full max-w-lg">
        {/* glow */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-7 sm:p-9">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 border border-white/10">
              {/* mail/check icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
                <path
                  d="M4 6h16v12H4z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
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

          {/* Token Preview */}
          <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">Token</p>
                <p className="mt-1 text-sm text-slate-200 break-all">
                  {token ? shortToken : "No token found in URL"}
                </p>
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

            {/* Progress / Result */}
            <div className="mt-4">
              {verifying && (
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="h-4 w-4 rounded-full border-2 border-white/60 border-t-transparent animate-spin" />
                  Checking your token…
                </div>
              )}

              {!verifying && verified && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-emerald-200">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
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
                  </div>
                </div>
              )}

              {!verifying && error && (
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-rose-200">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 9v4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 17h.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10.3 3.1h3.4L22 20H2L10.3 3.1z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">Verification failed</p>
                      <p className="mt-1 text-sm text-slate-200">
                        This link may be invalid or expired. Try requesting a new verification email.
                      </p>
                      <Link
                        href="/login"
                        className="mt-3 inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 transition"
                      >
                        Back to Login
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {!verifying && !verified && !error && (
                <p className="text-sm text-slate-300">
                  Waiting for token… (Make sure the URL has <span className="text-white font-semibold">?token=</span>)
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            Secure verification • One-time link
          </div>
        </div>
      </div>
    </div>
  );
}
