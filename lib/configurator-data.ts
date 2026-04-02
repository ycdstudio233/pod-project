import type {
  ChoiceOption,
  ConfiguratorState,
  EnvironmentId,
  FinishId,
  LightingMode,
  PodSize,
  StoryMoment,
  TimelineId,
  WindowStyle,
} from "@/types/configurator";

export const defaultConfiguratorState: ConfiguratorState = {
  size: "M",
  finish: "glacier",
  windowStyle: "panorama",
  lighting: "day",
  environment: "desert",
  siteLocation: "Joshua Tree, California",
  timeline: "year",
  contactName: "",
  contactEmail: "",
};

export const sizeOptions: Array<ChoiceOption<PodSize>> = [
  {
    id: "S",
    label: "S",
    title: "Studio 01",
    description: "A compact retreat for focused work, guest stays, and one-person resets.",
    meta: "240 sq ft · fastest deployment",
    accent: "#8de4d4",
  },
  {
    id: "M",
    label: "M",
    title: "Residence 02",
    description: "The balanced everyday pod with room to live, host, and breathe.",
    meta: "340 sq ft · best seller",
    accent: "#b8f0e6",
    recommended: true,
  },
  {
    id: "L",
    label: "L",
    title: "Suite 03",
    description: "A wider footprint with long views, generous circulation, and slower mornings.",
    meta: "460 sq ft · maximum presence",
    accent: "#d7fff7",
  },
];

export const finishOptions: Array<ChoiceOption<FinishId>> = [
  {
    id: "glacier",
    label: "Glacier",
    title: "Glacier shell",
    description: "Bright matte white with a quiet, gallery-like presence.",
    meta: "Cleanest contrast with landscape",
    accent: "#f3f7fb",
    recommended: true,
  },
  {
    id: "basalt",
    label: "Basalt",
    title: "Basalt shell",
    description: "Graphite matte with a denser, more architectural silhouette.",
    meta: "Most dramatic at dusk",
    accent: "#64748b",
  },
  {
    id: "dune",
    label: "Dune",
    title: "Dune shell",
    description: "Warm stone neutral tuned for sand, sun, and long horizon lines.",
    meta: "Softest in arid light",
    accent: "#cbb7a0",
  },
  {
    id: "sage",
    label: "Sage",
    title: "Sage shell",
    description: "Muted green-grey that settles naturally into tree cover and coastal weather.",
    meta: "Lowest visual footprint",
    accent: "#99b3a3",
  },
];

export const environmentOptions: Array<ChoiceOption<EnvironmentId>> = [
  {
    id: "desert",
    label: "Desert",
    title: "Open desert",
    description: "High contrast light, long shadows, and quiet distance.",
    meta: "Best for solar-forward sites",
    accent: "#f0c58c",
    image: "/images/environments/desert.jpg",
    recommended: true,
  },
  {
    id: "forest",
    label: "Forest",
    title: "Forest edge",
    description: "Layered greens, diffuse daylight, and a softer arrival.",
    meta: "Feels private fast",
    accent: "#88c39d",
    image: "/images/environments/forest.jpg",
  },
  {
    id: "urban",
    label: "Urban",
    title: "Urban infill",
    description: "Precise, calm, and confident inside a sharper city rhythm.",
    meta: "Ideal for backyard placement",
    accent: "#8bb8ff",
    image: "/images/environments/urban.jpg",
  },
];

export const windowOptions: Array<ChoiceOption<WindowStyle>> = [
  {
    id: "panorama",
    label: "Panorama",
    title: "Panorama glass",
    description: "The most open front-facing view, tuned for horizon and light.",
    meta: "Default signature view",
    accent: "#9ad5ff",
    recommended: true,
  },
  {
    id: "corner",
    label: "Corner",
    title: "Wrapped corner",
    description: "A cinematic corner reveal that makes the interior feel longer.",
    meta: "Best for dramatic sites",
    accent: "#7ac2ff",
  },
  {
    id: "split",
    label: "Split",
    title: "Split ribbon",
    description: "A more private window rhythm with strong horizontal geometry.",
    meta: "Best for close neighbors",
    accent: "#b7d9ff",
  },
];

export const lightingModes: Array<ChoiceOption<LightingMode>> = [
  {
    id: "day",
    label: "Day",
    title: "Day mode",
    description: "Bright, clean daylight with softer reflections on the shell.",
    meta: "Best for exterior review",
    accent: "#f7c66b",
    recommended: true,
  },
  {
    id: "night",
    label: "Night",
    title: "Night mode",
    description: "Interior glow on, darker surroundings, and more warmth through the glass.",
    meta: "Best for emotional preview",
    accent: "#8de4d4",
  },
];

export const timelineOptions: Array<ChoiceOption<TimelineId>> = [
  {
    id: "soon",
    label: "Soon",
    title: "Within 3 months",
    description: "You already have a site in mind and want to start real planning.",
    meta: "Fast-track conversations first",
    accent: "#8de4d4",
  },
  {
    id: "year",
    label: "This year",
    title: "Within 12 months",
    description: "You know the direction and want a guided path to delivery.",
    meta: "Most common starting point",
    accent: "#c0f4eb",
    recommended: true,
  },
  {
    id: "exploring",
    label: "Exploring",
    title: "Still shaping it",
    description: "You want clarity on possibilities before committing to a timeline.",
    meta: "We can still map it with you",
    accent: "#d9fbf5",
  },
];

export const storyMoments: StoryMoment[] = [
  {
    id: "own",
    eyebrow: "A place of your own",
    title: "Space that feels resolved before you step inside.",
    copy:
      "The pod is pre-composed to feel calm immediately. No noise, no layout anxiety, no pile of choices asking for permission.",
    image: "/images/stories/sanctuary.jpg",
    cta: "Shape the footprint",
  },
  {
    id: "anywhere",
    eyebrow: "Built for anywhere",
    title: "Designed to arrive cleanly, even in landscapes that usually push back.",
    copy:
      "Every finish is chosen to work with light, weather, and distance. You are not assembling parts. You are choosing the version that belongs on your site.",
    image: "/images/stories/built-for-anywhere.jpg",
    cta: "Choose the shell",
  },
  {
    id: "landscape",
    eyebrow: "Designed to disappear into landscape",
    title: "A quiet object with just enough presence to feel inevitable.",
    copy:
      "Panoramic glass, softened corners, and restrained detailing let the setting stay in charge while the pod does what it needs to do beautifully.",
    image: "/images/stories/disappear-into-landscape.jpg",
    cta: "See your pod together",
  },
];

export const progressLabels = [
  "Preview",
  "Size",
  "Finish",
  "Setting",
  "Price",
  "Project",
] as const;

export const sitePresets = [
  "Backyard in California",
  "Desert plot in the Southwest",
  "Forest site in the Pacific Northwest",
  "Coastal retreat",
];

