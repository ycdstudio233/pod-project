"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { ConfiguratorState } from "@/types/configurator";
import { cn } from "@/lib/utils";

const DynamicPodCanvas = dynamic(() => import("./pod-canvas").then((module) => module.PodCanvas), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[360px] items-center justify-center rounded-[2rem] border border-white/10 bg-slate-950/60 text-sm uppercase tracking-[0.22em] text-white/45">
      Rendering pod preview
    </div>
  ),
});

function useVisibility(mountMargin = "400px", visibleMargin = "100px") {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  // Mount once when approaching viewport (never unmount — avoids re-creating WebGL context)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: mountMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mountMargin]);

  // Continuously track visibility to pause/resume the render loop
  useEffect(() => {
    const el = ref.current;
    if (!el || !mounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { rootMargin: visibleMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, visibleMargin]);

  return { ref, mounted, visible };
}

interface PodPreviewProps {
  state: ConfiguratorState;
  interactive?: boolean;
  label?: string;
  className?: string;
}

export function PodPreview({ className, interactive = false, label, state }: PodPreviewProps) {
  const { ref, mounted, visible } = useVisibility();

  return (
    <div ref={ref} className={cn("surface-panel-strong ambient-outline relative overflow-hidden rounded-[2rem]", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_38%)]" />
      {label ? (
        <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/12 bg-black/25 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/56">
          {label}
        </div>
      ) : null}
      {interactive ? (
        <div className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-full border border-white/12 bg-black/25 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/56">
          Drag to orbit
        </div>
      ) : null}
      <div className="h-full min-h-[360px]">
        {mounted ? (
          <DynamicPodCanvas interactive={interactive} state={state} visible={visible} />
        ) : null}
      </div>
    </div>
  );
}
