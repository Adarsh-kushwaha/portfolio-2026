/**
 * About — the Engineer Behind the Pixels (intro card) and the Human Behind the Screen
 * (who Adarsh is right now). Hobbies and values live in Beyond the Code.
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Heart, MapPin, Rocket } from "lucide-react";
import portraitImg from "@/assets/adarsh-portrait.webp";
import casualImg from "@/assets/adarsh-casual.webp";
import { profile } from "@/content/profile";
import { TiltFrame } from "./TiltFrame";

const highlights = [
  { icon: Code2, label: "System Design", desc: "Zustand, Module Federation, schema-driven" },
  { icon: MapPin, label: "Pune-based", desc: "Remote-first, timezone flexible" },
  { icon: Heart, label: "Mentorship", desc: "Growing juniors, raising quality bars" },
  { icon: Rocket, label: "Shipping Culture", desc: "Fast iterations + maintainability" },
];

const fadeUp = { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 } };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const state = inView ? "animate" : "initial";

  return (
    <section id="about" aria-labelledby="about-engineer" className="section-padding" ref={ref}>
      <div className="container-max space-y-10">
        <span className="section-label">About</span>

        {/* The Engineer Behind the Pixels */}
        <motion.article
          initial="initial"
          animate={state}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl border border-border p-6 md:p-10 grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 items-center"
        >
          <TiltFrame className="rounded-2xl overflow-hidden border border-border aspect-[4/3.4]">
            <img
              src={portraitImg}
              alt="Portrait of Adarsh Kushwaha"
              className="h-full w-full object-cover object-top"
              loading="lazy"
              width={720}
              height={613}
            />
          </TiltFrame>

          <div className="space-y-5">
            <h2 id="about-engineer" className="text-3xl md:text-4xl font-heading font-700 tracking-tight leading-tight">
              The Engineer <span className="text-gradient-teal">Behind the Pixels</span>
            </h2>
            <p className="text-foreground-muted leading-relaxed">
              I architect frontend systems at <strong className="text-foreground">Bajaj Finserv Health</strong> with{" "}
              <strong className="text-primary">React, Next.js and TypeScript</strong>: state that scales, forms driven by
              schema, and bundles that load fast on a 3G phone.
            </p>
            <p className="text-foreground-muted leading-relaxed">
              I care about the <strong className="text-foreground">trade-offs behind every choice</strong>, and about
              the engineers around me: I review, mentor, and raise the bar.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {highlights.map(({ icon: Icon, label, desc }) => (
                <li key={label} className="rounded-xl border border-border p-4 hover:border-primary/50 transition-colors">
                  <Icon className="w-5 h-5 text-primary mb-2" aria-hidden />
                  <p className="text-sm font-heading font-600 text-foreground">{label}</p>
                  <p className="text-xs text-foreground-muted mt-0.5">{desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>

        {/* The Human Behind the Screen */}
        <motion.article
          initial="initial"
          animate={state}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.15 }}
          aria-labelledby="about-human"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div className="space-y-5 md:order-last">
            <h2 id="about-human" className="text-3xl md:text-4xl font-heading font-700 tracking-tight leading-tight">
              The Human <span className="text-gradient-gold">Behind the Screen</span>
            </h2>
            <p className="text-foreground-muted leading-relaxed">
              Beyond the editor, I'm a curious generalist living in Pune. The calm pace and good weather keep me
              balanced, and I do my best thinking with a hot cup of filter coffee.
            </p>
            <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5">
              <p className="text-xs uppercase tracking-widest text-gold font-600 mb-2">What I'm working on</p>
              <p className="text-foreground leading-relaxed">{profile.workingOn}</p>
            </div>
          </div>

          <TiltFrame className="relative rounded-2xl overflow-hidden border border-border aspect-[3/2]">
            <img
              src={casualImg}
              alt="Adarsh at home, his second office"
              className="h-full w-full object-cover"
              loading="lazy"
              width={960}
              height={640}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-xs text-foreground/85 italic">
              📍 My second office: home, good filter coffee and fast WiFi
            </p>
          </TiltFrame>
        </motion.article>
      </div>
    </section>
  );
}
