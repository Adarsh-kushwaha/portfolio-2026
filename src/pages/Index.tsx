/**
 * Index — Main portfolio page for Adarsh Kushwaha
 * Composes all sections with smooth scroll + theme toggle
 */
import { useState, useEffect } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Arena from "@/components/portfolio/arena/Arena";
import Campaign from "@/components/portfolio/campaign/Campaign";
import Beyond from "@/components/portfolio/beyond/Beyond";
import Contact from "@/components/portfolio/Contact";
import { RenderModeProvider, useRenderMode } from "@/lib/render-mode";
import { ThreeProvider } from "@/lib/three-loader";
import { SmoothScrollProvider } from "@/lib/smooth-scroll";


type Theme = "dark" | "light";

export default function Index() {
  return (
    <RenderModeProvider>
      <SmoothScrollProvider>
        <ThreeProvider>
          <HomePage />
        </ThreeProvider>
      </SmoothScrollProvider>
    </RenderModeProvider>
  );
}

function HomePage() {
  const renderMode = useRenderMode();
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
    <div className="min-h-screen overflow-x-clip bg-background text-foreground" data-render-mode={renderMode}>
      {/* SEO meta rendered in index.html — update title/description there */}

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <About />
        <Arena />
        <Campaign />
        <Beyond />
        <Contact />
        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="container-max px-4 sm:px-6 lg:px-8 text-center text-sm text-foreground-muted">
            Made by Adarsh with ❤️ 
          </div>
        </footer>
      </main>
    </div>
  );
}
