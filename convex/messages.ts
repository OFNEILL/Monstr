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

    //replace emojis
    if (args.message.includes(":)"))
      args.message = args.message.replace(":)", "😊");
    if (args.message.includes(":("))
      args.message = args.message.replace(":(", "😢");
    if (args.message.includes(":D"))
      args.message = args.message.replace(":D", "😄");
    if (args.message.includes(":P"))
      args.message = args.message.replace(":P", "😛");
    if (args.message.includes(":O"))
      args.message = args.message.replace(":O", "😲");
    if (args.message.includes(":|"))
      args.message = args.message.replace(":|", "😐");
    if (args.message.includes(":*"))
      args.message = args.message.replace(":*", "😘");
    if (args.message.includes(":$"))
      args.message = args.message.replace(":$", "🤑");
    if (args.message.includes(":^"))
      args.message = args.message.replace(":^", "🤔");
    if (args.message.includes(":&"))
      args.message = args.message.replace(":&", "🤐");
    if (args.message.includes(":!"))
      args.message = args.message.replace(":!", "😠");
    if (args.message.includes(":?"))
      args.message = args.message.replace(":?", "🤨");
    if (args.message.includes(":;"))
      args.message = args.message.replace(":;", "😏");

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
      .order("asc")
      .take(100);

    return messages;
  },
});
