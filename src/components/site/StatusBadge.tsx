import { useLang } from "@/lib/i18n";
import { STATUS_LABEL, type Status } from "@/lib/projects";

const DOT: Record<Status, string> = {
  live: "bg-success",
  working: "bg-success",
  prototype: "bg-warning",
  development: "bg-warning",
  research: "bg-muted-foreground",
};

export function StatusBadge({ status }: { status: Status }) {
  const { lang } = useLang();
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold">
      <span className={`size-1.5 rounded-full ${DOT[status]}`} aria-hidden />
      {STATUS_LABEL[status][lang]}
    </span>
  );
}
