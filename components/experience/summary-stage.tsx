"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { ProcessRail } from "@/components/ui/process-rail";
import { environmentOptions, finishOptions, interiorPackOptions, sizeOptions } from "@/lib/configurator-data";
import { formatCurrency } from "@/lib/pricing";
import type { ConfiguratorState, PriceLineItem } from "@/types/configurator";

interface SummaryStageProps {
  state: ConfiguratorState;
  estimatedPrice: number;
  priceBreakdown: PriceLineItem[];
  onStartProject: () => void;
  setRef?: (node: HTMLElement | null) => void;
}

function getTitle<T extends string>(value: T, collection: Array<{ id: T; title: string }>) {
  return collection.find((item) => item.id === value)?.title ?? value;
}

const envImage: Record<string, string> = {
  desert: "/story-landscape.webp",
  forest: "/story-anywhere.webp",
  urban: "/story-backyard.webp",
};

export function SummaryStage({
  estimatedPrice,
  onStartProject,
  priceBreakdown,
  setRef,
  state,
}: SummaryStageProps) {
  const includedItems = priceBreakdown.filter((item) => item.included);
  const siteDependentItems = priceBreakdown.filter((item) => !item.included);

  return (
    <section className="relative overflow-hidden" id="summary" ref={setRef}>
      {/* Hero image for the selected environment */}
      <div className="relative h-[40vh] w-full overflow-hidden lg:h-[50vh]">
        <Image
          alt="Your pod environment"
          className="object-cover"
          draggable={false}
          fill
          sizes="100vw"
          src={envImage[state.environment] ?? "/story-landscape.webp"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {/* Price hero */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/40">Your pod, configured</p>
                <p className="mt-3 text-[clamp(3rem,6vw,5.4rem)] font-medium tracking-[-0.04em] text-white">
                  {formatCurrency(estimatedPrice)}
                </p>
              </div>
              <p className="max-w-xs text-sm leading-6 text-white/40">
                Everything below is already included. Site costs are estimated separately.
              </p>
            </div>

            {/* Spec summary row */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Size", value: getTitle(state.size, sizeOptions) },
                { label: "Finish", value: getTitle(state.finish, finishOptions) },
                { label: "Setting", value: environmentOptions.find((o) => o.id === state.environment)?.title },
                { label: "Interior", value: getTitle(state.interiorPack, interiorPackOptions) },
              ].map((item) => (
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3" key={item.label}>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/36">{item.label}</p>
                  <p className="mt-1.5 text-base text-white/80">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/36">Included</p>
                <div className="space-y-2.5">
                  {includedItems.map((item) => (
                    <div className="flex justify-between text-sm" key={item.label}>
                      <span className="text-white/50">{item.label}</span>
                      <span className="text-white/70">{item.amount > 0 ? formatCurrency(item.amount) : "Included"}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/36">Depends on your site</p>
                <div className="space-y-2.5">
                  {siteDependentItems.map((item) => (
                    <div className="flex justify-between text-sm" key={item.label}>
                      <span className="text-white/40">{item.label}</span>
                      <span className="text-white/40">~{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Process + CTA */}
            <div className="mt-10 space-y-6 pb-16">
              <ProcessRail />
              <div className="flex items-center gap-6">
                <GlowButton onClick={onStartProject}>Start your project</GlowButton>
                <span className="text-sm text-white/36">We come back with a clear next step.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
