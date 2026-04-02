/** Minimal linework floor-plan diagrams for each pod size. */

const strokeProps = {
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

/** Studio 01 — compact single module */
export function SizeIconS() {
  return (
    <svg className="text-white/40" height="48" viewBox="0 0 80 48" width="80" xmlns="http://www.w3.org/2000/svg">
      {/* Single pod module */}
      <rect {...strokeProps} height="28" rx="3" width="40" x="20" y="10" />
      {/* Interior partition */}
      <line {...strokeProps} x1="44" x2="44" y1="10" y2="38" />
      {/* Door */}
      <path {...strokeProps} d="M28 38 v-8 a6 6 0 0 1 6 0" />
      {/* Window */}
      <rect {...strokeProps} height="6" rx="1" width="10" x="50" y="14" />
    </svg>
  );
}

/** Residence 02 — balanced two-zone layout */
export function SizeIconM() {
  return (
    <svg className="text-white/40" height="48" viewBox="0 0 100 48" width="100" xmlns="http://www.w3.org/2000/svg">
      {/* Main pod body */}
      <rect {...strokeProps} height="28" rx="3" width="60" x="20" y="10" />
      {/* Living / sleeping partition */}
      <line {...strokeProps} x1="50" x2="50" y1="10" y2="38" />
      {/* Wet room partition */}
      <line {...strokeProps} strokeDasharray="3 2" x1="36" x2="36" y1="25" y2="38" />
      {/* Door */}
      <path {...strokeProps} d="M28 38 v-8 a6 6 0 0 1 6 0" />
      {/* Windows */}
      <rect {...strokeProps} height="6" rx="1" width="10" x="56" y="14" />
      <rect {...strokeProps} height="6" rx="1" width="10" x="56" y="28" />
    </svg>
  );
}

/** Suite 03 — wide three-zone layout */
export function SizeIconL() {
  return (
    <svg className="text-white/40" height="48" viewBox="0 0 120 48" width="120" xmlns="http://www.w3.org/2000/svg">
      {/* Main pod body */}
      <rect {...strokeProps} height="28" rx="3" width="80" x="20" y="10" />
      {/* Zone partitions */}
      <line {...strokeProps} x1="46" x2="46" y1="10" y2="38" />
      <line {...strokeProps} x1="72" x2="72" y1="10" y2="38" />
      {/* Wet room */}
      <line {...strokeProps} strokeDasharray="3 2" x1="34" x2="34" y1="25" y2="38" />
      {/* Door */}
      <path {...strokeProps} d="M28 38 v-8 a6 6 0 0 1 6 0" />
      {/* Windows */}
      <rect {...strokeProps} height="6" rx="1" width="10" x="78" y="14" />
      <rect {...strokeProps} height="6" rx="1" width="10" x="78" y="28" />
      <rect {...strokeProps} height="6" rx="1" width="10" x="54" y="14" />
    </svg>
  );
}
