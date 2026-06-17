import { OpportunityExplorer } from "@/components/OpportunityExplorer";
import { opportunities } from "@/lib/opportunities";

export const metadata = {
  title: "Opportunities | VolunTrack Melbourne"
};

export default function OpportunitiesPage() {
  return (
    <main className="bg-paper">
      <section className="border-b border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase text-gum">Opportunities</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Browse the database</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            All records are loaded from the local MVP JSON database.
          </p>
        </div>
      </section>
      <OpportunityExplorer opportunities={opportunities} />
    </main>
  );
}
