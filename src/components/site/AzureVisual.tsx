import { useEffect, useRef, type ReactNode } from "react";

/** Illustrative composition — not a screenshot. Swap for real screenshots once supplied. */
export function AzureScreen({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const mobile = variant === "mobile";
  return (
    <svg viewBox={mobile ? "0 0 200 400" : "0 0 800 480"} className="h-auto w-full" role="img" aria-label="Illustration of the Azure Analytics website layout">
      <rect width="100%" height="100%" className="fill-card" />
      <rect width="100%" height={mobile ? 36 : 44} className="fill-azure" />
      <rect x="16" y={mobile ? 13 : 16} width={mobile ? 60 : 110} height="10" rx="5" className="fill-ink-foreground" opacity=".9" />
      {!mobile && [0, 1, 2, 3].map((i) => <rect key={i} x={480 + i * 72} y="18" width="52" height="8" rx="4" className="fill-ink-foreground" opacity=".6" />)}
      <rect x="16" y={mobile ? 60 : 84} width={mobile ? 150 : 380} height={mobile ? 18 : 28} rx="6" className="fill-ink" />
      <rect x="16" y={mobile ? 86 : 124} width={mobile ? 120 : 300} height={mobile ? 18 : 28} rx="6" className="fill-ink" />
      <rect x="16" y={mobile ? 116 : 172} width={mobile ? 168 : 340} height="8" rx="4" className="fill-muted-foreground" opacity=".4" />
      <rect x="16" y={mobile ? 130 : 188} width={mobile ? 140 : 300} height="8" rx="4" className="fill-muted-foreground" opacity=".4" />
      <rect x="16" y={mobile ? 150 : 214} width={mobile ? 90 : 120} height={mobile ? 24 : 34} rx="17" className="fill-azure" />
      {/* Animated chart illustration */}
      <g transform={mobile ? "translate(16 196)" : "translate(450 80)"}>
        <rect width={mobile ? 168 : 320} height={mobile ? 110 : 180} rx="12" className="fill-secondary" />
        {[0.5, 0.75, 0.4, 0.9, 0.65, 0.8].map((h, i) => {
          const w = mobile ? 168 : 320, H = mobile ? 110 : 180, bw = w / 9;
          return <rect key={i} x={bw * (i * 1.3 + 0.8)} y={H - 14 - h * (H - 34)} width={bw * 0.8} height={h * (H - 34)} rx="3" className="fill-azure azure-bar" style={{ animationDelay: `${i * 120}ms` }} opacity={0.45 + i * 0.09} />;
        })}
      </g>
      {/* Seven service tiles */}
      {Array.from({ length: mobile ? 4 : 7 }).map((_, i) => (
        <g key={i} transform={mobile ? `translate(${16 + (i % 2) * 88} ${320 + Math.floor(i / 2) * 40})` : `translate(${16 + i * 110} 300)`}>
          <rect width={mobile ? 80 : 98} height={mobile ? 32 : 140} rx="10" className="fill-secondary" />
          <circle cx={mobile ? 16 : 24} cy={mobile ? 16 : 30} r={mobile ? 7 : 12} className="fill-azure" opacity=".75" />
          {!mobile && <rect x="14" y="60" width="70" height="8" rx="4" className="fill-ink" opacity=".7" />}
          {!mobile && <rect x="14" y="76" width="54" height="6" rx="3" className="fill-muted-foreground" opacity=".4" />}
        </g>
      ))}
    </svg>
  );
}

export function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-4 py-2.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-muted-foreground/30" /><span className="size-2.5 rounded-full bg-muted-foreground/30" /><span className="size-2.5 rounded-full bg-muted-foreground/30" />
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden rounded-[1.75rem] border-[6px] border-ink bg-card shadow-2xl">{children}</div>;
}

export function AzureCover() {
  return (
    <div className="relative aspect-[16/8] overflow-hidden bg-ink p-6 md:p-10">
      <div className="mx-auto max-w-3xl transition-transform duration-500 group-hover:scale-[1.02]">
        <BrowserFrame><AzureScreen /></BrowserFrame>
      </div>
    </div>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
