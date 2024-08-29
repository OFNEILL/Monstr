// import { api } from "./_generated/api";
// import { internalMutation, type MutationCtx } from "./_generated/server";
//
// export default internalMutation({
//   handler: async (ctx: MutationCtx) => {
//     // If this project already has a populated database, do nothing
//     const anyMessage = await ctx.db.query("messages").first();
//     if (anyMessage) return;
//
//     // If not, post each of the seed messages with the given delay
//     let totalDelay = 0;
//     // for (const [author, body, delay] of seedMessages) {
//     //   totalDelay += delay; //tell everyone else to do x after y has completed
//     //   await ctx.scheduler.runAfter(totalDelay, api..send, {
//     //     author,
//     //     body,
//     //   });
//     // }
//   },
// });
