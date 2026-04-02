import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  label: string;
  title: string;
  description: string;
  meta: string;
  accent: string;
  selected?: boolean;
  recommended?: boolean;
  image?: string;
  onClick?: () => void;
  footer?: ReactNode;
  className?: string;
}

export function OptionCard({
  accent,
  className,
  description,
  footer,
  image,
  label,
  meta,
  onClick,
  recommended,
  selected,
  title,
}: OptionCardProps) {
  return (
    <button
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border p-5 text-left transition duration-300",
        selected
          ? "border-white/24 bg-white/11 shadow-[0_24px_54px_rgba(0,0,0,0.28)]"
          : "border-white/10 bg-white/[0.045] hover:border-white/20 hover:bg-white/[0.07]",
        className,
      )}
      onClick={onClick}
      type="button"
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 transition-opacity duration-300",
          selected ? "opacity-100" : "opacity-55 group-hover:opacity-80",
        )}
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />
      {image ? (
        <div className="relative mb-5 h-36 overflow-hidden rounded-[1.35rem] border border-white/8 bg-slate-950/60">
          <Image
            alt={title}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            draggable={false}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            src={image}
            unoptimized={image.endsWith(".svg")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-white/6" />
        </div>
      ) : null}
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/48">{label}</span>
        {recommended ? (
          <span className="rounded-full border border-emerald-200/18 bg-emerald-200/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-emerald-100">
            Recommended
          </span>
        ) : null}
      </div>
      <h3 className="text-xl font-medium text-white">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-white/70">{description}</p>
      <p className="mt-4 text-sm text-white/48">{meta}</p>
      {footer ? <div className="mt-5">{footer}</div> : null}
    </button>
  );
}
