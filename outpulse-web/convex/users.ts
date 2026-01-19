import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    return await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
  },
});

export const updateOpenAIKey = mutation({
  args: {
    openaiKey: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) {
        // Create user if not exists (though usually handled by auth sync)
        return await ctx.db.insert("users", {
            tokenIdentifier: identity.tokenIdentifier,
            email: identity.email || "",
            role: "admin",
            openaiKey: args.openaiKey,
        });
    }

    await ctx.db.patch(user._id, {
      openaiKey: args.openaiKey,
    });
  },
});
