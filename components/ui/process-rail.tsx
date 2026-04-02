import { processPhases } from "@/lib/configurator-data";

export function ProcessRail() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {processPhases.map((phase, i) => (
        <div className="flex items-center gap-2" key={phase}>
          <span
            className={`rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] ${
              i === 0
                ? "border border-white/16 bg-white/8 text-white/80"
                : "text-white/30"
            }`}
          >
            {phase}
          </span>
          {i < processPhases.length - 1 ? (
            <span className="text-white/16">&#8594;</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
