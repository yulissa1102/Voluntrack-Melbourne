import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookmarkCheck, BriefcaseBusiness, CheckCircle2, ClipboardList, ListFilter, Tags } from "lucide-react";
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
              Find student-friendly volunteering opportunities in Melbourne.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/[0.85] sm:text-lg">
              Compare volunteering roles by deadline, requirements, career relevance and application status — all in one place.
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

      <section className="bg-paper pb-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.35fr_0.85fr] lg:px-8">
          <div>
            <h2 className="max-w-2xl text-3xl font-black text-ink">Why VolunTrack?</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              Built to help international students find volunteering opportunities that are easier to compare, prepare
              for, and use as local experience.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={ListFilter}
                title="Student-friendly filtering"
                copy="Find roles based on WWCC, police check, location, application status and time commitment."
              />
              <FeatureCard
                icon={Tags}
                title="Career relevance tags"
                copy="Compare opportunities by relevance to business, events, sustainability, education, tourism and social impact."
              />
              <FeatureCard
                icon={BriefcaseBusiness}
                title="Application tracking"
                copy="Save roles, compare deadlines, and plan what to prepare before applying."
              />
            </div>
          </div>

          <div className="self-end rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-paper text-river">
                <ClipboardList className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2 className="text-lg font-black text-ink">What we are testing now</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This MVP is being tested with students to understand what helps them choose volunteering opportunities faster.
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Can students find a suitable role faster with structured filters?",
                "What information matters most before applying?",
                "Do resume and LinkedIn outcomes make volunteering more useful?"
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-leaf" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <OpportunityExplorer
        opportunities={opportunities}
        title="Explore International-student-friendly volunteering opportunities"
        subtitle="Filter by category, career relevance, role type, application status, and checks and requirements. Career relevance tags are guidance only, not application restrictions."
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

function FeatureCard({
  icon: Icon,
  title,
  copy
}: {
  icon: typeof ListFilter;
  title: string;
  copy: string;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-paper text-river">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-black text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
    </article>
  );
}
