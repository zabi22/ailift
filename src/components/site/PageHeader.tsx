import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <section className="container-page pb-12 pt-16 md:pt-24">
      <p className="eyebrow fade-up">{eyebrow}</p>
      <h1 className="fade-up mt-4 max-w-4xl text-5xl md:text-7xl">{title}</h1>
      {intro && <p className="fade-up mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
    </section>
  );
}
