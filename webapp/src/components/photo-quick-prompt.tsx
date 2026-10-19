"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, Check, ChevronRight, ClipboardCopy, ImagePlus, Share2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { HelpHint } from "@/components/help-hint";
import { cn } from "@/lib/utils";
import { photoExtractPrompt } from "@/lib/prompts";

type Img = { id: string; name: string; url: string; file: File };
type Kind = "diapositiva" | "tablero" | "ambas";

const MAX_IMAGES = 6;
const KINDS: { value: Kind; label: string }[] = [
  { value: "diapositiva", label: "Diapositiva" },
  { value: "tablero", label: "Tablero" },
  { value: "ambas", label: "No sé / varias" },
];

/** Convierte cualquier imagen a PNG (el portapapeles del navegador solo acepta image/png). */
async function toPng(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bmp.width;
  canvas.height = bmp.height;
  canvas.getContext("2d")!.drawImage(bmp, 0, 0);
  return await new Promise<Blob>((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("png"))), "image/png"));
}

/**
 * «Prompt rápido» de un módulo: agregas la foto de una diapositiva o del tablero y la app arma
 * el prompt con el contexto del módulo. La app NO llama a ninguna IA ni sube la foto: se queda
 * en tu navegador. Para llevarla a tu IA hay tres caminos — copiar el prompt y adjuntar la foto
 * a mano; copiar prompt + imagen juntos (si el navegador lo permite); o el menú «Compartir» del
 * teléfono, que abre tu app de IA con la imagen y el texto.
 */
