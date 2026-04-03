"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  defaultConfiguratorState,
  environmentOptions,
  finishOptions,
  sizeOptions,
} from "@/lib/configurator-data";
import { calculateEstimatedPrice, calculatePriceBreakdown } from "@/lib/pricing";
import type { ConfiguratorState, InteriorPackId, SiteFitData } from "@/types/configurator";
import { ContactStage } from "./contact-stage";
import { ExploreStage } from "./explore-stage";
import { GuidedDecisionStage } from "./guided-decision-stage";
import { HeroSection } from "./hero-section";
import { ImmersiveTransition } from "./immersive-transition";
import { InteriorPackStage } from "./interior-pack-stage";
import { ProgressDock } from "./progress-dock";
import { SiteFitStage } from "./site-fit-stage";
import { SummaryStage } from "./summary-stage";

type SectionId =
  | "hero"
  | "explore"
  | "transition"
  | "size"
  | "finish"
  | "environment"
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
  "explore",
  "transition",
  "size",
  "finish",
  "environment",
  "interior-pack",
  "site-fit",
  "summary",
  "contact",
];

const sectionProgressIndex: Record<SectionId, number> = {
  hero: 0,
  explore: 0,
  transition: 0,
  size: 1,
  finish: 2,
  environment: 3,
  "interior-pack": 4,
  "site-fit": 5,
  summary: 6,
  contact: 7,
};

const progressToSection: Record<number, SectionId> = {
  0: "hero",
  1: "size",
  2: "finish",
  3: "environment",
  4: "interior-pack",
  5: "site-fit",
  6: "summary",
  7: "contact",
};

const stepLabels: Record<SectionId, string> = {
  hero: "Recommended pod",
  explore: "Explore features",
  transition: "Guided path",
  size: "Exterior / size",
  finish: "Exterior / finish",
  environment: "Exterior / setting",
  "interior-pack": "Interior / pack",
  "site-fit": "Site fit / check",
  summary: "Review / price",
  contact: "Project / handoff",
};

