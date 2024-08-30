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
    const conversationCount = await ctx.db.query("conversations").take(5);
    if (conversationCount.length === 5) {
      //delete convo from table
      await ctx.db.delete(args.id);
      console.log("deleted");
    } else {
      console.log("not enough conversations to delete");
    }
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
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }

    //get all getConversations
    console.log("getting conversations");
    const conversations = await ctx.db.query("conversations").take(100);

    if (conversations.length === 0) {
      return null;
    }
    //random index
    const randomIndex = Math.floor(Math.random() * conversations.length);
    console.log(conversations);
    return conversations[randomIndex]._id;
  },
});
