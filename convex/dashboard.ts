import { v } from "convex/values";
import { query } from "./_generated/server";
import type { QueryCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

/**
 * User statistics interface for getUserStats query
 */
export interface UserStats {
  totalLessonsCompleted: number;
  totalLessonsStarted: number;
  coursesInProgress: number;
  coursesCompleted: number;
  currentStreak: number;
  totalLearningTimeMinutes: number | null;
}

/**
 * Course with progress interface for getUserCourses query
 */
export interface CourseWithProgress {
  courseId: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string | null;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  currentModuleId: string | null;
  currentModuleTitleEn: string | null;
  currentModuleTitleAr: string | null;
  currentLessonId: string | null;
  currentLessonTitleEn: string | null;
  currentLessonTitleAr: string | null;
  firstIncompleteLessonId: string | null;
  firstIncompleteLessonTitleEn: string | null;
  firstIncompleteLessonTitleAr: string | null;
  firstIncompleteModuleId: string | null;
  firstIncompleteModuleTitleEn: string | null;
  firstIncompleteModuleTitleAr: string | null;
}

/**
 * Recent activity item interface for getRecentActivity query
 */
export interface RecentActivityItem {
  lessonId: string;
  lessonTitleEn: string;
  lessonTitleAr: string;
  courseId: string;
  courseTitleEn: string;
  courseTitleAr: string;
  moduleId: string;
  moduleTitleEn: string;
  moduleTitleAr: string;
  status: "started" | "completed";
  timestamp: number;
}

/**
 * Continue learning item interface for getContinueLearning query
 */
export interface ContinueLearningItem {
  lessonId: string;
  lessonTitleEn: string;
  lessonTitleAr: string;
  lessonSlug: string;
  courseId: string;
  courseTitleEn: string;
  courseTitleAr: string;
  courseSlug: string;
  moduleId: string;
  moduleTitleEn: string;
  moduleTitleAr: string;
  estimatedMinutes: number | null;
}

/**
 * Get overall user statistics
 *
 * Returns:
 * - Total lessons completed
 * - Total lessons started (including completed)
 * - Courses in progress (courses with at least 1 lesson started)
 * - Courses completed (courses with 100% progress)
 * - Current streak (days in a row with activity)
 * - Total learning time estimate (sum of estimatedMinutes for completed lessons)
 */
export const getUserStats = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args): Promise<UserStats> => {
    // Get all progress entries for the user
    const progressEntries = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Calculate completed and started lessons
    const completedCount = progressEntries.filter(
      (p) => p.status === "completed",
    ).length;
    const startedCount = progressEntries.length;

    // Get all published courses
    const courses = await ctx.db
      .query("courses")
      .withIndex("by_order")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();

    // Calculate courses in progress and completed
    let coursesInProgress = 0;
    let coursesCompleted = 0;

    // Track lesson IDs in each course for progress calculation
    for (const course of courses) {
      // Get all modules for this course
      const modules = await ctx.db
        .query("modules")
        .withIndex("by_course", (q) => q.eq("courseId", course._id))
        .collect();

      // Get all published lessons for this course
      const allLessons: { _id: string }[] = [];
      for (const courseModule of modules) {
        const lessons = await ctx.db
          .query("lessons")
          .withIndex("by_module", (q) => q.eq("moduleId", courseModule._id))
          .filter((q) => q.eq(q.field("isPublished"), true))
          .collect();
        allLessons.push(...lessons);
      }

      if (allLessons.length === 0) continue;

      // Get user's progress for lessons in this course
      const lessonIds = new Set(allLessons.map((l) => l._id.toString()));
      const courseProgress = progressEntries.filter((p) =>
        lessonIds.has(p.lessonId.toString()),
      );

      const courseCompletedCount = courseProgress.filter(
        (p) => p.status === "completed",
      ).length;
      const progressPercentage =
        (courseCompletedCount / allLessons.length) * 100;

      if (progressPercentage === 100) {
        coursesCompleted++;
      } else if (courseProgress.length > 0) {
        coursesInProgress++;
      }
    }

    // Calculate current streak (consecutive days with activity)
    const streak = await calculateStreak(ctx, args.userId, progressEntries);

    // Calculate total learning time (from completed lessons)
    const totalLearningTime = await calculateLearningTime(
      ctx,
      args.userId,
      progressEntries,
    );

    return {
      totalLessonsCompleted: completedCount,
      totalLessonsStarted: startedCount,
      coursesInProgress,
      coursesCompleted,
      currentStreak: streak,
      totalLearningTimeMinutes: totalLearningTime,
    };
  },
});

