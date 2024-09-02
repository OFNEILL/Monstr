import { checkText } from "smile2emoji";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: {
    conversationId: v.string(),
    message: v.string(),
    userId: v.string(),
    messageId: v.optional(v.id("messages")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }

    //send message
    console.log("sending message");
    args.message = checkText(args.message);

    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      message: args.message,
      userId: identity.tokenIdentifier,
      messageId: args.messageId,
    });

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
      .order("desc")
      .take(100);

    return messages.reverse();
  },
});

export const sendDM = mutation({
  args: { to: v.string(), message: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }

    //send message
    console.log("sending message");

    const messageId = await ctx.db.insert("messages", {
      to: args.to,
      message: args.message,
      userId: identity.tokenIdentifier,
    });

    return messageId;
  },
});

export const deleteMessage = mutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }

    //delete message
    console.log("deleting message");
    const messageCheck = await ctx.db.get(args.messageId);
    if (messageCheck.userId !== identity.tokenIdentifier) {
      throw new Error("Not authorized");
    }

    await ctx.db.delete(args.messageId);
  },
});

export const getDMs = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }

    //getting dm users
    await ctx.db
      .query("messages")
      .filter((x) =>
        x.and(
          x.eq(x.field("to"), "dm"),
          x.eq(x.field("userId"), identity.tokenIdentifier),
        ),
      );
  },
});
