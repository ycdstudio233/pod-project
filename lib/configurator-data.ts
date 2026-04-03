import type {
  ChoiceOption,
  ConfiguratorState,
  EnvironmentId,
  ExploreFeature,
  FinishId,
  InteriorPackId,
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
  siteFit: {
    zipOrAddress: "",
    slope: null,
    accessWidth: null,
    intendedUse: null,
    verdict: null,
  },
  interiorPack: "retreat",
};

export const sizeOptions: Array<ChoiceOption<PodSize>> = [
  {
    id: "S",
    label: "S",
    title: "Studio 01",
    description: "Perfect for a home office, guest room, or a quiet space just for you.",
    meta: "240 sq ft / ready fastest",
    accent: "#8de4d4",
    iconId: "size-s",
  },
  {
    id: "M",
    label: "M",
    title: "Residence 02",
    description: "Room to live, host, and breathe. This is the one most people love.",
    meta: "340 sq ft / most popular",
    accent: "#b8f0e6",
    recommended: true,
    iconId: "size-m",
  },
  {
    id: "L",
    label: "L",
    title: "Suite 03",
    description: "Long views, generous space, and mornings that feel like vacation.",
    meta: "460 sq ft / the full experience",
    accent: "#d7fff7",
    iconId: "size-l",
  },
];

export const finishOptions: Array<ChoiceOption<FinishId>> = [
  {
    id: "glacier",
    label: "Glacier",
    title: "Glacier",
    description: "Clean white that looks beautiful against any landscape. This one works everywhere.",
    meta: "Works with everything / most chosen",
    accent: "#f3f7fb",
    recommended: true,
  },
  {
    id: "basalt",
    label: "Basalt",
    title: "Basalt",
    description: "Dark and grounded. Looks incredible at dusk when the light catches the edges.",
    meta: "Dramatic presence",
    accent: "#64748b",
  },
  {
    id: "dune",
    label: "Dune",
    title: "Dune",
    description: "Warm and soft. Disappears naturally into sandy, sun-filled settings.",
    meta: "Feels warmest",
    accent: "#cbb7a0",
  },
  {
    id: "sage",
    label: "Sage",
    title: "Sage",
    description: "Quiet green-grey that settles right in among trees and coastal air.",
    meta: "Blends in beautifully",
    accent: "#99b3a3",
  },
];

export const environmentOptions: Array<ChoiceOption<EnvironmentId>> = [
  {
    id: "desert",
    label: "Desert",
    title: "Open desert",
    description: "Big sky, warm light, and nothing but space around you.",
    meta: "Great for solar",
    accent: "#f0c58c",
    image: "/setting-opendesert.png",
    recommended: true,
  },
  {
    id: "forest",
    label: "Forest",
    title: "Forest edge",
    description: "Tucked into the trees with soft, filtered light all day.",
    meta: "Feels private right away",
    accent: "#88c39d",
    image: "/setting-forestedge.png",
  },
  {
    id: "urban",
    label: "Backyard",
    title: "Backyard",
    description: "Your own backyard. The pod fits right in and adds a whole new room to your life.",
    meta: "Perfect for ADU",
    accent: "#8bb8ff",
    image: "/setting-backyard.png",
  },
];

export const windowOptions: Array<ChoiceOption<WindowStyle>> = [
  {
    id: "panorama",
    label: "Panorama",
    title: "Panorama glass",
    description: "Wide open views. This is the signature look.",
    meta: "Comes standard",
    accent: "#9ad5ff",
    recommended: true,
  },
  {
    id: "corner",
    label: "Corner",
    title: "Wrapped corner",
    description: "The view wraps around the corner. Feels cinematic inside.",
    meta: "For dramatic sites",
    accent: "#7ac2ff",
  },
  {
    id: "split",
    label: "Split",
    title: "Split ribbon",
    description: "More private, with a strong horizontal line. Nice for closer neighbors.",
    meta: "More privacy",
    accent: "#b7d9ff",
  },
];

export const lightingModes: Array<ChoiceOption<LightingMode>> = [
  {
    id: "day",
    label: "Day",
    title: "Day mode",
    description: "See it in natural daylight, how it will look most of the time.",
    meta: "Best for reviewing the exterior",
    accent: "#f7c66b",
    recommended: true,
  },
  {
    id: "night",
    label: "Night",
    title: "Night mode",
    description: "The interior glows. This is the feeling you come home to.",
    meta: "The cozy preview",
    accent: "#8de4d4",
  },
];

