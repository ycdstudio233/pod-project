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
  const selectedOption = options.find((o) => o.id === selectedId);

  return (
    <section
      className="relative min-h-[100svh] min-h-[100dvh] overflow-hidden scroll-mt-28 pt-24 sm:pt-28"
      id={id}
      ref={setRef}
    >
      <div className="relative">
        <motion.div
          className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={{ opacity: 1 }}
        >
          <PodPreview className="h-[250px] w-full rounded-[1.45rem] sm:h-[340px] sm:rounded-[1.8rem] lg:h-[460px]" interactive state={state} />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-10 sm:px-6 sm:pb-12 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col items-start gap-2 border-b border-white/8 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-5">
            <h2 className="text-[clamp(1.4rem,3.5vw,2.8rem)] font-medium tracking-[-0.03em] text-white">{title}</h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs text-white/50 sm:text-sm">{selectedOption?.label ?? selectedId}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">{phase} / {stepLabel}</span>
            </div>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/54">{copy}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/36">{guidance}</p>

          <div
            className={`mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 ${
              options.length <= 3 ? "lg:grid-cols-3" : "xl:grid-cols-4"
            }`}
          >
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

          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
            <GlowButton onClick={onNext}>{nextLabel}</GlowButton>
            <span className="text-sm text-white/34">Tap any card to update the view right away.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
