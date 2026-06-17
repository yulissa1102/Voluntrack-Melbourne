import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  tone?: "default" | "warm" | "green" | "blue";
};

const tones = {
  default: "border-slate-200 bg-white text-slate-700",
  warm: "border-sun/30 bg-sun/10 text-amber-800",
  green: "border-leaf/25 bg-leaf/10 text-leaf",
  blue: "border-river/25 bg-river/10 text-river"
};

export function Tag({ children, tone = "default" }: TagProps) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
