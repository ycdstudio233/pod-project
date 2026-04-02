"use client";

import { motion } from "framer-motion";
import { PodPreview } from "@/components/3d/pod-preview";
import { GlowButton } from "@/components/ui/glow-button";
import { ProofChips } from "@/components/ui/proof-chips";
import type { ConfiguratorState } from "@/types/configurator";

interface HeroSectionProps {
  state: ConfiguratorState;
  onExplore: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

export function HeroSection({ onExplore, setRef, state }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden" id="hero" ref={setRef}>
      <div className="absolute inset-0">
        <div className="absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-emerald-300/16 blur-[120px]" />
        <div className="absolute right-[10%] top-[22%] h-96 w-96 rounded-full bg-sky-300/12 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_26%,rgba(0,0,0,0.18)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1600px] gap-8 px-5 py-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:px-10">
        <div className="flex flex-col justify-center pt-16 lg:pt-10">
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex w-fit items-center rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-white/54"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.6 }}
          >
            Modular living, designed as a product
          </motion.span>

          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl text-[clamp(3.2rem,7vw,7rem)] font-medium leading-[0.94] tracking-[-0.05em] text-balance text-white"
            initial={{ opacity: 0, y: 26 }}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            A place already composed for you.
          </motion.h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-xl text-lg leading-8 text-white/68"
            initial={{ opacity: 0, y: 22 }}
            transition={{ delay: 0.14, duration: 0.7 }}
          >
            Choose footprint, shell, and setting. We handle the rest.
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 space-y-5"
            initial={{ opacity: 0, y: 22 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="flex items-center gap-5">
              <GlowButton onClick={onExplore}>Explore your pod</GlowButton>
              <span className="text-sm text-white/36">Takes about 2 minutes</span>
            </div>
            <ProofChips />
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-center pb-12 lg:pb-0"
          initial={{ opacity: 0, x: 30 }}
          transition={{ delay: 0.16, duration: 0.8 }}
        >
          <PodPreview
            className="h-[420px] w-full rounded-[1.8rem] md:h-[500px] lg:h-[540px]"
            state={state}
          />
        </motion.div>
      </div>
    </section>
  );
}
