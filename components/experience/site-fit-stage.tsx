"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { evaluateSiteFit, verdictCopy } from "@/lib/site-fit";
import type {
  AccessWidth,
  ConfiguratorState,
  IntendedUse,
  SiteFitData,
  SlopeCondition,
} from "@/types/configurator";

interface SiteFitStageProps {
  state: ConfiguratorState;
  onUpdate: (data: Partial<SiteFitData>) => void;
  onNext: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

const slopeOptions: { id: SlopeCondition; label: string }[] = [
  { id: "flat", label: "Flat or pretty flat" },
  { id: "slight", label: "A gentle slope" },
  { id: "steep", label: "Steep, it's hilly" },
];

const accessOptions: { id: AccessWidth; label: string }[] = [
  { id: "easy", label: "Normal driveway, easy access" },
  { id: "tight", label: "Narrow or tricky to reach" },
];

const useOptions: { id: IntendedUse; label: string }[] = [
  { id: "home-office", label: "Home office" },
  { id: "guest", label: "Guest house" },
  { id: "retreat", label: "Personal retreat" },
  { id: "rental", label: "Rental / ADU" },
];

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={`w-full rounded-[1.2rem] border px-5 py-3 text-left text-sm transition-all duration-200 sm:w-auto sm:rounded-full ${
        active
          ? "border-white/20 bg-white/10 text-white"
          : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/16 hover:bg-white/[0.06]"
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

const fadeVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function SiteFitStage({ state, onNext, onUpdate, setRef }: SiteFitStageProps) {
  const { siteFit } = state;
  const [step, setStep] = useState(0);

  const allAnswered = siteFit.slope !== null && siteFit.accessWidth !== null && siteFit.intendedUse !== null;

  const verdict = useMemo(() => {
    if (!allAnswered) return null;
    return evaluateSiteFit(siteFit);
  }, [allAnswered, siteFit]);

  const showVerdict = useCallback(() => {
    if (!verdict) return;
    onUpdate({ verdict });
    setStep(3);
  }, [onUpdate, verdict]);

  const canAdvance =
    step === 0 ? siteFit.slope !== null : step === 1 ? siteFit.accessWidth !== null : step === 2 ? siteFit.intendedUse !== null : true;

  return (
    <section
      className="relative min-h-[100svh] min-h-[100dvh] overflow-hidden scroll-mt-28 px-4 pb-10 pt-24 sm:px-5 sm:pt-28 lg:px-10 lg:pb-12"
      id="site-fit"
      ref={setRef}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(141,228,212,0.1),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%,rgba(0,0,0,0.14)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-7rem)] max-w-[860px] flex-col justify-center sm:min-h-[calc(100svh-6rem)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/58">
              Quick site check
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/34">takes 20 seconds</span>
          </div>
          <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-medium leading-[0.98] tracking-[-0.04em] text-white">
            {step < 3 ? "Let's make sure your site works." : "Looking good, this is a real project."}
          </h2>
          {step < 3 ? (
            <p className="mt-3 max-w-lg text-base leading-7 text-white/60 sm:mt-4 sm:text-lg sm:leading-8">
              Three quick questions. Nothing scary, we just need a rough picture so we can give you a real answer.
            </p>
          ) : null}
        </motion.div>

        {step < 3 ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {["Ground", "Access", "Use"].map((label, index) => (
              <span
                className={`rounded-full border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] ${
                  index === step
                    ? "border-white/18 bg-white/10 text-white"
                    : index < step
                      ? "border-white/10 bg-white/[0.03] text-white/44"
                      : "border-white/10 bg-white/[0.03] text-white/24"
                }`}
                key={label}
              >
                {index < step ? "\u2713 " : ""}
                {label}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div key="slope" {...fadeVariants} transition={{ duration: 0.3 }}>
                <p className="mb-5 text-sm font-medium text-white/70">What&apos;s the ground like where the pod would go?</p>
                <div className="grid gap-3 sm:flex sm:flex-wrap">
                  {slopeOptions.map((opt) => (
                    <Pill active={siteFit.slope === opt.id} key={opt.id} onClick={() => onUpdate({ slope: opt.id })}>
                      {opt.label}
                    </Pill>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {step === 1 ? (
              <motion.div key="access" {...fadeVariants} transition={{ duration: 0.3 }}>
                <p className="mb-5 text-sm font-medium text-white/70">Can a truck get to the spot easily?</p>
                <div className="grid gap-3 sm:flex sm:flex-wrap">
                  {accessOptions.map((opt) => (
                    <Pill active={siteFit.accessWidth === opt.id} key={opt.id} onClick={() => onUpdate({ accessWidth: opt.id })}>
                      {opt.label}
                    </Pill>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {step === 2 ? (
              <motion.div key="use" {...fadeVariants} transition={{ duration: 0.3 }}>
                <p className="mb-5 text-sm font-medium text-white/70">What will you mostly use it for?</p>
                <div className="grid gap-3 sm:flex sm:flex-wrap">
                  {useOptions.map((opt) => (
                    <Pill active={siteFit.intendedUse === opt.id} key={opt.id} onClick={() => onUpdate({ intendedUse: opt.id })}>
                      {opt.label}
                    </Pill>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {step === 3 && verdict ? (
              <motion.div
                key="verdict"
                {...fadeVariants}
                className="surface-panel rounded-2xl p-5 sm:rounded-[2rem] sm:p-8"
                transition={{ duration: 0.45 }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: verdictCopy[verdict].color }} />
                  <span className="text-lg font-medium text-white">{verdictCopy[verdict].label}</span>
                </div>
                <p className="mt-4 max-w-lg text-base leading-7 text-white/60">{verdictCopy[verdict].message}</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="mt-10">
          {step < 2 ? (
            <GlowButton disabled={!canAdvance} onClick={() => setStep((value) => value + 1)}>
              Next question
            </GlowButton>
          ) : step === 2 ? (
            <GlowButton disabled={!canAdvance} onClick={showVerdict}>
              Check my site
            </GlowButton>
          ) : (
            <GlowButton onClick={onNext}>Almost done, show me the price</GlowButton>
          )}
        </div>
      </div>
    </section>
  );
}
