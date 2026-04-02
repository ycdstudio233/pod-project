"use client";

import { finishOptions, progressLabels } from "@/lib/configurator-data";
import type { ConfiguratorState } from "@/types/configurator";

interface ProgressDockProps {
  activeIndex: number;
  state: ConfiguratorState;
  onNavigate?: (index: number) => void;
}

export function ProgressDock({ activeIndex, onNavigate, state }: ProgressDockProps) {
  const finishLabel = finishOptions.find((option) => option.id === state.finish)?.label ?? state.finish;

  return (
    <div className="fixed inset-x-0 top-4 z-40 px-4">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 rounded-full border border-white/12 bg-black/28 px-4 py-3 backdrop-blur-xl">
        <div className="hidden min-w-0 md:flex md:flex-1 md:items-center md:gap-2">
          {progressLabels.map((label, index) => (
            <button
              className={`flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-[10px] font-medium uppercase tracking-[0.24em] transition-colors duration-200 ${
                index === activeIndex
                  ? "bg-white/12 text-white"
                  : "text-white/34 hover:bg-white/6 hover:text-white/56"
              }`}
              key={label}
              onClick={() => onNavigate?.(index)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>

        <div className="md:hidden">
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/72">
            {progressLabels[activeIndex]} · {activeIndex + 1}/{progressLabels.length}
          </span>
        </div>

        <div className="hidden text-right md:block">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/40">Current pod</p>
          <p className="mt-1 text-sm text-white/66">
            {state.size} · {finishLabel} · {state.environment}
          </p>
        </div>
      </div>
    </div>
  );
}
