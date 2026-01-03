// export default function ProfilePage(){
//         return(
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1>
//                 profile
//             </h1>
//             <hr />
//             <p>Profile page</p>
//         <hr />
//       <button
//       onClick={logout}
//       className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >Logout</button>  
//         </div>
//     )
// }

// "use client";
// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";

// export default function ProfilePage() {

//   const router = useRouter()

//   const logout = async () => {
//     try {
//       await axios.get('/api/users/logout')
//       toast.success('Logout successful')
//       router.push('/login')
//     } catch (error: any) {
//       console.log(error.message);
//       toast.error(error.message);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
//       <div className="relative w-full max-w-2xl">
//         {/* glow blobs */}
//         <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />
//         <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

//         <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-7 sm:p-10">
//           {/* Header */}
//           <div className="flex items-center gap-4">
//             <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 border border-white/10">
//               {/* user icon */}
//               <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-white">
//                 <path
//                   d="M20 21a8 8 0 10-16 0"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//                 <path
//                   d="M12 13a4 4 0 100-8 4 4 0 000 8z"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>

//             <div>
//               <h1 className="text-3xl font-semibold tracking-tight text-white">Profile</h1>
//               <p className="mt-1 text-sm text-slate-300">Welcome back — manage your account here.</p>
//             </div>
//           </div>

//           <div className="mt-6 h-px w-full bg-white/10" />

//           {/* Content */}
//           <div className="mt-6 grid gap-4 sm:grid-cols-2">
//             <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
//               <p className="text-xs uppercase tracking-wider text-slate-400">Page</p>
//               <p className="mt-2 text-lg font-semibold text-white">Profile page</p>
//               <p className="mt-2 text-sm text-slate-300">
//                 This is your dashboard area. You can add user details here later.
//               </p>
//             </div>

//             <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
//               <p className="text-xs uppercase tracking-wider text-slate-400">Status</p>
//               <div className="mt-3 flex items-center gap-2">
//                 <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
//                 <p className="text-sm font-medium text-white">Active</p>
//               </div>
//               <p className="mt-2 text-sm text-slate-300">You’re currently signed in.</p>
//             </div>
//           </div>

//           <div className="mt-6 h-px w-full bg-white/10" />

//           {/* Actions */}
//           <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <p className="text-xs text-slate-400">
//               If you’re done, you can safely sign out.
//             </p>

//             <button
//               onClick={logout}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/15 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 transition"
//             >
//               {/* logout icon */}
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
//                 <path
//                   d="M10 7V5a2 2 0 012-2h7a2 2 0 012 2v14a2 2 0 01-2 2h-7a2 2 0 01-2-2v-2"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//                 <path
//                   d="M15 12H3"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//                 <path
//                   d="M6 9l-3 3 3 3"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               Logout
//             </button>
//           </div>

//           <div className="mt-8 text-center text-xs text-slate-400">
//             Lanka Deals • Profile dashboard
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import React from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = React.useState(false);

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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="relative w-full max-w-2xl">
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-7 sm:p-10">
          {/* Header */}
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

          <div className="mt-6 h-px w-full bg-white/10" />

          {/* Content */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-wider text-slate-400">Page</p>
              <p className="mt-2 text-lg font-semibold text-white">Profile page</p>
              <p className="mt-2 text-sm text-slate-300">
                This is your dashboard area. You can add user details here later.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-wider text-slate-400">Status</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <p className="text-sm font-medium text-white">Active</p>
              </div>
              <p className="mt-2 text-sm text-slate-300">You’re currently signed in.</p>
            </div>
          </div>

          <div className="mt-6 h-px w-full bg-white/10" />

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-slate-400">If you’re done, you can safely sign out.</p>

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

          <div className="mt-8 text-center text-xs text-slate-400">
            • Profile dashboard
          </div>
        </div>
      </div>
    </div>
  );
}
