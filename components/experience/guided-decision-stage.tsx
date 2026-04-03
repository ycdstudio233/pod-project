"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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
  heroImages?: Record<string, string>;
}

export function GuidedDecisionStage({
  copy,
  guidance,
  heroImages,
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
  const activeImage = heroImages?.[selectedId];

  /* ─── Immersive hero-image layout (Setting step) ─── */
  if (heroImages) {
    return (
      <section
        className="relative h-[100svh] h-[100dvh] overflow-hidden scroll-mt-20 md:scroll-mt-28"
        id={id}
        ref={setRef}
      >
        {/* Full-bleed background image — object-position keeps the landscape/pod in view */}
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-x-0 bottom-0 h-[140%]"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, scale: 1.04 }}
            key={selectedId}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              alt={options.find((o) => o.id === selectedId)?.title ?? "Setting"}
              className="object-cover object-bottom"
              draggable={false}
              fill
              priority
              quality={90}
              sizes="100vw"
              src={activeImage ?? options[0]?.image ?? ""}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090d]/60 via-transparent to-transparent" />

        {/* Content overlaid at bottom */}
        <div className="relative z-10 flex h-[calc(100%-7.5rem)] flex-col justify-end px-4 pb-4 sm:px-6 md:pb-6 lg:px-12">
          <div className="mx-auto w-full max-w-[1400px]">
            {/* Eyebrow + title */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between gap-2 md:block">
                <h2 className="max-w-lg text-lg font-medium tracking-[-0.03em] text-white md:text-[clamp(1.4rem,3.5vw,2.8rem)] md:leading-[0.96]">
                  {title}
                </h2>
                <span className="text-[9px] uppercase tracking-[0.18em] text-white/30 md:mt-3 md:hidden md:text-[10px]">
                  {phase} / {stepLabel}
                </span>
              </div>
              <p className="mt-1 hidden max-w-md text-sm leading-6 text-white/44 md:block">
                {guidance}
              </p>
            </motion.div>

            {/* Mobile: sleek rows */}
            <div className="mt-3 flex flex-col gap-1 md:hidden">
              {options.map((option) => {
                const isSelected = selectedId === option.id;
                return (
                  <button
                    className={`relative flex items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 text-left backdrop-blur-md transition-all duration-200 ${
                      isSelected
                        ? "border-white/25 bg-white/[0.14]"
                        : "border-white/10 bg-black/25 active:bg-white/[0.08]"
                    }`}
                    key={option.id}
                    onClick={() => onSelect(option.id)}
                    type="button"
                  >
                    <div
                      className="absolute inset-y-1.5 left-0 w-[3px] rounded-full transition-opacity"
                      style={{ background: option.accent, opacity: isSelected ? 1 : 0.15 }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-[14px] font-semibold ${isSelected ? "text-white" : "text-white/60"}`}>
                          {option.title}
                        </span>
                        {option.recommended && (
                          <span className="rounded-full bg-emerald-300/12 px-1.5 py-px text-[8px] font-bold uppercase tracking-wider text-emerald-200/70">
                            Rec
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] ${isSelected ? "text-white/40" : "text-white/25"}`}>
                        {option.meta}
                      </span>
                    </div>
                    <div className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      isSelected ? "border-[#8de4d4] bg-[#8de4d4]" : "border-white/20"
                    }`}>
                      {isSelected && (
                        <svg fill="none" height="9" stroke="#0a0d14" strokeLinecap="round" strokeWidth="3" viewBox="0 0 24 24" width="9">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
              <button
                className="mt-1.5 w-full rounded-xl bg-[linear-gradient(135deg,#baf7eb_0%,#82e2d0_35%,#4bbca9_100%)] py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-950 shadow-[0_10px_24px_rgba(76,189,169,0.22)] transition hover:translate-y-[-1px]"
                onClick={onNext}
                type="button"
              >
                {nextLabel} →
              </button>
            </div>

            {/* Desktop: option cards (compact, glassmorphic for image overlay) */}
            <div className="mt-4 hidden grid-cols-3 gap-3 md:grid">
              {options.map((option) => {
                const isSelected = selectedId === option.id;
                return (
                  <button
                    className={`group relative overflow-hidden rounded-2xl border p-4 text-left backdrop-blur-md transition duration-300 ${
                      isSelected
                        ? "border-white/24 bg-white/[0.12] shadow-[0_24px_54px_rgba(0,0,0,0.28)]"
                        : "border-white/10 bg-black/25 hover:border-white/20 hover:bg-white/[0.08]"
                    }`}
                    key={option.id}
                    onClick={() => onSelect(option.id)}
                    type="button"
                  >
                    <div
                      className={`absolute inset-x-0 top-0 h-1 transition-opacity duration-300 ${isSelected ? "opacity-100" : "opacity-55 group-hover:opacity-80"}`}
                      style={{ background: `linear-gradient(90deg, ${option.accent}, transparent)` }}
                    />
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/48">{option.label}</span>
                      {option.recommended && (
                        <span className="rounded-full border border-emerald-200/18 bg-emerald-200/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-emerald-100">
                          Recommended
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-medium text-white">{option.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/60">{option.description}</p>
                    <p className="mt-1 text-xs text-white/40">{option.meta}</p>
                  </button>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-4 hidden items-center gap-5 md:flex md:mt-5">
              <GlowButton onClick={onNext}>{nextLabel}</GlowButton>
              <span className="text-sm text-white/30">
                Choose a card to update the view right away.
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ─── Standard 3D-viewer layout (Size, Finish steps) ─── */
  return (
    <section
      className="relative overflow-hidden scroll-mt-20 pt-[4.25rem] md:scroll-mt-28 md:pt-28"
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
          <PodPreview className="h-[200px] w-full rounded-2xl md:h-[280px] md:rounded-[1.8rem] lg:h-[340px]" interactive state={state} />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-6 md:px-6 md:pb-12 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/8 py-2 md:py-5">
            <h2 className="text-lg font-medium tracking-[-0.03em] text-white md:text-[clamp(1.4rem,3.5vw,2.8rem)]">{title}</h2>
            <span className="text-[9px] uppercase tracking-[0.18em] text-white/30 md:text-[10px] md:tracking-[0.2em]">{phase} / {stepLabel}</span>
          </div>

          <p className="hidden max-w-xl text-sm leading-7 text-white/54 md:mt-4 md:block">{copy}</p>
          <p className="mt-1 hidden max-w-xl text-sm leading-6 text-white/36 md:block">{guidance}</p>

          {/* Mobile: sleek rows */}
          <div className="mt-2 flex flex-col gap-1 md:hidden">
            {options.map((option) => {
              const isSelected = selectedId === option.id;
              return (
                <button
                  className={`relative flex items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#8de4d4]/28 bg-white/[0.09]"
                      : "border-white/8 bg-white/[0.025] active:bg-white/[0.06]"
                  }`}
                  key={option.id}
                  onClick={() => onSelect(option.id)}
                  type="button"
                >
                  <div
                    className="absolute inset-y-1.5 left-0 w-[3px] rounded-full transition-opacity"
                    style={{ background: option.accent, opacity: isSelected ? 1 : 0.15 }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-[14px] font-semibold ${isSelected ? "text-white" : "text-white/60"}`}>
                        {option.title}
                      </span>
                      {option.recommended && (
                        <span className="rounded-full bg-emerald-300/12 px-1.5 py-px text-[8px] font-bold uppercase tracking-wider text-emerald-200/70">
                          Rec
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] ${isSelected ? "text-white/40" : "text-white/25"}`}>
                      {option.meta}
                    </span>
                  </div>
                  <div className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    isSelected ? "border-[#8de4d4] bg-[#8de4d4]" : "border-white/20"
                  }`}>
                    {isSelected && (
                      <svg fill="none" height="9" stroke="#0a0d14" strokeLinecap="round" strokeWidth="3" viewBox="0 0 24 24" width="9">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
            <button
              className="mt-1.5 w-full rounded-xl bg-[linear-gradient(135deg,#baf7eb_0%,#82e2d0_35%,#4bbca9_100%)] py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-950 shadow-[0_10px_24px_rgba(76,189,169,0.22)] transition hover:translate-y-[-1px]"
              onClick={onNext}
              type="button"
            >
              {nextLabel} →
            </button>
          </div>

          {/* Desktop: option cards */}
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

          <div className="mt-4 hidden items-center gap-6 pb-8 md:flex lg:pb-10">
            <GlowButton onClick={onNext}>{nextLabel}</GlowButton>
            <span className="text-sm text-white/34">Choose a card to update the view right away.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
