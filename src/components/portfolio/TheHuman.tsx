/**
 * The Human Section — "Beyond the Code": values, hobbies, Sunday in Mumbai, fun facts
 */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Camera, BookOpen, ChefHat, MapPin, Coffee, Music, Dumbbell } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Empathy First",
    desc: "Great products are built for humans. I design and code with the user's context — not just the requirements doc.",
    color: "text-red-400",
  },
  {
    icon: "🔍",
    iconType: "emoji",
    title: "Obsessive Craft",
    desc: "I care deeply about details others overlook. That 4px alignment issue bothers me. Good enough rarely is.",
    color: "text-primary",
  },
  {
    icon: "🌱",
    iconType: "emoji",
    title: "Always Learning",
    desc: "The web moves fast. I stay curious, read RFC docs for fun, and am never the smartest person in the room.",
    color: "text-green-400",
  },
  {
    icon: "🤝",
    iconType: "emoji",
    title: "Collaboration",
    desc: "The best code I've written came from pair-programming sessions and brutally honest design reviews.",
    color: "text-gold",
  },
];

const hobbies = [
  { icon: Camera, label: "Making Videos", desc: "I love making videos on youtube" },
  { icon: BookOpen, label: "Fiction Reading", desc: "Currently reading Mahabhoj" },
  { icon: ChefHat, label: "Cooking", desc: "Kadhai Paneer is my magnum opus" },
  { icon: MapPin, label: "Long City Walks", desc: "Tamini Ghat at dusk, always" },
  { icon: Music, label: "Indie Music", desc: "I love listening to indie music" },
  { icon: Dumbbell, label: "Cricket", desc: "Terrible but enthusiastic" },
];

const funFacts = [
  "I say I’m not hungry and then finish everyone’s food.",
  "I overthink one text to my crush and send ‘ok’.",
  "I dream big at night and hit snooze in the morning.",
  "I plan my life on Monday and mess it up by Tuesday.",
  "I act calm in public but panic quietly inside.",
  "I do dumb things sometimes and call it ‘learning’.",
];

export default function TheHuman() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="human" className="section-padding" ref={ref}>
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="section-label">The Human</span>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-700 tracking-tight">
            Beyond <span className="text-gradient-gold">the Code</span>
          </h2>
          <p className="text-foreground-muted mt-2 text-sm md:text-base max-w-xl">
            Because great engineers are whole people first.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-xl font-heading font-700 text-foreground mb-6">My Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-5 border border-border hover:border-primary/40 transition-all duration-300"
              >
                <div className="mb-3">
                  {v.iconType === "emoji"
                    ? <span className="text-2xl">{v.icon as string}</span>
                    : <Heart className={`w-5 h-5 ${v.color}`} />
                  }
                </div>
                <h4 className="text-sm font-heading font-700 text-foreground mb-2">{v.title}</h4>
                <p className="text-xs text-foreground-muted leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Hobbies */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <h3 className="text-xl font-heading font-700 text-foreground mb-6">
              What I Do for Fun
            </h3>
            <div className="space-y-3">
              {hobbies.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 glass-card rounded-xl border border-border hover:border-primary/40 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <h.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-heading font-600 text-foreground">{h.label}</p>
                    <p className="text-xs text-foreground-muted">{h.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* A typical Sunday */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-heading font-700 text-foreground mb-6">
              A Sunday in Pune ☀️
            </h3>
            <div className="glass-card rounded-2xl border border-border p-6 space-y-4">
              {[
                { time: "7:30 AM", event: "Wake up, hit snooze 2–3 times, scroll phone for ‘5 mins’", icon: "📱" },
                { time: "9:00 AM", event: "Chai + light breakfast while thinking about pending work/interviews", icon: "☕" },
                { time: "11:00 AM", event: "Work / study block (fixing bugs, prep, or learning something new)", icon: "💻" },
                { time: "2:00 PM", event: "Lunch / random YouTube break that lasts longer than planned", icon: "🍽️" },
                { time: "6:00 PM", event: " Study Short walk / fresh air / mental break (deciding to ‘be healthy’)", icon: "🚶" },
                { time: "9:30 PM", event: "Dinner + light scrolling + overthinking tomorrow’s plan", icon: "🌙" },
                { time: "12:30 AM", event: "One last thing on laptop that turns into a late night", icon: "💤" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-xs text-primary font-heading font-600 w-16 flex-shrink-0 mt-0.5">{item.time}</span>
                    <p className="text-sm text-foreground-muted leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-xl font-heading font-700 text-foreground mb-6">
            Ask Me About… <span className="text-gradient-teal">/ Fun Facts</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {funFacts.map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.55 + i * 0.07 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-xl p-4 border border-border hover:border-gold/40 transition-all duration-300"
              >
                <span className="text-gold text-lg mr-2">#{i + 1}</span>
                <span className="text-sm text-foreground-muted leading-relaxed">{fact}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
