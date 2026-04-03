"use client";

import dynamic from "next/dynamic";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import type { ConfiguratorState } from "@/types/configurator";
import { cn } from "@/lib/utils";

const DynamicInteriorCanvas = dynamic(
  () => import("./interior-canvas").then((m) => m.InteriorCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[220px] items-center justify-center rounded-[2rem] border border-white/10 bg-slate-950/60 text-sm uppercase tracking-[0.22em] text-white/45">
        Rendering interior
      </div>
    ),
  },
);

interface InteriorPreviewProps {
  state: ConfiguratorState;
  className?: string;
}

export function InteriorPreview({ className, state }: InteriorPreviewProps) {
  const deferredState = useDeferredValue(state);
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMounted(true); obs.disconnect(); } },
      { rootMargin: "400px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !mounted) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mounted]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div className="h-full min-h-[220px]">
        {mounted ? (
          <DynamicInteriorCanvas state={deferredState} visible={visible} />
        ) : null}
      </div>
    </div>
  );
}
