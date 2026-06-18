"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "voluntrack-saved";
const SAVED_EVENT = "voluntrack-saved-updated";

declare global {
  interface Window {
    __voluntrackSaved?: string[];
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

function readStoredIds() {
  if (typeof window === "undefined") {
    return [];
  }

  const storage = getStorage();
  if (!storage) {
    return window.__voluntrackSaved ?? [];
  }

  try {
    const stored = storage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return window.__voluntrackSaved ?? [];
  }
}

function writeStoredIds(ids: string[]) {
  window.__voluntrackSaved = ids;
  const storage = getStorage();

  if (storage) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // The in-memory fallback still keeps the MVP usable if storage is blocked.
    }
  }

  window.setTimeout(() => window.dispatchEvent(new Event(SAVED_EVENT)), 0);
}

export function useSavedList() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setSavedIds(readStoredIds());

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(SAVED_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(SAVED_EVENT, sync);
    };
  }, []);

  const savedSet = useMemo(() => new Set(savedIds), [savedIds]);

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((current) => {
      const next = current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id];
      writeStoredIds(next);
      return next;
    });
  }, []);

  return {
    savedIds,
    savedSet,
    toggleSaved,
    isSaved: useCallback((id: string) => savedSet.has(id), [savedSet])
  };
}
