"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { formatCurrency } from "@/lib/pricing";

const STEPS = [
  { id: "hero", label: "01 Preview" },
  { id: "size", label: "02 Size" },
  { id: "finish", label: "03 Finish" },
  { id: "environment", label: "04 Setting" },
  { id: "interior-pack", label: "05 Interior" },
  { id: "site-fit", label: "06 Site check" },
  { id: "summary", label: "07 Review" },
  { id: "contact", label: "08 Project" },
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
        <div className="mx-auto max-w-[1400px]">
          <div className="surface-panel-strong rounded-[1.3rem] px-4 py-3 sm:hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#8de4d4]/84">
                  Step {Math.min(activeIndex + 1, STEPS.length)} of {STEPS.length}
                </p>
                <p className="mt-1 text-sm font-medium text-white">{activeStepLabel}</p>
                <p className="mt-1 truncate text-[11px] text-white/44">{configLabel}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/34">From</p>
                <p className="mt-1 text-sm font-medium text-white">{formatCurrency(estimatedPrice)}</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
              <motion.div
                animate={{ width: `${progressPercent}%` }}
                className="h-full rounded-full bg-[linear-gradient(90deg,#8de4d4,#57cbb8)]"
                transition={{ duration: 0.22, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="hidden sm:block">
            <div className="surface-panel-strong flex items-center gap-3 rounded-full px-2 py-2">
              <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto scrollbar-none">
                {STEPS.map((step, index) => (
                  <button
                    className={`shrink-0 cursor-pointer rounded-full px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] transition-all duration-200 ${
                      index === activeIndex
                        ? "bg-white/12 text-white"
                        : index < activeIndex
                          ? "text-white/54 hover:bg-white/6 hover:text-white/82"
                          : "text-white/24 hover:bg-white/4 hover:text-white/42"
                    }`}
                    key={step.id}
                    onClick={() => onNavigate?.(index)}
                    type="button"
                  >
                    {step.label}
                  </button>
                ))}
              </div>

              <div className="hidden shrink-0 items-center gap-3 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 lg:flex">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8de4d4]/84">Current pod</p>
                  <p className="max-w-[280px] truncate text-[11px] text-white/54">{configLabel}</p>
                </div>
                <div className="h-7 w-px bg-white/10" />
                <div className="text-right">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/34">From</p>
                  <p className="text-sm font-medium text-white">{formatCurrency(estimatedPrice)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
