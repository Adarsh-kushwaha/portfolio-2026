/**
 * The Currently Shelf: a book that opens to a Dostoevsky quote, and a vinyl that plays the
 * song in a compact Spotify player (the player stays visible if the browser blocks playback).
 */
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { listening, reading } from "@/content/beyond";
import { profile } from "@/content/profile";
import { loadSpotifyIframeApi } from "@/lib/spotify";
import { cn } from "@/lib/utils";
import { usePuneTime } from "../LocalTime";

function Book() {
  const [index, setIndex] = useState<number | null>(null);
  const time = usePuneTime();
  const open = index !== null;

  return (
    <div className="rounded-3xl border border-border bg-surface/60 p-6">
      <button
        type="button"
        onClick={() => setIndex((i) => (i === null ? 0 : (i + 1) % reading.quotes.length))}
        aria-label={`${reading.title} by ${reading.author}: ${open ? "next quote" : "open the book"}`}
        className="group flex items-center gap-4 text-left"
      >
        <motion.span
          animate={{ rotateY: open ? -28 : 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 14 }}
          className="relative block h-24 w-16 flex-shrink-0 rounded-r-md rounded-l-sm bg-gradient-to-br from-red-900 to-red-700 shadow-lg-dark [transform-origin:left_center] [transform-style:preserve-3d]"
          aria-hidden
        >
          <span className="absolute inset-y-0 left-1 w-px bg-gold/60" />
          <span className="absolute inset-x-2 top-3 text-[8px] leading-tight text-gold/90 font-heading font-700">
            CRIME &amp; PUNISH&shy;MENT
          </span>
        </motion.span>
        <span>
          <span className="block text-xs uppercase tracking-widest text-foreground-muted">Reading</span>
          <span className="block font-heading font-600 text-foreground">
            “{reading.title}” — {reading.author}
          </span>
          <span className="block text-xs text-primary group-hover:underline">
            {open ? "Turn the page →" : "Open the book →"}
          </span>
        </span>
      </button>

      {open && (
        <motion.figure
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 border-l-2 border-gold/60 pl-4"
        >
          <blockquote className="font-heading text-lg text-foreground leading-snug">“{reading.quotes[index]}”</blockquote>
          <figcaption className="mt-2 text-xs text-foreground-muted">
            Read in {profile.city} · 🕐 {time}
          </figcaption>
        </motion.figure>
      )}
    </div>
  );
}

function Vinyl() {
  const [state, setState] = useState<"idle" | "loading" | "playing" | "error">("idle");
  const embed = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const start = async () => {
    if (started.current || !embed.current) return;
    started.current = true;
    setState("loading");
    try {
      const api = await loadSpotifyIframeApi();
      api.createController(
        embed.current,
        { uri: `spotify:track:${listening.spotifyTrackId}`, width: "100%", height: 80 },
        (controller) => {
          controller.play();
          setState("playing");
        },
      );
    } catch {
      started.current = false;
      setState("error");
    }
  };

  const spinning = state === "playing" || state === "loading";

  return (
    <div className="rounded-3xl border border-border bg-surface/60 p-6">
      <button
        type="button"
        onClick={start}
        aria-label={`Play ${listening.title} by ${listening.artist}`}
        className="group flex items-center gap-4 text-left"
      >
        <span
          className={cn(
            "relative block h-24 w-24 flex-shrink-0 rounded-full bg-[radial-gradient(circle,#f5c462_0_14%,#111_15%_17%,#1b1b1b_18%_100%)] shadow-lg-dark",
            spinning && "animate-spin [animation-duration:2.4s]",
          )}
          aria-hidden
        >
          <span className="absolute inset-3 rounded-full border border-white/5" />
          <span className="absolute inset-6 rounded-full border border-white/5" />
        </span>
        <span>
          <span className="block text-xs uppercase tracking-widest text-foreground-muted">Listening</span>
          <span className="block font-heading font-600 text-foreground">
            {listening.title} — {listening.artist}
          </span>
          <span className="block text-xs text-primary group-hover:underline">
            {state === "idle" ? "Drop the needle →" : state === "error" ? "Couldn't load Spotify. Try again →" : "Now spinning"}
          </span>
        </span>
      </button>

      <section aria-label="Now playing" hidden={state === "idle" || state === "error"} className="mt-4 overflow-hidden rounded-xl">
        <div ref={embed} />
      </section>
      {state === "error" && (
        <a
          className="mt-3 inline-block text-sm text-primary hover:underline"
          href={`https://open.spotify.com/track/${listening.spotifyTrackId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Spotify
        </a>
      )}
    </div>
  );
}

export function CurrentlyShelf() {
  return (
    <div>
      <h3 className="text-xl font-heading font-700 text-foreground">Currently…</h3>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Book />
        <Vinyl />
      </div>
    </div>
  );
}
