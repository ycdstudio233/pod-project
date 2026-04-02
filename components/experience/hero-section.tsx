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
    <section className="relative h-screen overflow-hidden" id="hero" ref={setRef}>
      {/* Full-bleed cinematic image */}
      <div className="absolute inset-0">
        <Image
          alt="Pod in landscape"
          className="object-cover object-center"
          draggable={false}
          fill
          priority
          sizes="100vw"
          src="/story-landscape.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090d]/60 via-transparent to-transparent" />
      </div>

      {/* Content pinned to bottom-left */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 lg:px-12 lg:pb-20">
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
          className="max-w-2xl text-[clamp(3rem,6.5vw,6.4rem)] font-medium leading-[0.92] tracking-[-0.04em] text-white"
          initial={{ opacity: 0, y: 24 }}
          transition={{ delay: 0.08, duration: 0.7 }}
        >
          A place already composed for you.
        </motion.h1>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 max-w-lg text-lg leading-8 text-white/64"
          initial={{ opacity: 0, y: 18 }}
          transition={{ delay: 0.16, duration: 0.7 }}
        >
          Choose footprint, shell, and setting. We handle the rest.
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex items-center gap-6"
          initial={{ opacity: 0, y: 18 }}
          transition={{ delay: 0.24, duration: 0.7 }}
        >
          <GlowButton onClick={onExplore}>Explore your pod</GlowButton>
          <span className="text-sm text-white/36">Takes about 2 minutes</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: 1 }}
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
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
