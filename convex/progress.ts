import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

export const getForLesson = query({
  args: {
    userId: v.id("users"),
    lessonId: v.id("lessons"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userProgress")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", args.userId).eq("lessonId", args.lessonId),
      )
      .first();
  },
});

export const listByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getForCourse = query({
  args: {
    userId: v.id("users"),
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    const modules = await ctx.db
      .query("modules")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .collect();
    const allLessons: { _id: Id<"lessons"> }[] = [];
    for (const courseModule of modules) {
      const lessons = await ctx.db
        .query("lessons")
        .withIndex("by_module", (q) => q.eq("moduleId", courseModule._id))
        .filter((q) => q.eq(q.field("isPublished"), true))
        .collect();
      allLessons.push(...lessons);
    }

    const progressEntries = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const lessonIds = new Set(allLessons.map((l) => l._id.toString()));
    const courseProgress = progressEntries.filter((p) =>
      lessonIds.has(p.lessonId.toString()),
    );

    const completedCount = courseProgress.filter(
      (p) => p.status === "completed",
    ).length;

    return {
      totalLessons: allLessons.length,
      completedLessons: completedCount,
      progressPercentage:
        allLessons.length > 0
          ? Math.round((completedCount / allLessons.length) * 100)
          : 0,
      progressEntries: courseProgress,
    };
  },
});

export const startLesson = mutation({
  args: {
    userId: v.id("users"),
    lessonId: v.id("lessons"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", args.userId).eq("lessonId", args.lessonId),
      )
      .first();

    if (existing) {
      return existing._id;
    }
    return await ctx.db.insert("userProgress", {
      userId: args.userId,
      lessonId: args.lessonId,
      status: "started",
      startedAt: Date.now(),
    });
  },
});

export const completeLesson = mutation({
  args: {
    userId: v.id("users"),
    lessonId: v.id("lessons"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", args.userId).eq("lessonId", args.lessonId),
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        status: "completed",
        completedAt: Date.now(),
      });
      return existing._id;
    } else {
      return await ctx.db.insert("userProgress", {
        userId: args.userId,
        lessonId: args.lessonId,
        status: "completed",
        startedAt: Date.now(),
        completedAt: Date.now(),
      });
    }
  },
});

export const resetLesson = mutation({
  args: {
    userId: v.id("users"),
    lessonId: v.id("lessons"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", args.userId).eq("lessonId", args.lessonId),
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});

export const getOverallProgress = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const courses = await ctx.db
      .query("courses")
      .withIndex("by_order")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();

    const progressEntries = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    let totalLessonsCompleted = 0;
    let totalLessonsAvailable = 0;
    const courseProgress: Array<{
      courseId: string;
      slug: string;
      titleEn: string;
      titleAr: string;
      totalLessons: number;
      completedLessons: number;
      progressPercentage: number;
      isCompleted: boolean;
      completedAt?: number;
    }> = [];

    for (const course of courses) {
      const modules = await ctx.db
        .query("modules")
        .withIndex("by_course", (q) => q.eq("courseId", course._id))
        .collect();

      let courseTotalLessons = 0;
      let courseCompletedLessons = 0;
      let lastCompletedAt = 0;

      for (const courseModule of modules) {
        const lessons = await ctx.db
          .query("lessons")
          .withIndex("by_module", (q) => q.eq("moduleId", courseModule._id))
          .filter((q) => q.eq(q.field("isPublished"), true))
          .collect();

        for (const lesson of lessons) {
          courseTotalLessons++;
          totalLessonsAvailable++;

          const progressEntry = progressEntries.find(
            (p) =>
              p.lessonId.toString() === lesson._id.toString() &&
              p.status === "completed",
          );

          if (progressEntry) {
            courseCompletedLessons++;
            totalLessonsCompleted++;
            if (
              progressEntry.completedAt &&
              progressEntry.completedAt > lastCompletedAt
            ) {
              lastCompletedAt = progressEntry.completedAt;
            }
          }
        }
      }

      const progressPercentage =
        courseTotalLessons > 0
          ? Math.round((courseCompletedLessons / courseTotalLessons) * 100)
          : 0;

      const isCompleted = progressPercentage === 100;

      courseProgress.push({
        courseId: course._id.toString(),
        slug: course.slug,
        titleEn: course.titleEn,
        titleAr: course.titleAr,
        totalLessons: courseTotalLessons,
        completedLessons: courseCompletedLessons,
        progressPercentage,
        isCompleted,
        completedAt: isCompleted ? lastCompletedAt : undefined,
      });
    }

    const overallPercentage =
      totalLessonsAvailable > 0
        ? Math.round((totalLessonsCompleted / totalLessonsAvailable) * 100)
        : 0;

    return {
      totalLessonsCompleted,
      totalLessonsAvailable,
      overallPercentage,
      coursesCompleted: courseProgress.filter((c) => c.isCompleted).length,
      totalCourses: courseProgress.length,
      courseProgress,
    };
  },
});
