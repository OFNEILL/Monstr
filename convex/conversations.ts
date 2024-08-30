import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const openConversation = mutation({
  args: {},
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
