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
  hideViewer?: boolean;
  onSelect: (id: string) => void;
  onNext: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

export function GuidedDecisionStage({
  copy,
  hideViewer,
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
      className="relative flex min-h-screen flex-col overflow-hidden scroll-mt-20"
      id={id}
      ref={setRef}
    >
      {/* 3D Viewer — expands to fill available space (hidden when cards have images) */}
      {!hideViewer ? (
        <div className="relative flex-1 pt-14">
          <motion.div
            className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-center px-6 lg:px-12"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            whileInView={{ opacity: 1 }}
          >
            <PodPreview
              className="h-full min-h-[320px] w-full rounded-[1.8rem] sm:min-h-[380px] lg:min-h-[420px]"
              interactive
              state={state}
            />
          </motion.div>
        </div>
      ) : (
        <div className="pt-14" />
      )}

      {/* Options panel — fixed content area below viewer */}
      <div className={`relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-10 lg:px-12 ${hideViewer ? "flex flex-1 flex-col justify-center" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {/* Section header */}
          <div className="flex items-center justify-between border-b border-white/8 py-4">
            <h2 className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-medium tracking-[-0.03em] text-white">
              {title}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/50">{selectedOption?.label ?? selectedId}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">{phase} / {stepLabel}</span>
            </div>
          </div>

          <p className="mt-3 max-w-lg text-sm leading-7 text-white/50">{copy}</p>

          {/* Option cards grid */}
          <div className={`mt-5 grid gap-3 sm:grid-cols-2 ${options.length <= 3 ? "lg:grid-cols-3" : "xl:grid-cols-4"}`}>
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

          <div className="mt-5 flex items-center gap-6">
            <GlowButton onClick={onNext}>{nextLabel}</GlowButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