export const interiorPackOptions: Array<ChoiceOption<InteriorPackId>> = [
  {
    id: "retreat",
    label: "Retreat",
    title: "Retreat",
    description: "Bedroom, compact kitchen, and a calm place to unwind. This is what most people pick.",
    meta: "Most popular",
    accent: "#8de4d4",
    recommended: true,
  },
  {
    id: "work",
    label: "Work",
    title: "Work",
    description: "Standing desk, quiet acoustics, deep focus. Your commute is 12 steps.",
    meta: "Home office dream",
    accent: "#b8f0e6",
  },
  {
    id: "guest",
    label: "Guest",
    title: "Guest",
    description: "A real guest suite, sleeping area, wet room, and a warm welcome built in.",
    meta: "Ready for overnight stays",
    accent: "#d7fff7",
  },
  {
    id: "wellness",
    label: "Wellness",
    title: "Wellness",
    description: "Sauna-ready, open floor, natural light. A space that takes care of you.",
    meta: "Premium fit-out",
    accent: "#f0c58c",
  },
  {
    id: "storage",
    label: "Storage",
    title: "Storage",
    description: "Clean utility shell. Shelving, climate control, and room to work on projects.",
    meta: "Simplest setup",
    accent: "#c0f4eb",
  },
];

export const timelineOptions: Array<ChoiceOption<TimelineId>> = [
  {
    id: "soon",
    label: "Soon",
    title: "Within 3 months",
    description: "You have a site in mind and you're ready to get going.",
    meta: "We'll move quickly together",
    accent: "#8de4d4",
  },
  {
    id: "year",
    label: "This year",
    title: "Within 12 months",
    description: "You know the direction. We'll map out a clear path to delivery.",
    meta: "This is where most people start",
    accent: "#c0f4eb",
    recommended: true,
  },
  {
    id: "exploring",
    label: "Exploring",
    title: "Still figuring it out",
    description: "No pressure. We'll help you understand what's possible first.",
    meta: "Totally fine, we'll guide you",
    accent: "#d9fbf5",
  },
];

export const storyMoments: StoryMoment[] = [
  {
    id: "own",
    eyebrow: "A place of your own",
    title: "It feels right the moment you step inside.",
    copy:
      "Everything is already thought through, the layout, the light, the quiet. You're not figuring anything out. You're just arriving.",
    image: "/pod-desert-night.png",
    cta: "Continue",
  },
  {
    id: "anywhere",
    eyebrow: "Built for anywhere",
    title: "Looks like it was always meant to be there.",
    copy:
      "Every finish is already tuned for real weather and real light. You're not picking parts, you're picking the version that fits your place.",
    image: "/pod-desert-sunset.png",
    cta: "Continue",
  },
  {
    id: "landscape",
    eyebrow: "Designed to belong",
    title: "Quiet enough to let the view do the talking.",
    copy:
      "Wide glass, soft corners, and just enough presence. The pod does its job beautifully, and stays out of the way.",
    image: "/pod-desert-day.jpg",
    cta: "Continue",
  },
];

export const progressLabels = [
  "Preview",
  "Exterior",
  "Interior",
  "Site check",
  "Review",
  "Project",
] as const;

export const sitePresets = [
  "Backyard in California",
  "Desert in the Southwest",
  "Forest in the Pacific Northwest",
  "Coastal retreat",
];

export const proofChips = [
  "Foundation included",
  "Climate controlled",
  "Permit-friendly size",
  "Guided site review included",
];

export const processPhases = [
  "Configure",
  "Site check",
  "Permits",
  "Build",
  "Install",
  "Move in",
] as const;

