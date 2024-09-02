import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: {
    conversationId: v.string(),
    message: v.string(),
    userId: v.string(),
    messageId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }

    //send message
    console.log("sending message");
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      message: args.message,
      userId: identity.tokenIdentifier,
      messageId: args.messageId,
    });

    console.log(messageId);

    return messageId;
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

export const getLatestMessage = query({
  args: { conversationId: v.string() },
  handler: async (ctx, args) => {
    //get latest message
    console.log("getting latest message");
    const message = await ctx.db
      .query("messages")
      .filter((x) => x.eq(x.field("conversationId"), args.conversationId))
      .order("desc")
      .take(1);

    return message;
  },
});
