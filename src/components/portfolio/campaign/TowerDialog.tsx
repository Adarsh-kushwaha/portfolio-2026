/**
 * A Tower's full story: context, the forces behind it, the decision, and every metric.
 * The one place the whole story lives; Arena Bosses link here.
 */
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { levelOf, type Tower } from "@/content/campaign";

interface TowerDialogProps {
  tower: Tower | null;
  onClose: () => void;
}

export function TowerDialog({ tower, onClose }: TowerDialogProps) {
  const level = tower ? levelOf(tower) : undefined;
  return (
    <Dialog.Root open={tower !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        {tower && (
          <Dialog.Content className="fixed z-[61] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-border bg-surface p-6 md:p-8 shadow-lg-dark focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold font-600">
                  {level ? `Level ${level.number} · ${level.title}` : "Side Quest"}
                </p>
                <Dialog.Title className="mt-1 text-2xl font-heading font-700 text-foreground">
                  <span aria-hidden>{tower.emoji} </span>
                  {tower.title}
                </Dialog.Title>
              </div>
              <Dialog.Close
                className="w-9 h-9 flex-shrink-0 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="mt-3 text-foreground-muted leading-relaxed">{tower.context}</Dialog.Description>

            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-xs uppercase tracking-widest text-foreground-muted font-600">Problem & trade-offs</dt>
                <dd className="mt-1 text-sm text-foreground leading-relaxed">{tower.problem}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-foreground-muted font-600">Architecture decision</dt>
                <dd className="mt-1 text-sm text-foreground leading-relaxed">{tower.decision}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-foreground-muted font-600">Results</dt>
                <dd className="mt-1 text-sm text-foreground leading-relaxed">{tower.results}</dd>
              </div>
            </dl>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2" aria-label="Metrics">
              {tower.metrics.map((m) => (
                <li key={m} className="rounded-xl border border-primary/30 bg-primary/5 px-3 py-2 text-sm font-heading font-600 text-primary">
                  {m}
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
              {tower.tech.map((t) => (
                <li key={t} className="text-xs rounded-full bg-muted px-2.5 py-1 text-foreground-muted">
                  {t}
                </li>
              ))}
            </ul>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
