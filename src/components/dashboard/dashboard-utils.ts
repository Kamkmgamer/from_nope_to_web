import type { UserStats } from "../../../convex/dashboard";

export interface DashboardStats {
  lessonsCompleted: number;
  coursesInProgress: number;
  currentStreak: number;
  learningTime: string;
}

export function formatDashboardStats(stats: UserStats): DashboardStats {
  return {
    lessonsCompleted: stats.totalLessonsCompleted,
    coursesInProgress: stats.coursesInProgress,
    currentStreak: stats.currentStreak,
    learningTime: formatLearningTime(stats.totalLearningTimeMinutes),
  };
}

function formatLearningTime(minutes: number | null): string {
  if (!minutes) return "0h";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  } else if (remainingMinutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${remainingMinutes}m`;
  }
}

export function calculateProgressColor(percentage: number): string {
  if (percentage === 100) return "text-primary";
  if (percentage >= 75) return "text-accent";
  if (percentage >= 50) return "text-yellow-600";
  return "text-muted-foreground";
}

export function getRelativeTimeString(
  timestamp: number,
  locale: string,
): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (locale === "ar") {
    if (diffMins < 1) return "الآن";
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    if (diffDays === 1) return "أمس";
    if (diffDays < 7) return `منذ ${diffDays} أيام`;
  } else {
    if (diffMins < 1) return "now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
  }

  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
  });
}

export function getStatusColor(status: "started" | "completed"): string {
  return status === "completed"
    ? "bg-primary/10 text-primary"
    : "bg-secondary text-foreground";
}

export function getStatusIcon(status: "started" | "completed"): string {
  return status === "completed" ? "check" : "play";
}
