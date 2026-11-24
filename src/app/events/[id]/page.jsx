import { Suspense } from "react";
import EventDetailPage from "./EventDetailPage";

export default function EventDetailRoute() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[linear-gradient(135deg,#090B10_0%,#111722_48%,#090B10_100%)]" />
      }
    >
      <EventDetailPage />
    </Suspense>
  );
}