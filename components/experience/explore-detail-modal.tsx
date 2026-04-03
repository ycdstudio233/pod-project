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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop — dark with blur */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          {/* Modal — WHITE background, Rivian style */}
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-[860px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.4)]"
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Close button — black circle */}
            <button
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105 active:scale-95"
              onClick={onClose}
              type="button"
            >
              <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" viewBox="0 0 24 24" width="16">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto" ref={contentRef}>
              {/* Top section — title + description + hero image */}
              <div className="px-6 pb-0 pt-8 sm:px-10 sm:pt-10">
                {/* Header: title left, description right */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
                  <h2 className="shrink-0 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1] tracking-[-0.03em] text-black">
                    {feature.detail.headline}
                  </h2>
                  <p className="max-w-sm text-[15px] leading-relaxed text-black/55 sm:pt-2">
                    {feature.detail.description}
                  </p>
                </div>
              </div>

              {/* Hero image — edge to edge within modal */}
              <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden sm:mt-8">
                <Image
                  alt={feature.detail.headline}
                  className="object-cover"
                  draggable={false}
                  fill
                  sizes="860px"
                  src={feature.image}
                />
              </div>

              {/* Spec highlights — clean grid below image */}
              <div className="grid grid-cols-2 gap-px bg-black/8 sm:grid-cols-4">
                {feature.detail.highlights.map((h) => (
                  <div className="bg-white px-5 py-5 sm:px-6 sm:py-6" key={h.label}>
                    <p className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-black">
                      {h.value}
                    </p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-black/40">
                      {h.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Optional gallery strip */}
              {feature.detail.gallery && feature.detail.gallery.length > 1 ? (
                <div className="flex gap-3 overflow-x-auto bg-white px-6 pb-8 pt-5 sm:px-10">
                  {feature.detail.gallery.map((src, i) => (
                    <div
                      className="relative aspect-[4/3] w-[220px] shrink-0 overflow-hidden rounded-xl sm:w-[280px]"
                      key={i}
                    >
                      <Image
                        alt={`${feature.detail.headline} ${i + 1}`}
                        className="object-cover"
                        draggable={false}
                        fill
                        sizes="280px"
                        src={src}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-6 bg-white sm:h-8" />
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
