"use client";

import { motion } from "framer-motion";
import { PodPreview } from "@/components/3d/pod-preview";
import { GlowButton } from "@/components/ui/glow-button";
import { ProcessRail } from "@/components/ui/process-rail";
import { ProofChips } from "@/components/ui/proof-chips";
import { environmentOptions, finishOptions, interiorPackOptions, sizeOptions } from "@/lib/configurator-data";
import { formatCurrency } from "@/lib/pricing";
import type { ConfiguratorState, PriceLineItem } from "@/types/configurator";

interface SummaryStageProps {
  state: ConfiguratorState;
  estimatedPrice: number;
  priceBreakdown: PriceLineItem[];
  onStartProject: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

function getTitle<T extends string>(value: T, collection: Array<{ id: T; title: string }>) {
  return collection.find((item) => item.id === value)?.title ?? value;
}

export function SummaryStage({
  estimatedPrice,
  onStartProject,
  priceBreakdown,
  setRef,
  state,
}: SummaryStageProps) {
  const includedItems = priceBreakdown.filter((item) => item.included);
  const siteDependentItems = priceBreakdown.filter((item) => !item.included);

  return (
    <section className="relative min-h-screen overflow-hidden px-5 py-10 scroll-mt-24 lg:px-10 lg:py-12" id="summary" ref={setRef}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(141,228,212,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_26%,rgba(0,0,0,0.16)_100%)]" />
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1600px] gap-8 lg:grid-cols-[minmax(460px,1.05fr)_minmax(0,0.95fr)]">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -28 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <PodPreview
            className="h-[400px] w-full rounded-[1.8rem] md:h-[520px]"
            interactive
            state={state}
          />
        </motion.div>

        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/58">
              Review
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/34">Your pod, anchored</span>
          </div>

          <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[0.98] tracking-[-0.04em] text-white">
            This is the pod we would show you first.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/64">
            Price up front. What is included up front. What depends on the site up front. No mystery layer.
          </p>

          <div className="mt-5">
            <ProofChips />
          </div>

          <div className="surface-panel mt-8 rounded-[1.9rem] p-6">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/42">Starting from</p>
                <p className="mt-2 text-5xl font-medium tracking-[-0.04em] text-white">{formatCurrency(estimatedPrice)}</p>
              </div>
              <p className="max-w-sm text-sm leading-7 text-white/46">
                The version shown here is already a credible starting spec, not a blank build.
              </p>
            </div>

            <div className="mt-5 space-y-2">
              {includedItems.map((item) => (
                <div className="flex justify-between text-sm" key={item.label}>
                  <span className="text-white/50">{item.label}</span>
                  <span className="text-white/70">{item.amount > 0 ? formatCurrency(item.amount) : "Included"}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-white/8 pt-4">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-white/35">Depends on your site</p>
              {siteDependentItems.map((item) => (
                <div className="flex justify-between text-sm" key={item.label}>
                  <span className="text-white/40">{item.label}</span>
                  <span className="text-white/40">~{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">Size</p>
                <p className="mt-2 text-lg text-white">{getTitle(state.size, sizeOptions)}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">Finish</p>
                <p className="mt-2 text-lg text-white">{getTitle(state.finish, finishOptions)}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">Setting</p>
                <p className="mt-2 text-lg text-white">
                  {environmentOptions.find((option) => option.id === state.environment)?.title}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">Interior</p>
                <p className="mt-2 text-lg text-white">{getTitle(state.interiorPack, interiorPackOptions)}</p>
              </div>
            </div>

            <div className="mt-4 rounded-[1.4rem] border border-white/8 bg-white/[0.025] p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">Handled with you later</p>
              <p className="mt-2 text-sm leading-6 text-white/48">
                Glazing details, lighting scenes, utility tie-in, and permit path get tuned after site fit. You do not need
                to solve every detail today.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <ProcessRail />
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <GlowButton onClick={onStartProject}>Start your project</GlowButton>
              <p className="text-sm text-white/42">This is enough to move forward with confidence.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
