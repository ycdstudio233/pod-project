"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { exploreFeatures } from "@/lib/configurator-data";
import type { ExploreFeature } from "@/types/configurator";
import { ExploreDetailModal } from "./explore-detail-modal";

interface ExploreStageProps {
  onContinue: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

export function ExploreStage({ onContinue, setRef }: ExploreStageProps) {
  const [activeFeature, setActiveFeature] = useState<ExploreFeature | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  }, []);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = dir === "left" ? -380 : 380;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  return (
    <>
      <section
        className="relative overflow-hidden scroll-mt-20 pb-16 pt-[4.25rem] md:scroll-mt-28 md:pb-24 md:pt-28"
        id="explore"
        ref={setRef}
      >
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#07090d] via-[#0a0e14] to-[#07090d]" />

        {/* Header */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/40">
              Discover your pod
            </p>
            <h2 className="mt-4 max-w-xl text-[clamp(1.8rem,4.5vw,3.6rem)] font-medium leading-[0.96] tracking-[-0.04em] text-white">
              Everything you need, nothing you don&apos;t.
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-white/50">
              Tap any card to learn more about what makes the pod special. When you&apos;re ready, start configuring yours.
            </p>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative z-10 mt-8 md:mt-12">
          {/* Scroll container */}
          <div
            className="scrollbar-none flex gap-4 overflow-x-auto scroll-smooth px-4 pb-4 sm:px-6 lg:px-12"
            onScroll={updateScrollState}
            ref={scrollRef}
            style={{ scrollSnapType: "x mandatory", scrollPaddingLeft: "1rem" }}
          >
            {/* Left padding spacer for large screens */}
            <div className="hidden w-[calc((100vw-1400px)/2)] shrink-0 lg:block" />

            {exploreFeatures.map((feature, i) => (
              <motion.button
                className="group relative aspect-[3/4] w-[260px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] sm:w-[300px] lg:w-[340px]"
                initial={{ opacity: 0, y: 20 }}
                key={feature.id}
                onClick={() => setActiveFeature(feature)}
                style={{ scrollSnapAlign: "start" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                type="button"
                viewport={{ once: true, amount: 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {/* Image */}
                <Image
                  alt={feature.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  draggable={false}
                  fill
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 340px"
                  src={feature.image}
                />

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090d]/95 via-[#07090d]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#07090d]/20" />

                {/* Click indicator */}
                <div className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/60 backdrop-blur-sm transition group-hover:bg-white/10 group-hover:text-white">
                  <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" width="14">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>

                {/* Text overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/45">
                    {feature.tagline}
                  </p>
                  <h3 className="mt-1.5 text-xl font-medium leading-tight tracking-[-0.02em] text-white sm:text-2xl">
                    {feature.title}
                  </h3>
                </div>
              </motion.button>
            ))}

            {/* Right padding spacer for large screens */}
            <div className="hidden w-[calc((100vw-1400px)/2)] shrink-0 lg:block" />
            {/* Extra padding at end for mobile */}
            <div className="w-4 shrink-0 sm:w-6 lg:hidden" />
          </div>

          {/* Desktop arrow controls */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-3 md:flex">
            <button
              className={`pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-[#0d1117]/80 backdrop-blur-md transition ${
                canScrollLeft ? "text-white/70 hover:bg-white/10 hover:text-white" : "cursor-default text-white/15"
              }`}
              onClick={() => scroll("left")}
              type="button"
            >
              <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className={`pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-[#0d1117]/80 backdrop-blur-md transition ${
                canScrollRight ? "text-white/70 hover:bg-white/10 hover:text-white" : "cursor-default text-white/15"
              }`}
              onClick={() => scroll("right")}
              type="button"
            >
              <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="relative z-10 mx-auto mt-10 max-w-[1400px] px-4 sm:px-6 md:mt-14 lg:px-12">
          <motion.div
            className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6"
            initial={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <GlowButton onClick={onContinue}>Start configuring</GlowButton>
            <span className="text-sm text-white/32">
              You&apos;ve seen what it can do. Now make it yours.
            </span>
          </motion.div>
        </div>
      </section>

      {/* Detail modal */}
      <ExploreDetailModal feature={activeFeature} onClose={() => setActiveFeature(null)} />
    </>
  );
}