/**
 * Get all courses with user's progress for each
 *
 * Returns a list of all published courses with:
 * - Total lessons, completed lessons, progress percentage
 * - Current module and lesson the user is on
 * - First incomplete lesson for "continue" functionality
 */
export const getUserCourses = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args): Promise<CourseWithProgress[]> => {
    // Get all published courses
    const courses = await ctx.db
      .query("courses")
      .withIndex("by_order")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();

    // Get all progress entries for the user
    const progressEntries = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Create a map for quick progress lookup
    const progressMap = new Map<string, (typeof progressEntries)[0]>();
    for (const progress of progressEntries) {
      progressMap.set(progress.lessonId.toString(), progress);
    }

    // Process each course
    const coursesWithProgress: CourseWithProgress[] = [];

    for (const course of courses) {
      // Get all modules for this course in order
      const modules = await ctx.db
        .query("modules")
        .withIndex("by_course_order", (q) => q.eq("courseId", course._id))
        .collect();

      if (modules.length === 0) continue;

      // Get all published lessons for this course
      const allLessons: Array<{
        _id: string;
        moduleId: string;
        titleEn: string;
        titleAr: string;
        estimatedMinutes: number | null;
      }> = [];

      for (const courseModule of modules) {
        const lessons = await ctx.db
          .query("lessons")
          .withIndex("by_module_order", (q) => q.eq("moduleId", courseModule._id))
          .filter((q) => q.eq(q.field("isPublished"), true))
          .collect();
        allLessons.push(
          ...lessons.map((l) => ({
            _id: l._id.toString(),
            moduleId: l.moduleId.toString(),
            titleEn: l.titleEn,
            titleAr: l.titleAr,
            estimatedMinutes: l.estimatedMinutes ?? null,
          })),
        );
      }

      if (allLessons.length === 0) continue;

      // Calculate progress
      let completedLessons = 0;
      let currentModuleId: string | null = null;
      let currentModuleTitleEn: string | null = null;
      let currentModuleTitleAr: string | null = null;
      let currentLessonId: string | null = null;
      let currentLessonTitleEn: string | null = null;
      let currentLessonTitleAr: string | null = null;
      let firstIncompleteLessonId: string | null = null;
      let firstIncompleteLessonTitleEn: string | null = null;
      let firstIncompleteLessonTitleAr: string | null = null;
      let firstIncompleteModuleId: string | null = null;
      let firstIncompleteModuleTitleEn: string | null = null;
      let firstIncompleteModuleTitleAr: string | null = null;

      // Find first incomplete lesson and track progress
      for (const lesson of allLessons) {
        const progress = progressMap.get(lesson._id);

        if (progress?.status === "completed") {
          completedLessons++;
        } else {
          // This is incomplete
          if (firstIncompleteLessonId === null) {
            firstIncompleteLessonId = lesson._id;
            firstIncompleteLessonTitleEn = lesson.titleEn;
            firstIncompleteLessonTitleAr = lesson.titleAr;
            firstIncompleteModuleId = lesson.moduleId;

            // Get module titles for first incomplete lesson
            const firstIncompleteModule = modules.find(
              (m) => m._id.toString() === lesson.moduleId,
            );
            if (firstIncompleteModule) {
              firstIncompleteModuleTitleEn = firstIncompleteModule.titleEn;
              firstIncompleteModuleTitleAr = firstIncompleteModule.titleAr;
            }
          }

          // Track current progress (most recent incomplete or in-progress)
          if (progress?.status === "started" && currentLessonId === null) {
            currentLessonId = lesson._id;
            currentLessonTitleEn = lesson.titleEn;
            currentLessonTitleAr = lesson.titleAr;
            currentModuleId = lesson.moduleId;

            const currentModule = modules.find(
              (m) => m._id.toString() === lesson.moduleId,
            );
            if (currentModule) {
              currentModuleTitleEn = currentModule.titleEn;
              currentModuleTitleAr = currentModule.titleAr;
            }
          }
        }
      }

      const progressPercentage =
        allLessons.length > 0
          ? Math.round((completedLessons / allLessons.length) * 100)
          : 0;

      coursesWithProgress.push({
        courseId: course._id.toString(),
        slug: course.slug,
        titleEn: course.titleEn,
        titleAr: course.titleAr,
        descriptionEn: course.descriptionEn,
        descriptionAr: course.descriptionAr,
        imageUrl: course.imageUrl ?? null,
        totalLessons: allLessons.length,
        completedLessons,
        progressPercentage,
        currentModuleId,
        currentModuleTitleEn,
        currentModuleTitleAr,
        currentLessonId,
        currentLessonTitleEn,
        currentLessonTitleAr,
        firstIncompleteLessonId,
        firstIncompleteLessonTitleEn,
        firstIncompleteLessonTitleAr,
        firstIncompleteModuleId,
        firstIncompleteModuleTitleEn,
        firstIncompleteModuleTitleAr,
      });
    }

    return coursesWithProgress;
  },
});

