"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  defaultConfiguratorState,
  environmentOptions,
  finishOptions,
  sizeOptions,
  storyMoments,
} from "@/lib/configurator-data";
import { calculateEstimatedPrice, calculatePriceBreakdown } from "@/lib/pricing";
import type { ConfiguratorState, InteriorPackId, SiteFitData } from "@/types/configurator";
import { ContactStage } from "./contact-stage";
import { GuidedDecisionStage } from "./guided-decision-stage";
import { HeroSection } from "./hero-section";
import { ImmersiveTransition } from "./immersive-transition";
import { InteriorPackStage } from "./interior-pack-stage";
import { ProgressDock } from "./progress-dock";
import { SiteFitStage } from "./site-fit-stage";
import { StoryPanel } from "./story-panel";
import { SummaryStage } from "./summary-stage";

type SectionId =
  | "hero"
  | "transition"
  | "size"
  | "story-own"
  | "finish"
  | "story-anywhere"
  | "environment"
  | "story-landscape"
  | "interior-pack"
  | "site-fit"
  | "summary"
  | "contact";

type Action =
  | { type: "update"; key: keyof ConfiguratorState; value: ConfiguratorState[keyof ConfiguratorState] }
  | { type: "update-site-fit"; data: Partial<SiteFitData> };

function configuratorReducer(state: ConfiguratorState, action: Action): ConfiguratorState {
  if (action.type === "update") {
    return { ...state, [action.key]: action.value };
  }
  if (action.type === "update-site-fit") {
    return { ...state, siteFit: { ...state.siteFit, ...action.data } };
  }
  return state;
}

const sectionOrder: SectionId[] = [
  "hero",
  "transition",
  "size",
  "story-own",
  "finish",
  "story-anywhere",
  "environment",
  "story-landscape",
  "interior-pack",
  "site-fit",
  "summary",
  "contact",
];

const sectionProgressIndex: Record<SectionId, number> = {
  hero: 0,
  transition: 0,
  size: 1,
  "story-own": 1,
  finish: 2,
  "story-anywhere": 2,
  environment: 3,
  "story-landscape": 3,
  "interior-pack": 4,
  "site-fit": 5,
  summary: 6,
  contact: 7,
};

