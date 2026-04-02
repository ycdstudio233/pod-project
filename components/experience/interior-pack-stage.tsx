"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { PodPreview } from "@/components/3d/pod-preview";
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
      className="relative overflow-hidden"
      id="interior-pack"
      ref={setRef}
    >
      {/* Visual area — photo or 3D */}
      <div className="relative h-[50vh] w-full overflow-hidden lg:h-[56vh]">
        {viewMode === "photo" ? (
          <>
            <Image
              alt="Interior view"
              className="object-cover"
              draggable={false}
              fill
              key={activeImage}
              sizes="100vw"
              src={activeImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-[#07090d]/20" />
          </>
        ) : (
          <div className="h-full w-full">
            <PodPreview
              className="h-full w-full"
              interactive
              state={state}
            />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07090d] to-transparent" />

        {/* View toggle + size selector overlay */}
        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-2 py-1 backdrop-blur-xl">
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
              3D Layout
            </button>

            {viewMode === "3d" ? (
              <>
                <div className="mx-1 h-4 w-px bg-white/10" />
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

      {/* Content below */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="-mt-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between border-b border-white/8 py-4">
              <h2 className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-medium tracking-[-0.03em] text-white">
                Now let&apos;s peek inside.
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/50">
                  {interiorPackOptions.find((p) => p.id === selectedId)?.label}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Interior</span>
              </div>
            </div>

            <p className="mt-3 max-w-md text-sm leading-7 text-white/46">
              Each layout is already resolved. Pick the one that fits your life — switch to 3D to see how the space changes per size.
            </p>
          </motion.div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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

          <div className="mt-6 flex items-center gap-6 pb-10">
            <GlowButton onClick={onNext}>This feels right</GlowButton>
            <span className="text-sm text-white/36">Everything is already laid out and ready to go.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
