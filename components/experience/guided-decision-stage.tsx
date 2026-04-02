"use client";

import { motion } from "framer-motion";
import { PodPreview } from "@/components/3d/pod-preview";
import { GlowButton } from "@/components/ui/glow-button";
import { OptionCard } from "@/components/ui/option-card";
import type { ChoiceOption, ConfiguratorState } from "@/types/configurator";

interface GuidedDecisionStageProps {
  id: string;
  step?: string;
  title: string;
  copy: string;
  microcopy?: string;
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
  id,
  nextLabel,
  onNext,
  onSelect,
  options,
  selectedId,
  setRef,
  state,
  step,
  title,
}: GuidedDecisionStageProps) {
  return (
    <section className="relative min-h-screen overflow-hidden px-5 py-10 scroll-mt-24 lg:px-10 lg:py-12" id={id} ref={setRef}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%,rgba(0,0,0,0.14)_100%)]" />

      <div className="relative z-10 mx-auto grid max-w-[1600px] items-center gap-8 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(460px,0.9fr)]">
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {step ? <span className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-white/46">{step}</span> : null}
          <h2 className="max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.04em] text-balance text-white">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">{copy}</p>

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

          <div className="mt-8">
            <GlowButton onClick={onNext}>{nextLabel}</GlowButton>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center lg:justify-end"
          initial={{ opacity: 0, x: 32 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <PodPreview
            className="h-[460px] w-full rounded-[1.8rem] md:h-[560px] lg:sticky lg:top-24"
            interactive
            state={state}
          />
        </motion.div>
      </div>
    </section>
  );
}