export function PodExperience() {
  const [state, dispatch] = useReducer(configuratorReducer, defaultConfiguratorState);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [immersiveOpen, setImmersiveOpen] = useState(false);
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    hero: null,
    transition: null,
    size: null,
    "story-own": null,
    finish: null,
    "story-anywhere": null,
    environment: null,
    "story-landscape": null,
    "interior-pack": null,
    "site-fit": null,
    summary: null,
    contact: null,
  });
  const timers = useRef<number[]>([]);

  const updateState = useCallback(<K extends keyof ConfiguratorState>(key: K, value: ConfiguratorState[K]) => {
    dispatch({ type: "update", key, value });
  }, []);

  const updateSiteFit = useCallback((data: Partial<SiteFitData>) => {
    dispatch({ type: "update-site-fit", data });
  }, []);

  const setSectionRef = useCallback(
    (id: SectionId) => (node: HTMLElement | null) => {
      sectionRefs.current[id] = node;
    },
    [],
  );

  const [transitioning, setTransitioning] = useState(false);

  const scrollToSection = useCallback((id: SectionId) => {
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const navigateToSection = useCallback(
    (id: SectionId) => {
      setTransitioning(true);
      timers.current.push(
        window.setTimeout(() => {
          scrollToSection(id);
        }, 280),
      );
      timers.current.push(
        window.setTimeout(() => {
          setTransitioning(false);
        }, 900),
      );
    },
    [scrollToSection],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id as SectionId);
        }
      },
      {
        threshold: [0.24, 0.42, 0.68],
        rootMargin: "-15% 0px -15% 0px",
      },
    );

    sectionOrder.forEach((section) => {
      const node = sectionRefs.current[section];
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const estimatedPrice = useMemo(() => calculateEstimatedPrice(state), [state]);
  const priceBreakdown = useMemo(() => calculatePriceBreakdown(state), [state]);

  const beginExperience = useCallback(() => {
    setImmersiveOpen(true);

    timers.current.push(
      window.setTimeout(() => {
        scrollToSection("transition");
      }, 380),
    );

    timers.current.push(
      window.setTimeout(() => {
        setImmersiveOpen(false);
      }, 1100),
    );
  }, [scrollToSection]);

  return (
    <main className="relative overflow-x-clip">
      <AnimatePresence>
        {immersiveOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="pointer-events-none fixed inset-0 z-50 bg-[radial-gradient(circle_at_center,rgba(141,228,212,0.32),rgba(8,10,13,0.88)_42%,rgba(4,5,7,1)_100%)]"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 m-auto flex h-52 w-52 items-center justify-center rounded-full border border-white/16 bg-white/6 text-center text-[11px] font-medium uppercase tracking-[0.32em] text-white/72 backdrop-blur-2xl"
              initial={{ opacity: 0, scale: 0.78 }}
              transition={{ duration: 0.6 }}
            >
              Entering your pod
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {transitioning ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="pointer-events-none fixed inset-0 z-40 bg-black/40"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
          />
        ) : null}
      </AnimatePresence>

      <ProgressDock activeIndex={sectionProgressIndex[activeSection]} state={state} />

      <HeroSection onExplore={beginExperience} setRef={setSectionRef("hero")} state={state} />
      <ImmersiveTransition onContinue={() => scrollToSection("size")} setRef={setSectionRef("transition")} />

      <GuidedDecisionStage
        copy="The right footprint changes how the pod feels before anything else does."
        id="size"
        nextLabel="Next"
        onNext={() => navigateToSection("story-own")}
        onSelect={(value) => updateState("size", value as ConfiguratorState["size"])}
        options={sizeOptions}
        selectedId={state.size}
        setRef={setSectionRef("size")}
        state={state}
        title="Pick your size."
      />

      <StoryPanel
        copy={storyMoments[0].copy}
        cta={storyMoments[0].cta}
        eyebrow={storyMoments[0].eyebrow}
        id="story-own"
        image={storyMoments[0].image}
        onContinue={() => navigateToSection("finish")}
        setRef={setSectionRef("story-own")}
        title={storyMoments[0].title}
      />

      <GuidedDecisionStage
        copy="Every finish works with light, weather, and distance. Pick the tone."
        id="finish"
        nextLabel="Next"
        onNext={() => navigateToSection("story-anywhere")}
        onSelect={(value) => updateState("finish", value as ConfiguratorState["finish"])}
        options={finishOptions}
        selectedId={state.finish}
        setRef={setSectionRef("finish")}
        state={state}
        title="Choose the shell."
      />

      <StoryPanel
        copy={storyMoments[1].copy}
        cta={storyMoments[1].cta}
        eyebrow={storyMoments[1].eyebrow}
        id="story-anywhere"
        image={storyMoments[1].image}
        onContinue={() => navigateToSection("environment")}
        setRef={setSectionRef("story-anywhere")}
        title={storyMoments[1].title}
      />

      <GuidedDecisionStage
        copy="Where does your pod live? The setting shapes everything around it."
        id="environment"
        nextLabel="Next"
        onNext={() => navigateToSection("story-landscape")}
        onSelect={(value) => {
          updateState("environment", value as ConfiguratorState["environment"]);

          const nextSite =
            value === "urban"
              ? "Backyard in Los Angeles"
              : environmentOptions.find((option) => option.id === value)?.title ?? state.siteLocation;

          updateState("siteLocation", nextSite);
        }}
        options={environmentOptions}
        selectedId={state.environment}
        setRef={setSectionRef("environment")}
        state={state}
        title="Place it somewhere real."
      />

      <StoryPanel
        copy={storyMoments[2].copy}
        cta={storyMoments[2].cta}
        eyebrow={storyMoments[2].eyebrow}
        id="story-landscape"
        image={storyMoments[2].image}
        onContinue={() => navigateToSection("interior-pack")}
        setRef={setSectionRef("story-landscape")}
        title={storyMoments[2].title}
      />

      <InteriorPackStage
        onNext={() => navigateToSection("site-fit")}
        onSelect={(id) => updateState("interiorPack", id as InteriorPackId)}
        selectedId={state.interiorPack}
        setRef={setSectionRef("interior-pack")}
      />

      <SiteFitStage
        onNext={() => navigateToSection("summary")}
        onUpdate={updateSiteFit}
        setRef={setSectionRef("site-fit")}
        state={state}
      />

      <SummaryStage
        estimatedPrice={estimatedPrice}
        onLightingChange={(value) => updateState("lighting", value)}
        onStartProject={() => navigateToSection("contact")}
        onWindowChange={(value) => updateState("windowStyle", value)}
        priceBreakdown={priceBreakdown}
        setRef={setSectionRef("summary")}
        state={state}
      />

      <ContactStage
        estimatedPrice={estimatedPrice}
        onFieldChange={updateState}
        setRef={setSectionRef("contact")}
        state={state}
      />
    </main>
  );
}
