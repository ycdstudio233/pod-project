import type { ConfiguratorState, FinishId, InteriorPackId, PodSize, PriceLineItem, WindowStyle } from "@/types/configurator";

const sizeBasePrice: Record<PodSize, number> = {
  S: 38000,
  M: 57500,
  L: 79000,
};

const sizeSqFt: Record<PodSize, number> = {
  S: 240,
  M: 340,
  L: 460,
};

const finishAdjustment: Record<FinishId, number> = {
  glacier: 0,
  basalt: 2500,
  dune: 1800,
  sage: 2000,
};

const windowAdjustment: Record<WindowStyle, number> = {
  panorama: 0,
  corner: 2500,
  split: 1500,
};

const interiorPackPrice: Record<InteriorPackId, number> = {
  work: 12000,
  guest: 8500,
  retreat: 9500,
  wellness: 14000,
  storage: 4500,
};

export function calculateEstimatedPrice(state: ConfiguratorState) {
  return (
    sizeBasePrice[state.size] +
    finishAdjustment[state.finish] +
    windowAdjustment[state.windowStyle] +
    interiorPackPrice[state.interiorPack]
  );
}

export function calculatePriceBreakdown(state: ConfiguratorState): PriceLineItem[] {
  const items: PriceLineItem[] = [
    {
      label: `${sizeSqFt[state.size]} sq ft shell + structure`,
      amount: sizeBasePrice[state.size],
      included: true,
      confidence: "fixed",
    },
  ];

  if (finishAdjustment[state.finish] > 0) {
    items.push({
      label: `${state.finish.charAt(0).toUpperCase() + state.finish.slice(1)} finish`,
      amount: finishAdjustment[state.finish],
      included: true,
      confidence: "fixed",
    });
  }

  if (windowAdjustment[state.windowStyle] > 0) {
    items.push({
      label: `${state.windowStyle.charAt(0).toUpperCase() + state.windowStyle.slice(1)} glazing`,
      amount: windowAdjustment[state.windowStyle],
      included: true,
      confidence: "fixed",
    });
  }

  items.push({
    label: `${state.interiorPack.charAt(0).toUpperCase() + state.interiorPack.slice(1)} interior pack`,
    amount: interiorPackPrice[state.interiorPack],
    included: true,
    confidence: "fixed",
  });

  items.push({
    label: "Delivery + crane set",
    amount: 0,
    included: true,
    confidence: "fixed",
  });

  items.push({
    label: "Foundation prep",
    amount: 4500,
    included: false,
    confidence: "site-dependent",
  });

  items.push({
    label: "Utility hookup",
    amount: 3500,
    included: false,
    confidence: "site-dependent",
  });

  items.push({
    label: "Permit + survey",
    amount: 2000,
    included: false,
    confidence: "estimated",
  });

  return items;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
