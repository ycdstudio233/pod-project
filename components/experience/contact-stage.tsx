"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { OptionCard } from "@/components/ui/option-card";
import { environmentOptions, sitePresets, timelineOptions } from "@/lib/configurator-data";
import { formatCurrency } from "@/lib/pricing";
import type { ConfiguratorState, TimelineId } from "@/types/configurator";

interface ContactStageProps {
  state: ConfiguratorState;
  estimatedPrice: number;
  onFieldChange: <K extends keyof ConfiguratorState>(key: K, value: ConfiguratorState[K]) => void;
  setRef?: (node: HTMLElement | null) => void;
}

export function ContactStage({ estimatedPrice, onFieldChange, setRef, state }: ContactStageProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const canContinue = useMemo(() => {
    if (stepIndex === 0) {
      return state.siteLocation.trim().length > 2;
    }

    if (stepIndex === 1) {
      return true;
    }

    return state.contactName.trim().length > 1 && /\S+@\S+\.\S+/.test(state.contactEmail);
  }, [state.contactEmail, state.contactName, state.siteLocation, stepIndex]);

  return (
    <section className="relative min-h-screen overflow-hidden px-5 py-10 scroll-mt-24 lg:px-10 lg:py-12" id="contact" ref={setRef}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%,rgba(141,228,212,0.08)_72%,rgba(0,0,0,0.26)_100%)]" />
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1480px] gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(340px,0.82fr)]">
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, amount: 0.24 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/58">
              Project
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/34">last step</span>
          </div>
          <h2 className="max-w-3xl text-[clamp(2.6rem,5vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.04em] text-balance text-white">
            You&apos;re almost done. We&apos;ll handle the rest.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/66">
            Just tell us where and when — we&apos;ll come back with a clear plan, not a pile of homework.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Where is it going?", "When are you thinking?", "How do we reach you?"].map((label, index) => (
              <span
                className={`rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] ${
                  index === stepIndex
                    ? "border-white/18 bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/38"
                }`}
                key={label}
              >
                {label}
              </span>
            ))}
          </div>

          {!submitted && stepIndex === 0 ? (
            <div className="mt-8 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {sitePresets.map((site) => (
                  <button
                    className={`rounded-[1.4rem] border px-4 py-4 text-left text-sm transition ${
                      state.siteLocation === site
                        ? "border-white/20 bg-white/[0.08] text-white"
                        : "border-white/10 bg-white/[0.03] text-white/62 hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                    key={site}
                    onClick={() => onFieldChange("siteLocation", site)}
                    type="button"
                  >
                    {site}
                  </button>
                ))}
              </div>

              <label className="surface-panel mt-2 rounded-[1.6rem] p-5">
                <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/44">Or type your location</span>
                <input
                  className="mt-4 w-full bg-transparent text-lg text-white placeholder:text-white/28 focus:outline-none"
                  onChange={(event) => onFieldChange("siteLocation", event.target.value)}
                  placeholder="City, neighborhood, or address"
                  value={state.siteLocation}
                />
              </label>
            </div>
          ) : null}

          {!submitted && stepIndex === 1 ? (
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {timelineOptions.map((option) => (
                <OptionCard
                  accent={option.accent}
                  className="min-h-[208px]"
                  description={option.description}
                  key={option.id}
                  label={option.label}
                  meta={option.meta}
                  onClick={() => onFieldChange("timeline", option.id as TimelineId)}
                  recommended={option.recommended}
                  selected={state.timeline === option.id}
                  title={option.title}
                />
              ))}
            </div>
          ) : null}

          {!submitted && stepIndex === 2 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <label className="surface-panel rounded-[1.6rem] p-5">
                <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/44">Your name</span>
                <input
                  className="mt-4 w-full bg-transparent text-lg text-white placeholder:text-white/28 focus:outline-none"
                  onChange={(event) => onFieldChange("contactName", event.target.value)}
                  placeholder="First name is fine"
                  value={state.contactName}
                />
              </label>
              <label className="surface-panel rounded-[1.6rem] p-5">
                <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/44">Email</span>
                <input
                  className="mt-4 w-full bg-transparent text-lg text-white placeholder:text-white/28 focus:outline-none"
                  onChange={(event) => onFieldChange("contactEmail", event.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  value={state.contactEmail}
                />
              </label>
            </div>
          ) : null}

          {submitted ? (
            <div className="surface-panel mt-8 max-w-2xl rounded-[1.8rem] p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8de4d4]">You&apos;re all set</p>
              <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white">We&apos;ve got everything we need.</h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/64">
                We&apos;ll review your site, map out the permit path, and come back with a clear timeline. You&apos;ll hear from us soon — no guesswork.
              </p>
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              {stepIndex > 0 ? (
                <GlowButton onClick={() => setStepIndex((value) => value - 1)} variant="ghost">
                  Back
                </GlowButton>
              ) : null}
              {stepIndex < 2 ? (
                <GlowButton disabled={!canContinue} onClick={() => setStepIndex((value) => value + 1)}>
                  Next
                </GlowButton>
              ) : (
                <GlowButton
                  disabled={!canContinue}
                  onClick={() => {
                    setSubmitted(true);
                  }}
                >
                  That&apos;s it — send it over
                </GlowButton>
              )}
            </div>
          )}
        </motion.div>

        <motion.aside
          className="surface-panel-strong flex flex-col justify-between rounded-[2rem] p-6 lg:p-7"
          initial={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, amount: 0.24 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/44">Your pod so far</p>
            <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white">{formatCurrency(estimatedPrice)}</h3>
            <p className="mt-4 text-sm leading-7 text-white/56">
              {environmentOptions.find((option) => option.id === state.environment)?.title} / {state.siteLocation}
            </p>
          </div>

          <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">What happens after this</p>
            <p className="mt-3 text-sm leading-7 text-white/62">
              We check your site, sort out permits, build your pod, and deliver it. You&apos;ll know what&apos;s happening at every step.
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
