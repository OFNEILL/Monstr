import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const setSex = mutation({
  args: { sex: v.string(), userId: v.id("users") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }

    // set monster
    await ctx.db.patch(args.userId, { sex: args.sex });
  },
});

export const setMonster = mutation({
  args: { monsterId: v.string(), userId: v.id("users") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }

    // set monster
    await ctx.db.patch(args.userId, { monsterId: args.monsterId });
  },
});

export const createUser = mutation({
  args: { authId: v.string(), monster: v.string(), gender: v.string() },
  handler: async (ctx, args) => {
    // create user
    const userId = await ctx.db.insert("users", {
      authId: args.authId,
      monster: args.monster,
    });
  },
});
export const getMessages = query({
  args: { conversationId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    //get messages
    console.log("getting messages");
    const messages = await ctx.db
      .query("messages")
      .filter((x) => x.eq(x.field("conversationId"), args.conversationId))
      .order("asc")
      .take(100);

    return messages;
  },
});
