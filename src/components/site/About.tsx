/**
 * About — the engineer and the human, as one bento grid.
 */
import { useRef } from "react";
import { Code2, Coffee, HeartHandshake, MapPin, Rocket, Sparkles } from "lucide-react";
import portraitImg from "@/assets/adarsh-portrait.webp";
import casualImg from "@/assets/adarsh-casual.webp";
import { profile } from "@/content/profile";
import { revealChildren, useGsap } from "@/lib/motion";
import { LocalTime } from "./LocalTime";
import { TiltFrame } from "./TiltFrame";
import { SectionHeading, SpotlightCard } from "./primitives";

const highlights = [
  { icon: Code2, label: "System design", desc: "Zustand, Module Federation, schema-driven" },
  { icon: HeartHandshake, label: "Mentorship", desc: "Growing juniors, raising the bar" },
  { icon: Rocket, label: "Shipping culture", desc: "Fast iterations that stay maintainable" },
];

export default function About() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, revealChildren);

  return (
    <section ref={root} id="about" aria-labelledby="about-title" className="section-padding">
      <div className="container-max space-y-14">
        <SectionHeading
          index="01"
          eyebrow="About"
          id="about-title"
          title={
            <>
              The engineer behind the pixels, <span className="text-gradient-aurora">the human behind the screen.</span>
            </>
          }
        />

        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          <SpotlightCard data-reveal className="p-7 md:col-span-4 md:row-span-2 md:p-10">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-5 text-lg leading-relaxed text-foreground-muted md:text-xl">
                <p>
                  I architect frontend systems at <strong className="text-foreground">Bajaj Finserv Health</strong> with{" "}
                  <strong className="text-primary">React, Next.js and TypeScript</strong>: state that scales, forms
                  driven by schema, and bundles that load fast on a 3G phone.
                </p>
                <p>
                  I care about the <strong className="text-foreground">trade-offs behind every choice</strong>, and
                  about the engineers around me: I review, mentor, and raise the bar.
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {highlights.map(({ icon: Icon, label, desc }) => (
                  <li key={label} className="rounded-2xl border border-border bg-surface/60 p-4">
                    <Icon className="mb-3 h-5 w-5 text-primary" aria-hidden />
                    <p className="font-heading text-sm font-semibold">{label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground-muted">{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>

          <div data-reveal className="md:col-span-2 md:row-span-2">
            <TiltFrame className="relative h-full min-h-[320px] overflow-hidden rounded-3xl border border-border">
              <img
                src={portraitImg}
                alt="Portrait of Adarsh Kushwaha"
                className="absolute inset-0 h-full w-full object-cover object-top"
                loading="lazy"
                width={720}
                height={613}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-5 pt-16">
                <p className="font-heading text-lg font-semibold">{profile.name}</p>
                <p className="text-xs text-foreground-muted">{profile.label}</p>
              </div>
            </TiltFrame>
          </div>

          <SpotlightCard data-reveal className="flex flex-col justify-between p-6 md:col-span-2">
            <MapPin className="h-5 w-5 text-gold" aria-hidden />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">Based in</p>
              <p className="mt-1 font-heading text-2xl font-semibold">{profile.city}</p>
              <p className="mt-1 text-sm text-foreground-muted">
                It's <LocalTime className="font-mono text-foreground" /> here. Remote-first, timezone flexible.
              </p>
            </div>
          </SpotlightCard>

          <div data-reveal className="relative min-h-[240px] overflow-hidden rounded-3xl border border-border md:col-span-4">
            <img
              src={casualImg}
              alt="Adarsh at home, his second office"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105 motion-reduce:transition-none"
              loading="lazy"
              width={960}
              height={640}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex max-w-sm flex-col justify-end gap-2 p-6">
              <Coffee className="h-5 w-5 text-gold" aria-hidden />
              <p className="text-sm leading-relaxed text-foreground">
                A curious generalist in Pune. The calm pace keeps me balanced, and my best thinking happens over hot
                filter coffee.
              </p>
            </div>
          </div>

          <SpotlightCard
            data-reveal
            className="border-gold/30 bg-gold/5 p-7 md:col-span-6 md:flex md:items-center md:gap-8"
          >
            <p className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold">
              <Sparkles className="h-4 w-4" aria-hidden /> What I'm working on
            </p>
            <p className="mt-3 text-lg leading-relaxed text-foreground md:mt-0">{profile.workingOn}</p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
