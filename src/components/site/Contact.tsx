/**
 * Contact — the closing CTA: a validated message form (Web3Forms), copy-email and socials.
 */
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { profile, socials } from "@/content/profile";
import { revealChildren, useGsap } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SocialIcon } from "./SocialIcon";
import { SectionHeading, SpotlightCard } from "./primitives";

const schema = z.object({
  name: z.string().trim().min(2, "Tell me your name"),
  email: z.string().trim().email("That email doesn't look right"),
  subject: z.string().trim().min(3, "Add a short subject"),
  message: z.string().trim().min(10, "A few more words, please (10+ characters)"),
});
type FormValues = z.infer<typeof schema>;

const RATE_KEY = "contact_form_last_sent";
const DAY = 24 * 60 * 60 * 1000;

const sentRecently = () => {
  try {
    const last = Number(localStorage.getItem(RATE_KEY));
    return Boolean(last) && Date.now() - last < DAY;
  } catch {
    return false;
  }
};

type Status = "idle" | "sent" | "error" | "rate-limited";

const fields: { name: keyof FormValues; label: string; type?: string; autoComplete?: string; placeholder: string }[] = [
  { name: "name", label: "Name", autoComplete: "name", placeholder: "Your name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@company.com" },
  { name: "subject", label: "Subject", placeholder: "Role, project, or just hi" },
];

const inputClass =
  "w-full rounded-2xl border bg-surface/70 px-4 py-3.5 text-base text-foreground outline-none transition-colors duration-200 placeholder:text-foreground-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/25";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, revealChildren);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onTouched" });

  const onSubmit = async (values: FormValues) => {
    if (sentRecently()) return setStatus("rate-limited");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "6d43cf95-3c5c-468d-ae4d-770273dfcf7e",
          ...values,
          from_name: "Portfolio Contact Form",
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      localStorage.setItem(RATE_KEY, String(Date.now()));
      reset();
      setStatus("sent");
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const notice: Record<Exclude<Status, "idle">, { title: string; body: string; tone: string }> = {
    sent: { title: "Message sent!", body: "I'll get back to you within 24 hours. Promise.", tone: "border-primary/40" },
    "rate-limited": {
      title: "Already got one from you",
      body: "You sent a message in the last 24 hours. Email me directly if it's urgent.",
      tone: "border-gold/40",
    },
    error: {
      title: "Something went wrong",
      body: "Please try again, or email me directly.",
      tone: "border-destructive/40",
    },
  };

  return (
    <section ref={root} id="contact" aria-labelledby="contact-title" className="section-padding relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%]">
        <div className="absolute bottom-[-30%] left-1/2 h-[60vmax] w-[80vmax] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
      </div>
      <div className="container-max space-y-14">
        <SectionHeading
          index="07"
          eyebrow="Contact"
          id="contact-title"
          title={
            <>
              Let's build something <span className="text-gradient-aurora">that loads fast.</span>
            </>
          }
          lede="A role, a collab or a good conversation: my inbox is always open."
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <SpotlightCard data-reveal className="p-6 md:p-8 lg:col-span-3">
            <AnimatePresence mode="wait">
              {status === "idle" ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {fields.slice(0, 2).map((f) => (
                      <Field key={f.name} {...f} error={errors[f.name]?.message} register={register} />
                    ))}
                  </div>
                  <Field {...fields[2]} error={errors.subject?.message} register={register} />
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about the project, the team, or the problem."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={cn(inputClass, "resize-none", errors.message ? "border-destructive" : "border-border")}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p id="message-error" role="alert" className="mt-1.5 text-sm text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-gradient-aurora font-heading text-sm font-semibold text-primary-foreground shadow-teal transition-all duration-300 hover:shadow-[0_0_48px_hsl(var(--primary)/0.45)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key={status}
                  role="status"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "flex min-h-[360px] flex-col items-center justify-center rounded-2xl border p-10 text-center",
                    notice[status].tone,
                  )}
                >
                  {status === "sent" && (
                    <span className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-6 w-6" aria-hidden />
                    </span>
                  )}
                  <h3 className="font-heading text-2xl font-semibold">{notice[status].title}</h3>
                  <p className="mt-2 max-w-sm text-foreground-muted">{notice[status].body}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 min-h-[44px] text-sm font-medium text-primary hover:underline"
                  >
                    {status === "sent" ? "Send another message" : "Back to the form"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </SpotlightCard>

          <div className="flex flex-col gap-4 lg:col-span-2">
            <SpotlightCard data-reveal className="p-6 md:p-7">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">Email me directly</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <a href={`mailto:${profile.email}`} className="break-all font-heading text-lg font-semibold hover:text-primary">
                  {profile.email}
                </a>
                <button
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </SpotlightCard>

            <ul data-reveal className="flex flex-1 flex-col divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card/70">
              {socials
                .filter((s) => s.id !== "email")
                .map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[64px] items-center gap-4 px-6 py-4 transition-colors hover:bg-surface-2/60"
                    >
                      <SocialIcon id={s.id} className="h-5 w-5 text-foreground-muted transition-colors group-hover:text-primary" />
                      <span className="flex-1">
                        <span className="block text-sm font-semibold">{s.label}</span>
                        <span className="block text-xs text-foreground-muted">{s.handle}</span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-foreground-muted transition-all duration-300 group-hover:rotate-45 group-hover:text-primary"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  placeholder,
  error,
  register,
}: (typeof fields)[number] & {
  error?: string;
  register: ReturnType<typeof useForm<FormValues>>["register"];
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(inputClass, error ? "border-destructive" : "border-border")}
        {...register(name)}
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
