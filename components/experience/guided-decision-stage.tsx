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
  const selectedOption = options.find((o) => o.id === selectedId);

  return (
    <section className="relative overflow-hidden" id={id} ref={setRef}>
      {/* 3D Viewer — full width, Lucid-style */}
      <div className="relative">
        <motion.div
          className="mx-auto w-full max-w-[1400px] px-6 lg:px-12"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={{ opacity: 1 }}
        >
          <PodPreview
            className="h-[340px] w-full rounded-t-[1.8rem] sm:h-[400px] lg:h-[460px]"
            interactive
            state={state}
          />
        </motion.div>
      </div>

      {/* Options panel below viewer */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-12 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {/* Section header — Lucid accordion style */}
          <div className="flex items-center justify-between border-b border-white/8 py-5">
            <div className="flex items-center gap-4">
              <h2 className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-medium tracking-[-0.03em] text-white">
                {title}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/50">{selectedOption?.label ?? selectedId}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">{phase} / {stepLabel}</span>
            </div>
          </div>

          <p className="mt-4 max-w-lg text-sm leading-7 text-white/50">{copy}</p>

          {/* Option cards grid */}
          <div className={`mt-6 grid gap-3 sm:grid-cols-2 ${options.length <= 3 ? "lg:grid-cols-3" : "xl:grid-cols-4"}`}>
            {options.map((option) => (
              <OptionCard
                accent={option.accent}
                description={option.description}
                iconId={option.iconId}
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

          <div className="mt-6 flex items-center gap-6">
            <GlowButton onClick={onNext}>{nextLabel}</GlowButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
