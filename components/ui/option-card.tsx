import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SizeIconL, SizeIconM, SizeIconS } from "./size-icons";

const iconMap: Record<string, React.FC> = {
  "size-s": SizeIconS,
  "size-m": SizeIconM,
  "size-l": SizeIconL,
};

interface OptionCardProps {
  label: string;
  title: string;
  description: string;
  meta: string;
  accent: string;
  selected?: boolean;
  recommended?: boolean;
  image?: string;
  icon?: ReactNode;
  iconId?: string;
  onClick?: () => void;
  footer?: ReactNode;
  className?: string;
}

export function OptionCard({
  accent,
  className,
  description,
  footer,
  icon,
  iconId,
  image,
  label,
  meta,
  onClick,
  recommended,
  selected,
  title,
}: OptionCardProps) {
  const IconComponent = iconId ? iconMap[iconId] : null;
  return (
    <button
      className={cn(
        "group relative min-w-0 overflow-hidden rounded-2xl border p-4 text-left transition duration-300 sm:rounded-[1.75rem] sm:p-5",
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
        <div className="relative mb-3 h-28 overflow-hidden rounded-xl border border-white/8 bg-slate-950/60 sm:mb-5 sm:h-36 sm:rounded-[1.35rem]">
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
      {IconComponent ? <div className="mb-4"><IconComponent /></div> : icon ? <div className="mb-4">{icon}</div> : null}
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/48">{label}</span>
        {recommended ? (
          <span className="rounded-full border border-emerald-200/18 bg-emerald-200/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-emerald-100">
            Recommended
          </span>
        ) : null}
      </div>
      <h3 className="break-words text-base font-medium text-white sm:text-xl">{title}</h3>
      <p className="mt-2 max-w-md text-xs leading-5 text-white/70 sm:mt-3 sm:text-sm sm:leading-6">{description}</p>
      <p className="mt-2 text-xs text-white/48 sm:mt-4 sm:text-sm">{meta}</p>
      {footer ? <div className="mt-5">{footer}</div> : null}
    </button>
  );
}
