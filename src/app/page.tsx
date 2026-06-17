import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookmarkCheck } from "lucide-react";
import { HeroStats } from "@/components/HeroStats";
import { OpportunityExplorer } from "@/components/OpportunityExplorer";
import { getCategoryCount, getOpenOrUpcomingCount, opportunities } from "@/lib/opportunities";

export default function HomePage() {
  return (
    <main>
      <section className="relative flex min-h-[520px] items-center overflow-hidden bg-ink text-white md:min-h-[560px]">
        <Image
          src="/melbourne-students-hero.png"
          alt="International students in a Melbourne community setting"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase text-sun">Melbourne international student volunteering</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Find volunteering opportunities in Melbourne, all in one place.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/[0.85] sm:text-lg">
              A curated opportunity tracker for international students to discover, compare and follow volunteering roles
              across events, museums, community programs and sustainability projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#opportunities"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-sun px-4 text-sm font-black text-ink transition hover:bg-white"
              >
                Browse opportunities
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/saved"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/40 bg-white/12 px-4 text-sm font-black text-white transition hover:bg-white hover:text-ink"
              >
                <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
                View saved
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-8 bg-paper pb-8">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <HeroStats
            total={opportunities.length}
            openUpcoming={getOpenOrUpcomingCount()}
            categories={getCategoryCount()}
          />
        </div>
      </section>

      <OpportunityExplorer
        opportunities={opportunities}
        title="Explore International-student-friendly volunteering opportunities"
        subtitle="Filter by category, career relevance, role type, application status, and hard checks. Career relevance tags are guidance only, not application restrictions."
      />

      <section className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-sm leading-6 text-slate-600 sm:px-6 lg:px-8">
          <strong className="text-ink">Disclaimer:</strong> Opportunity information is curated from official sources where
          available. Dates and requirements may change, so students should always confirm details on the official website
          before applying.
        </div>
      </section>
    </main>
  );
}
