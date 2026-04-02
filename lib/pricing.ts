import type { ConfiguratorState, FinishId, PodSize, WindowStyle } from "@/types/configurator";

const sizeBasePrice: Record<PodSize, number> = {
  S: 98000,
  M: 146000,
  L: 198000,
};

const finishAdjustment: Record<FinishId, number> = {
  glacier: 0,
  basalt: 6000,
  dune: 4000,
  sage: 4500,
};

const windowAdjustment: Record<WindowStyle, number> = {
  panorama: 0,
  corner: 5500,
  split: 3500,
};

export function calculateEstimatedPrice(state: ConfiguratorState) {
  return sizeBasePrice[state.size] + finishAdjustment[state.finish] + windowAdjustment[state.windowStyle];
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

