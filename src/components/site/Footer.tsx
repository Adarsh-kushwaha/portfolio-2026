/**
 * Footer — oversized signature, quick links and back-to-top.
 */
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { profile } from "@/content/profile";
import { scrollToSection, scrollToY } from "@/lib/smooth-scroll";
import { sections } from "./SiteNav";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div className="container-max">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-1 sm:grid-cols-4">
              {sections.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(`#${id}`)}
                    className="min-h-[40px] text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/blog" className="inline-flex min-h-[40px] items-center text-sm text-foreground-muted hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center text-sm text-foreground-muted hover:text-foreground"
                >
                  Résumé
                </a>
              </li>
            </ul>
          </nav>
          <button
            onClick={() => scrollToY(0)}
            className="group inline-flex min-h-[48px] w-fit items-center gap-2 rounded-full border border-border px-5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            Back to top
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" aria-hidden />
          </button>
        </div>

        <p
          aria-hidden
          className="mt-16 select-none whitespace-nowrap text-center font-heading text-[clamp(3rem,15vw,13rem)] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_hsl(var(--border))] transition-colors duration-700 hover:[-webkit-text-stroke:1px_hsl(var(--primary))]"
        >
          ADARSH K.
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-border-subtle pt-6 text-xs text-foreground-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}. Designed and built in Pune.</p>
          <p className="font-mono">React · TypeScript · GSAP · Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
