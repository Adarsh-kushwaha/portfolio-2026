/**
 * Beyond the code — hobbies, values, a Sunday in Pune, what I'm reading and listening to,
 * and a fun-fact shuffler.
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BedDouble,
  BookOpen,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Footprints,
  Headphones,
  HeartHandshake,
  Laptop,
  Moon,
  Music2,
  Play,
  ScanSearch,
  Shuffle,
  Smartphone,
  Sprout,
  Users,
  UtensilsCrossed,
  Video,
  type LucideIcon,
} from "lucide-react";
import { funFacts, hobbies, listening, reading, sundayInPune, thoughts, type Hobby } from "@/content/beyond";
import { prefersReducedMotion, revealChildren, useGsap } from "@/lib/motion";
import { SectionHeading, SpotlightCard } from "./primitives";

const hobbyIcons: Record<Hobby["id"], LucideIcon> = {
  walks: Footprints,
  cooking: ChefHat,
  videos: Video,
  music: Headphones,
};
const thoughtIcons: LucideIcon[] = [HeartHandshake, ScanSearch, Sprout, Users];
const sundayIcons: LucideIcon[] = [Smartphone, Coffee, Laptop, UtensilsCrossed, Footprints, Moon, BedDouble];

function QuoteRotator() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = reading.quotes.length;

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => window.clearInterval(id);
  }, [paused, n]);

  return (
    <SpotlightCard
      data-reveal
      className="flex flex-col p-7 md:col-span-2"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold">
        <BookOpen className="h-4 w-4" aria-hidden /> Currently reading
      </p>
      <p className="mt-2 font-heading text-lg font-semibold">
        {reading.title} <span className="font-normal text-foreground-muted">by {reading.author}</span>
      </p>
      <div className="relative mt-6 min-h-[120px] flex-1" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.45 }}
            className="font-heading text-2xl font-medium leading-snug tracking-tight md:text-3xl"
          >
            “{reading.quotes[i]}”
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="font-mono text-xs text-foreground-muted">
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setI((v) => (v - 1 + n) % n)}
            aria-label="Previous quote"
            className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setI((v) => (v + 1) % n)}
            aria-label="Next quote"
            className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </SpotlightCard>
  );
}

/** Spotify embed, loaded only when asked so the page doesn't pay for it up front. */
function NowPlaying() {
  const [loaded, setLoaded] = useState(false);
  return (
    <SpotlightCard data-reveal className="flex flex-col p-7">
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
        <Music2 className="h-4 w-4" aria-hidden /> On repeat
      </p>
      {loaded ? (
        <iframe
          title={`${listening.title} by ${listening.artist} on Spotify`}
          src={`https://open.spotify.com/embed/track/${listening.spotifyTrackId}?utm_source=generator&theme=0`}
          className="mt-5 h-[152px] w-full rounded-2xl border-0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <button
          onClick={() => setLoaded(true)}
          className="group mt-5 flex flex-1 items-center gap-4 rounded-2xl border border-border bg-surface/60 p-4 text-left transition-colors hover:border-primary/50"
        >
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-aurora text-primary-foreground transition-transform duration-300 group-hover:scale-105">
            <Play className="h-5 w-5 fill-current" aria-hidden />
          </span>
          <span>
            <span className="block font-heading font-semibold">{listening.title}</span>
            <span className="block text-sm text-foreground-muted">{listening.artist} · load Spotify player</span>
          </span>
        </button>
      )}
      <div className="mt-5 flex h-8 items-end gap-1" aria-hidden>
        {Array.from({ length: 24 }, (_, k) => (
          <span
            key={k}
            className="w-full origin-bottom rounded-full bg-primary/40 animate-pulse motion-reduce:animate-none"
            style={{ height: `${30 + ((k * 37) % 70)}%`, animationDelay: `${(k % 6) * 120}ms` }}
          />
        ))}
      </div>
    </SpotlightCard>
  );
}

function FunFact() {
  const [i, setI] = useState(0);
  const shuffle = () => setI((v) => (v + 1 + Math.floor(Math.random() * (funFacts.length - 1))) % funFacts.length);
  return (
    <SpotlightCard data-reveal className="flex flex-col justify-between gap-6 p-7 md:col-span-2">
      <p className="font-mono text-xs uppercase tracking-widest text-violet">Fun fact</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, rotateX: -60 }}
          animate={{ opacity: 1, rotateX: 0 }}
          exit={{ opacity: 0, rotateX: 60 }}
          transition={{ duration: 0.35 }}
          className="font-heading text-xl font-medium leading-snug md:text-2xl"
          aria-live="polite"
        >
          {funFacts[i]}
        </motion.p>
      </AnimatePresence>
      <button
        onClick={shuffle}
        className="group inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition-colors hover:border-violet hover:text-violet"
      >
        <Shuffle className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" aria-hidden />
        Another one
      </button>
    </SpotlightCard>
  );
}

export default function Beyond() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, revealChildren);

  return (
    <section ref={root} id="beyond" aria-labelledby="beyond-title" className="section-padding">
      <div className="container-max space-y-14">
        <SectionHeading
          index="06"
          eyebrow="Beyond the code"
          id="beyond-title"
          title={
            <>
              Off the clock, <span className="text-gradient-gold">still curious.</span>
            </>
          }
        />

        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {hobbies.map((h) => {
            const Icon = hobbyIcons[h.id];
            return (
              <SpotlightCard as="li" key={h.id} data-reveal className="p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 text-gold transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-6 font-heading text-lg font-semibold">{h.label}</h3>
                <p className="mt-1 text-sm text-foreground-muted">{h.desc}</p>
              </SpotlightCard>
            );
          })}
        </ul>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <QuoteRotator />
          <NowPlaying />
          <FunFact />
          <SpotlightCard data-reveal className="p-7">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">How I work</p>
            <ul className="mt-4 space-y-4">
              {thoughts.map((t, k) => {
                const Icon = thoughtIcons[k] ?? Sprout;
                return (
                  <li key={t.title} className="flex gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <div>
                      <p className="text-sm font-semibold">{t.title}</p>
                      <p className="text-xs leading-relaxed text-foreground-muted">{t.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </SpotlightCard>
        </div>

        <div data-reveal className="space-y-5">
          <h3 className="font-heading text-2xl font-semibold">A Sunday in Pune</h3>
          <ol className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0">
            {sundayInPune.map((s, k) => {
              const Icon = sundayIcons[k] ?? Coffee;
              return (
                <li
                  key={s.time}
                  className="group relative w-[220px] shrink-0 snap-start rounded-3xl border border-border bg-card/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 lg:w-auto"
                >
                  <Icon className="h-5 w-5 text-gold" aria-hidden />
                  <p className="mt-4 font-mono text-xs text-primary">{s.time}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{s.event}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
