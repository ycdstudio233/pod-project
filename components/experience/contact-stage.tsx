"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { environmentOptions } from "@/lib/configurator-data";
import { formatCurrency } from "@/lib/pricing";
import type { ConfiguratorState } from "@/types/configurator";

interface ContactStageProps {
  state: ConfiguratorState;
  estimatedPrice: number;
  onFieldChange: <K extends keyof ConfiguratorState>(key: K, value: ConfiguratorState[K]) => void;
  setRef?: (node: HTMLElement | null) => void;
}

const LOCATION_PRESETS = [
  "Backyard in California",
  "Desert plot in the Southwest",
  "Mountain retreat",
  "Urban rooftop",
];

const TIMELINE_OPTIONS = [
  { value: "soon", label: "Soon", meta: "Within 3 months", accent: "#8de4d4" },
  { value: "year", label: "This year", meta: "Within 12 months", accent: "#c0f4eb" },
  { value: "exploring", label: "Exploring", meta: "Flexible timeline", accent: "#d9fbf5" },
];

const FAQ_ITEMS = [
  {
    q: "Do I need a permit?",
    a: "It depends on your location and pod size. We handle the research and filing for you as part of our site check process — at no extra cost.",
  },
  {
    q: "What foundation does it need?",
    a: "Most pods sit on a simple concrete pad or helical piers. We assess your site and recommend the best option. Foundation prep is included.",
  },
  {
    q: "How is it delivered?",
    a: "Your pod arrives fully assembled on a flatbed truck. We coordinate crane placement and connect utilities on-site, typically in 1–2 days.",
  },
  {
    q: "Is financing available?",
    a: "Yes. We partner with lenders offering terms from 5–15 years. Monthly payments can be as low as a few hundred dollars depending on configuration.",
  },
  {
    q: "Can I customize beyond the configurator?",
    a: "Absolutely. The configurator covers the main choices, but our team can accommodate custom requests for layout, materials, and add-ons during the design phase.",
  },
  {
    q: "What about plumbing and electrical?",
    a: "Every pod comes pre-wired and plumbing-ready. During setup, we connect to your existing utilities. All work is done by licensed professionals.",
  },
];

