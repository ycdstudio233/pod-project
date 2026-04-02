"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { formatCurrency } from "@/lib/pricing";

const STEPS = [
  { id: "hero", label: "Preview" },
  { id: "size", label: "Size" },
  { id: "finish", label: "Finish" },
  { id: "environment", label: "Setting" },
  { id: "interior-pack", label: "Interior" },
  { id: "site-fit", label: "Site check" },
  { id: "summary", label: "Review" },
  { id: "contact", label: "Project" },
];

interface ProgressDockProps {
  activeIndex: number;
  activeStepLabel: string;
  estimatedPrice: number;
  configLabel: string;
  state: { size: string; finish: string; environment: string };
  onNavigate?: (index: number) => void;
}

export function ProgressDock({
  activeIndex,
  activeStepLabel,
  configLabel,
  estimatedPrice,
  onNavigate,
}: ProgressDockProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const progressPercent = ((activeIndex + 1) / STEPS.length) * 100;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-[2px]">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX,
            background: "linear-gradient(90deg, #8de4d4, #57cbb8)",
          }}
        />
      </div>

      <nav className="fixed inset-x-0 top-2 z-40 px-3 sm:px-4">
        <div className="mx-auto max-w-[1320px]">
          <div className="surface-panel-strong flex items-center gap-3 overflow-hidden rounded-full px-3 py-2 sm:px-3.5">
            <div className="flex shrink-0 items-center gap-1">
              {STEPS.map((step, index) => (
                <button
                  className={`flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border text-[10px] font-medium uppercase tracking-[0.14em] transition-all duration-200 ${
                    index === activeIndex
                      ? "border-white/18 bg-white/12 text-white"
                      : index < activeIndex
                        ? "border-white/10 bg-white/[0.04] text-white/56 hover:border-white/14 hover:text-white/82"
                        : "border-white/8 bg-transparent text-white/26 hover:border-white/12 hover:text-white/44"
                  }`}
                  key={step.id}
                  onClick={() => onNavigate?.(index)}
                  type="button"
                >
                  {(index + 1).toString().padStart(2, "0")}
                </button>
              ))}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-medium uppercase tracking-[0.18em] text-white/74">
                    {activeStepLabel}
                  </p>
                  <p className="hidden truncate text-[11px] text-white/40 md:block">{configLabel}</p>
                </div>
                <div className="hidden h-5 w-px shrink-0 bg-white/10 lg:block" />
                <div className="hidden shrink-0 text-right lg:block">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">From</p>
                  <p className="text-sm font-medium text-white">{formatCurrency(estimatedPrice)}</p>
                </div>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full rounded-full bg-[linear-gradient(90deg,#8de4d4,#57cbb8)]"
                  transition={{ duration: 0.22, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
