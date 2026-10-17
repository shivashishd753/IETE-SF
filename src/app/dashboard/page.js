
import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentMember } from "@/lib/lib";
import LogoutButton from "@/app/components/logout-button";

function DashboardLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070B18] text-white">
      <p className="text-sm text-cyan-300">
        Loading member dashboard...
      </p>
    </main>
  );
}

async function DashboardContent() {
  const member = await getCurrentMember();

  if (!member) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#070B18] px-5 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-cyan-300">
              IETE-SF · BIT Sindri
            </p>
            <h1 className="mt-2 text-3xl font-bold">
              Member Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-200"
            >
              Back to home
            </Link>

            <LogoutButton />
          </div>
        </header>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm text-slate-400">
            Welcome back,
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            {member.user_id}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.08] bg-black/20 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Email
              </p>
              <p className="mt-2 break-all text-sm text-slate-200">
                {member.email}
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-black/20 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Account role
              </p>
              <p className="mt-2 text-sm capitalize text-cyan-200">
                {member.role}
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-400">
            Your member account is authenticated. Member tools and
            project management can be added here next.
          </p>
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
