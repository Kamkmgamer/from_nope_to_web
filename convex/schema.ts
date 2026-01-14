import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table - synced from Clerk
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    role: v.union(v.literal("student"), v.literal("admin")),
    createdAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  // Courses table
  courses: defineTable({
    slug: v.string(),
    titleEn: v.string(),
    titleAr: v.string(),
    descriptionEn: v.string(),
    descriptionAr: v.string(),
    order: v.number(),
    isPublished: v.boolean(),
    imageUrl: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),

  // Modules table (sections within a course)
  modules: defineTable({
    courseId: v.id("courses"),
    order: v.number(),
    titleEn: v.string(),
    titleAr: v.string(),
    descriptionEn: v.optional(v.string()),
    descriptionAr: v.optional(v.string()),
  })
    .index("by_course", ["courseId"])
    .index("by_course_order", ["courseId", "order"]),

  // Lessons table
  lessons: defineTable({
    moduleId: v.id("modules"),
    slug: v.string(),
    order: v.number(),
    titleEn: v.string(),
    titleAr: v.string(),
    contentEn: v.string(), // MDX/Markdown content
    contentAr: v.string(), // MDX/Markdown content
    videoUrl: v.optional(v.string()),
    estimatedMinutes: v.optional(v.number()),
    isPublished: v.boolean(),
  })
    .index("by_module", ["moduleId"])
    .index("by_module_order", ["moduleId", "order"])
    .index("by_slug", ["slug"]),

  // User progress tracking
  userProgress: defineTable({
    userId: v.id("users"),
    lessonId: v.id("lessons"),
    status: v.union(v.literal("started"), v.literal("completed")),
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_lesson", ["lessonId"])
    .index("by_user_lesson", ["userId", "lessonId"]),
});
