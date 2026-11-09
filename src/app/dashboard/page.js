
// import { Suspense } from "react";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { getCurrentMember } from "@/lib/lib";
// import LogoutButton from "@/app/components/logout-button";

// function DashboardLoading() {
//   return (
//     <main className="flex min-h-screen items-center justify-center bg-[#070B18] text-white">
//       <p className="text-sm text-cyan-300">
//         Loading member dashboard...
//       </p>
//     </main>
//   );
// }

// async function DashboardContent() {
//   const member = await getCurrentMember();

//   if (!member) {
//     redirect("/login");
//   }

//   return (
//     <main className="min-h-screen bg-[#070B18] px-5 py-12 text-white">
//       <div className="mx-auto max-w-5xl">
//         <header className="flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <p className="text-sm font-medium text-cyan-300">
//               IETE-SF · BIT Sindri
//             </p>
//             <h1 className="mt-2 text-3xl font-bold">
//               Member Dashboard
//             </h1>
//           </div>

//           <div className="flex items-center gap-3">
//             <Link
//               href="/"
//               className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-200"
//             >
//               Back to home
//             </Link>

//             <LogoutButton />
//           </div>
//         </header>

//         <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
//           <p className="text-sm text-slate-400">
//             Welcome back,
//           </p>

//           <h2 className="mt-2 text-2xl font-semibold">
//             {member.user_id}
//           </h2>

//           <div className="mt-6 grid gap-4 sm:grid-cols-2">
//             <div className="rounded-xl border border-white/[0.08] bg-black/20 p-4">
//               <p className="text-xs uppercase tracking-wider text-slate-500">
//                 Email
//               </p>
//               <p className="mt-2 break-all text-sm text-slate-200">
//                 {member.email}
//               </p>
//             </div>

//             <div className="rounded-xl border border-white/[0.08] bg-black/20 p-4">
//               <p className="text-xs uppercase tracking-wider text-slate-500">
//                 Account role
//               </p>
//               <p className="mt-2 text-sm capitalize text-cyan-200">
//                 {member.role}
//               </p>
//             </div>
//           </div>

//           <p className="mt-6 text-sm leading-6 text-slate-400">
//             Your member account is authenticated. Member tools and
//             project management can be added here next.
//           </p>
//         </section>
//       </div>
//     </main>
//   );
// }

// export default function DashboardPage() {
//   return (
//     <Suspense fallback={<DashboardLoading />}>
//       <DashboardContent />
//     </Suspense>
//   );
// }



import { sql } from "@/lib/db";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  Plus,
  Settings,
} from "lucide-react";

import { getCurrentMember } from "@/lib/lib";
import LogoutButton from "@/app/components/logout-button";

const navigation = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Manage Events", href: "/dashboard/events", icon: CalendarDays },
  { label: "Add Event", href: "/dashboard/events/new", icon: Plus },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

function DashboardLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080B14] text-sm text-slate-400">
      Loading dashboard...
    </main>
  );
}

async function DashboardContent() {
  const member = await getCurrentMember();

  if (!member) redirect("/login");

  const statsResult = await sql`
  SELECT
    COUNT(*) AS total,
    COUNT(*) FILTER (WHERE status = 'upcoming') AS upcoming,
    COUNT(*) FILTER (WHERE status = 'live') AS live,
    COUNT(*) FILTER (WHERE status = 'past') AS past
  FROM events
`;

const stats = {
  total: Number(statsResult[0].total),
  upcoming: Number(statsResult[0].upcoming),
  live: Number(statsResult[0].live),
  past: Number(statsResult[0].past),
};

  const displayName = member.full_name || member.user_id;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080B14] text-white">
      {/* Blurred background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-blue-600/[0.09] blur-[130px]" />
        <div className="absolute -right-40 top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/[0.07] blur-[130px]" />
        <div className="absolute bottom-[-180px] left-[35%] h-[400px] w-[400px] rounded-full bg-violet-600/[0.06] blur-[140px]" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 border-r border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl md:flex md:flex-col">
          <Link href="/">
            <h2 className="text-xl font-semibold tracking-wide">
              IETE<span className="text-cyan-300">-SF</span>
            </h2>
            <p className="mt-1 text-xs text-slate-500">BIT Sindri</p>
          </Link>

          <p className="mb-4 mt-12 px-3 text-xs font-medium uppercase tracking-wider text-slate-500">
            Workspace
          </p>

          <nav className="space-y-2">
            {navigation.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  label === "Overview"
                    ? "border border-white/[0.08] bg-white/[0.08] text-white"
                    : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t border-white/[0.08] pt-5">
            <Link
              href="/"
              className="text-sm text-slate-400 hover:text-white"
            >
              ← Back to website
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <section className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] bg-[#080B14]/40 px-6 py-5 backdrop-blur-xl sm:px-10">
            <div>
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <p className="mt-1 text-xs text-slate-500">
                IETE-SF Management Portal
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-slate-500">{member.email}</p>
              </div>
              <LogoutButton />
            </div>
          </header>

          <div className="mx-auto max-w-6xl p-6 sm:p-10">
            <section className="mb-10">
              <p className="text-sm text-slate-400">Welcome back,</p>
              <h2 className="mt-2 text-2xl font-semibold">
                {displayName}
                <span className="text-cyan-300">.</span>
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Manage events and website content from here.
              </p>
            </section>

         <section>
  <h3 className="mb-5 text-sm font-semibold text-slate-200">
    Event Overview
  </h3>

  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {[
      { label: "Total Events", value: stats.total },
      { label: "Upcoming Events", value: stats.upcoming },
      { label: "Live Events", value: stats.live },
      { label: "Past Events", value: stats.past },
    ].map((item) => (
      <div
        key={item.label}
        className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-5 backdrop-blur-xl transition hover:bg-white/[0.055]"
      >
        <p className="text-sm text-slate-400">{item.label}</p>
        <p className="mt-4 text-2xl font-semibold text-white">
          {item.value}
        </p>
      </div>
    ))}
  </div>

  <p className="mt-3 text-xs text-slate-600">
    Live statistics from the IETE-SF events database.
  </p>
</section>

            <section className="mt-12">
              <h3 className="mb-5 text-sm font-semibold text-slate-200">
                Event Management
              </h3>

              <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 backdrop-blur-xl">
                <Link
                  href="/dashboard/events/new"
                  className="flex items-center justify-between gap-4 border-b border-white/[0.07] py-6 transition hover:text-cyan-300"
                >
                  <div>
                    <p className="text-sm font-medium">Add a New Event</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Create an event and add its details.
                    </p>
                  </div>
                  <Plus size={19} />
                </Link>

                <Link
                  href="/dashboard/events"
                  className="flex items-center justify-between gap-4 border-b border-white/[0.07] py-6 transition hover:text-cyan-300"
                >
                  <div>
                    <p className="text-sm font-medium">Manage Existing Events</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Edit, publish, hide or delete events.
                    </p>
                  </div>
                  <CalendarDays size={19} />
                </Link>

                <Link
                  href="/dashboard/settings"
                  className="flex items-center justify-between gap-4 py-6 transition hover:text-cyan-300"
                >
                  <div>
                    <p className="text-sm font-medium">Dashboard Settings</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Manage dashboard preferences.
                    </p>
                  </div>
                  <Settings size={19} />
                </Link>
              </div>
            </section>

            <footer className="mt-14 border-t border-white/[0.08] pt-5">
              <p className="text-xs text-slate-600">
                IETE-SF · BIT Sindri
              </p>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}

