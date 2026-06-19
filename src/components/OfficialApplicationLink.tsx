"use client";

import { ExternalLink, LinkIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type OfficialApplicationLinkProps = {
  opportunityId: string;
  href: string;
};

const STORAGE_KEY = "voluntrack-application-link-clicks";

function readCounts() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : {};
    return parsed && typeof parsed === "object" ? (parsed as Record<string, number>) : {};
  } catch {
    return {};
  }
}

export function OfficialApplicationLink({ opportunityId, href }: OfficialApplicationLinkProps) {
  const [clickCount, setClickCount] = useState(0);
  const trackedPointerClick = useRef(false);

  useEffect(() => {
    setClickCount(readCounts()[opportunityId] ?? 0);
  }, [opportunityId]);

  const trackClick = () => {
    const counts = readCounts();
    const nextCount = (counts[opportunityId] ?? 0) + 1;
    counts[opportunityId] = nextCount;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
    setClickCount(nextCount);
  };

  const handleActivationStart = () => {
    if (trackedPointerClick.current) {
      return;
    }

    trackedPointerClick.current = true;
    trackClick();
  };

  const handleClick = () => {
    if (!trackedPointerClick.current) {
      trackClick();
    }

    trackedPointerClick.current = false;
  };

  return (
    <div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onPointerDown={handleActivationStart}
        onMouseDown={handleActivationStart}
        onTouchStart={handleActivationStart}
        onClick={handleClick}
        className="flex items-center justify-between gap-4 rounded-lg bg-ink p-4 text-sm font-black text-white transition hover:bg-river"
      >
        <span className="inline-flex items-center gap-2">
          <LinkIcon className="h-4 w-4" aria-hidden="true" />
          Official application link
        </span>
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
      <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
        {clickCount > 0
          ? `Clicked ${clickCount} ${clickCount === 1 ? "time" : "times"} on this device during MVP testing.`
          : "Application link clicks are being tracked on this device during MVP testing."}
      </p>
    </div>
  );
}
