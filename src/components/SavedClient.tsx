"use client";

import Link from "next/link";
import { ArrowLeft, Bell, BookmarkCheck, ClipboardList, MessageSquareText, Sparkles } from "lucide-react";
import { OpportunityCard } from "@/components/OpportunityCard";
import { useDemoAuth } from "@/components/useDemoAuth";
import { useSavedList } from "@/components/useSavedList";
import type { Opportunity } from "@/lib/types";

type SavedClientProps = {
  opportunities: Opportunity[];
};

export function SavedClient({ opportunities }: SavedClientProps) {
  const { savedIds } = useSavedList();
  const { user } = useDemoAuth();
  const savedOpportunities = opportunities.filter((opportunity) => savedIds.includes(opportunity.id));
  const pageTitle = user ? `${user.name}'s Saved Opportunities` : "Saved Opportunities";

  return (
    <main className="bg-paper">
      <section className="border-b border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/#opportunities" className="inline-flex items-center gap-2 text-sm font-bold text-river hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to opportunities
          </Link>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase text-gum">Saved</p>
              <h1 className="mt-2 text-4xl font-black text-ink">{pageTitle}</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                {user
                  ? "Saved Opportunities, My tracked opportunities, Deadline reminders coming soon, and Recommended for you are previewed here for the MVP demo."
                  : "Your saved list is stored in this browser for the MVP demo. Sign in to keep your saved opportunities across devices in the future."}
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-paper px-4 py-3 text-sm font-black text-ink">
              <BookmarkCheck className="h-4 w-4 text-leaf" aria-hidden="true" />
              {savedOpportunities.length} saved
            </div>
          </div>

          {user ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {["Saved Opportunities", "My tracked opportunities", "Deadline reminders coming soon", "Recommended for you"].map(
                (item) => (
                  <div key={item} className="rounded-lg border border-slate-200 bg-paper px-4 py-3 text-sm font-black text-ink">
                    {item}
                  </div>
                )
              )}
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {user ? (
            <div className="mb-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-black uppercase text-gum">Coming soon</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <SoonItem icon={Bell} label="Email deadline reminders" />
                <SoonItem icon={Sparkles} label="Personalised opportunity recommendations" />
                <SoonItem icon={ClipboardList} label="Application tracking" />
                <SoonItem icon={MessageSquareText} label="Student reviews" />
              </div>
            </div>
          ) : null}

          {savedOpportunities.length ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {savedOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="text-xl font-black text-ink">No saved opportunities yet</p>
              <p className="mt-2 text-sm text-slate-600">Save roles from the opportunity cards to compare them here.</p>
              <Link
                href="/#opportunities"
                className="mt-5 inline-flex h-10 items-center rounded-lg bg-ink px-4 text-sm font-bold text-white transition hover:bg-river"
              >
                Browse opportunities
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function SoonItem({ icon: Icon, label }: { icon: typeof Bell; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-paper px-4 py-3 text-sm font-bold text-ink">
      <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white text-river">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span>{label}</span>
    </div>
  );
}
