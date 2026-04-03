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
    const cardWidth = el.querySelector("button")?.offsetWidth ?? 400;
    const amount = dir === "left" ? -(cardWidth + 16) : cardWidth + 16;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  return (
    <>
      <section
        className="relative overflow-hidden scroll-mt-20 pb-12 pt-[4.25rem] md:scroll-mt-28 md:pb-20 md:pt-28"
        id="explore"
        ref={setRef}
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#07090d] via-[#0a0e14] to-[#07090d]" />

        {/* Header */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="max-w-2xl text-[clamp(2rem,5.5vw,4.2rem)] font-medium leading-[0.94] tracking-[-0.04em] text-white">
              Everything you need, nothing you don&apos;t.
            </h2>
            <p className="mt-5 max-w-lg text-[clamp(0.95rem,1.8vw,1.15rem)] leading-relaxed text-white/45">
              Tap any card to discover what makes the pod special.
            </p>
          </motion.div>
        </div>

        {/* Carousel — full-bleed, tall cards */}
        <div className="relative z-10 mt-10 md:mt-14">
          <div
            className="scrollbar-none flex gap-4 overflow-x-auto scroll-smooth px-5 sm:px-8 lg:gap-5"
            onScroll={updateScrollState}
            ref={scrollRef}
            style={{ scrollSnapType: "x mandatory", scrollPaddingLeft: "1.25rem" }}
          >
            {/* Left spacer for centering on large screens */}
            <div className="hidden w-[max(0px,calc((100vw-1400px)/2))] shrink-0 xl:block" />

            {exploreFeatures.map((feature, i) => (
              <motion.button
                className="group relative h-[65svh] min-h-[420px] w-[75vw] shrink-0 overflow-hidden rounded-[1.25rem] text-left sm:w-[48vw] md:h-[72vh] md:min-h-[500px] md:w-[34vw] lg:w-[28vw] lg:max-w-[420px]"
                initial={{ opacity: 0, y: 24 }}
                key={feature.id}
                onClick={() => setActiveFeature(feature)}
                style={{ scrollSnapAlign: "start" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                type="button"
                viewport={{ once: true, amount: 0.15 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {/* Full-bleed image */}
                <Image
                  alt={feature.title}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  draggable={false}
                  fill
                  sizes="(max-width: 640px) 75vw, (max-width: 1024px) 48vw, 420px"
                  src={feature.image}
                />

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Plus icon */}
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white/70 backdrop-blur-sm transition-all group-hover:bg-white group-hover:text-black">
                  <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" width="16">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>

                {/* Title at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 md:p-8">
                  <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.1] tracking-[-0.02em] text-white">
                    {feature.title}
                  </h3>
                </div>
              </motion.button>
            ))}

            {/* Right spacer */}
            <div className="w-5 shrink-0 sm:w-8" />
          </div>

          {/* Centered arrow controls below carousel */}
          <div className="relative z-10 mt-6 flex items-center justify-center gap-3">
            <button
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
                canScrollLeft
                  ? "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                  : "border-white/8 text-white/15"
              }`}
              onClick={() => scroll("left")}
              type="button"
            >
              <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
                canScrollRight
                  ? "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                  : "border-white/8 text-white/15"
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
        <div className="relative z-10 mx-auto mt-12 max-w-[1400px] px-5 sm:px-8 md:mt-16 lg:px-12">
          <motion.div
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
            initial={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <GlowButton onClick={onContinue}>Start configuring</GlowButton>
            <span className="text-sm text-white/30">
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
