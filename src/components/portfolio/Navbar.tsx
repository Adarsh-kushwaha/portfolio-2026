/**
 * Navbar — Fixed header with scroll state, theme toggle, mobile menu
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Download } from "lucide-react";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Work", href: "#work" },
  { label: "Whoami", href: "#human" },
  { label: "Blog", href: "/blog" },
  { label: "Connect", href: "#connect" },
];

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (href: string) => {
    if (href === "/blog") {
      window.location.href = href;
      return;
    }
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg-dark"
          : "bg-transparent"
          }`}
      >
        <div className="container-max section-padding py-0">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-9 h-9 rounded-lg bg-gradient-teal flex items-center justify-center shadow-teal">
                <span className="font-heading text-sm font-700 text-primary-foreground">AK</span>
              </div>
              <span className="hidden sm:block font-heading font-600 text-foreground text-lg tracking-tight">
                Adarsh<span className="text-gradient-teal">{" "}Kushwaha</span>
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="nav-link text-sm"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-border hover:border-primary transition-all duration-300 hover:bg-primary/10"
                aria-label="Toggle theme"
              >
                {theme === "dark"
                  ? <Sun className="w-4 h-4 text-gold" />
                  : <Moon className="w-4 h-4 text-primary" />
                }
              </motion.button>

              {/* Resume CTA */}
              <motion.a
                href="https://drive.google.com/file/d/1IiLR7RsvmdnCjps6L4vTbuJVkH8mDVTa/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg btn-primary text-sm"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </motion.a>

              {/* Mobile hamburger */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center border border-border"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-xl border-b border-border md:hidden"
          >
            <nav className="container-max section-padding py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left font-heading font-500 text-lg text-foreground-muted hover:text-primary transition-colors py-2 border-b border-border-subtle"
                >
                  {link.label}
                </motion.button>
              ))}
              <a
                href="https://drive.google.com/file/d/1IiLR7RsvmdnCjps6L4vTbuJVkH8mDVTa/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg btn-primary text-sm"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
