
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  LockKeyhole,
  Mail,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


async function handleSubmit(e) {
  e.preventDefault();

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Login failed. Please try again.");
      return;
    }

    window.location.href = "/dashboard";
  } catch (error) {
    console.error("Login error:", error);
    alert("Unable to connect. Please try again.");
  }
}


  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070B18] px-4 py-12 text-white selection:bg-cyan-300/30">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-[35%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.13] blur-[130px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-20 h-[350px] w-[350px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />

      <div className="pointer-events-none absolute -left-32 top-20 h-[300px] w-[300px] rounded-full bg-indigo-600/[0.08] blur-[120px]" />

      {/* Back to home */}
      <Link
        href="/"
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-sm text-slate-300 transition duration-300 hover:border-cyan-300/30 hover:bg-cyan-300/[0.05] hover:text-cyan-200 sm:left-8 sm:top-8"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      {/* Login content */}
      <section className="relative z-10 w-full max-w-[430px]">
        {/* Logo and heading */}
        <div className="mb-8 flex flex-col items-center text-center">
          {/* Glowing logo */}
          <div className="relative mb-6 flex h-28 w-28 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-sky-300/30 bg-[#0B1428]/80 shadow-[0_0_35px_rgba(59,130,246,0.18),inset_0_0_20px_rgba(96,165,250,0.06)]">
              <img
                src="/logo.svg"
                alt="IETE-SF logo"
                className="h-[76px] w-[76px] object-contain drop-shadow-[0_0_12px_rgba(96,165,250,0.25)]"
              />
            </div>

            <div className="absolute inset-[-7px] rounded-full border border-cyan-300/[0.12]" />
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-cyan-300">
            BIT Sindri
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-[36px]">
            Welcome back
          </h1>

          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
            Sign in to your IETE-SF member account.
          </p>
        </div>

        {/* Glassmorphism card */}
        <div className="rounded-3xl border border-white/[0.12] bg-[#0A0E1A]/75 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-8">
          <div className="mb-7">
            <h2 className="text-lg font-semibold text-white">
              Member login
            </h2>

            <p className="mt-1.5 text-xs leading-5 text-slate-400">
              Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2.5 block text-sm font-medium text-slate-300"
              >
                Email address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/[0.12] bg-[#070B18]/70 px-4 transition duration-300 focus-within:border-cyan-300/50 focus-within:shadow-[0_0_20px_rgba(34,211,238,0.06)]">
                <Mail
                  size={18}
                  strokeWidth={1.7}
                  className="shrink-0 text-slate-500"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs text-cyan-300/80 transition hover:text-cyan-200"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/[0.12] bg-[#070B18]/70 px-4 transition duration-300 focus-within:border-cyan-300/50 focus-within:shadow-[0_0_20px_rgba(34,211,238,0.06)]">
                <LockKeyhole
                  size={18}
                  strokeWidth={1.7}
                  className="shrink-0 text-slate-500"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full min-w-0 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600"
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="shrink-0 text-slate-500 transition hover:text-cyan-300"
                >
                  {showPassword ? (
                    <EyeOff size={18} strokeWidth={1.7} />
                  ) : (
                    <Eye size={18} strokeWidth={1.7} />
                  )}
                </button>
              </div>
            </div>

            {/* Sign in */}
            <button
              type="submit"
              className="group relative mt-2 w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 px-4 py-3.5 text-sm font-bold text-[#06101c] shadow-[0_0_25px_rgba(34,211,238,0.12)] transition duration-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)] active:scale-[0.99]"
            >
              <span className="relative z-10">
                Sign in to your account
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.09]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500">
              Member access
            </span>

            <div className="h-px flex-1 bg-white/[0.09]" />
          </div>

          <p className="text-center text-xs leading-6 text-slate-400">
            Access is reserved for authorized IETE-SF members.
            <br />
            <span className="text-slate-500">
              Contact the club team for account assistance.
            </span>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-7 text-center text-[11px] tracking-wide text-slate-500">
         © 2026 IETE-SF · BIT Sindri
        </p>
      </section>
    </main>
  );
}


// "use client";

// import { useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   HomeIcon,
//   Info,
//   UsersRound,
//   GraduationCap,
//   CalendarDays,
//   Layers3,
//   Mail,
//   LogIn,
// } from "lucide-react";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const router = useRouter();

//   const holdTimer = useRef(null);
//   const holdTriggered = useRef(false);

//   const navItems = [
//     { label: "Home", href: "/", Icon: HomeIcon },
//     { label: "About", href: "/about", Icon: Info },
//     { label: "Members", href: "/members", Icon: UsersRound },
//     { label: "Alumni", href: "/#alumni", Icon: GraduationCap },
//     { label: "Events", href: "/#events", Icon: CalendarDays },
//     { label: "Domains", href: "/domains", Icon: Layers3 },
//     { label: "Contact", href: "/#contact", Icon: Mail },
//   ];

