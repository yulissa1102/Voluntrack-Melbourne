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
    title: "What we are testing",
    text: "We are testing whether structured filters, clearer requirements and resume-focused guidance can help students choose suitable volunteering roles faster and with more confidence."
  },
  {
    title: "Our goal",
    text: "Our goal is to make volunteering more accessible, practical and career-relevant for international students building local experience in Australia."
  }
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
            <article key={section.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-ink">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{section.text}</p>
            </article>
          ))}
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
