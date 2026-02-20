/**
 * Index — Main portfolio page for Adarsh Kushwaha
 * Composes all sections with smooth scroll + theme toggle
 */
import { useState, useEffect } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Journey from "@/components/portfolio/Journey";
import Work from "@/components/portfolio/Work";
import TheHuman from "@/components/portfolio/TheHuman";
import Testimonials from "@/components/portfolio/Testimonials";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

type Theme = "dark" | "light";

export default function Index() {
  const [theme, setTheme] = useState<Theme>("dark");

  // Persist theme preference
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* SEO meta rendered in index.html — update title/description there */}

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Journey />
        <Work />
        <TheHuman />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
