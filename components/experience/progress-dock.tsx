"use client";

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
  return (
    <div className="fixed inset-x-0 top-4 z-40 px-4">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between rounded-full border border-white/10 bg-black/32 px-3 py-2 backdrop-blur-xl">
        {/* Step pills */}
        <div className="flex items-center gap-1">
          {progressLabels.map((label, index) => (
            <button
              className={`cursor-pointer rounded-full px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-200 ${
                index === activeIndex
                  ? "bg-white/12 text-white"
                  : index < activeIndex
                    ? "text-white/50 hover:bg-white/6 hover:text-white/70"
                    : "text-white/28 hover:bg-white/4 hover:text-white/44"
              }`}
              key={label}
              onClick={() => onNavigate?.(index)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Price badge */}
        <div className="hidden items-center gap-2 md:flex">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/36">From</span>
          <span className="text-sm font-medium text-white/80">{formatCurrency(estimatedPrice)}</span>
        </div>
      </div>
    </div>
  );
}
