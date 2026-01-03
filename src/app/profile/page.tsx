// export default function ProfilePage(){
//         return(
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1>
//                 profile
//             </h1>
//             <hr />
//             <p>Profile page</p>
//         </div>
//     )
// }

export default function ProfilePage() {
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
                Welcome back — this is your personal space.
              </p>
            </div>
          </div>

          <div className="mt-6 h-px w-full bg-white/10" />

          {/* Content */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-wider text-slate-400">Status</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <p className="text-sm font-medium text-white">Active</p>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                Your account is ready to use.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-wider text-slate-400">Quick Info</p>
              <p className="mt-3 text-sm text-slate-300">
                Profile page
              </p>
              <p className="mt-2 text-xs text-slate-400">
                (You can add real user details here later)
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-slate-400">
            • Profile
            <div className="mt-6 h-px w-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
