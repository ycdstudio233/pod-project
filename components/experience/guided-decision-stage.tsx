"use client";

import { motion } from "framer-motion";
import { PodPreview } from "@/components/3d/pod-preview";
import { GlowButton } from "@/components/ui/glow-button";
import { OptionCard } from "@/components/ui/option-card";
import type { ChoiceOption, ConfiguratorState } from "@/types/configurator";

interface GuidedDecisionStageProps {
  id: string;
  phase: string;
  stepLabel: string;
  title: string;
  copy: string;
  guidance: string;
  options: Array<ChoiceOption<string>>;
  selectedId: string;
  state: ConfiguratorState;
  nextLabel: string;
  onSelect: (id: string) => void;
  onNext: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

export function GuidedDecisionStage({
  copy,
  guidance,
  id,
  nextLabel,
  onNext,
  onSelect,
  options,
  phase,
  selectedId,
  setRef,
  state,
  stepLabel,
  title,
}: GuidedDecisionStageProps) {
  return (
    <section className="relative min-h-screen overflow-hidden px-5 py-10 scroll-mt-24 lg:px-10 lg:py-12" id={id} ref={setRef}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%,rgba(0,0,0,0.14)_100%)]" />

      <div className="relative z-10 mx-auto grid max-w-[1600px] gap-8 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(460px,0.9fr)]">
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/58">
              {phase}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/34">{stepLabel}</span>
          </div>
          <h2 className="max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.04em] text-balance text-white">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">{copy}</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/44">{guidance}</p>

          <div className="mt-10 grid gap-4 xl:grid-cols-2">
            {options.map((option) => (
              <OptionCard
                accent={option.accent}
                className="min-h-[228px]"
                description={option.description}
                image={option.image}
                key={option.id}
                label={option.label}
                meta={option.meta}
                onClick={() => onSelect(option.id)}
                recommended={option.recommended}
                selected={selectedId === option.id}
                title={option.title}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <GlowButton onClick={onNext}>{nextLabel}</GlowButton>
            <p className="text-sm text-white/40">Your pod updates as you go. No separate builder. No reset.</p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 32 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <PodPreview
            className="h-[460px] w-full rounded-[1.8rem] md:h-[560px]"
            interactive
            state={state}
          />
        </motion.div>
      </div>
    </section>
  );
}
