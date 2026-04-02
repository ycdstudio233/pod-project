"use client";

import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { transitionContent } from "@/lib/site-content";

interface ImmersiveTransitionProps {
  onContinue: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

export function ImmersiveTransition({ onContinue, setRef }: ImmersiveTransitionProps) {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden px-5 py-16 scroll-mt-24 lg:px-10"
      id="transition"
      ref={setRef}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(141,228,212,0.2),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_22%,rgba(0,0,0,0.18)_100%)]" />
      <motion.div
        className="surface-panel-strong ambient-outline relative mx-auto flex w-full max-w-[1180px] flex-col overflow-hidden rounded-[2.5rem] px-6 py-16 md:px-10 lg:px-14"
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.4 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
      >
        <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/14 to-transparent" />
        <div className="absolute left-8 top-24 h-24 w-24 rounded-full bg-emerald-200/14 blur-[72px]" />
        <span className="relative text-[11px] font-medium uppercase tracking-[0.28em] text-white/48">
          {transitionContent.eyebrow}
        </span>
        <h2 className="relative mt-8 max-w-4xl text-[clamp(2.6rem,5vw,4.7rem)] font-medium leading-[0.98] tracking-[-0.04em] text-balance text-white">
          {transitionContent.title}
        </h2>
        <p className="relative mt-6 max-w-2xl text-lg leading-8 text-white/68">{transitionContent.copy}</p>
        <div className="relative mt-12">
          <GlowButton onClick={onContinue}>{transitionContent.cta}</GlowButton>
        </div>
      </motion.div>
    </section>
  );
}

