
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  UserRound,
  Mail,
  ShieldCheck,
  KeyRound,
  LogOut,
} from "lucide-react";

import { getCurrentMember } from "@/lib/lib";
import LogoutButton from "@/app/components/logout-button";

export default async function SettingsPage() {
  const member = await getCurrentMember();

  if (!member) redirect("/login");

  const displayName = member.full_name || member.user_id;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080B14] text-white">
      {/* Background lighting */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-blue-600/[0.08] blur-[130px]" />
        <div className="absolute -right-40 top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/[0.06] blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto min-h-screen max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Header */}
        <header className="mb-10">
          <Link
            href="/dashboard"
            className="mb-7 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <h1 className="text-2xl font-semibold sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Manage your account and security.
          </p>
        </header>

        {/* Account information */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <UserRound className="text-cyan-400" size={20} />
            <h2 className="text-base font-semibold text-slate-200">
              Account Information
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
            <div className="flex flex-col gap-4 border-b border-white/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-slate-500">Member ID</p>
                <p className="mt-1 break-all text-sm font-medium text-white">
                  {member.user_id}
                </p>
              </div>
              <span className="w-fit rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1 text-xs font-medium text-cyan-300">
                IETE-SF Member
              </span>
            </div>

            <div className="border-b border-white/[0.07] p-5">
              <div className="flex items-center gap-2 text-slate-500">
                <UserRound size={15} />
                <p className="text-xs">Display Name</p>
              </div>
              <p className="mt-2 text-sm font-medium text-white">
                {displayName}
              </p>
            </div>

            <div className="border-b border-white/[0.07] p-5">
              <div className="flex items-center gap-2 text-slate-500">
                <Mail size={15} />
                <p className="text-xs">Email Address</p>
              </div>
              <p className="mt-2 break-all text-sm font-medium text-white">
                {member.email}
              </p>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldCheck size={15} />
                <p className="text-xs">Account Status</p>
              </div>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Active
              </p>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <ShieldCheck className="text-cyan-400" size={20} />
            <h2 className="text-base font-semibold text-slate-200">
              Security
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 text-slate-300">
                  <KeyRound size={20} />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Password
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Keep your account secure with a strong password.
                  </p>
                </div>
              </div>

              <span className="w-fit rounded-lg border border-white/[0.08] px-3 py-2 text-xs text-slate-400">
                Password management
              </span>
            </div>
          </div>
        </section>

        {/* Sign out */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <LogOut className="text-cyan-400" size={20} />
            <h2 className="text-base font-semibold text-slate-200">
              Session
            </h2>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-sm font-medium text-white">
                Sign out of your account
              </p>
              <p className="mt-1 text-xs text-slate-500">
                End your current IETE-SF management session.
              </p>
            </div>

            <LogoutButton />
          </div>
        </section>

        <footer className="mt-12 border-t border-white/[0.08] pt-5">
          <p className="text-xs text-slate-600">
            IETE-SF · BIT Sindri
          </p>
        </footer>
      </div>
    </main>
  );
}
