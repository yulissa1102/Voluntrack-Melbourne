"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSavedList } from "@/components/useSavedList";

type SaveButtonProps = {
  id: string;
  className?: string;
};

export function SaveButton({ id, className = "" }: SaveButtonProps) {
  const { isSaved, toggleSaved } = useSavedList();
  const saved = isSaved(id);
  const Icon = saved ? BookmarkCheck : Bookmark;

  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={() => toggleSaved(id)}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-semibold transition ${
        saved
          ? "border-leaf bg-leaf text-white hover:bg-leaf/90"
          : "border-slate-200 bg-white text-ink hover:border-river hover:text-river"
      } ${className}`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
