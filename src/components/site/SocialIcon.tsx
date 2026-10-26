import { Github, Instagram, Linkedin, Mail, Twitter, type LucideIcon } from "lucide-react";
import type { SocialId } from "@/content/profile";

const icons: Record<SocialId, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  email: Mail,
};

export function SocialIcon({ id, className }: { id: SocialId; className?: string }) {
  const Icon = icons[id];
  return <Icon className={className} aria-hidden />;
}
