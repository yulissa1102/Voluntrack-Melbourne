"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Bell, BookmarkCheck, GraduationCap, LogIn, Sparkles, UserRound, X } from "lucide-react";
import { useDemoAuth } from "@/components/useDemoAuth";

export function NavBar() {
  const { continueAsDemo, signIn, signOut, user } = useDemoAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLoginOpen(false);
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/[0.92] backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex min-w-0 items-center gap-2 font-black text-ink">
          <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-ink text-white">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline">VolunTrack Melbourne</span>
          <span className="truncate sm:hidden">VolunTrack</span>
        </Link>

        <div className="flex min-w-0 items-center gap-1 text-sm font-bold sm:gap-2">
          <Link
            href="/opportunities"
            className="rounded-lg px-2 py-2 text-slate-600 transition hover:bg-paper hover:text-ink sm:px-3"
          >
            <span className="hidden sm:inline">Opportunities</span>
            <span className="sm:hidden">Browse</span>
          </Link>
          <Link
            href="/about"
            className="rounded-lg px-2 py-2 text-slate-600 transition hover:bg-paper hover:text-ink sm:px-3"
          >
            About
          </Link>
          <Link href="/saved" className="rounded-lg bg-ink px-2 py-2 text-white transition hover:bg-river sm:px-3">
            Saved
          </Link>

          {user ? (
            <div className="relative flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                aria-expanded={isProfileOpen}
                onClick={() => setIsProfileOpen((current) => !current)}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 text-ink transition hover:border-river hover:text-river sm:px-3"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-river text-xs font-black text-white">
                  {user.initials}
                </span>
                <span className="hidden max-w-28 truncate sm:inline">{user.name}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  setIsProfileOpen(false);
                }}
                className="inline-flex h-10 items-center rounded-lg border border-slate-200 bg-white px-2 text-slate-600 transition hover:border-gum hover:text-gum sm:px-3"
              >
                Sign out
              </button>

              {isProfileOpen ? <ProfileMenu name={user.name} /> : null}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 text-ink transition hover:border-river hover:text-river sm:px-3"
            >
              <LogIn className="hidden h-4 w-4 sm:block" aria-hidden="true" />
              Sign in
            </button>
          )}
        </div>
      </nav>

      {isLoginOpen ? (
        <LoginDialog
          onClose={() => setIsLoginOpen(false)}
          onDemo={() => {
            continueAsDemo();
            setIsLoginOpen(false);
          }}
          onSignIn={(email) => {
            signIn(email);
            setIsLoginOpen(false);
          }}
        />
      ) : null}
    </header>
  );
}

function ProfileMenu({ name }: { name: string }) {
  return (
    <div className="absolute right-0 top-12 w-72 rounded-lg border border-slate-200 bg-white p-4 text-sm shadow-soft">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-river text-sm font-black text-white">
          {name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </span>
        <div>
          <p className="font-black text-ink">{name}</p>
          <p className="text-xs font-semibold text-slate-500">Demo profile</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-paper p-3">
        <p className="text-xs font-black uppercase text-gum">Coming soon</p>
        <ul className="mt-2 space-y-2 text-xs font-semibold leading-5 text-slate-700">
          <li className="flex gap-2">
            <Bell className="mt-0.5 h-3.5 w-3.5 flex-none text-river" aria-hidden="true" />
            Email deadline reminders
          </li>
          <li className="flex gap-2">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-none text-river" aria-hidden="true" />
            Personalised opportunity recommendations
          </li>
          <li className="flex gap-2">
            <BookmarkCheck className="mt-0.5 h-3.5 w-3.5 flex-none text-river" aria-hidden="true" />
            Application tracking
          </li>
          <li className="flex gap-2">
            <UserRound className="mt-0.5 h-3.5 w-3.5 flex-none text-river" aria-hidden="true" />
            Student reviews
          </li>
        </ul>
      </div>
    </div>
  );
}

function LoginDialog({
  onClose,
  onDemo,
  onSignIn
}: {
  onClose: () => void;
  onDemo: () => void;
  onSignIn: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSignIn(email);
    setPassword("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 px-4 py-6">
      <button type="button" aria-label="Close sign in dialog" className="absolute inset-0 cursor-default" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-login-title"
        className="relative w-full max-w-md rounded-lg border border-slate-200 bg-white shadow-soft"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
          <div>
            <p className="text-sm font-black uppercase text-gum">Demo Login</p>
            <h2 id="demo-login-title" className="mt-1 text-2xl font-black text-ink">
              Sign in to VolunTrack
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Preview saved lists, tracked opportunities, reminders, and recommendations.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close sign in dialog"
            onClick={onClose}
            className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg text-slate-500 transition hover:bg-paper hover:text-ink"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase text-slate-500">Email</span>
            <input
              type="text"
              inputMode="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="demo@student.edu.au"
              autoComplete="off"
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-ink outline-none transition placeholder:text-slate-400 focus:border-river focus:bg-white focus:ring-2 focus:ring-river/15"
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-1.5 block text-xs font-bold uppercase text-slate-500">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Any demo text"
              autoComplete="off"
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-ink outline-none transition placeholder:text-slate-400 focus:border-river focus:bg-white focus:ring-2 focus:ring-river/15"
            />
            <p className="mt-2 text-xs font-semibold text-slate-500">Please do not enter a real password.</p>
          </label>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                onDemo();
                setPassword("");
              }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-river/30 bg-river/10 px-4 text-sm font-black text-river transition hover:border-river hover:bg-river hover:text-white"
            >
              <UserRound className="h-4 w-4" aria-hidden="true" />
              Continue as Demo Student
            </button>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-black text-white transition hover:bg-river"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Sign in
            </button>
          </div>
        </form>

        <div className="border-t border-slate-100 bg-paper px-5 py-4 text-xs font-semibold leading-5 text-slate-600">
          This is a demo login for MVP testing. No real account is created.
        </div>
      </div>
    </div>
  );
}
