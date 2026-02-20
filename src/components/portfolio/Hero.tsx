/**
 * Hero Section — Full-viewport with Mumbai skyline, floating particles,
 * headline, subtitle, CTAs, and portrait.
 */
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Mail, Download } from "lucide-react";
import portraitImg from "@/assets/adarsh-portrait.png";
// import mumbaiHeroImg from "@/assets/mumbai-hero.jpg";

// Floating code particles data
const particles = [
  { text: "</>", x: "10%", y: "20%", delay: 0 },
  { text: "{ }", x: "85%", y: "30%", delay: 0.5 },
  { text: "=>", x: "15%", y: "70%", delay: 1 },
  { text: "npm", x: "80%", y: "75%", delay: 1.5 },
  { text: "const", x: "5%", y: "45%", delay: 0.8 },
  { text: "tsx", x: "90%", y: "55%", delay: 0.3 },
  { text: "[ ]", x: "50%", y: "10%", delay: 1.2 },
  { text: "async", x: "60%", y: "85%", delay: 0.7 },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/Adarsh-kushwaha", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/adarshkushwaha", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/heyadarshhere", label: "Twitter" },
  { icon: Mail, href: "mailto:adarshkushwaha296@gmail.com", label: "Email" },
];

const itemVariant = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background: Mumbai skyline */}
      <div className="absolute inset-0">
        {/* <img
          src={mumbaiHeroImg}
          alt="Mumbai skyline"
          className="w-full h-full object-cover object-center opacity-20"
          loading="eager"
        /> */}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/60" />
        {/* Teal glow orb */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
      </div>

      {/* Floating code particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute font-mono text-xs text-primary/20 select-none pointer-events-none hidden md:block"
          style={{ left: p.x, top: p.y }}
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3 + i * 0.5, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {p.text}
        </motion.span>
      ))}

      {/* Content */}
      <div className="relative z-10 container-max section-padding w-full pt-32 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.1 }}
            className="space-y-6"
          >
            {/* Label */}
            <motion.div variants={itemVariant} transition={{ duration: 0.6 }} className="flex items-center gap-3">
              <span className="section-label">Frontend Developer · Pune, India</span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-foreground-muted">Available for opportunities</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariant} transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-heading font-bold leading-[1.08] tracking-tight"
            >
              Hi, I'm{" "}
              <span className="text-gradient-teal block sm:inline">Adarsh Kushwaha</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariant} transition={{ duration: 0.6 }}
              className="text-base md:text-lg text-foreground-muted leading-relaxed max-w-xl"
            >
              I craft{" "}
              <span className="text-foreground font-medium">pixel-perfect, delightful</span> digital
              experiences at scale — while trying to be a decent human in the process.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariant} transition={{ duration: 0.6 }} className="flex flex-wrap gap-4 pt-2">
              <motion.a
                href="#work"
                onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl btn-primary font-heading font-semibold text-sm"
              >
                See My Work
              </motion.a>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl btn-outline font-heading font-semibold text-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariant} transition={{ duration: 0.6 }} className="flex items-center gap-4 pt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-border hover:border-primary hover:text-primary hover:bg-primary/10 text-foreground-muted transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin-slow scale-110" />
              <div className="absolute inset-0 rounded-full border border-gold/20 animate-spin-slow scale-125" style={{ animationDirection: "reverse", animationDuration: "30s" }} />

              {/* Portrait */}
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/40 animate-pulse-glow"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={portraitImg}
                  alt="Adarsh Kushwaha — Frontend Developer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/10 to-transparent" />
              </motion.div>

              {/* Floating badge: Experience */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-4 top-8 glass-card rounded-xl px-4 py-2 border border-primary/30"
              >
                <p className="text-xs text-foreground-muted font-body">Experience</p>
                <p className="text-base font-heading font-700 text-gradient-teal">3+ Years</p>
              </motion.div>

              {/* Floating badge: Projects */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -left-4 bottom-12 glass-card rounded-xl px-4 py-2 border border-gold/30"
              >
                <p className="text-xs text-foreground-muted font-body">Skills</p>
                <p className="text-base font-heading font-700 text-gradient-gold">React & Next</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-foreground-muted font-body tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 text-primary animate-bounce-scroll" />
        </motion.div>
      </div>
    </section>
  );
}
