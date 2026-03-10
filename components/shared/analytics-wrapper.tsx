"use client";
import dynamic from "next/dynamic";

const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((m) => ({ default: m.Analytics })),
  { ssr: false }
);
const GoogleAnalytics = dynamic(
  () => import("@/app/analytics"),
  { ssr: false }
);

export default function AnalyticsWrapper({ ga_id }: { ga_id?: string }) {
  return (
    <>
      {ga_id && <GoogleAnalytics ga_id={ga_id} />}
      <Analytics />
    </>
  );
}