export function PhotoQuickPrompt({
  subjectName,
  moduleTitle,
  moduleDescription,
  glossary,
  formulas,
}: {
  subjectName: string;
  moduleTitle: string;
  moduleDescription?: string | null;
  glossary: string[];
  formulas: string[];
}) {
  const [images, setImages] = useState<Img[]>([]);
  const [kind, setKind] = useState<Kind>("diapositiva");
  const [note, setNote] = useState("");
  const [showText, setShowText] = useState(false);
  const [copied, setCopied] = useState<"text" | "both" | null>(null);
  const [canShare, setCanShare] = useState(false);
  const [canCopyImage, setCanCopyImage] = useState(false);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const urls = useRef<string[]>([]);

  // Capacidades del navegador: se miden en el cliente para no desajustar la hidratación.
  useEffect(() => {
    setCanCopyImage(typeof ClipboardItem !== "undefined" && !!navigator.clipboard?.write);
    return () => urls.current.forEach((u) => URL.revokeObjectURL(u));
  }, []);
  useEffect(() => {
    try {
      const files = images.map((i) => i.file);
      setCanShare(files.length > 0 && !!navigator.canShare && navigator.canShare({ files }));
    } catch {
      setCanShare(false);
    }
  }, [images]);

  const text = useMemo(
    () =>
      photoExtractPrompt({
        subjectName,
        moduleTitle,
        moduleDescription,
        glossary,
        formulas,
        kind,
        imageCount: images.length || 1,
        note,
      }),
    [subjectName, moduleTitle, moduleDescription, glossary, formulas, kind, images.length, note],
  );

  function addFiles(list: FileList | File[] | null) {
    if (!list) return;
    const imgs = Array.from(list).filter((f) => f.type.startsWith("image/"));
    if (imgs.length === 0) {
      toast("Eso no parece una imagen", "info");
      return;
    }
    setImages((cur) => {
      const room = MAX_IMAGES - cur.length;
      if (imgs.length > room) toast(`Máximo ${MAX_IMAGES} imágenes por prompt`, "info");
      const added = imgs.slice(0, Math.max(0, room)).map((file) => {
        const url = URL.createObjectURL(file);
        urls.current.push(url);
        return { id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 7)}`, name: file.name || "imagen", url, file };
      });
      return [...cur, ...added];
    });
  }

  function remove(id: string) {
    setImages((cur) => {
      const gone = cur.find((i) => i.id === id);
      if (gone) URL.revokeObjectURL(gone.url);
      return cur.filter((i) => i.id !== id);
    });
  }

  function flash(which: "text" | "both") {
    setCopied(which);
    setTimeout(() => setCopied(null), 1800);
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      flash("text");
      toast("Prompt copiado: pégalo en tu IA y adjunta la imagen");
    } catch {
      setShowText(true);
      toast("No pude copiar solo: selecciona el texto y cópialo", "info");
    }
  }

  async function copyBoth() {
    try {
      const png = await toPng(images[0].file);
      await navigator.clipboard.write([
        new ClipboardItem({ "text/plain": new Blob([text], { type: "text/plain" }), "image/png": png }),
      ]);
      flash("both");
      toast("Imagen y prompt copiados: pega en tu IA (si solo se pega uno, usa «Copiar prompt»)");
    } catch {
      toast("Tu navegador no permite copiar imagen y texto juntos: usa «Copiar prompt» y adjunta la foto", "info");
    }
  }

  async function share() {
    try {
      await navigator.share({ files: images.map((i) => i.file), text, title: moduleTitle });
    } catch (e) {
      if ((e as Error).name !== "AbortError") toast("No se pudo abrir el menú de compartir", "info");
    }
  }

  return (
    <details id="foto-rapida" className="group scroll-mt-24 rounded-lg border border-border bg-card [&_summary]:list-none">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-sm font-medium">
        <span className="flex items-center gap-1.5">
          <Camera className="h-4 w-4 text-primary" aria-hidden />
          Prompt rápido — foto de diapositiva o tablero
          <HelpHint k="modulo-foto-rapida" />
        </span>
        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
      </summary>

      <div className="flex flex-col gap-4 border-t border-border p-4 pt-3">
        <ol className="list-decimal space-y-0.5 pl-5 text-xs text-muted-foreground">
          <li>Agrega la foto (cámara, galería, pegar o arrastrar).</li>
          <li>Copia el prompt (o compártelo) y ábrelo en tu IA con la imagen adjunta.</li>
          <li>
            La IA te devuelve la transcripción, la explicación y su relación con este módulo. Pégala en <strong>Apuntes</strong> →
            «Diapositivas / notas».
          </li>
        </ol>

        {/* Zona de imagen */}
        <div
          tabIndex={0}
          onPaste={(e) => {
            const files = Array.from(e.clipboardData.files);
            if (files.length) {
              e.preventDefault();
              addFiles(files);
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            addFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex flex-col gap-3 rounded-md border-2 border-dashed p-3 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
            drag ? "border-primary bg-primary/[0.06]" : "border-input",
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" size="sm" onClick={() => cameraRef.current?.click()}>
              <Camera className="h-3.5 w-3.5" />
              Tomar foto
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => fileRef.current?.click()}>
              <ImagePlus className="h-3.5 w-3.5" />
              Elegir imagen
            </Button>
            <span className="text-xs text-muted-foreground">o pega (Ctrl+V) / arrastra aquí · hasta {MAX_IMAGES}</span>
            <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
          </div>

          {images.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {images.map((im, i) => (
                <li key={im.id} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={im.url} alt={`Imagen ${i + 1}: ${im.name}`} className="h-24 w-32 rounded-md border border-border object-cover" />
                  <span className="absolute bottom-1 left-1 rounded bg-background/90 px-1 text-[10px] font-medium">{i + 1}</span>
                  <button
                    type="button"
                    onClick={() => remove(im.id)}
                    aria-label={`Quitar imagen ${i + 1}`}
                    className="absolute -right-1.5 -top-1.5 rounded-full border border-border bg-background p-0.5 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="text-[11px] text-muted-foreground">
            La foto no se sube a ningún servidor: se queda en tu navegador. La app no llama a ninguna IA.
          </p>
        </div>

        {/* Qué es */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Es una:</span>
          {KINDS.map((k) => (
            <button
              key={k.value}
              type="button"
              aria-pressed={kind === k.value}
              onClick={() => setKind(k.value)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                kind === k.value ? "border-primary bg-primary text-primary-foreground" : "border-input text-muted-foreground hover:bg-accent",
              )}
            >
              {k.label}
            </button>
          ))}
        </div>

        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Nota para la IA (opcional)
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="Ej. Es la diapositiva de Noyes–Whitney; no entiendo de dónde sale el área."
            className="text-sm font-normal text-foreground"
          />
        </label>

        {/* Acciones */}
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" size="sm" onClick={copyText}>
            {copied === "text" ? <Check className="h-3.5 w-3.5" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
            {copied === "text" ? "Copiado" : "Copiar prompt"}
          </Button>
          {canCopyImage && images.length === 1 && (
            <Button type="button" size="sm" variant="outline" onClick={copyBoth}>
              {copied === "both" ? <Check className="h-3.5 w-3.5" /> : <ImagePlus className="h-3.5 w-3.5" />}
              {copied === "both" ? "Copiado" : "Copiar imagen + prompt"}
            </Button>
          )}
          {canShare && (
            <Button type="button" size="sm" variant="outline" onClick={share}>
              <Share2 className="h-3.5 w-3.5" />
              Compartir con mi IA
            </Button>
          )}
          <button
            type="button"
            onClick={() => setShowText((s) => !s)}
            aria-expanded={showText}
            className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            {showText ? "Ocultar prompt" : "Ver prompt"}
          </button>
        </div>
        {images.length === 0 && (
          <p className="text-[11px] text-muted-foreground">
            Puedes copiar el prompt sin foto y adjuntarla directamente en tu IA; agregarla aquí solo sirve para dejarla lista para
            «Copiar imagen + prompt» o «Compartir».
          </p>
        )}

        {showText && <Textarea readOnly value={text} rows={12} className="font-mono text-xs leading-relaxed" />}
      </div>
    </details>
  );
}
