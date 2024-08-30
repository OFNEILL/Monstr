import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: { conversationId: v.string(), message: v.string(), ai: v.boolean() },
  handler: async (ctx, args) => {
    //send message
    console.log("sending message");
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      message: args.message,
      ai: args.ai,
    });

    console.log(messageId);

    return messageId;
  },
});

export const getMessages = query({
  args: { conversationId: v.optional(v.string()) },
  // returns: v.list(v.object({ message: v.string(), ai: v.boolean() })),
  handler: async (ctx, args) => {
    //get messages
    console.log("getting messages");
    const messages = await ctx.db
      .query("messages")
      .filter((x) => x.eq(x.field("conversationId"), args.conversationId))
      .order("asc")
      .take(100);

    console.log(messages);

    return messages;
  },
});
