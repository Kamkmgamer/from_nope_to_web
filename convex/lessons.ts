import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get lesson by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lessons")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Get lesson by ID
export const get = query({
  args: { id: v.id("lessons") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get lesson with navigation context (prev/next)
export const getWithNavigation = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const lesson = await ctx.db
      .query("lessons")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!lesson) return null;

    // Get the module
    const lessonModule = await ctx.db.get(lesson.moduleId);
    if (!lessonModule) return null;

    // Get the course
    const course = await ctx.db.get(lessonModule.courseId);
    if (!course) return null;

    // Get all lessons in this module
    const moduleLessons = await ctx.db
      .query("lessons")
      .withIndex("by_module_order", (q) => q.eq("moduleId", lessonModule._id))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();

    // Find current lesson index
    const currentIndex = moduleLessons.findIndex((l) => l._id === lesson._id);

    // Get prev/next lessons
    const prevLesson = currentIndex > 0 ? moduleLessons[currentIndex - 1] : null;
    const nextLesson =
      currentIndex < moduleLessons.length - 1
        ? moduleLessons[currentIndex + 1]
        : null;

    return {
      lesson,
      module: lessonModule,
      course,
      prevLesson,
      nextLesson,
      totalLessonsInModule: moduleLessons.length,
      currentLessonIndex: currentIndex + 1,
    };
  },
});

// Get all lessons by module
export const listByModule = query({
  args: { moduleId: v.id("modules") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lessons")
      .withIndex("by_module_order", (q) => q.eq("moduleId", args.moduleId))
      .collect();
  },
});

// Create lesson
export const create = mutation({
  args: {
    moduleId: v.id("modules"),
    slug: v.string(),
    order: v.number(),
    titleEn: v.string(),
    titleAr: v.string(),
    contentEn: v.string(),
    contentAr: v.string(),
    videoUrl: v.optional(v.string()),
    estimatedMinutes: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("lessons", {
      ...args,
      isPublished: false,
    });
  },
});

// Update lesson
export const update = mutation({
  args: {
    id: v.id("lessons"),
    slug: v.optional(v.string()),
    order: v.optional(v.number()),
    titleEn: v.optional(v.string()),
    titleAr: v.optional(v.string()),
    contentEn: v.optional(v.string()),
    contentAr: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    estimatedMinutes: v.optional(v.number()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );
    await ctx.db.patch(id, filteredUpdates);
  },
});

// Delete lesson
export const remove = mutation({
  args: { id: v.id("lessons") },
  handler: async (ctx, args) => {
    // Delete related progress entries
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_lesson", (q) => q.eq("lessonId", args.id))
      .collect();

    for (const p of progress) {
      await ctx.db.delete(p._id);
    }

    await ctx.db.delete(args.id);
  },
});
