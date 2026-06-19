"use client";

import { MessageSquare, X } from "lucide-react";
import { useState } from "react";

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-black text-white transition hover:bg-river"
      >
        <MessageSquare className="h-4 w-4" aria-hidden="true" />
        Give feedback
      </button>

      {isOpen ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 z-50 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 shadow-soft sm:left-auto sm:max-w-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <p>
              <strong className="text-ink">Feedback feature coming soon.</strong> We are currently testing the MVP with
              students to understand what information helps them choose volunteering opportunities faster.
            </p>
            <button
              type="button"
              aria-label="Close feedback message"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg text-slate-500 transition hover:bg-paper hover:text-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