export const exploreFeatures: ExploreFeature[] = [
  {
    id: "build-quality",
    title: "Built to last",
    tagline: "Precision-engineered structure",
    image: "/pod-desert-day.jpg",
    detail: {
      headline: "Built to last",
      description:
        "Every pod starts as a precision-engineered steel frame, insulated and sealed in a climate-controlled factory. No weather delays, no site surprises. The result is a structure designed to perform for decades, not just survive them.",
      highlights: [
        { label: "Frame", value: "Galvanized steel" },
        { label: "Insulation", value: "R-30 continuous" },
        { label: "Design life", value: "50+ years" },
        { label: "QC checks", value: "147 per unit" },
      ],
      gallery: ["/pod-desert-day.jpg", "/pod-desert-sunset.png"],
    },
  },
  {
    id: "climate-control",
    title: "Climate control",
    tagline: "Comfortable in every season",
    image: "/story-anywhere-interior.webp",
    detail: {
      headline: "Climate control",
      description:
        "A whisper-quiet mini-split system keeps every corner comfortable year-round. Triple-pane glazing and continuous insulation mean the pod stays cool in summer and warm in winter without working hard.",
      highlights: [
        { label: "HVAC", value: "Mini-split, whisper-quiet" },
        { label: "Glazing", value: "Triple-pane, Low-E" },
        { label: "Insulation", value: "R-30 walls & roof" },
        { label: "Noise floor", value: "< 28 dB inside" },
      ],
      gallery: ["/story-anywhere-interior.webp"],
    },
  },
  {
    id: "natural-light",
    title: "Natural light",
    tagline: "Designed around daylight",
    image: "/pod-desert-sunset.png",
    detail: {
      headline: "Natural light",
      description:
        "Generous glazing wraps the pod in daylight without overheating. Solar-tuned orientation, UV filtering, and optional blackout layers give you full control of the atmosphere inside.",
      highlights: [
        { label: "Glass area", value: "Up to 40% of facade" },
        { label: "UV filtering", value: "99% blocked" },
        { label: "Orientation", value: "Solar-tuned" },
        { label: "Blackout", value: "Optional integrated" },
      ],
      gallery: ["/pod-desert-sunset.png", "/pod-desert-day.jpg"],
    },
  },
  {
    id: "smart-home",
    title: "Smart home",
    tagline: "Connected, not complicated",
    image: "/story-landscape-interior-1.webp",
    detail: {
      headline: "Smart home",
      description:
        "Everything connects through a single app. Smart lock, lighting scenes, climate scheduling, and energy monitoring are built in from day one. No hubs, no complexity, just a space that responds to you.",
      highlights: [
        { label: "Access", value: "Smart lock + app" },
        { label: "Lighting", value: "Tunable scenes" },
        { label: "Climate", value: "Scheduled + remote" },
        { label: "Energy", value: "Real-time monitoring" },
      ],
      gallery: ["/story-landscape-interior-1.webp"],
    },
  },
  {
    id: "privacy",
    title: "Privacy",
    tagline: "Your space, your rules",
    image: "/pod-desert-night.png",
    detail: {
      headline: "Privacy",
      description:
        "Strategic window placement, acoustic insulation, and optional electrochromic glass mean you decide exactly how open or private your pod feels. Even in a backyard, it is entirely your own.",
      highlights: [
        { label: "Acoustics", value: "STC 45+ rated" },
        { label: "Smart glass", value: "Electrochromic option" },
        { label: "Placement", value: "Strategic glazing" },
        { label: "Screening", value: "Landscape integration" },
      ],
      gallery: ["/pod-desert-night.png"],
    },
  },
  {
    id: "foundation",
    title: "Foundation included",
    tagline: "Ready from the ground up",
    image: "/pod-desert-day.jpg",
    detail: {
      headline: "Foundation included",
      description:
        "Every pod comes with an engineered foundation system designed for your specific site. Helical piers, concrete pads, or deck-over solutions — we match the method to your terrain and handle the engineering.",
      highlights: [
        { label: "Engineering", value: "Site-specific design" },
        { label: "Options", value: "Piers, pads, or deck" },
        { label: "Permits", value: "Docs included" },
        { label: "Timeline", value: "1-2 day install" },
      ],
      gallery: ["/pod-desert-day.jpg"],
    },
  },
  {
    id: "delivery",
    title: "Turnkey delivery",
    tagline: "Move in, not build out",
    image: "/pod-desert-sunset.png",
    detail: {
      headline: "Turnkey delivery",
      description:
        "Your pod is factory-built, delivered on a single truck, and crane-placed onto its foundation. Utility hookups are coordinated in advance. Most installations are complete in under a week.",
      highlights: [
        { label: "Build", value: "Factory-controlled" },
        { label: "Delivery", value: "Single truck + crane" },
        { label: "Install", value: "3-5 days typical" },
        { label: "Utilities", value: "Pre-coordinated" },
      ],
      gallery: ["/pod-desert-sunset.png"],
    },
  },
];
