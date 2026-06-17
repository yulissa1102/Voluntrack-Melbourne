"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "voluntrack-demo-user";
const AUTH_EVENT = "voluntrack-demo-auth-updated";

export type DemoUser = {
  email: string;
  initials: string;
  name: string;
  signedInAt: string;
};

declare global {
  interface Window {
    __voluntrackDemoUser?: DemoUser | null;
  }
}

function getStorage() {
  if (typeof window === "undefined" || !("localStorage" in window)) {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function normaliseStoredUser(value: unknown): DemoUser | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<DemoUser>;

  if (typeof candidate.name !== "string" || typeof candidate.email !== "string") {
    return null;
  }

  const name = candidate.name.trim() || "Demo Student";
  const email = candidate.email.trim() || "demo.student@voluntrack.local";

  return {
    email,
    initials: typeof candidate.initials === "string" && candidate.initials ? candidate.initials : getInitials(name),
    name,
    signedInAt: typeof candidate.signedInAt === "string" ? candidate.signedInAt : new Date().toISOString()
  };
}

function readStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const storage = getStorage();
  if (!storage) {
    return window.__voluntrackDemoUser ?? null;
  }

  try {
    const stored = storage.getItem(STORAGE_KEY);
    return stored ? normaliseStoredUser(JSON.parse(stored)) : null;
  } catch {
    return window.__voluntrackDemoUser ?? null;
  }
}

function writeStoredUser(user: DemoUser | null) {
  window.__voluntrackDemoUser = user;
  const storage = getStorage();

  if (storage) {
    try {
      if (user) {
        storage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        storage.removeItem(STORAGE_KEY);
      }
    } catch {
      // The in-memory fallback still keeps the demo usable if storage is blocked.
    }
  }

  window.dispatchEvent(new Event(AUTH_EVENT));
}

function getDemoName(email: string) {
  const localPart = email.trim().split("@")[0]?.toLowerCase() ?? "";
  return localPart.includes("yulissa") ? "Yulissa" : "Demo Student";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function buildUser(email: string, name = getDemoName(email)): DemoUser {
  return {
    email: email.trim() || "demo.student@voluntrack.local",
    initials: getInitials(name),
    name,
    signedInAt: new Date().toISOString()
  };
}

export function useDemoAuth() {
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    const sync = () => setUser(readStoredUser());

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(AUTH_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(AUTH_EVENT, sync);
    };
  }, []);

  const signIn = useCallback((email: string) => {
    const nextUser = buildUser(email);
    writeStoredUser(nextUser);
    setUser(nextUser);
  }, []);

  const continueAsDemo = useCallback(() => {
    const nextUser = buildUser("demo.student@voluntrack.local", "Demo Student");
    writeStoredUser(nextUser);
    setUser(nextUser);
  }, []);

  const signOut = useCallback(() => {
    writeStoredUser(null);
    setUser(null);
  }, []);

  return {
    continueAsDemo,
    isLoggedIn: Boolean(user),
    signIn,
    signOut,
    user
  };
}
