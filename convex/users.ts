import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get user by Clerk ID
export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

// Get current user (requires clerkId to be passed)
export const getCurrent = query({
  args: { clerkId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.clerkId) return null;
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId!))
      .first();
  },
});

// Create or update user from Clerk webhook/sync
export const upsert = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        email: args.email,
        fullName: args.fullName,
        imageUrl: args.imageUrl,
      });
      return existingUser._id;
    } else {
      // Create new user
      return await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: args.email,
        fullName: args.fullName,
        imageUrl: args.imageUrl,
        role: "student",
        createdAt: Date.now(),
      });
    }
  },
});

// Delete user (for Clerk webhook when user is deleted)
export const deleteByClerkId = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (user) {
      // Delete user's progress first
      const progress = await ctx.db
        .query("userProgress")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .collect();

      for (const p of progress) {
        await ctx.db.delete(p._id);
      }

      // Delete the user
      await ctx.db.delete(user._id);
    }
  },
});
