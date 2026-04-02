"use client";

import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { interiorPackOptions } from "@/lib/configurator-data";
import type { InteriorPackId } from "@/types/configurator";

interface InteriorPackStageProps {
  selectedId: InteriorPackId;
  onSelect: (id: InteriorPackId) => void;
  onNext: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

export function InteriorPackStage({ selectedId, onSelect, onNext, setRef }: InteriorPackStageProps) {
  return (
    <section
      className="relative min-h-screen overflow-hidden px-5 py-10 lg:px-10 lg:py-12"
      id="interior-pack"
      ref={setRef}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%,rgba(0,0,0,0.14)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1100px] flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="max-w-2xl text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[0.98] tracking-[-0.04em] text-white">
            Choose how you&apos;ll live in it.
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-8 text-white/60">
            Each pack is a complete interior, pre-designed and ready to install.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {interiorPackOptions.map((pack) => (
            <button
              className={`group relative overflow-hidden rounded-[1.75rem] border p-6 text-left transition duration-200 ${
                selectedId === pack.id
                  ? "border-white/20 bg-white/10"
                  : "border-white/10 bg-white/[0.04] hover:border-white/16 hover:bg-white/[0.06]"
              }`}
              key={pack.id}
              onClick={() => onSelect(pack.id)}
              type="button"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 transition-opacity duration-200 ${
                  selectedId === pack.id ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                }`}
                style={{ background: `linear-gradient(90deg, ${pack.accent}, transparent)` }}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">{pack.label}</span>
                {pack.recommended ? (
                  <span className="rounded-full border border-emerald-200/18 bg-emerald-200/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-emerald-100">
                    Popular
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-white/70">{pack.description}</p>
              <p className="mt-3 text-xs text-white/40">{pack.meta}</p>
            </button>
          ))}
        </div>

        <div className="mt-10">
          <GlowButton onClick={onNext}>Next</GlowButton>
        </div>
      </div>
    </section>
  );
}
