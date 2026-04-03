"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ExploreFeature } from "@/types/configurator";

interface ExploreDetailModalProps {
  feature: ExploreFeature | null;
  onClose: () => void;
}

export function ExploreDetailModal({ feature, onClose }: ExploreDetailModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock body scroll & handle escape
  useEffect(() => {
    if (!feature) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKey);
    };
  }, [feature, onClose]);

  // Scroll content to top when feature changes
  useEffect(() => {
    if (feature && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [feature]);

  return (
    <AnimatePresence>
      {feature ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#07090d]/92 backdrop-blur-2xl" onClick={onClose} />

          {/* Modal content */}
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative z-10 mx-4 flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0d1117] shadow-2xl"
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Close button */}
            <button
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/70 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
              onClick={onClose}
              type="button"
            >
              <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" width="16">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto" ref={contentRef}>
              {/* Hero image */}
              <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
                <Image
                  alt={feature.detail.headline}
                  className="object-cover"
                  draggable={false}
                  fill
                  sizes="720px"
                  src={feature.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
              </div>

              {/* Text content */}
              <div className="px-6 pb-8 pt-1 sm:px-8">
                {/* Title + tagline */}
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/40">
                  {feature.tagline}
                </p>
                <h2 className="mt-2 text-[clamp(1.6rem,4vw,2.4rem)] font-medium leading-tight tracking-[-0.03em] text-white">
                  {feature.detail.headline}
                </h2>

                {/* Description */}
                <p className="mt-4 max-w-lg text-[15px] leading-7 text-white/58">
                  {feature.detail.description}
                </p>

                {/* Spec highlights grid */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {feature.detail.highlights.map((h) => (
                    <div
                      className="rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-3"
                      key={h.label}
                    >
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                        {h.label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-white/80">{h.value}</p>
                    </div>
                  ))}
                </div>

                {/* Gallery */}
                {feature.detail.gallery && feature.detail.gallery.length > 1 ? (
                  <div className="mt-6 flex gap-3 overflow-x-auto pb-1">
                    {feature.detail.gallery.map((src, i) => (
                      <div
                        className="relative aspect-[3/2] w-[260px] shrink-0 overflow-hidden rounded-xl border border-white/8"
                        key={i}
                      >
                        <Image
                          alt={`${feature.detail.headline} detail ${i + 1}`}
                          className="object-cover"
                          draggable={false}
                          fill
                          sizes="260px"
                          src={src}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
