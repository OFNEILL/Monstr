import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const openConversation = mutation({
  handler: async (ctx) => {
    //create convo
    console.log("opening conversation");
    //generater random number
    const randomNumber = Math.floor(Math.random() * 8);

    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const conversationId = await ctx.db.insert("conversations", {
      imageNumber: randomNumber,
      creatorId: identity.tokenIdentifier,
    });

    //get convoId
    console.log("getting id");
    console.log(conversationId);

    return conversationId;
  },
});

export const closeConversation = mutation({
  args: { id: v.id("conversations") },
  handler: async (ctx, args) => {
    //are you creator?
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const creatorId = await ctx.db
      .query("conversations")
      .filter((x) =>
        x.and(
          x.eq(x.field("_id"), args.id),
          x.eq(x.field("creatorId"), identity.tokenIdentifier),
        ),
      )
      .first();
    //delete convo from table
    console.log("creatorId:", creatorId);

    if (creatorId === null) {
      throw new Error("You are not the creator of this conversation");
    }

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
