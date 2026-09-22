/**
 * Live local time in Pune.
 */
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

const format = (d: Date) =>
  new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: profile.timeZone })
    .format(d)
    .toUpperCase();

export function usePuneTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return format(now);
}

export function LocalTime({ className }: { className?: string }) {
  const time = usePuneTime();
  return (
    <time className={className} aria-label={`Local time in Pune: ${time}`}>
      {time}
    </time>
  );
}
