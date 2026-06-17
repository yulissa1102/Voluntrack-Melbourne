"use client";

import { BookmarkCheck, CalendarClock, FolderKanban, ListChecks } from "lucide-react";
import { useSavedList } from "@/components/useSavedList";

type HeroStatsProps = {
  total: number;
  openUpcoming: number;
  categories: number;
};

export function HeroStats({ total, openUpcoming, categories }: HeroStatsProps) {
  const { savedIds } = useSavedList();
  const stats = [
    { label: "Total opportunities", value: total, icon: ListChecks },
    { label: "Open, upcoming or ongoing", value: openUpcoming, icon: CalendarClock },
    { label: "Categories covered", value: categories, icon: FolderKanban },
    { label: "Saved opportunities", value: savedIds.length, icon: BookmarkCheck }
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-lg border border-white/70 bg-white/[0.88] p-4 shadow-soft backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-2xl font-black text-ink">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-slate-600">{stat.label}</p>
              </div>
              <Icon className="h-5 w-5 text-river" aria-hidden="true" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
