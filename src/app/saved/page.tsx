import { SavedClient } from "@/components/SavedClient";
import { opportunities } from "@/lib/opportunities";

export const metadata = {
  title: "Saved | VolunTrack Melbourne"
};

export default function SavedPage() {
  return <SavedClient opportunities={opportunities} />;
}
