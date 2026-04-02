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
      className="relative min-h-[100svh] min-h-[100dvh] overflow-hidden scroll-mt-20 pt-[5.5rem] md:scroll-mt-28 md:pt-28"
      id={id}
      ref={setRef}
    >
      <div className="relative">
        <motion.div
          className="mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-12"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={{ opacity: 1 }}
        >
          <PodPreview className="h-[150px] w-full rounded-2xl md:h-[340px] md:rounded-[1.8rem] lg:h-[460px]" interactive state={state} />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-8 md:px-6 md:pb-12 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between gap-2 border-b border-white/8 py-3 md:py-5">
            <h2 className="text-lg font-medium tracking-[-0.03em] text-white md:text-[clamp(1.4rem,3.5vw,2.8rem)]">{title}</h2>
            <div className="flex shrink-0 items-center gap-2 md:gap-3">
              <span className="hidden text-sm text-white/50 md:inline">{selectedOption?.label ?? selectedId}</span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/30 md:text-[10px] md:tracking-[0.2em]">{phase} / {stepLabel}</span>
            </div>
          </div>

          {/* Copy text — compact on mobile/tablet */}
          <p className="mt-2 max-w-xl text-xs leading-5 text-white/54 md:mt-4 md:text-sm md:leading-7">{copy}</p>
          <p className="mt-1 hidden max-w-xl text-sm leading-6 text-white/36 md:block">{guidance}</p>

          {/* Sleek mini-cards for mobile/tablet (< md) */}
          <div className="mt-3 grid grid-cols-2 gap-2 md:hidden">
            {options.map((option) => (
              <button
                className={`relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 ${
                  selectedId === option.id
                    ? "border-white/24 bg-white/11"
                    : "border-white/8 bg-white/[0.03] active:bg-white/[0.07]"
                } ${options.length === 3 && options.indexOf(option) === 2 ? "col-span-2" : ""}`}
                key={option.id}
                onClick={() => onSelect(option.id)}
                type="button"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-[2px] transition-opacity ${selectedId === option.id ? "opacity-100" : "opacity-0"}`}
                  style={{ background: `linear-gradient(90deg, ${option.accent}, transparent)` }}
                />
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">{option.label}</span>
                  {option.recommended && (
                    <span className="rounded-full border border-emerald-200/18 bg-emerald-200/10 px-2 py-0.5 text-[8px] font-medium uppercase tracking-wider text-emerald-100">
                      Recommended
                    </span>
                  )}
                </div>
                <h4 className="text-base font-medium text-white">{option.title}</h4>
                <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-white/50">{option.description}</p>
                <p className="mt-2 text-[11px] text-white/30">{option.meta}</p>
              </button>
            ))}
          </div>

          {/* Desktop: full option cards (≥ md) */}
          <div
            className={`mt-6 hidden grid-cols-1 gap-3 md:grid md:grid-cols-2 ${
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

          <div className="mt-4 flex items-center gap-4 md:mt-6 md:gap-6">
            <GlowButton onClick={onNext}>{nextLabel}</GlowButton>
            <span className="hidden text-sm text-white/34 md:inline">Choose a card to update the view right away.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
