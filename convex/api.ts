// Dashboard API exports
// This file re-exports dashboard functions for the Convex API

// Import types and functions from dashboard.ts
import type {
  UserStats,
  CourseWithProgress,
  RecentActivityItem,
  ContinueLearningItem,
} from "./dashboard.js";

// Export the query functions
export { getUserStats } from "./dashboard.js";
export { getUserCourses } from "./dashboard.js";
export { getRecentActivity } from "./dashboard.js";
export { getContinueLearning } from "./dashboard.js";

// Export types
export type { UserStats };
export type { CourseWithProgress };
export type { RecentActivityItem };
export type { ContinueLearningItem };