//   function startHold() {
//     if (holdTimer.current) clearTimeout(holdTimer.current);

//     holdTriggered.current = false;

//     holdTimer.current = setTimeout(() => {
//       holdTriggered.current = true;
//       router.push("/login");
//     }, 5000);
//   }

//   function cancelHold() {
//     if (holdTimer.current) {
//       clearTimeout(holdTimer.current);
//       holdTimer.current = null;
//     }
//   }

//   function handleLogoClick(e) {
//     if (holdTriggered.current) {
//       e.preventDefault();
//       holdTriggered.current = false;
//     }
//   }

//   return (
//     <nav className="fixed left-1/2 top-3 z-50 mt-3 flex min-h-[88px] w-[calc(100%-32px)] max-w-[1450px] -translate-x-1/2 items-center justify-between rounded-[24px] border border-white/[0.13] bg-[#080B12]/45 px-5 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl lg:px-8">
//       {/* Shared logo: hold for 5 seconds to open login */}
//       <a
//         href="/"
//         aria-label="IETE-SF Home — hold for 5 seconds to open member login"
//         onPointerDown={startHold}
//         onPointerUp={cancelHold}
//         onPointerLeave={cancelHold}
//         onPointerCancel={cancelHold}
//         onClick={handleLogoClick}
//         onContextMenu={(e) => e.preventDefault()}
//         className="relative z-10 flex shrink-0 touch-none select-none items-center"
//       >
//         <img
//           src="/logo.svg"
//           alt="IETE-SF"
//           draggable={false}
//           className="h-[68px] w-[68px] select-none object-contain drop-shadow-[0_0_10px_rgba(96,165,250,0.22)] transition-transform duration-300 hover:scale-105"
//         />
//       </a>

//       {/* Desktop navigation */}
//       <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 xl:flex 2xl:gap-7">
//         {navItems.map(({ label, href, Icon }) => (
//           <a
//             key={label}
//             href={href}
//             className="group relative flex items-center gap-2.5 whitespace-nowrap py-3 text-[15px] font-medium tracking-wide text-slate-200/90 transition-colors duration-300 hover:text-cyan-300"
//           >
//             <Icon
//               size={19}
//               strokeWidth={1.8}
//               className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-cyan-300"
//             />
//             <span>{label}</span>
//             <span className="absolute bottom-0 left-0 h-px w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full" />
//           </a>
//         ))}
//       </div>

//       {/* Desktop login */}
//       <a
//         href="/login"
//         className="relative z-10 hidden shrink-0 items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-cyan-300/40 hover:bg-cyan-300/[0.07] hover:text-cyan-200 xl:flex"
//       >
//         <LogIn size={18} strokeWidth={1.8} />
//         Login
//       </a>

//       {/* Mobile controls */}
//       <div className="relative z-10 ml-auto flex items-center gap-3 xl:hidden">
//         <a
//           href="/login"
//           aria-label="Member Login"
//           className="rounded-xl border border-white/15 p-3 text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-300 sm:hidden"
//         >
//           <LogIn size={20} />
//         </a>

//         <button
//           type="button"
//           onClick={() => setMenuOpen((open) => !open)}
//           aria-label="Toggle navigation"
//           aria-expanded={menuOpen}
//           className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-lg text-white transition hover:border-cyan-300/40 hover:text-cyan-300"
//         >
//           {menuOpen ? "✕" : "☰"}
//         </button>
//       </div>

//       {/* Mobile dropdown */}
//       {menuOpen && (
//         <div className="absolute left-0 right-0 top-[calc(100%+10px)] rounded-2xl border border-white/10 bg-[#080B12]/95 p-3 shadow-2xl backdrop-blur-2xl xl:hidden">
//           {navItems.map(({ label, href, Icon }) => (
//             <a
//               key={label}
//               href={href}
//               onClick={() => setMenuOpen(false)}
//               className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm text-slate-200 transition hover:bg-cyan-300/[0.07] hover:text-cyan-200"
//             >
//               <Icon size={19} strokeWidth={1.8} />
//               {label}
//             </a>
//           ))}

//           <a
//             href="/login"
//             onClick={() => setMenuOpen(false)}
//             className="mt-2 flex items-center gap-3 rounded-xl border border-cyan-300/20 px-4 py-3.5 text-sm text-cyan-100"
//           >
//             <LogIn size={19} />
//             Member Login
//           </a>
//         </div>
//       )}
//     </nav>
//   );
// }

