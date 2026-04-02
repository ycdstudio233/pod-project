"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";

interface ImmersiveTransitionProps {
  onContinue: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

export function ImmersiveTransition({ onContinue, setRef }: ImmersiveTransitionProps) {
  return (
    <section
      className="relative flex min-h-[70vh] items-center overflow-hidden"
      id="transition"
      ref={setRef}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          alt="Pod closeup"
          className="object-cover"
          draggable={false}
          fill
          sizes="100vw"
          src="/story-sanctuary-closeup.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090d]/80 via-[#07090d]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-[#07090d]/30" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-[1400px] px-6 py-20 lg:px-12"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.65 }}
        viewport={{ once: true, amount: 0.4 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/44">
          Here&apos;s how this works
        </p>
        <h2 className="mt-6 max-w-xl text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[0.96] tracking-[-0.04em] text-white">
          We&apos;ll do this together, step by step.
        </h2>
        <p className="mt-5 max-w-md text-lg leading-8 text-white/58">
          First the outside, then the inside, then a quick site check. That&apos;s it. Nothing complicated.
        </p>
        <div className="mt-10">
          <GlowButton onClick={onContinue}>Sounds good, let&apos;s go</GlowButton>
        </div>
      </motion.div>
    </section>
  );
}
