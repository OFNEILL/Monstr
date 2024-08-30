import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const openConversation = mutation({
  handler: async (ctx) => {
    //create convo
    console.log("opening conversation");
    const conversationId = await ctx.db.insert("conversations", {});

    //get convoId
    console.log("getting id");
    console.log(conversationId);

    return conversationId;
  },
});

export const closeConversation = mutation({
  args: { id: v.id("conversations") },
  handler: async (ctx, args) => {
    //delete convo from table
    await ctx.db.delete(args.id);
    console.log("deleted");
  },
});

export const joinConversation = mutation({
  args: { conversationId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }

    console.log("joining conversation");
    await ctx.db.insert("users", {
      userId: identity.tokenIdentifier,
      conversationId: args.conversationId,
    });
  },
});

export const getConversations = query({
  handler: async (ctx) => {
    //get all conversations
    console.log("getting conversations");
    const conversations = await ctx.db.query("conversations").take(100);

    return conversations;
  },
});

// export const getRandomConversation = query({
//   handler: async (ctx) => {
//     //get random conversation
//     console.log("getting random conversation");
//     const conversation = await ctx.db
//       .query("conversations")
//       .order("asc")
//       .filter((x) => x.and(x.openConversation))
//       .take(1);
//
//     return conversation;
//   },
// });

export const joinRandomConversation = mutation({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }

    console.log("joining conversation");
    await ctx.db.insert("users", {
      userId: identity.tokenIdentifier,
      conversationId: args.conversationId,
    });
  },
});
