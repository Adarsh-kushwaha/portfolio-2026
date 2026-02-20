/**
 * Contact Section — Form + social links + "currently reading/listening" row
 */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Linkedin, Twitter, Instagram, Send, BookOpen, Music2, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Mail, label: "Email", handle: "adarsh@example.com", href: "mailto:adarsh@example.com", color: "hover:text-primary" },
  { icon: Linkedin, label: "LinkedIn", handle: "linkedin.com/in/adarshkushwaha", href: "https://linkedin.com/in/adarshkushwaha", color: "hover:text-primary" },
  { icon: Github, label: "GitHub", handle: "github.com/adarshkushwaha", href: "https://github.com/adarshkushwaha", color: "hover:text-primary" },
  { icon: Twitter, label: "Twitter / X", handle: "@adarshkushwaha", href: "https://twitter.com/adarshkushwaha", color: "hover:text-primary" },
  { icon: Instagram, label: "Instagram", handle: "@adarsh.frames", href: "https://instagram.com", color: "hover:text-gold" },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate send — replace with your email service (Resend / EmailJS)
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm text-foreground placeholder:text-foreground-muted transition-all duration-200 font-body";

  return (
    <section id="connect" className="section-padding" ref={ref}>
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="section-label">Let's Connect</span>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-700 tracking-tight">
            Say <span className="text-gradient-teal">Hello</span> 👋
          </h2>
          <p className="text-foreground-muted mt-2 text-sm md:text-base max-w-xl">
            Whether it's a career opportunity, a collab, or just a good conversation — my inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center glass-card rounded-2xl border border-primary/30 p-12 text-center"
              >
                <span className="text-5xl mb-4">🎉</span>
                <h3 className="text-xl font-heading font-700 text-foreground mb-2">Message Sent!</h3>
                <p className="text-foreground-muted text-sm">I'll get back to you within 24 hours. Promise.</p>
                <button onClick={() => setStatus("idle")} className="mt-6 text-sm text-primary hover:text-primary-glow transition-colors">
                  Send another message →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-heading font-600 text-foreground-muted mb-1.5 uppercase tracking-wide">Name</label>
                    <input
                      id="name" name="name" type="text" required autoComplete="name"
                      value={form.name} onChange={handleChange}
                      placeholder="Your name" className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-heading font-600 text-foreground-muted mb-1.5 uppercase tracking-wide">Email</label>
                    <input
                      id="email" name="email" type="email" required autoComplete="email"
                      value={form.email} onChange={handleChange}
                      placeholder="your@email.com" className={inputClasses}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-heading font-600 text-foreground-muted mb-1.5 uppercase tracking-wide">Subject</label>
                  <input
                    id="subject" name="subject" type="text" required
                    value={form.subject} onChange={handleChange}
                    placeholder="What's on your mind?" className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-heading font-600 text-foreground-muted mb-1.5 uppercase tracking-wide">Message</label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project, idea, or just say hi..."
                    className={`${inputClasses} resize-none`}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 rounded-xl btn-primary font-heading font-600 text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <><span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" /> Sending…</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Social links + current reads */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Direct links */}
            <div>
              <h3 className="text-base font-heading font-700 text-foreground mb-4">Find me on</h3>
              <div className="space-y-3">
                {socialLinks.map(({ icon: Icon, label, handle, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-4 p-4 glass-card rounded-xl border border-border hover:border-primary/40 transition-all duration-300 group ${color}`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-surface-2 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-heading font-600 text-foreground-muted uppercase tracking-wide">{label}</p>
                      <p className="text-sm text-foreground font-body">{handle}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Currently consuming */}
            <div>
              <h3 className="text-base font-heading font-700 text-foreground mb-4">Currently…</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 glass-card rounded-xl border border-border">
                  <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground-muted uppercase tracking-wide font-600">Reading</p>
                    <p className="text-sm text-foreground">"Midnight's Children" — Salman Rushdie</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 glass-card rounded-xl border border-border">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Music2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground-muted uppercase tracking-wide font-600">Listening</p>
                    <p className="text-sm text-foreground">Phoebe Bridgers + Late Night Indie Lo-fi</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 glass-card rounded-xl border border-border">
                  <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground-muted uppercase tracking-wide font-600">Based in</p>
                    <p className="text-sm text-foreground">Mumbai, Maharashtra, India 🇮🇳</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
