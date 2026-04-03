"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ExploreFeature } from "@/types/configurator";

interface ExploreDetailModalProps {
  feature: ExploreFeature | null;
  onClose: () => void;
}

export function ExploreDetailModal({ feature, onClose }: ExploreDetailModalProps) {
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

  return (
    <AnimatePresence>
      {feature ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          {/* Modal — single viewport, no scroll */}
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative z-10 flex h-[min(92vh,820px)] w-full max-w-[860px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.4)]"
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Close button */}
            <button
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105 active:scale-95 sm:right-4 sm:top-4"
              onClick={onClose}
              type="button"
            >
              <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" viewBox="0 0 24 24" width="16">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header — title + description */}
            <div className="shrink-0 px-5 pb-0 pt-6 sm:px-8 sm:pt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-8">
                <h2 className="shrink-0 text-[clamp(1.75rem,4.5vw,2.8rem)] font-semibold leading-[1] tracking-[-0.03em] text-black">
                  {feature.detail.headline}
                </h2>
                <p className="max-w-sm text-[14px] leading-relaxed text-black/50 sm:pt-1">
                  {feature.detail.description}
                </p>
              </div>
            </div>

            {/* Hero image — fills available space */}
            <div className="relative mx-0 mt-4 min-h-0 flex-1 overflow-hidden sm:mt-5">
              <Image
                alt={feature.detail.headline}
                className="object-cover"
                draggable={false}
                fill
                sizes="860px"
                src={feature.image}
              />
            </div>

            {/* Spec highlights — compact row at bottom */}
            <div className="grid shrink-0 grid-cols-2 gap-px bg-black/8 sm:grid-cols-4">
              {feature.detail.highlights.map((h) => (
                <div className="bg-white px-4 py-3.5 sm:px-5 sm:py-4" key={h.label}>
                  <p className="text-[clamp(1rem,2vw,1.4rem)] font-semibold tracking-[-0.02em] text-black">
                    {h.value}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-black/35">
                    {h.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
