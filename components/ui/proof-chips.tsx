import { proofChips } from "@/lib/configurator-data";

export function ProofChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {proofChips.map((chip) => (
        <span
          className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40"
          key={chip}
        >
          {chip}
        </span>
      ))}
    </div>
  );
}
