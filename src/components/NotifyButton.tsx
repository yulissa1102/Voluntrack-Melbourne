"use client";

import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";

type NotifyButtonProps = {
  label: string;
};

export function NotifyButton({ label }: NotifyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => setIsOpen(false), 3600);
    return () => window.clearTimeout(timeoutId);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-river/30 bg-white px-4 text-sm font-black text-river transition hover:border-river hover:bg-river hover:text-white sm:w-auto"
      >
        <Bell className="h-4 w-4" aria-hidden="true" />
        {label}
      </button>

      {isOpen ? (
        <div
          role="status"
          className="fixed bottom-5 left-4 right-4 z-50 rounded-lg border border-river/25 bg-white p-4 text-sm shadow-soft sm:left-auto sm:w-96"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-black text-ink">Reminder feature coming soon.</p>
              <p className="mt-1 font-semibold text-slate-600">Join the waitlist.</p>
            </div>
            <button
              type="button"
              aria-label="Dismiss reminder message"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg text-slate-500 transition hover:bg-paper hover:text-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
