import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { HelpHint } from "@/components/help-hint";
import { formatDateTime } from "@/lib/utils";

export type NoteFeedItem = {
  kind: "note";
  id: string;
  body: string;
  author: string;
  at: string;
  parentKey: string;
  parentLabel: string;
  parentHref: string;
};

export type CheckFeedItem = {
  kind: "check";
  id: string;
  text: string;
  at: string;
  parentKey: string;
  parentLabel: string;
  parentHref: string;
  nextText: string | null;
  allDone: boolean;
  done: number;
  total: number;
};

export type FeedItem = NoteFeedItem | CheckFeedItem;

function ParentLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-xs font-semibold text-primary hover:underline">
      {label}
    </Link>
  );
}

export function UpdatesFeed({ items, title = "Últimas actualizaciones" }: { items: FeedItem[]; title?: string }) {
  const nextShownFor = new Set<string>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5">
          {title}
          <HelpHint text="Notas de bitácora y subtareas completadas, en orden. Bajo una subtarea completada, titilando, aparece la que sigue en ese proyecto o módulo." />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía no hay actividad registrada.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {items.map((item) => {
              if (item.kind === "note") {
                return (
                  <li key={item.id} className="border-l-2 border-primary/30 pl-3">
                    <ParentLink href={item.parentHref} label={item.parentLabel} />
                    <p className="mt-0.5 whitespace-pre-line text-sm leading-snug">{item.body}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {[item.author, formatDateTime(item.at)].filter(Boolean).join(" · ")}
                    </p>
                  </li>
                );
              }
              const showNext = !nextShownFor.has(item.parentKey);
              if (showNext) nextShownFor.add(item.parentKey);
              return (
                <li key={item.id} className="border-l-2 border-success/40 pl-3">
                  <ParentLink href={item.parentHref} label={item.parentLabel} />
                  <p className="mt-0.5 flex items-start gap-1.5 text-sm leading-snug">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden />
                    <span>
                      Subtarea completada:{" "}
                      <span className="text-muted-foreground line-through">{item.text}</span>
                    </span>
                  </p>
                  <div className="mt-1.5 max-w-[16rem]">
                    <ProgressBar value={item.total ? (item.done / item.total) * 100 : 0} label={`${item.done}/${item.total}`} inline />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{formatDateTime(item.at)}</p>
                  {showNext && item.nextText && (
                    <p className="rx-next mt-2 flex items-start gap-1.5 rounded-md px-2.5 py-2 text-xs font-semibold">
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                      <span>
                        <span className="text-primary">Sigue:</span> {item.nextText}
                      </span>
                    </p>
                  )}
                  {showNext && !item.nextText && item.allDone && (
                    <p className="mt-2 text-xs font-medium text-success">✓ Checklist completo.</p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
