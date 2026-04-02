export type PodSize = "S" | "M" | "L";
export type FinishId = "glacier" | "basalt" | "dune" | "sage";
export type WindowStyle = "panorama" | "corner" | "split";
export type LightingMode = "day" | "night";
export type EnvironmentId = "desert" | "forest" | "urban";
export type TimelineId = "soon" | "year" | "exploring";

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
}

