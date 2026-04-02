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
    label: "This looks great",
    message: "Your site sounds ready to go. We'll confirm a few things together, but this is exactly the kind of site that works well.",
    color: "#8de4d4",
  },
  "tight-but-possible": {
    label: "Totally doable — with a little extra care",
    message: "There are a couple of things to sort out, but nothing we haven't seen before. We'll figure it out together.",
    color: "#f7c66b",
  },
  "needs-review": {
    label: "Let's take a closer look together",
    message: "Your site has some tricky bits, but that's okay. A quick call with our team will give you a clear answer.",
    color: "#f09070",
  },
};
