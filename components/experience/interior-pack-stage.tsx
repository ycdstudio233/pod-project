"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { interiorPackOptions } from "@/lib/configurator-data";
import type { InteriorPackId } from "@/types/configurator";

const interiorImages: Record<InteriorPackId, string> = {
  retreat: "/story-anywhere-interior.webp",
  work: "/story-landscape-interior-1.webp",
  guest: "/story-landscape-interior-2.webp",
  wellness: "/story-anywhere-interior.webp",
  storage: "/story-landscape-interior-1.webp",
};

interface InteriorPackStageProps {
  selectedId: InteriorPackId;
  onSelect: (id: InteriorPackId) => void;
  onNext: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

export function InteriorPackStage({ selectedId, onSelect, onNext, setRef }: InteriorPackStageProps) {
  const [hoveredId, setHoveredId] = useState<InteriorPackId | null>(null);
  const activeImage = interiorImages[hoveredId ?? selectedId];

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      id="interior-pack"
      ref={setRef}
    >
      {/* Full-bleed interior image */}
      <div className="relative h-[56vh] w-full overflow-hidden lg:h-[62vh]">
        <Image
          alt="Interior view"
          className="object-cover transition-none"
          draggable={false}
          fill
          key={activeImage}
          sizes="100vw"
          src={activeImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-[#07090d]/20" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07090d] to-transparent" />
      </div>

      {/* Content below image */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="-mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-medium leading-[1] tracking-[-0.03em] text-white">
                Now let&apos;s peek inside.
              </h2>
              <span className="text-sm text-white/50">
                {interiorPackOptions.find((p) => p.id === selectedId)?.label}
              </span>
            </div>
          </motion.div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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

          <div className="mt-8 flex items-center gap-6 pb-12">
            <GlowButton onClick={onNext}>This feels right</GlowButton>
            <span className="text-sm text-white/36">Everything is already laid out and ready to go.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
