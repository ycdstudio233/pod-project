"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { progressLabels } from "@/lib/configurator-data";
import { formatCurrency } from "@/lib/pricing";

interface ProgressDockProps {
  activeIndex: number;
  activeStepLabel: string;
  estimatedPrice: number;
  state: { size: string; finish: string; environment: string };
  onNavigate?: (index: number) => void;
}

export function ProgressDock({ activeIndex, estimatedPrice, onNavigate }: ProgressDockProps) {
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

      {/* Nav dock */}
      <nav className="fixed inset-x-0 top-3 z-40 flex justify-center px-4">
        <div className="flex items-center rounded-full border border-white/8 bg-black/40 px-1.5 py-1 backdrop-blur-xl">
          {progressLabels.map((label, index) => (
            <button
              className={`cursor-pointer rounded-full px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] transition-all duration-200 ${
                index === activeIndex
                  ? "bg-white/12 text-white"
                  : index < activeIndex
                    ? "text-white/44 hover:bg-white/6 hover:text-white/72"
                    : "text-white/22 hover:bg-white/4 hover:text-white/38"
              }`}
              key={label}
              onClick={() => onNavigate?.(index)}
              type="button"
            >
              {label}
            </button>
          ))}

          <div className="ml-1.5 border-l border-white/8 pl-2.5 pr-1">
            <p className="text-[9px] font-medium text-white/50">{formatCurrency(estimatedPrice)}</p>
          </div>
        </div>
      </nav>
    </>
  );
}
