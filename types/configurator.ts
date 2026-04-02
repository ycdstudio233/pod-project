export type PodSize = "S" | "M" | "L";
export type FinishId = "glacier" | "basalt" | "dune" | "sage";
export type WindowStyle = "panorama" | "corner" | "split";
export type LightingMode = "day" | "night";
export type EnvironmentId = "desert" | "forest" | "urban";
export type TimelineId = "soon" | "year" | "exploring";

export type SlopeCondition = "flat" | "slight" | "steep";
export type AccessWidth = "easy" | "tight";
export type IntendedUse = "home-office" | "guest" | "retreat" | "rental";
export type SiteFitVerdict = "promising" | "needs-review" | "tight-but-possible";
export type InteriorPackId = "work" | "guest" | "retreat" | "wellness" | "storage";

export interface SiteFitData {
  zipOrAddress: string;
  slope: SlopeCondition | null;
  accessWidth: AccessWidth | null;
  intendedUse: IntendedUse | null;
  verdict: SiteFitVerdict | null;
}

export interface ChoiceOption<T extends string> {
  id: T;
  label: string;
  title: string;
  description: string;
  meta: string;
  accent: string;
  recommended?: boolean;
  image?: string;
}

export interface StoryMoment {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  cta: string;
}

export interface PriceLineItem {
  label: string;
  amount: number;
  included: boolean;
  confidence: "fixed" | "estimated" | "site-dependent";
}

export interface ConfiguratorState {
  size: PodSize;
  finish: FinishId;
  windowStyle: WindowStyle;
  lighting: LightingMode;
  environment: EnvironmentId;
  siteLocation: string;
  timeline: TimelineId;
  contactName: string;
  contactEmail: string;
  siteFit: SiteFitData;
  interiorPack: InteriorPackId;
}
