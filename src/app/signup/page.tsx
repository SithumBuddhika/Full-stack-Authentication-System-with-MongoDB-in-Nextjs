// "use client";
// import Link from "next/link";
// import React, {useEffect} from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import toast, { Toaster } from 'react-hot-toast';

// export default function SignupPage(){
//     const router = useRouter();
//     const [user, setUser] = React.useState({
//         email: "",
//         password: "",
//         username: "",
//     })
//     const [buttonDisabled, setButtonDisabled] = React.useState(false);

//     const [loading, setLoading] = React.useState(false);

//     const onSignup = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.post("/api/users/signup", user);
//             console.log("Signup success", response.data);
//             router.push("/login");

//         } catch (error: any) {
//             console.log("Signup failed", error.message);

//             toast.error(error.message);
//         }finally{
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         if(user.email.length > 0 && user.password.length >0 && user.username.length > 0){
//             setButtonDisabled(false);
//         }else{
//             setButtonDisabled(true);
//         }
//     },[user]);

//     return(
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1>{loading ? "Processing" : "Signup"}</h1>
//             <hr />
//             <label htmlFor="username">username</label>
//             <input
//             className="p-2 border border-gray-300 rounded-lg  mb-4 focus:outline-none focus:border-gray-600"
//                 id="username"
//                 type="text"
//                 value={user.username}
//                 onChange={(e) => setUser({...user, username: e.target.value})}
//                 placeholder="username"
//             />

//             <label htmlFor="email">email</label>
//             <input
//             className="p-2 border border-gray-300 rounded-lg  mb-4 focus:outline-none focus:border-gray-600"
//                 id="email"
//                 type="email"
//                 value={user.email}
//                 onChange={(e) => setUser({...user, email: e.target.value})}
//                 placeholder="email"
//             />

//             <label htmlFor="password">password</label>
//             <input
//             className="p-2 border border-gray-300 rounded-lg  mb-4 focus:outline-none focus:border-gray-600"
//                 id="password"
//                 type="password"
//                 value={user.password}
//                 onChange={(e) => setUser({...user, password: e.target.value})}
//                 placeholder="password"
//             />

//             <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:bordr-gray-600">
//                 {buttonDisabled ? "No signup" : "Signup"}
//             </button>
//             <Link href="/login">Visit login page</Link>
//         </div>
//     );
// }

"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="relative w-full max-w-md">
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-7 sm:p-8">
          <div className="mb-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Rajapaksha Brothers
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              {loading ? "Creating account..." : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Sign up to continue. Clean, modern, and fast.
            </p>
          </div>

          <div className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-200 mb-1">
                Username
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  {/* user icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
                </span>

                <input
                  id="username"
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  placeholder="e.g. sithum_23"
                  autoComplete="username"
                  className="w-full rounded-xl border border-white/10 bg-white/90 text-slate-900 placeholder:text-slate-500 pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-1">
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  {/* mail icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
                </span>

                <input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/10 bg-white/90 text-slate-900 placeholder:text-slate-500 pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  {/* lock icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 11V8a5 5 0 0110 0v3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 11h12v10H6z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-white/10 bg-white/90 text-slate-900 placeholder:text-slate-500 pl-10 pr-12 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-transparent transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-slate-600 hover:text-slate-900 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 3l18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.7 10.7a3 3 0 004.24 4.24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.88 5.08A10.7 10.7 0 0112 4c7 0 10 8 10 8a18.3 18.3 0 01-4.2 5.4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6.1 6.1A18.3 18.3 0 002 12s3 8 10 8a10.7 10.7 0 005.3-1.4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Use at least 8 characters for better security.
              </p>
            </div>

            <button
              onClick={onSignup}
              disabled={buttonDisabled || loading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-indigo-400/70 disabled:cursor-not-allowed disabled:opacity-50 transition"
            >
              {loading ? "Processing..." : buttonDisabled ? "Fill all fields" : "Create account"}
            </button>

            <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
              <span>Already have an account?</span>
              <Link
                href="/login"
                className="font-semibold text-white hover:text-indigo-200 underline underline-offset-4"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            By continuing, you agree to our terms and privacy policy.
          </div>
        </div>
      </div>
    </div>
  );
}
