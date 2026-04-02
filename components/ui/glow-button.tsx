import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type GlowButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
  }
>;

export function GlowButton({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: GlowButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-[0.16em] uppercase transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-[linear-gradient(135deg,#baf7eb_0%,#82e2d0_35%,#4bbca9_100%)] text-slate-950 shadow-[0_18px_40px_rgba(76,189,169,0.3)] hover:translate-y-[-1px] hover:shadow-[0_24px_56px_rgba(76,189,169,0.38)]",
        variant === "secondary" &&
          "border border-white/15 bg-white/6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-white/28 hover:bg-white/10",
        variant === "ghost" && "text-white/74 hover:text-white",
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

