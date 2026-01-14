import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get module by ID
export const get = query({
  args: { id: v.id("modules") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get all modules for a course
export const listByCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("modules")
      .withIndex("by_course_order", (q) => q.eq("courseId", args.courseId))
      .collect();
  },
});

// Get modules with lessons for a course
export const listWithLessons = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const modules = await ctx.db
      .query("modules")
      .withIndex("by_course_order", (q) => q.eq("courseId", args.courseId))
      .collect();

    return await Promise.all(
      modules.map(async (courseModule) => {
        const lessons = await ctx.db
          .query("lessons")
          .withIndex("by_module_order", (q) => q.eq("moduleId", courseModule._id))
          .filter((q) => q.eq(q.field("isPublished"), true))
          .collect();

        return {
          ...courseModule,
          lessons,
        };
      })
    );
  },
});

// Create module
export const create = mutation({
  args: {
    courseId: v.id("courses"),
    order: v.number(),
    titleEn: v.string(),
    titleAr: v.string(),
    descriptionEn: v.optional(v.string()),
    descriptionAr: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("modules", args);
  },
});

// Update module
export const update = mutation({
  args: {
    id: v.id("modules"),
    order: v.optional(v.number()),
    titleEn: v.optional(v.string()),
    titleAr: v.optional(v.string()),
    descriptionEn: v.optional(v.string()),
    descriptionAr: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );
    await ctx.db.patch(id, filteredUpdates);
  },
});

// Delete module (also deletes lessons)
export const remove = mutation({
  args: { id: v.id("modules") },
  handler: async (ctx, args) => {
    // Delete all lessons
    const lessons = await ctx.db
      .query("lessons")
      .withIndex("by_module", (q) => q.eq("moduleId", args.id))
      .collect();

    for (const lesson of lessons) {
      await ctx.db.delete(lesson._id);
    }

    await ctx.db.delete(args.id);
  },
});
