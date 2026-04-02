import type { SiteFitData, SiteFitVerdict } from "@/types/configurator";

export function evaluateSiteFit(data: SiteFitData): SiteFitVerdict {
  const { slope, accessWidth } = data;

  if (slope === "steep" && accessWidth === "tight") return "needs-review";
  if (slope === "steep") return "tight-but-possible";
  if (accessWidth === "tight" && slope === "slight") return "tight-but-possible";
  if (slope === "flat" && accessWidth === "easy") return "promising";

  return "tight-but-possible";
}

export const verdictCopy: Record<SiteFitVerdict, { label: string; message: string; color: string }> = {
  promising: {
    label: "Looks promising",
    message: "Your site sounds ready. We can move quickly once we confirm a few details together.",
    color: "#8de4d4",
  },
  "tight-but-possible": {
    label: "Tight but possible",
    message: "A few things to work through, but nothing unusual. We see sites like this regularly.",
    color: "#f7c66b",
  },
  "needs-review": {
    label: "Needs review",
    message: "Your site has some constraints. A quick conversation will help us map the best path forward.",
    color: "#f09070",
  },
};
