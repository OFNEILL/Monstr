import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

//FUTURE???

export const sendNotification = mutation({
  args: {
    notification: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }
  },
});

export const getNotification = query({
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
