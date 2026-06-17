import { redirect } from "next/navigation";

export const metadata = {
  title: "Saved | VolunTrack Melbourne"
};

export default function LegacySavedRedirectPage() {
  redirect("/saved");
}
