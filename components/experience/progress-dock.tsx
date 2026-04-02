"use client";

import { environmentOptions, finishOptions, interiorPackOptions, progressLabels } from "@/lib/configurator-data";
import { formatCurrency } from "@/lib/pricing";
import type { ConfiguratorState } from "@/types/configurator";

interface ProgressDockProps {
  activeIndex: number;
  activeStepLabel: string;
  estimatedPrice: number;
  state: ConfiguratorState;
  onNavigate?: (index: number) => void;
}

export function ProgressDock({ activeIndex, activeStepLabel, estimatedPrice, onNavigate, state }: ProgressDockProps) {
  const finishLabel = finishOptions.find((option) => option.id === state.finish)?.label ?? state.finish;
  const environmentLabel = environmentOptions.find((option) => option.id === state.environment)?.label ?? state.environment;
  const interiorLabel = interiorPackOptions.find((option) => option.id === state.interiorPack)?.label ?? state.interiorPack;

  return (
    <div className="fixed inset-x-0 top-4 z-40 px-4">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-3 rounded-[1.6rem] border border-white/12 bg-black/36 px-4 py-3 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
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

        <div className="flex items-center justify-between gap-4 md:hidden">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-white/38">Editing now</p>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/72">
              {progressLabels[activeIndex]} / {activeStepLabel}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-white/38">Starting at</p>
            <p className="mt-1 text-sm font-medium text-white">{formatCurrency(estimatedPrice)}</p>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <div className="text-right">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/36">Editing now</p>
            <p className="mt-1 text-sm text-white/72">{activeStepLabel}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/36">Your pod</p>
            <p className="mt-1 text-sm text-white/72">
              {state.size} / {finishLabel} / {environmentLabel} / {interiorLabel}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/36">Starting at</p>
            <p className="mt-1 text-base font-medium text-white">{formatCurrency(estimatedPrice)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
