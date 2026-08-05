"use client";

/**
 * `#late-img` — an image that does not exist in the server HTML and appears
 * roughly one second after hydration.
 *
 * This is the case that breaks naive variants: if the script queries for its
 * images once on DOMContentLoaded, this one is never found. A correct variant
 * needs a MutationObserver or a retry.
 */

import { useEffect, useState } from "react";
import { imageUrl } from "@/lib/images";

const MOUNT_DELAY_MS = 1000;

export default function LateImage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), MOUNT_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  if (!mounted) {
    return (
      <div
        id="late-img-placeholder"
        className="flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-300 text-sm text-slate-400"
      >
        Loading the late-mounting photograph…
      </div>
    );
  }

  return (
    <figure id="late-img-figure">
      <img
        id="late-img"
        className="h-64 w-full rounded-lg object-cover"
        src={imageUrl("ods-late", 1200, 600)}
        alt="A late-mounting photograph of the grinding room"
        width={1200}
        height={600}
      />
      <figcaption id="late-img-caption" className="mt-2 text-sm text-slate-600">
        Mounted one second after hydration, so it is absent from the server HTML.
      </figcaption>
    </figure>
  );
}
