import { useEffect, useRef, type ReactNode } from "react";

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
