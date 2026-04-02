"use client";

import { motion } from "framer-motion";
import { PodPreview } from "@/components/3d/pod-preview";
import { GlowButton } from "@/components/ui/glow-button";
import { OptionCard } from "@/components/ui/option-card";
import { UPLOADED_MODEL_ACTIVE } from "@/components/3d/pod-model";
import { finishOptions, lightingModes, sizeOptions, windowOptions } from "@/lib/configurator-data";
import { formatCurrency } from "@/lib/pricing";
import type { ConfiguratorState, LightingMode, WindowStyle } from "@/types/configurator";

interface SummaryStageProps {
  state: ConfiguratorState;
  estimatedPrice: number;
  onWindowChange: (value: WindowStyle) => void;
  onLightingChange: (value: LightingMode) => void;
  onStartProject: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

function getTitle<T extends string>(value: T, collection: Array<{ id: T; title: string }>) {
  return collection.find((item) => item.id === value)?.title ?? value;
}

export function SummaryStage({
  estimatedPrice,
  onLightingChange,
  onStartProject,
  onWindowChange,
  setRef,
  state,
}: SummaryStageProps) {
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
            className="h-[440px] w-full rounded-[2.2rem] sm:h-[560px] lg:h-[min(82vh,820px)]"
            interactive
            label="Your configured pod"
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
          <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/46">Summary + pricing</span>
          <h2 className="mt-4 text-[clamp(2.6rem,5vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.04em] text-balance text-white">
            This is the version we would put in front of you first.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/66">
            Clean breakdown up front. The technical layers can wait until you are ready for them.
          </p>

          <div className="surface-panel mt-8 rounded-[1.9rem] p-6">
            <div className="flex flex-col gap-6 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/42">Estimated starting price</p>
                <p className="mt-3 text-5xl font-medium tracking-[-0.04em] text-white">{formatCurrency(estimatedPrice)}</p>
              </div>
              <p className="max-w-sm text-sm leading-7 text-white/46">
                Includes pod shell, glazing package, and standard interior lighting concept.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">Size</p>
                <p className="mt-3 text-lg text-white">{getTitle(state.size, sizeOptions)}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">Finish</p>
                <p className="mt-3 text-lg text-white">{getTitle(state.finish, finishOptions)}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">Window</p>
                <p className="mt-3 text-lg text-white">{getTitle(state.windowStyle, windowOptions)}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.24em] text-white/40">Refine the view</p>
              <div className="grid gap-4 xl:grid-cols-3">
                {windowOptions.map((option) => (
                  <OptionCard
                    accent={option.accent}
                    className="min-h-[204px]"
                    description={option.description}
                    key={option.id}
                    label={option.label}
                    meta={option.meta}
                    onClick={() => onWindowChange(option.id)}
                    recommended={option.recommended}
                    selected={state.windowStyle === option.id}
                    title={option.title}
                  />
                ))}
              </div>
              {UPLOADED_MODEL_ACTIVE ? (
                <p className="mt-3 text-xs leading-5 text-white/35">
                  Window style is saved to your project brief. The 3D preview shows the base model and does not
                  reflect glazing changes live.
                </p>
              ) : null}
            </div>

            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.24em] text-white/40">Lighting mood</p>
              <div className="grid gap-4 md:grid-cols-2">
                {lightingModes.map((option) => (
                  <OptionCard
                    accent={option.accent}
                    className="min-h-[188px]"
                    description={option.description}
                    key={option.id}
                    label={option.label}
                    meta={option.meta}
                    onClick={() => onLightingChange(option.id)}
                    recommended={option.recommended}
                    selected={state.lighting === option.id}
                    title={option.title}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <GlowButton onClick={onStartProject}>Start your project</GlowButton>
            <p className="text-sm text-white/45">We’ll guide site fit, delivery sequence, and next decisions with you.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

