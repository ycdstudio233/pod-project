"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import type { ConfiguratorState } from "@/types/configurator";

interface HeroSectionProps {
  state: ConfiguratorState;
  onExplore: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

export function HeroSection({ onExplore, setRef }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100svh] min-h-[100dvh] overflow-hidden scroll-mt-24" id="hero" ref={setRef}>
      <div className="absolute inset-0">
        <Image
          alt="Pod in landscape"
          className="object-cover object-center"
          draggable={false}
          fill
          priority
          sizes="100vw"
          src="/pod-desert-day.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090d]/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] min-h-[100dvh] max-w-[1400px] flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-20">
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/50"
          initial={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.6 }}
        >
          Modular living, designed as a product
        </motion.p>

        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl text-[clamp(2.2rem,6.5vw,6.4rem)] font-medium leading-[0.92] tracking-[-0.04em] text-white"
          initial={{ opacity: 0, y: 24 }}
          transition={{ delay: 0.08, duration: 0.7 }}
        >
          A private place in the world, already composed for you.
        </motion.h1>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 max-w-lg text-base leading-7 text-white/64 sm:mt-5 sm:text-lg sm:leading-8"
          initial={{ opacity: 0, y: 18 }}
          transition={{ delay: 0.16, duration: 0.7 }}
        >
          Choose the footprint, shell, and setting. We handle the complexity behind the scenes so the pod already
          feels like yours.
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-6"
          initial={{ opacity: 0, y: 18 }}
          transition={{ delay: 0.24, duration: 0.7 }}
        >
          <GlowButton onClick={onExplore}>Explore your pod</GlowButton>
          <span className="max-w-xs text-sm leading-6 text-white/36">Pre-configured paths. No dead ends.</span>
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: 1 }}
        className="absolute inset-x-0 bottom-6 z-10 hidden justify-center sm:flex"
        initial={{ opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          className="h-10 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent"
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
