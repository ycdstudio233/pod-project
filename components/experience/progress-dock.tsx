"use client";

import { motion, useScroll, useSpring } from "framer-motion";

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

export function ProgressDock({ activeIndex, configLabel, onNavigate }: ProgressDockProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Scroll progress line */}
      <div className="fixed inset-x-0 top-0 z-50 h-[2px]">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX,
            background: "linear-gradient(90deg, #8de4d4, #57cbb8)",
          }}
        />
      </div>

      {/* Nav dock — desktop: full labels, mobile: scrollable strip */}
      <nav className="fixed inset-x-0 top-3 z-40 flex justify-center px-2 sm:px-4">
        <div className="flex max-w-full items-center overflow-x-auto rounded-full border border-white/8 bg-black/50 px-1 py-1 backdrop-blur-xl sm:px-1.5 sm:py-1.5 scrollbar-none">
          {STEPS.map((step, index) => (
            <button
              className={`min-h-[36px] shrink-0 cursor-pointer rounded-full px-2 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] transition-all duration-200 sm:min-h-[auto] sm:px-3 sm:text-[10px] sm:tracking-[0.15em] ${
                index === activeIndex
                  ? "bg-white/12 text-white"
                  : index < activeIndex
                    ? "text-white/50 hover:bg-white/6 hover:text-white/80"
                    : "text-white/22 hover:bg-white/4 hover:text-white/38"
              }`}
              key={step.id}
              onClick={() => onNavigate?.(index)}
              type="button"
            >
              {/* Mobile: just number, Desktop: full label */}
              <span className="sm:hidden">{step.label.slice(0, 2)}</span>
              <span className="hidden sm:inline">{step.label}</span>
            </button>
          ))}

          <div className="ml-1.5 shrink-0 border-l border-white/10 pl-2 pr-1 sm:ml-2 sm:pl-3 sm:pr-1.5">
            <p className="hidden text-[9px] font-medium uppercase tracking-[0.15em] text-[#8de4d4] sm:block">Current pod</p>
            <p className="text-[9px] text-white/60 sm:text-[10px]">{configLabel}</p>
          </div>
        </div>
      </nav>
    </>
  );
}
