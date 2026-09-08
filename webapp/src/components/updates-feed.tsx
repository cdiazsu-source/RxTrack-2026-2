import Link from "next/link";
import { ArrowRight, AtSign, Check, FolderPlus, ListChecks, NotebookPen } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { HelpHint } from "@/components/help-hint";
import { formatDateTime } from "@/lib/utils";

export type NoteFeedItem = {
  kind: "note";
  id: string;
  body: string;
  author: string;
  authorRole?: string | null;
  mentions?: string[];
  checklistItemText?: string | null;
  checklistItemDone?: boolean;
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

export type ProjectFeedItem = {
  kind: "project";
  id: string;
  title: string;
  at: string;
  parentKey: string;
  parentLabel: string;
  parentHref: string;
};

export type SessionFeedItem = {
  kind: "session";
  id: string;
  number: number | null;
  topic: string;
  status: string;
  statusLabel: string;
  nextText: string | null;
  author: string | null;
  at: string;
  parentKey: string;
  parentLabel: string;
  parentHref: string;
};

export type FeedItem = NoteFeedItem | CheckFeedItem | ProjectFeedItem | SessionFeedItem;

/** Cada entrada del feed es un enlace a su proyecto/módulo: toda la fila es
 *  clickeable, no solo el título. */
function RowLink({
  href,
  accent,
  children,
}: {
  href: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`block rounded-r-md border-l-2 ${accent} py-1.5 pl-3 pr-1 transition-colors hover:bg-muted/60`}
      >
        {children}
      </Link>
    </li>
  );
}

function ParentTitle({ label }: { label: string }) {
  return <span className="block truncate text-xs font-semibold text-primary">{label}</span>;
}

export function UpdatesFeed({ items, title = "Últimas actualizaciones" }: { items: FeedItem[]; title?: string }) {
  const nextShownFor = new Set<string>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5">
          {title}
          <HelpHint k="feed" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía no hay actividad registrada.</p>
        ) : (
          <ul className="-mr-1 flex max-h-[34rem] flex-col gap-3 overflow-y-auto pr-1">
            {items.map((item) => {
              if (item.kind === "note") {
                return (
                  <RowLink key={item.id} href={item.parentHref} accent="border-primary/30">
                    <ParentTitle label={item.parentLabel} />
                    {item.checklistItemText && (
                      <span className="mt-0.5 flex items-start gap-1 text-xs text-primary/90">
                        <ListChecks className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
                        <span className={item.checklistItemDone ? "line-through" : undefined}>
                          {item.checklistItemText}
                        </span>
                      </span>
                    )}
                    <p className="mt-0.5 line-clamp-4 whitespace-pre-line break-words text-sm leading-snug">
                      {item.body}
                    </p>
                    {item.mentions && item.mentions.length > 0 && (
                      <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                        <AtSign className="h-3 w-3 shrink-0" aria-hidden />
                        {item.mentions.join(", ")}
                      </p>
                    )}
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {[item.author, item.authorRole, formatDateTime(item.at)].filter(Boolean).join(" · ")}
                    </p>
                  </RowLink>
                );
              }

              if (item.kind === "project") {
                return (
                  <RowLink key={item.id} href={item.parentHref} accent="border-primary/30">
                    <p className="flex items-start gap-1.5 text-sm leading-snug">
                      <FolderPlus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                      <span className="min-w-0 break-words">
                        Proyecto nuevo: <span className="font-medium">{item.title}</span>
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatDateTime(item.at)}</p>
                  </RowLink>
                );
              }

              if (item.kind === "session") {
                return (
                  <RowLink key={item.id} href={item.parentHref} accent="border-primary/30">
                    <ParentTitle label={item.parentLabel} />
                    <p className="mt-0.5 flex items-start gap-1.5 text-sm leading-snug">
                      <NotebookPen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                      <span className="min-w-0 break-words">
                        {item.number != null ? `Sesión ${item.number} — ` : "Apunte — "}
                        {item.topic}{" "}
                        <span className="text-muted-foreground">· {item.statusLabel}</span>
                      </span>
                    </p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {[item.author, formatDateTime(item.at)].filter(Boolean).join(" · ")}
                    </p>
                    {item.nextText && (
                      <p className="rx-next mt-2 flex items-start gap-1.5 rounded-md px-2.5 py-2 text-xs font-semibold">
                        <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                        <span>
                          <span className="text-primary">Sigue:</span> {item.nextText}
                        </span>
                      </p>
                    )}
                  </RowLink>
                );
              }

              const showNext = !nextShownFor.has(item.parentKey);
              if (showNext) nextShownFor.add(item.parentKey);
              return (
                <RowLink key={item.id} href={item.parentHref} accent="border-success/40">
                  <ParentTitle label={item.parentLabel} />
                  <p className="mt-0.5 flex items-start gap-1.5 text-sm leading-snug">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden />
                    <span className="min-w-0 break-words">
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
                </RowLink>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
