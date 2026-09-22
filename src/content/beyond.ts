/**
 * Beyond the Code — all personal content lives here, and only here. See CONTEXT.md.
 */

export interface Hobby {
  id: "videos" | "cooking" | "walks" | "music";
  label: string;
  desc: string;
}

export interface Thought {
  emoji: string;
  title: string;
  desc: string;
}

export const hobbies: Hobby[] = [
  { id: "walks", label: "Long City Walks", desc: "Tamini Ghat at dusk, always" },
  { id: "cooking", label: "Cooking", desc: "Kadhai Paneer is my magnum opus" },
  { id: "videos", label: "Making Videos", desc: "I love making videos on YouTube" },
  { id: "music", label: "Indie Music", desc: "Headphones on, world off" },
];

export const thoughts: Thought[] = [
  {
    emoji: "❤️",
    title: "Empathy First",
    desc: "Great products are built for humans. I code with the user's context, not just the requirements doc.",
  },
  {
    emoji: "🔍",
    title: "Obsessive Craft",
    desc: "That 4px misalignment bothers me. Good enough rarely is.",
  },
  {
    emoji: "🌱",
    title: "Always Learning",
    desc: "The web moves fast. I stay curious, and I'm never the smartest person in the room.",
  },
  {
    emoji: "🤝",
    title: "Collaboration",
    desc: "My best code came out of pair-programming sessions and brutally honest reviews.",
  },
];

export const funFacts = [
  "I’ve rewritten the same function five times just to name it better.",
  "`typeof null === 'object'` broke my brain at 2 AM once.",
  "I use `console.log` more than any framework feature.",
  "I cross my death calendar days off on weekends.",
  "Cooking is my love language.",
  "I don’t chase perfection, except in UI alignment. Then it becomes personal. 🎯",
];

export const sundayInPune = [
  { time: "7:30 AM", icon: "📱", event: "Wake up, hit snooze 2–3 times, scroll for ‘5 mins’" },
  { time: "9:00 AM", icon: "☕", event: "Chai + light breakfast, thinking about the week" },
  { time: "11:00 AM", icon: "💻", event: "Study block: fixing bugs, prep, or learning something new" },
  { time: "2:00 PM", icon: "🍽️", event: "Lunch + a YouTube break that lasts longer than planned" },
  { time: "6:00 PM", icon: "🚶", event: "A walk and some fresh air" },
  { time: "9:30 PM", icon: "🌙", event: "Dinner + overthinking tomorrow’s plan" },
  { time: "12:30 AM", icon: "💤", event: "One last thing on the laptop that turns into a late night" },
];

/** Verified against the Constance Garnett translation (Project Gutenberg #2554). */
export const reading = {
  title: "Crime and Punishment",
  author: "Fyodor Dostoevsky",
  quotes: [
    "Man grows used to everything, the scoundrel!",
    "Taking a new step, uttering a new word is what they fear most.",
    "It’s because I chatter that I do nothing.",
    "Talk nonsense, but talk your own nonsense, and I’ll kiss you for it.",
    "To go wrong in one’s own way is better than to go right in someone else’s.",
    "Nothing in the world is harder than speaking the truth and nothing easier than flattery.",
    "Pain and suffering are always inevitable for a large intelligence and a deep heart.",
    "Power is only vouchsafed to the man who dares to stoop and pick it up.",
  ],
};

export const listening = {
  title: "Take My True Love By The Hand",
  artist: "The Limeliters",
  spotifyTrackId: "7C6DRuY8wXG0XhwGPy5PpE",
};
