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
      <nav className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/32 px-2 py-1.5 backdrop-blur-xl">
          {progressLabels.map((label, index) => (
            <button
              className={`cursor-pointer rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] transition-all duration-200 ${
                index === activeIndex
                  ? "bg-white/12 text-white"
                  : index < activeIndex
                    ? "text-white/50 hover:bg-white/6 hover:text-white/80"
                    : "text-white/28 hover:bg-white/4 hover:text-white/44"
              }`}
              key={label}
              onClick={() => onNavigate?.(index)}
              type="button"
            >
              {String(index + 1).padStart(2, "0")} {label}
            </button>
          ))}

          <div className="ml-2 border-l border-white/10 pl-3">
            <p className="text-[9px] uppercase tracking-[0.15em] text-[#8de4d4]">From</p>
            <p className="text-[10px] font-medium text-white/60">{formatCurrency(estimatedPrice)}</p>
          </div>
        </div>
      </nav>
    </>
  );
}
