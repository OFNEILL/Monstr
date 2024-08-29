import { query, mutation } from "_generated/server";
import { v } from "convex/values";

export const manage = query({
  args: { id: v.string(), open: v.boolean() },
  handler: async (ctx, { id, open }) => {
    await ctx.db.insert("conversations", { id, open: true });
  },
});
