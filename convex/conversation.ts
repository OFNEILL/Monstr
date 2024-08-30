import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const openConversation = query({
  args: {},
  handler: async (ctx: any) => {
    //create convo
    console.log("opening conversation");
    const conversation = await ctx.db.insert("conversations");

    //get convoId
    console.log("getting id");
    const conversationId = await ctx.get(conversation)._id;
    console.log(conversationId);
  },
});

export const closeConversation = query({
  args: { id: v.string() },
  handler: async (ctx: any, id: number) => {
    //delete convo from table
    await ctx.db.delete("conversation", { _id: id });
    console.log("deleted");
  },
});
// https://festive-sturgeon-235.convex.cloud