/**
 * Get user's recent learning activity
 *
 * Returns the last 10 lessons accessed (started or completed) with:
 * - Lesson title, course name, module name
 * - Status (started/completed)
 * - Timestamp
 * Sorted by most recent
 */
export const getRecentActivity = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args): Promise<RecentActivityItem[]> => {
    // Get all progress entries for the user, sorted by timestamp (most recent first)
    // We need to get all and sort since there's no timestamp index
    const progressEntries = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Sort by most recent activity (use completedAt if available, otherwise startedAt)
    const sortedEntries = [...progressEntries].sort((a, b) => {
      const aTime = a.completedAt ?? a.startedAt;
      const bTime = b.completedAt ?? b.startedAt;
      return bTime - aTime;
    });

    // Take the last 10 entries
    const recentEntries = sortedEntries.slice(0, 10);

    // Build the result with full context
    const recentActivities: RecentActivityItem[] = [];

    for (const progress of recentEntries) {
      // Get the lesson
      const lesson = await ctx.db.get(progress.lessonId);
      if (!lesson) continue;

      // Get the module
      const courseModule = await ctx.db.get(lesson.moduleId);
      if (!courseModule) continue;

      // Get the course
      const course = await ctx.db.get(courseModule.courseId);
      if (!course) continue;

      recentActivities.push({
        lessonId: lesson._id.toString(),
        lessonTitleEn: lesson.titleEn,
        lessonTitleAr: lesson.titleAr,
        courseId: course._id.toString(),
        courseTitleEn: course.titleEn,
        courseTitleAr: course.titleAr,
        moduleId: courseModule._id.toString(),
        moduleTitleEn: courseModule.titleEn,
        moduleTitleAr: courseModule.titleAr,
        status: progress.status,
        timestamp: progress.completedAt ?? progress.startedAt,
      });
    }

    return recentActivities;
  },
});

/**
 * Get the next lesson to continue learning
 *
 * Finds the most recently accessed lesson that isn't completed.
 * Returns lesson details with course and module info.
 * Returns null if all lessons are completed.
 */
export const getContinueLearning = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args): Promise<ContinueLearningItem | null> => {
    // Get all progress entries for the user
    const progressEntries = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Filter to incomplete lessons (started but not completed)
    const incompleteProgress = progressEntries
      .filter((p) => p.status === "started")
      .sort((a, b) => b.startedAt - a.startedAt);

    // If no incomplete lessons, return null
    if (incompleteProgress.length === 0) {
      // Check if there are any started but not completed
      return null;
    }

    // Get the most recently started incomplete lesson
    const mostRecent = incompleteProgress[0];
    if (!mostRecent) return null;

    const lesson = await ctx.db.get(mostRecent.lessonId);
    if (!lesson) return null;

    // Get the module
    const courseModule = await ctx.db.get(lesson.moduleId);
    if (!courseModule) return null;

    // Get the course
    const course = await ctx.db.get(courseModule.courseId);
    if (!course) return null;

    return {
      lessonId: lesson._id.toString(),
      lessonTitleEn: lesson.titleEn,
      lessonTitleAr: lesson.titleAr,
      lessonSlug: lesson.slug,
      courseId: course._id.toString(),
      courseTitleEn: course.titleEn,
      courseTitleAr: course.titleAr,
      courseSlug: course.slug,
      moduleId: courseModule._id.toString(),
      moduleTitleEn: courseModule.titleEn,
      moduleTitleAr: courseModule.titleAr,
      estimatedMinutes: lesson.estimatedMinutes ?? null,
    };
  },
});

/**
 * Get course progress for a specific course
 *
 * This is a wrapper around the existing getForCourse in progress.ts
 * to ensure it integrates well with the dashboard queries.
 */
