import { greetingsFor } from "@/lib/auth";
import { TypewriterGreeting } from "@/components/typewriter-greeting";

/** Saludo de la portada: texto fijo, o varios mensajes que se escriben a máquina. */
export function Greeting({ name }: { name: string }) {
  const messages = greetingsFor(name);
  if (messages.length > 1) return <TypewriterGreeting messages={messages} />;
  return <h1 className="font-display text-2xl font-semibold tracking-tight">{messages[0]}</h1>;
}
