import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get user's progress for a specific lesson
export const getForLesson = query({
  args: {
    userId: v.id("users"),
    lessonId: v.id("lessons"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userProgress")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", args.userId).eq("lessonId", args.lessonId)
      )
      .first();
  },
});

// Get all progress for a user
export const listByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Get user's progress for a specific course
export const getForCourse = query({
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
    const allLessons: { _id: any }[] = [];
    for (const courseModule of modules) {
      const lessons = await ctx.db
        .query("lessons")
        .withIndex("by_module", (q) => q.eq("moduleId", courseModule._id))
        .filter((q) => q.eq(q.field("isPublished"), true))
        .collect();
      allLessons.push(...lessons);
    }

    // Get user's progress for all these lessons
    const progressEntries = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Filter to only lessons in this course
    const lessonIds = new Set(allLessons.map((l) => l._id.toString()));
    const courseProgress = progressEntries.filter((p) =>
      lessonIds.has(p.lessonId.toString())
    );

    const completedCount = courseProgress.filter(
      (p) => p.status === "completed"
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

// Mark lesson as started
export const startLesson = mutation({
  args: {
    userId: v.id("users"),
    lessonId: v.id("lessons"),
  },
  handler: async (ctx, args) => {
    // Check if progress already exists
    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", args.userId).eq("lessonId", args.lessonId)
      )
      .first();

    if (existing) {
      return existing._id;
    }

    // Create new progress entry
    return await ctx.db.insert("userProgress", {
      userId: args.userId,
      lessonId: args.lessonId,
      status: "started",
      startedAt: Date.now(),
    });
  },
});

// Mark lesson as completed
export const completeLesson = mutation({
  args: {
    userId: v.id("users"),
    lessonId: v.id("lessons"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", args.userId).eq("lessonId", args.lessonId)
      )
      .first();

    if (existing) {
      // Update to completed
      await ctx.db.patch(existing._id, {
        status: "completed",
        completedAt: Date.now(),
      });
      return existing._id;
    } else {
      // Create as completed (skipped started state)
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

// Reset progress for a lesson
export const resetLesson = mutation({
  args: {
    userId: v.id("users"),
    lessonId: v.id("lessons"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user_lesson", (q) =>
        q.eq("userId", args.userId).eq("lessonId", args.lessonId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});
