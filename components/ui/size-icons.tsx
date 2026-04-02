/** Minimal linework floor-plan diagrams — simple box modules. */

const strokeProps = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

/** Studio 01 — single compact module */
export function SizeIconS() {
  return (
    <svg className="text-white/36" height="32" viewBox="0 0 48 32" width="48" xmlns="http://www.w3.org/2000/svg">
      <rect {...strokeProps} height="20" rx="2.5" width="28" x="10" y="6" />
    </svg>
  );
}

/** Residence 02 — two connected modules */
export function SizeIconM() {
  return (
    <svg className="text-white/36" height="32" viewBox="0 0 64 32" width="64" xmlns="http://www.w3.org/2000/svg">
      <rect {...strokeProps} height="20" rx="2.5" width="24" x="4" y="6" />
      <rect {...strokeProps} height="20" rx="2.5" width="24" x="36" y="6" />
      <line {...strokeProps} x1="28" x2="36" y1="16" y2="16" />
    </svg>
  );
}

/** Suite 03 — three connected modules */
export function SizeIconL() {
  return (
    <svg className="text-white/36" height="32" viewBox="0 0 88 32" width="88" xmlns="http://www.w3.org/2000/svg">
      <rect {...strokeProps} height="20" rx="2.5" width="22" x="4" y="6" />
      <rect {...strokeProps} height="20" rx="2.5" width="22" x="33" y="6" />
      <rect {...strokeProps} height="20" rx="2.5" width="22" x="62" y="6" />
      <line {...strokeProps} x1="26" x2="33" y1="16" y2="16" />
      <line {...strokeProps} x1="55" x2="62" y1="16" y2="16" />
    </svg>
  );
}
