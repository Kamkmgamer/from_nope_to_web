import { cn } from "~/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "card-editorial hover:border-foreground/50 p-6 transition-all duration-300",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="label-mono text-xs tracking-wider uppercase">{title}</p>
          <p className="font-display text-foreground text-3xl leading-tight font-normal">
            {value}
          </p>
          {trend && <p className="text-muted-foreground text-xs">{trend}</p>}
        </div>
        <div className="bg-secondary text-foreground flex size-10 items-center justify-center rounded-sm">
          {icon}
        </div>
      </div>
    </div>
  );
}
