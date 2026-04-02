"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";

interface StoryPanelProps {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  cta: string;
  onContinue: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

export function StoryPanel({ copy, cta, eyebrow, id, image, onContinue, setRef, title }: StoryPanelProps) {
  return (
    <section className="relative min-h-screen overflow-hidden px-5 py-16 scroll-mt-24 lg:px-10" id={id} ref={setRef}>
      <Image
        alt={title}
        className="story-mask object-cover"
        draggable={false}
        fill
        priority={false}
        sizes="100vw"
        src={image}
        unoptimized={image.endsWith(".svg")}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,7,0.18),rgba(4,5,7,0.58)_48%,rgba(4,5,7,0.94)_100%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] items-end pb-14 md:pb-20">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.35 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/50">{eyebrow}</span>
          <h2 className="mt-6 text-[clamp(2.5rem,5vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.045em] text-balance text-white">
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{copy}</p>
          <div className="mt-10">
            <GlowButton onClick={onContinue} variant="secondary">
              {cta}
            </GlowButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
