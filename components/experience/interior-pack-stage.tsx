"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { InteriorPreview } from "@/components/3d/interior-preview";
import { GlowButton } from "@/components/ui/glow-button";
import { interiorPackOptions } from "@/lib/configurator-data";
import type { ConfiguratorState, InteriorPackId, PodSize } from "@/types/configurator";

const interiorImages: Record<InteriorPackId, string> = {
  retreat: "/story-anywhere-interior.webp",
  work: "/story-landscape-interior-1.webp",
  guest: "/story-landscape-interior-2.webp",
  wellness: "/story-anywhere-interior.webp",
  storage: "/story-landscape-interior-1.webp",
};

interface InteriorPackStageProps {
  selectedId: InteriorPackId;
  state: ConfiguratorState;
  onSelect: (id: InteriorPackId) => void;
  onSizeChange: (size: PodSize) => void;
  onNext: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

export function InteriorPackStage({ selectedId, state, onSelect, onSizeChange, onNext, setRef }: InteriorPackStageProps) {
  const [hoveredId, setHoveredId] = useState<InteriorPackId | null>(null);
  const [viewMode, setViewMode] = useState<"photo" | "3d">("photo");
  const activeImage = interiorImages[hoveredId ?? selectedId];

  return (
    <section
      className="relative min-h-[100svh] min-h-[100dvh] overflow-hidden scroll-mt-20 pt-[4.25rem] md:scroll-mt-28 md:pt-28"
      id="interior-pack"
      ref={setRef}
    >
      <div className="relative h-[32svh] min-h-[220px] w-full overflow-hidden md:h-[44vh] lg:h-[56vh]">
        {viewMode === "photo" ? (
          <>
            <Image alt="Interior view" className="object-cover" draggable={false} fill key={activeImage} sizes="100vw" src={activeImage} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-[#07090d]/20" />
          </>
        ) : (
          <div className="h-full w-full">
            <InteriorPreview className="h-full w-full" state={state} />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07090d] to-transparent" />

        <div className="absolute inset-x-4 bottom-4 z-10 flex justify-start sm:inset-x-0 sm:bottom-6 sm:justify-center">
          <div className="flex max-w-full flex-wrap items-center gap-2 rounded-[1.2rem] border border-white/10 bg-black/50 px-2 py-2 backdrop-blur-xl sm:rounded-full sm:py-1">
            <button
              className={`rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] transition-all ${
                viewMode === "photo" ? "bg-white/12 text-white" : "text-white/40 hover:text-white/60"
              }`}
              onClick={() => setViewMode("photo")}
              type="button"
            >
              Photo
            </button>
            <button
              className={`rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] transition-all ${
                viewMode === "3d" ? "bg-white/12 text-white" : "text-white/40 hover:text-white/60"
              }`}
              onClick={() => setViewMode("3d")}
              type="button"
            >
              3D layout
            </button>

            {viewMode === "3d" ? (
              <>
                <div className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />
                {(["S", "M", "L"] as PodSize[]).map((size) => (
                  <button
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-all ${
                      state.size === size ? "bg-white/12 text-white" : "text-white/36 hover:text-white/56"
                    }`}
                    key={size}
                    onClick={() => onSizeChange(size)}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="-mt-6 sm:-mt-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/8 py-2 md:py-4">
              <h2 className="text-lg font-medium tracking-[-0.03em] text-white md:text-[clamp(1.4rem,3.5vw,2.8rem)]">
                Now let&apos;s peek inside.
              </h2>
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/30 md:text-[10px]">Interior</span>
            </div>

            <p className="mt-2 hidden max-w-md text-sm leading-7 text-white/46 md:block">
              Each layout is already resolved. Pick the one that fits your life, then switch to 3D to see how the
              space changes by size.
            </p>
          </motion.div>

          {/* Mobile: compact rows */}
          <div className="mt-2 flex flex-col gap-1 md:hidden">
            {interiorPackOptions.map((pack) => {
              const isSelected = selectedId === pack.id;
              return (
                <button
                  className={`relative flex items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#8de4d4]/28 bg-white/[0.09]"
                      : "border-white/8 bg-white/[0.025] active:bg-white/[0.06]"
                  }`}
                  key={pack.id}
                  onClick={() => onSelect(pack.id)}
                  onMouseEnter={() => setHoveredId(pack.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  type="button"
                >
                  <div
                    className="absolute inset-y-1.5 left-0 w-[3px] rounded-full transition-opacity"
                    style={{ background: pack.accent, opacity: isSelected ? 1 : 0.15 }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-[14px] font-semibold ${isSelected ? "text-white" : "text-white/60"}`}>{pack.label}</span>
                      {pack.recommended && (
                        <span className="rounded-full bg-emerald-300/12 px-1.5 py-px text-[8px] font-bold uppercase tracking-wider text-emerald-200/70">
                          Default
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] ${isSelected ? "text-white/40" : "text-white/25"}`}>{pack.description}</span>
                  </div>
                  <div className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    isSelected ? "border-[#8de4d4] bg-[#8de4d4]" : "border-white/20"
                  }`}>
                    {isSelected && (
                      <svg fill="none" height="9" stroke="#0a0d14" strokeLinecap="round" strokeWidth="3" viewBox="0 0 24 24" width="9">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
            <button
              className="mt-1.5 w-full rounded-xl bg-[linear-gradient(135deg,#baf7eb_0%,#82e2d0_35%,#4bbca9_100%)] py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-950 shadow-[0_10px_24px_rgba(76,189,169,0.22)] transition hover:translate-y-[-1px]"
              onClick={onNext}
              type="button"
            >
              This feels right →
            </button>
          </div>

          {/* Desktop: card grid */}
          <div className="mt-5 hidden gap-3 md:grid md:grid-cols-2 lg:grid-cols-5">
            {interiorPackOptions.map((pack) => (
              <button
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 ${
                  selectedId === pack.id
                    ? "border-white/20 bg-white/10"
                    : "border-white/8 bg-white/[0.03] hover:border-white/14 hover:bg-white/[0.06]"
                }`}
                key={pack.id}
                onClick={() => onSelect(pack.id)}
                onMouseEnter={() => setHoveredId(pack.id)}
                onMouseLeave={() => setHoveredId(null)}
                type="button"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-0.5 transition-opacity duration-200 ${
                    selectedId === pack.id ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                  }`}
                  style={{ background: pack.accent }}
                />
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-white">{pack.label}</span>
                  {pack.recommended ? (
                    <span className="rounded-full bg-emerald-200/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-emerald-200/80">
                      Default
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-xs leading-5 text-white/46">{pack.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-5 hidden flex-wrap items-center gap-6 pb-10 md:flex">
            <GlowButton onClick={onNext}>This feels right</GlowButton>
            <span className="text-sm text-white/36">Everything is already laid out and ready to go.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
