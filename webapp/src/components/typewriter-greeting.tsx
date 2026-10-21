"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 70;
const ERASE_MS = 35;
const HOLD_MS = 2200;
const GAP_MS = 400;

/**
 * Saludo que se escribe a máquina y se borra, alternando los mensajes. Con
 * "reducir movimiento" no se escribe: cambia de mensaje cada pocos segundos.
 */
export function TypewriterGreeting({ messages }: { messages: string[] }) {
  const [text, setText] = useState("");
  const key = messages.join("|"); // el efecto no se reinicia si el servidor reenvía los mismos mensajes

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let i = 0;

    if (reduce) {
      const show = () => {
        if (cancelled) return;
        setText(messages[i % messages.length]);
        i++;
        timer = setTimeout(show, HOLD_MS * 2);
      };
      show();
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }

    let pos = 0;
    let erasing = false;
    const tick = () => {
      if (cancelled) return;
      const msg = messages[i % messages.length];
      if (!erasing) {
        pos++;
        setText(msg.slice(0, pos));
        if (pos >= msg.length) {
          erasing = true;
          timer = setTimeout(tick, HOLD_MS);
        } else timer = setTimeout(tick, TYPE_MS);
      } else {
        pos--;
        setText(msg.slice(0, pos));
        if (pos <= 0) {
          erasing = false;
          i++;
          timer = setTimeout(tick, GAP_MS);
        } else timer = setTimeout(tick, ERASE_MS);
      }
    };
    timer = setTimeout(tick, GAP_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // El alto lo fija el mensaje más largo: el texto de abajo no salta al escribir/borrar.
  const longest = messages.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <h1 className="font-display text-2xl font-semibold tracking-tight" aria-label={messages.join(" / ")}>
      <span aria-hidden className="relative inline-block">
        <span className="invisible">{longest}</span>
        <span className="absolute inset-0 whitespace-nowrap">
          {text}
          <span className="ml-0.5 inline-block w-[2px] translate-y-[2px] animate-pulse bg-primary align-baseline motion-reduce:animate-none">&nbsp;</span>
        </span>
      </span>
    </h1>
  );
}
