import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all published courses
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_order")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();
  },
});

// Get all courses (including unpublished, for admin)
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("courses").withIndex("by_order").collect();
  },
});

// Get course by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Get course by ID
export const get = query({
  args: { id: v.id("courses") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get course with its modules and lessons
export const getWithContent = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const course = await ctx.db
      .query("courses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!course) return null;

    const modules = await ctx.db
      .query("modules")
      .withIndex("by_course_order", (q) => q.eq("courseId", course._id))
      .collect();

    const modulesWithLessons = await Promise.all(
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

    return {
      ...course,
      modules: modulesWithLessons,
    };
  },
});

// Create course (admin only)
export const create = mutation({
  args: {
    slug: v.string(),
    titleEn: v.string(),
    titleAr: v.string(),
    descriptionEn: v.string(),
    descriptionAr: v.string(),
    order: v.number(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("courses", {
      ...args,
      isPublished: false,
    });
  },
});

// Update course
export const update = mutation({
  args: {
    id: v.id("courses"),
    slug: v.optional(v.string()),
    titleEn: v.optional(v.string()),
    titleAr: v.optional(v.string()),
    descriptionEn: v.optional(v.string()),
    descriptionAr: v.optional(v.string()),
    order: v.optional(v.number()),
    isPublished: v.optional(v.boolean()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    // Filter out undefined values
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );
    await ctx.db.patch(id, filteredUpdates);
  },
});

// Delete course (also deletes modules and lessons)
export const remove = mutation({
  args: { id: v.id("courses") },
  handler: async (ctx, args) => {
    // Get all modules for this course
    const modules = await ctx.db
      .query("modules")
      .withIndex("by_course", (q) => q.eq("courseId", args.id))
      .collect();

    // Delete all lessons in each module
    // Delete all lessons in each module
    for (const courseModule of modules) {
      const lessons = await ctx.db
        .query("lessons")
        .withIndex("by_module", (q) => q.eq("moduleId", courseModule._id))
        .collect();

      for (const lesson of lessons) {
        await ctx.db.delete(lesson._id);
      }

      await ctx.db.delete(courseModule._id);
    }

    // Delete the course
    await ctx.db.delete(args.id);
  },
});
