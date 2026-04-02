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

          {/* Mobile/tablet option cards + integrated CTA (< md) */}
          <div className="mt-4 md:hidden">
            <div className="grid grid-cols-2 gap-2.5">
              {options.map((option, idx) => {
                const isSelected = selectedId === option.id;
                const isLastOdd = options.length % 2 === 1 && idx === options.length - 1;
                return (
                  <button
                    className={`relative flex flex-col overflow-hidden rounded-2xl border p-4 text-left transition-all duration-250 ${
                      isSelected
                        ? "border-[#8de4d4]/30 bg-white/[0.09] shadow-[0_0_24px_rgba(141,228,212,0.08)]"
                        : "border-white/8 bg-white/[0.025] active:bg-white/[0.06]"
                    } ${isLastOdd ? "col-span-2" : ""}`}
                    key={option.id}
                    onClick={() => onSelect(option.id)}
                    type="button"
                  >
                    {/* Accent top bar */}
                    <div
                      className="absolute inset-x-0 top-0 h-[2px]"
                      style={{
                        background: `linear-gradient(90deg, ${option.accent}, transparent)`,
                        opacity: isSelected ? 1 : 0.25,
                      }}
                    />

                    {/* Label row */}
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isSelected ? "text-white/60" : "text-white/30"}`}>
                        {option.label}
                      </span>
                      {option.recommended && (
                        <span className="rounded-full bg-emerald-300/12 px-1.5 py-px text-[7px] font-bold uppercase tracking-wider text-emerald-200/80">
                          ★
                        </span>
                      )}
                    </div>

                    {/* Title — dominant */}
                    <h4 className={`mt-1.5 text-[1.1rem] font-semibold leading-tight ${isSelected ? "text-white" : "text-white/70"}`}>
                      {option.title}
                    </h4>

                    {/* Description — softer weight */}
                    <p className={`mt-1.5 flex-1 line-clamp-2 text-[11px] leading-[1.45] ${isSelected ? "text-white/50" : "text-white/30"}`}>
                      {option.description}
                    </p>

                    {/* Meta — smallest */}
                    <p className={`mt-2.5 text-[10px] tracking-wide ${isSelected ? "text-white/40" : "text-white/20"}`}>
                      {option.meta}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* CTA bar — anchored to cards, shows selected + action */}
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8de4d4]/70">Selected</p>
                <p className="mt-0.5 truncate text-sm font-medium text-white">{selectedOption?.title}</p>
              </div>
              <button
                className="shrink-0 rounded-full bg-[linear-gradient(135deg,#baf7eb_0%,#82e2d0_35%,#4bbca9_100%)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-950 shadow-[0_12px_28px_rgba(76,189,169,0.25)] transition hover:translate-y-[-1px]"
                onClick={onNext}
                type="button"
              >
                {nextLabel}
              </button>
            </div>
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

          <div className="mt-4 hidden items-center gap-6 md:flex">
            <GlowButton onClick={onNext}>{nextLabel}</GlowButton>
            <span className="text-sm text-white/34">Choose a card to update the view right away.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
