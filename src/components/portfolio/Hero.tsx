/**
 * Hero — who Adarsh is, with the metrics up front. The Avatar poster paints first;
 * the 3D desk scene fades in over it once the stage has loaded (ADR 0001).
 */
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { profile, socials } from "@/content/profile";
import { SceneSlot } from "@/components/three/SceneSlot";
import { LocalTime } from "./LocalTime";
import { SocialIcon } from "./SocialIcon";

const item = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const loadHeroScene = () => import("@/components/three/HeroScene");

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-name" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative z-10 container-max section-padding w-full pt-28 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Avatar: above the text on mobile, to the right on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-first lg:order-last"
          >
            <SceneSlot
              load={loadHeroScene}
              poster="/posters/hero-avatar.webp"
              posterAlt="Adarsh's Avatar at a desk with a laptop and a filter coffee"
              className="aspect-square w-full max-w-[22rem] sm:max-w-md lg:max-w-none mx-auto"
            />
          </motion.div>

          <motion.div initial="initial" animate="animate" transition={{ staggerChildren: 0.08 }} className="space-y-6">
            <motion.div variants={item} className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="section-label">{profile.label}</span>
              <span className="text-xs text-foreground-muted">
                📍 Pune · 🕐 <LocalTime />
              </span>
            </motion.div>

            <motion.h1
              id="hero-name"
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-heading font-bold leading-[1.08] tracking-tight"
            >
              Hi, I'm <span className="text-gradient-teal block sm:inline">{profile.name}</span>
            </motion.h1>

            <motion.p variants={item} className="text-base md:text-lg text-foreground-muted leading-relaxed max-w-xl">
              {profile.subtitle}
            </motion.p>

            <motion.span
              variants={item}
              className="inline-block text-xs text-foreground-muted border border-border rounded-full px-3 py-1"
            >
              {profile.coffeeTag}
            </motion.span>

            <motion.div variants={item} className="flex flex-wrap gap-4 pt-1">
              <a
                href="#campaign"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#campaign")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-xl btn-primary font-heading font-semibold text-sm"
              >
                See My Work
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl btn-outline font-heading font-semibold text-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" aria-hidden />
                Download Resume
              </a>
            </motion.div>

            <motion.ul variants={item} className="flex flex-wrap items-center gap-3 pt-1" aria-label="Social links">
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target={s.id === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 rounded-xl flex items-center justify-center border border-border hover:border-primary hover:text-primary hover:bg-primary/10 text-foreground-muted transition-all duration-300"
                  >
                    <SocialIcon id={s.id} className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2" aria-hidden>
          <span className="text-xs text-foreground-muted tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 text-primary animate-bounce-scroll" />
        </div>
      </div>
    </section>
  );
}
