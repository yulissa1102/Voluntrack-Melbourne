import type { Metadata } from "next";
import { FeedbackButton } from "@/components/FeedbackButton";

export const metadata: Metadata = {
  title: "About | VolunTrack Melbourne"
};

const aboutSections = [
  {
    title: "Who we are",
    text: "VolunTrack Melbourne is a student-led MVP built to help international students discover and compare volunteering opportunities across Melbourne."
  },
  {
    title: "Why we built this",
    text: "Many international students want local experience, but volunteering information is often scattered across different websites. Key details such as deadlines, checks, eligibility and career relevance are not always easy to compare."
  },
  {
    title: "Our goal",
    text: "Our goal is to make volunteering more accessible, practical and career-relevant for international students building local experience in Australia."
  },
  {
    title: "Information source",
    text: "VolunTrack curates publicly available opportunity information and official application links. Students should confirm final details on the official organisation website before applying."
  }
];

const testingPoints = [
  "Can students find suitable roles faster with structured filters?",
  "Which information matters most before applying?",
  "Do resume and LinkedIn outcomes make volunteering more useful?"
];

export default function AboutPage() {
  return (
    <main className="bg-paper py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-black uppercase text-gum">About</p>
          <h1 className="mt-2 text-3xl font-black text-ink sm:text-4xl">About VolunTrack</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Volunteering can be one of the first accessible pathways for international students to build local
            experience, confidence and community connection in Australia.
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {aboutSections.map((section) => (
            <article key={section.title} className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-ink">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{section.text}</p>
              {section.title === "Information source" ? (
                <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">
                  During MVP testing, saved roles and official application link clicks are tracked locally on this device.
                </p>
              ) : null}
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-ink">What we are testing</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            We are testing whether structured filters, clearer requirements and resume-focused guidance can help
            international students choose suitable volunteering roles faster and with more confidence.
          </p>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {testingPoints.map((point) => (
              <li key={point} className="rounded-lg border border-slate-200 bg-paper px-3 py-2 text-sm font-semibold leading-6 text-slate-700">
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-black text-ink">Help shape the MVP</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              We are keeping feedback simple while testing what students need most.
            </p>
          </div>
          <FeedbackButton />
        </section>
      </div>
    </main>
  );
}
