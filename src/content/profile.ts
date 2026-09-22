/**
 * Profile — who Adarsh is, how to reach him. Shared by Hero, Letterbox and Navbar.
 */

export type SocialId = "github" | "linkedin" | "twitter" | "instagram" | "email";

export interface Social {
  id: SocialId;
  label: string;
  handle: string;
  href: string;
}

export const profile = {
  name: "Adarsh Kushwaha",
  label: "SDE II · Frontend Systems · Pune",
  city: "Pune, Maharashtra",
  timeZone: "Asia/Kolkata",
  subtitle:
    "I architect frontend systems that scale: 1.25L+ API calls a month, 200+ form variants from one schema, Lighthouse 60 → 95. I also mentor the engineers who build them with me.",
  coffeeTag: "☕ fueled by filter coffee",
  resumeUrl: "https://drive.google.com/file/d/1gE28e8lyAEWYHOz-eKw_NkVjZMYrVDQk/view?usp=sharing",
  email: "adarshkushwaha296@gmail.com",
  // ⚠️ Draft — owner to confirm.
  workingOn:
    "Scaling the Campaign Management System at Bajaj Finserv Health, and levelling up my weakest stat: moving toward test-first with Vitest + RTL.",
};

export const socials: Social[] = [
  { id: "github", label: "GitHub", handle: "github.com/Adarsh-kushwaha", href: "https://github.com/Adarsh-kushwaha" },
  { id: "linkedin", label: "LinkedIn", handle: "linkedin.com/in/adarshkushwaha", href: "https://linkedin.com/in/adarshkushwaha" },
  { id: "twitter", label: "Twitter / X", handle: "@heyadarshhere", href: "https://twitter.com/heyadarshhere" },
  { id: "instagram", label: "Instagram", handle: "adarshkushwaha.in", href: "https://instagram.com/adarshkushwaha.in" },
  { id: "email", label: "Email", handle: "adarshkushwaha296@gmail.com", href: "mailto:adarshkushwaha296@gmail.com" },
];