export function PodExperience() {
  const [state, dispatch] = useReducer(configuratorReducer, defaultConfiguratorState);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [immersiveOpen, setImmersiveOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    hero: null,
    explore: null,
    transition: null,
    size: null,
    finish: null,
    environment: null,
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

  const scrollToSection = useCallback((id: SectionId) => {
    const node = sectionRefs.current[id];

    if (!node) {
      return;
    }

    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const dockOffset = window.innerWidth < 640 ? 92 : 88;
    const nextTop = node.getBoundingClientRect().top + window.scrollY - dockOffset;

    window.scrollTo({
      top: Math.max(nextTop, 0),
      behavior: "smooth",
    });
  }, []);

  const navigateToSection = useCallback(
    (id: SectionId) => {
      setTransitioning(true);
      timers.current.push(
        window.setTimeout(() => {
          scrollToSection(id);
        }, 240),
      );
      timers.current.push(
        window.setTimeout(() => {
          setTransitioning(false);
        }, 760),
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
      if (node) {
        observer.observe(node);
      }
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

  const configLabel = useMemo(() => {
    const finishLabel = finishOptions.find((o) => o.id === state.finish)?.title ?? state.finish;
    const envLabel = environmentOptions.find((o) => o.id === state.environment)?.title ?? state.environment;
    return `${state.size} / ${finishLabel} / ${envLabel}`;
  }, [state.size, state.finish, state.environment]);

  const beginExperience = useCallback(() => {
    scrollToSection("explore");
  }, [scrollToSection]);

  const beginConfiguration = useCallback(() => {
    setImmersiveOpen(true);

    timers.current.push(
      window.setTimeout(() => {
        scrollToSection("transition");
      }, 340),
    );

    timers.current.push(
      window.setTimeout(() => {
        setImmersiveOpen(false);
      }, 960),
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
            transition={{ duration: 0.45 }}
          >
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 m-auto flex h-52 w-52 items-center justify-center rounded-full border border-white/16 bg-white/6 text-center text-[11px] font-medium uppercase tracking-[0.32em] text-white/72 backdrop-blur-2xl"
              initial={{ opacity: 0, scale: 0.82 }}
              transition={{ duration: 0.55 }}
            >
              Getting your pod ready
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
            transition={{ duration: 0.24, ease: "easeInOut" }}
          />
        ) : null}
      </AnimatePresence>

      <ProgressDock
        activeIndex={sectionProgressIndex[activeSection]}
        activeStepLabel={stepLabels[activeSection]}
        configLabel={configLabel}
        estimatedPrice={estimatedPrice}
        onNavigate={(index) => {
          const target = progressToSection[index];
          if (target) {
            navigateToSection(target);
          }
        }}
        state={state}
      />

      <HeroSection onExplore={beginExperience} setRef={setSectionRef("hero")} state={state} />
      <ExploreStage onContinue={beginConfiguration} setRef={setSectionRef("explore")} />
      <ImmersiveTransition onContinue={() => scrollToSection("size")} setRef={setSectionRef("transition")} />

      <GuidedDecisionStage
        copy="We already picked the one most people love. Just confirm or change it."
        guidance="Residence 02 is the sweet spot, not too small and not too big. Most people keep it."
        id="size"
        nextLabel="Looks good"
        onNext={() => navigateToSection("finish")}
        onSelect={(value) => updateState("size", value as ConfiguratorState["size"])}
        options={sizeOptions}
        phase="Exterior"
        selectedId={state.size}
        setRef={setSectionRef("size")}
        state={state}
        stepLabel="1 of 3"
        title="How much space feels right?"
      />

      <GuidedDecisionStage
        copy="This is the fun part. Pick a color that feels like you. They all look great."
        guidance="Glacier is our most popular because it works with every setting. But trust your gut."
        id="finish"
        nextLabel="Love it"
        onNext={() => navigateToSection("environment")}
        onSelect={(value) => updateState("finish", value as ConfiguratorState["finish"])}
        options={finishOptions}
        phase="Exterior"
        selectedId={state.finish}
        setRef={setSectionRef("finish")}
        state={state}
        stepLabel="2 of 3"
        title="Pick your color."
      />

      <GuidedDecisionStage
        copy="Where will your pod actually live? Pick the closest match and we will fine-tune it together later."
        guidance="Don't worry about getting it perfect. This just helps us show you the right setting."
        id="environment"
        nextLabel="Exterior done"
        onNext={() => navigateToSection("interior-pack")}
        onSelect={(value) => {
          updateState("environment", value as ConfiguratorState["environment"]);

          const nextSite =
            value === "urban"
              ? "Backyard in Los Angeles"
              : environmentOptions.find((option) => option.id === value)?.title ?? state.siteLocation;

          updateState("siteLocation", nextSite);
        }}
        options={environmentOptions}
        phase="Exterior"
        selectedId={state.environment}
        setRef={setSectionRef("environment")}
        state={state}
        stepLabel="3 of 3"
        title="Where does it go?"
      />

      <InteriorPackStage
        onNext={() => navigateToSection("site-fit")}
        onSelect={(id) => updateState("interiorPack", id as InteriorPackId)}
        onSizeChange={(size) => updateState("size", size)}
        selectedId={state.interiorPack}
        setRef={setSectionRef("interior-pack")}
        state={state}
      />

      <SiteFitStage
        onNext={() => navigateToSection("summary")}
        onUpdate={updateSiteFit}
        setRef={setSectionRef("site-fit")}
        state={state}
      />

      <SummaryStage
        estimatedPrice={estimatedPrice}
        onStartProject={() => navigateToSection("contact")}
        priceBreakdown={priceBreakdown}
        setRef={setSectionRef("summary")}
        state={state}
      />

      <ContactStage estimatedPrice={estimatedPrice} onFieldChange={updateState} setRef={setSectionRef("contact")} state={state} />
    </main>
  );
}
