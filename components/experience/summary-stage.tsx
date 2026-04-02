"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PodPreview } from "@/components/3d/pod-preview";
import { GlowButton } from "@/components/ui/glow-button";
import { environmentOptions, finishOptions, sizeOptions } from "@/lib/configurator-data";
import { formatCurrency } from "@/lib/pricing";
import type { ConfiguratorState, PriceLineItem } from "@/types/configurator";

interface SummaryStageProps {
  state: ConfiguratorState;
  estimatedPrice: number;
  priceBreakdown: PriceLineItem[];
  onStartProject: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

const SPECS = [
  "Engineered steel frame with 10-year structural warranty",
  "Triple-pane insulated glazing, argon-filled",
  "Mini-split HVAC — heating & cooling included",
  "Engineered hardwood flooring throughout",
  "Pre-wired electrical with LED panel lighting",
  "Plumbing-ready for kitchen and bathroom hookup",
  "Insulated wall & roof panels — R-21 / R-38",
  "Smart lock and pre-wired for home automation",
];

export function SummaryStage({
  estimatedPrice,
  onStartProject,
  priceBreakdown,
  setRef,
  state,
}: SummaryStageProps) {
  const [specsOpen, setSpecsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const includedItems = priceBreakdown.filter((item) => item.included);
  const sizeLabel = sizeOptions.find((o) => o.id === state.size)?.title ?? state.size;
  const finishLabel = finishOptions.find((o) => o.id === state.finish)?.title ?? state.finish;
  const envLabel = environmentOptions.find((o) => o.id === state.environment)?.title ?? state.environment;
  const monthlyEstimate = Math.round(estimatedPrice / 120);

  const shareConfig = () => {
    const params = new URLSearchParams({
      size: state.size,
      finish: state.finish,
      env: state.environment,
    });
    const url = `${window.location.origin}?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden scroll-mt-20 py-10 lg:py-12"
      id="summary"
      ref={setRef}
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(460px,1.05fr)_minmax(0,0.95fr)]">
          {/* Left — 3D Preview */}
          <motion.div
            className="relative h-[280px] overflow-hidden rounded-[1.4rem] sm:h-[400px] sm:rounded-[1.8rem] md:h-[520px] lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -30 }}
            style={{
              background: "linear-gradient(135deg, rgba(20,28,36,0.9), rgba(14,20,28,0.95))",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
            }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <PodPreview className="h-full w-full" interactive state={state} />
          </motion.div>

          {/* Right — Summary panel */}
          <div className="flex flex-col">
            <motion.p
              className="mb-3 text-[11px] uppercase tracking-[0.3em] text-white/50"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Your configuration
            </motion.p>

            <motion.h2
              className="mb-6 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1] tracking-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.06 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Pod 7 — {sizeLabel}
            </motion.h2>

            {/* Price panel */}
            <motion.div
              className="surface-panel rounded-[1.9rem] p-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Estimated from</p>
              <p className="text-3xl font-medium tracking-[-0.04em] text-white sm:text-5xl">{formatCurrency(estimatedPrice)}</p>
              <p className="mt-1 text-xs text-white/40">or ~{formatCurrency(monthlyEstimate)}/mo with financing</p>

              {/* Price breakdown */}
              <div className="mt-5 space-y-2 border-t border-white/8 pt-4">
                {includedItems.map((item) => (
                  <div className="flex justify-between text-[13px]" key={item.label}>
                    <span className="text-white/50">{item.label}</span>
                    <span className={item.amount > 0 ? "text-white/70" : "text-[#8de4d4]/70"}>
                      {item.amount > 0 ? formatCurrency(item.amount) : "Included"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Config summary cards */}
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Size</p>
                  <p className="mt-1 text-sm text-white">{sizeLabel}</p>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Finish</p>
                  <p className="mt-1 text-sm text-white">{finishLabel}</p>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Environment</p>
                  <p className="mt-1 text-sm text-white">{envLabel}</p>
                </div>
              </div>
            </motion.div>

            {/* What's Included accordion */}
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <button
                className="flex w-full cursor-pointer items-center justify-between rounded-[1.4rem] border border-white/10 bg-white/[0.045] px-5 py-4 transition-colors hover:bg-white/[0.07]"
                onClick={() => setSpecsOpen(!specsOpen)}
                type="button"
              >
                <span className="text-sm text-white/70">What&apos;s included in every pod</span>
                <motion.svg
                  animate={{ rotate: specsOpen ? 180 : 0 }}
                  fill="none"
                  height="16"
                  stroke="rgba(255,255,255,0.4)"
                  strokeLinecap="round"
                  strokeWidth="2"
                  transition={{ duration: 0.3 }}
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {specsOpen && (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className="overflow-hidden"
                    exit={{ height: 0, opacity: 0 }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-2.5 px-5 pb-1 pt-3">
                      {SPECS.map((spec) => (
                        <div className="flex items-start gap-2.5" key={spec}>
                          <svg
                            className="mt-0.5 shrink-0"
                            fill="none"
                            height="14"
                            stroke="#8de4d4"
                            strokeLinecap="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="14"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span className="text-[13px] leading-snug text-white/50">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <GlowButton onClick={onStartProject}>Start your project</GlowButton>
              <button
                className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-5 py-3 text-[13px] text-white/60 transition-all hover:bg-white/[0.07] hover:text-white/80"
                onClick={shareConfig}
                type="button"
              >
                <svg
                  fill="none"
                  height="14"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="14"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                  <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                </svg>
                {copied ? "Link copied!" : "Share configuration"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
