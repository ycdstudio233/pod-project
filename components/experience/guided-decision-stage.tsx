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
      className="relative min-h-[100svh] min-h-[100dvh] overflow-hidden scroll-mt-20 pt-[5.5rem] sm:scroll-mt-28 sm:pt-28"
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
          <PodPreview className="h-[150px] w-full rounded-2xl sm:h-[340px] sm:rounded-[1.8rem] lg:h-[460px]" interactive state={state} />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-8 sm:px-6 sm:pb-12 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between gap-2 border-b border-white/8 py-3 sm:py-5">
            <h2 className="text-lg font-medium tracking-[-0.03em] text-white sm:text-[clamp(1.4rem,3.5vw,2.8rem)]">{title}</h2>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <span className="hidden text-xs text-white/50 sm:inline sm:text-sm">{selectedOption?.label ?? selectedId}</span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/30 sm:text-[10px] sm:tracking-[0.2em]">{phase} / {stepLabel}</span>
            </div>
          </div>

          {/* Copy text — compact on mobile */}
          <p className="mt-2 max-w-xl text-xs leading-5 text-white/54 sm:mt-4 sm:text-sm sm:leading-7">{copy}</p>
          <p className="mt-1 hidden max-w-xl text-sm leading-6 text-white/36 sm:block">{guidance}</p>

          {/* Mobile: compact pill-style option selectors */}
          <div className="mt-3 flex flex-col gap-2 sm:hidden">
            {options.map((option) => (
              <button
                className={`relative flex items-center gap-3 overflow-hidden rounded-xl border px-3.5 py-3 text-left transition-all duration-200 ${
                  selectedId === option.id
                    ? "border-white/24 bg-white/11"
                    : "border-white/10 bg-white/[0.04] active:bg-white/[0.08]"
                }`}
                key={option.id}
                onClick={() => onSelect(option.id)}
                type="button"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-[2px] transition-opacity ${selectedId === option.id ? "opacity-100" : "opacity-0"}`}
                  style={{ background: `linear-gradient(90deg, ${option.accent}, transparent)` }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{option.title}</span>
                    {option.recommended && (
                      <span className="rounded-full border border-emerald-200/18 bg-emerald-200/10 px-2 py-0.5 text-[8px] font-medium uppercase tracking-wider text-emerald-100">
                        Rec
                      </span>
                    )}
                  </div>
                  <span className="mt-0.5 block text-[11px] text-white/40">{option.meta}</span>
                </div>
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  selectedId === option.id ? "border-[#8de4d4] bg-[#8de4d4]" : "border-white/20 bg-transparent"
                }`}>
                  {selectedId === option.id && (
                    <svg fill="none" height="10" stroke="#0a0d14" strokeLinecap="round" strokeWidth="2.5" viewBox="0 0 24 24" width="10">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Desktop: full option cards */}
          <div
            className={`mt-6 hidden grid-cols-1 gap-3 sm:grid sm:grid-cols-2 ${
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

          <div className="mt-4 flex items-center gap-4 sm:mt-6 sm:gap-6">
            <GlowButton onClick={onNext}>{nextLabel}</GlowButton>
            <span className="hidden text-sm text-white/34 sm:inline">Choose a card to update the view right away.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