export function ContactStage({ estimatedPrice, onFieldChange, setRef, state }: ContactStageProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const monthlyEstimate = Math.round(estimatedPrice / 120);
  const stepLabels = ["Where will this go?", "Timeline", "Contact info"];

  const canContinue = useMemo(() => {
    if (stepIndex === 0) return state.siteLocation.trim().length > 2;
    if (stepIndex === 1) return true;
    return state.contactName.trim().length > 1 && /\S+@\S+\.\S+/.test(state.contactEmail);
  }, [state.contactEmail, state.contactName, state.siteLocation, stepIndex]);

  const handleNext = () => {
    if (stepIndex < 2) {
      setStepIndex(stepIndex + 1);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden scroll-mt-20 py-10 lg:py-12"
      id="contact"
      ref={setRef}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%,rgba(141,228,212,0.08)_72%,rgba(0,0,0,0.26)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-4 sm:px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(340px,0.82fr)]">
          {/* Left — Form */}
          <div className="flex flex-col">
            {!submitted ? (
              <>
                {/* Step indicators */}
                <div className="mb-8 flex flex-wrap gap-2">
                  {stepLabels.map((label, i) => (
                    <span
                      className={`rounded-full border px-3 py-1.5 text-[11px] tracking-wider transition-all ${
                        i === stepIndex
                          ? "border-white/18 bg-white/10 text-white"
                          : "border-white/8 bg-white/[0.03] text-white/40"
                      }`}
                      key={label}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {stepIndex === 0 && (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      initial={{ opacity: 0, y: 16 }}
                      key="step-0"
                      transition={{ duration: 0.4 }}
                    >
                      <h2 className="mb-2 text-[clamp(1.6rem,4vw,3rem)] font-medium leading-[1.05] tracking-tight text-white">
                        Where will your pod go?
                      </h2>
                      <p className="mb-6 text-sm text-white/50">
                        A general area is fine — we&apos;ll figure out the details together.
                      </p>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {LOCATION_PRESETS.map((preset) => (
                          <button
                            className={`cursor-pointer rounded-full border px-4 py-2 text-xs transition-all ${
                              state.siteLocation === preset
                                ? "border-white/20 bg-white/10 text-white"
                                : "border-white/8 bg-white/[0.03] text-white/50 hover:border-white/15 hover:text-white/70"
                            }`}
                            key={preset}
                            onClick={() => onFieldChange("siteLocation", preset)}
                            type="button"
                          >
                            {preset}
                          </button>
                        ))}
                      </div>

                      <input
                        className="w-full rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/25 focus:outline-none"
                        onChange={(e) => onFieldChange("siteLocation", e.target.value)}
                        placeholder="Or type your location..."
                        type="text"
                        value={state.siteLocation}
                      />
                    </motion.div>
                  )}

                  {stepIndex === 1 && (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      initial={{ opacity: 0, y: 16 }}
                      key="step-1"
                      transition={{ duration: 0.4 }}
                    >
                      <h2 className="mb-2 text-[clamp(1.6rem,4vw,3rem)] font-medium leading-[1.05] tracking-tight text-white">
                        When are you thinking?
                      </h2>
                      <p className="mb-6 text-sm text-white/50">
                        No commitment — just helps us plan.
                      </p>

                      <div className="grid gap-3 md:grid-cols-3">
                        {TIMELINE_OPTIONS.map((opt) => (
                          <button
                            className={`relative cursor-pointer rounded-[1.75rem] border p-5 text-left transition-all ${
                              state.timeline === opt.value
                                ? "border-white/24 bg-white/11"
                                : "border-white/8 bg-white/[0.03] hover:border-white/16"
                            }`}
                            key={opt.value}
                            onClick={() => onFieldChange("timeline", opt.value as ConfiguratorState["timeline"])}
                            type="button"
                          >
                            {state.timeline === opt.value && (
                              <div
                                className="absolute inset-x-4 top-0 h-[2px] rounded-full"
                                style={{ background: `linear-gradient(90deg, ${opt.accent}, transparent)` }}
                              />
                            )}
                            <span className="text-base font-medium text-white">{opt.label}</span>
                            <span className="mt-1 block text-[11px] text-white/40">{opt.meta}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {stepIndex === 2 && (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      initial={{ opacity: 0, y: 16 }}
                      key="step-2"
                      transition={{ duration: 0.4 }}
                    >
                      <h2 className="mb-2 text-[clamp(1.6rem,4vw,3rem)] font-medium leading-[1.05] tracking-tight text-white">
                        How can we reach you?
                      </h2>
                      <p className="mb-6 text-sm text-white/50">
                        We&apos;ll guide you through everything from here.
                      </p>

                      <div className="grid gap-4 md:grid-cols-2">
                        <input
                          className="w-full rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/25 focus:outline-none"
                          onChange={(e) => onFieldChange("contactName", e.target.value)}
                          placeholder="How should we address you?"
                          type="text"
                          value={state.contactName}
                        />
                        <input
                          className="w-full rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/25 focus:outline-none"
                          onChange={(e) => onFieldChange("contactEmail", e.target.value)}
                          placeholder="you@example.com"
                          type="email"
                          value={state.contactEmail}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-8 flex items-center gap-3">
                  {stepIndex > 0 && (
                    <GlowButton onClick={() => setStepIndex((v) => v - 1)} variant="ghost">
                      Back
                    </GlowButton>
                  )}
                  <GlowButton disabled={!canContinue} onClick={handleNext}>
                    {stepIndex === 2 ? "Start your project" : "Continue"}
                  </GlowButton>
                </div>
              </>
            ) : (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="surface-panel max-w-2xl rounded-[1.8rem] p-8"
                initial={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#8de4d4]/10">
                  <svg fill="none" height="24" stroke="#8de4d4" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-medium text-white">You&apos;re in</h3>
                <p className="text-sm leading-relaxed text-white/60">
                  We&apos;ll be in touch within 24 hours with a personalized plan. From site check to delivery — we guide everything.
                </p>
              </motion.div>
            )}
          </div>

          {/* Right — Sidebar */}
          <div className="flex h-fit flex-col gap-4 lg:sticky lg:top-20">
            {/* Price card */}
            <motion.aside
              className="surface-panel-strong rounded-2xl p-5 sm:rounded-[2rem] sm:p-6"
              initial={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Your pod</p>
              <h3 className="text-3xl font-medium text-white">{formatCurrency(estimatedPrice)}</h3>
              <p className="mt-1 text-xs text-white/40">~{formatCurrency(monthlyEstimate)}/mo with financing</p>
              <p className="mt-3 text-sm text-white/50">
                {environmentOptions.find((o) => o.id === state.environment)?.title}
                {state.siteLocation ? ` · ${state.siteLocation}` : ""}
              </p>

              <div className="mt-6">
                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4">
                  <p className="mb-2 text-[11px] uppercase tracking-wider text-white/40">What happens next</p>
                  <div className="space-y-2">
                    {["Free 15-min intro call", "Site feasibility check", "Locked pricing & timeline"].map((step, i) => (
                      <div className="flex items-center gap-2" key={step}>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/8 bg-white/[0.06] text-[9px] text-[#8de4d4]">
                          {i + 1}
                        </span>
                        <span className="text-[13px] text-white/60">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* FAQ accordion */}
            <motion.div
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:rounded-[2rem]"
              initial={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <p className="px-6 pb-3 pt-5 text-[11px] uppercase tracking-[0.2em] text-white/40">
                Common questions
              </p>
              {FAQ_ITEMS.map((faq, i) => (
                <div className="border-t border-white/[0.06]" key={faq.q}>
                  <button
                    className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left transition-colors hover:bg-white/[0.03]"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    type="button"
                  >
                    <span className="pr-4 text-[13px] text-white/70">{faq.q}</span>
                    <motion.svg
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      className="shrink-0"
                      fill="none"
                      height="14"
                      stroke="rgba(255,255,255,0.3)"
                      strokeLinecap="round"
                      strokeWidth="2"
                      transition={{ duration: 0.25 }}
                      viewBox="0 0 24 24"
                      width="14"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        animate={{ height: "auto", opacity: 1 }}
                        className="overflow-hidden"
                        exit={{ height: 0, opacity: 0 }}
                        initial={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="px-6 pb-4 text-[12px] leading-relaxed text-white/45">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