export const getCourseProgress = query({
  args: {
    userId: v.id("users"),
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    // Get all modules for this course
    const modules = await ctx.db
      .query("modules")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .collect();

    // Get all lessons for these modules
    const allLessons: Array<{
      _id: string;
      moduleId: string;
      order: number;
      titleEn: string;
      titleAr: string;
      estimatedMinutes: number | null;
    }> = [];

    for (const courseModule of modules) {
      const lessons = await ctx.db
        .query("lessons")
        .withIndex("by_module_order", (q) => q.eq("moduleId", courseModule._id))
        .filter((q) => q.eq(q.field("isPublished"), true))
        .collect();
      allLessons.push(
        ...lessons.map((l) => ({
          _id: l._id.toString(),
          moduleId: l.moduleId.toString(),
          order: l.order,
          titleEn: l.titleEn,
          titleAr: l.titleAr,
          estimatedMinutes: l.estimatedMinutes ?? null,
        })),
      );
    }

    // Get user's progress for all these lessons
    const progressEntries = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Filter to only lessons in this course
    const lessonIds = new Set(allLessons.map((l) => l._id));
    const courseProgress = progressEntries.filter((p) =>
      lessonIds.has(p.lessonId.toString()),
    );

    // Calculate stats
    const completedCount = courseProgress.filter(
      (p) => p.status === "completed",
    ).length;

    // Build detailed progress per lesson
    const lessonsWithProgress = allLessons.map((lesson) => {
      const progress = courseProgress.find(
        (p) => p.lessonId.toString() === lesson._id,
      );
      return {
        lessonId: lesson._id,
        moduleId: lesson.moduleId,
        order: lesson.order,
        titleEn: lesson.titleEn,
        titleAr: lesson.titleAr,
        estimatedMinutes: lesson.estimatedMinutes,
        status: progress?.status ?? null,
        startedAt: progress?.startedAt ?? null,
        completedAt: progress?.completedAt ?? null,
      };
    });

    // Calculate progress per module
    const modulesWithProgress = await Promise.all(
      modules.map(async (module) => {
        const moduleLessonIds = new Set(
          lessonsWithProgress
            .filter((l) => l.moduleId === module._id.toString())
            .map((l) => l.lessonId),
        );
        const moduleProgress = courseProgress.filter((p) =>
          moduleLessonIds.has(p.lessonId.toString()),
        );
        const moduleCompleted = moduleProgress.filter(
          (p) => p.status === "completed",
        ).length;
        const moduleTotal = lessonsWithProgress.filter(
          (l) => l.moduleId === module._id.toString(),
        ).length;

        return {
          moduleId: module._id.toString(),
          titleEn: module.titleEn,
          titleAr: module.titleAr,
          totalLessons: moduleTotal,
          completedLessons: moduleCompleted,
          progressPercentage:
            moduleTotal > 0
              ? Math.round((moduleCompleted / moduleTotal) * 100)
              : 0,
        };
      }),
    );

    return {
      totalLessons: allLessons.length,
      completedLessons: completedCount,
      progressPercentage:
        allLessons.length > 0
          ? Math.round((completedCount / allLessons.length) * 100)
          : 0,
      lessons: lessonsWithProgress,
      modules: modulesWithProgress,
    };
  },
});

/**
 * Helper function to calculate user's current streak
 * Returns the number of consecutive days with activity
 */
async function calculateStreak(
  ctx: QueryCtx,
  _userId: string,
  progressEntries: Array<{ startedAt: number }>,
): Promise<number> {
  if (progressEntries.length === 0) return 0;

  // Get unique dates with activity
  const activityDates = new Set<number>();

  for (const progress of progressEntries) {
    const date = new Date(progress.startedAt);
    date.setHours(0, 0, 0, 0);
    activityDates.add(date.getTime());
  }

  // Convert to array and sort (newest first)
  const sortedDates = Array.from(activityDates).sort((a, b) => b - a);

  if (sortedDates.length === 0) return 0;

  // Calculate streak
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const today = now.getTime();
  const yesterday = today - 24 * 60 * 60 * 1000;

  // Check if the most recent activity is today or yesterday
  const mostRecent = sortedDates[0];
  if (mostRecent !== today && mostRecent !== yesterday) {
    return 0;
  }

  // Count consecutive days
  let streak = 0;
  let currentDate = mostRecent === today ? today : yesterday;

  for (const date of sortedDates) {
    if (date === currentDate) {
      streak++;
      currentDate -= 24 * 60 * 60 * 1000;
    } else if (date < currentDate) {
      break;
    }
  }

  return streak;
}

/**
 * Helper function to calculate total learning time
 * Sums up estimatedMinutes from all completed lessons
 */
async function calculateLearningTime(
  ctx: QueryCtx,
  _userId: string,
  progressEntries: Array<{ lessonId: { toString(): string }; status: string }>,
): Promise<number | null> {
  let totalMinutes = 0;

  for (const progress of progressEntries) {
    if (progress.status !== "completed") continue;

    const lesson = await ctx.db.get(progress.lessonId as unknown as Id<"lessons">);
    if (lesson && "estimatedMinutes" in lesson && lesson.estimatedMinutes) {
      totalMinutes += lesson.estimatedMinutes;
    }
  }

  return totalMinutes > 0 ? totalMinutes : null;
}
