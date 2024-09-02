import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

type ConversationPreview = {
  conversationId: string;
  message: string | null;
  messageId: string;
};

const conversationNames = [
  "Cerberus",
  "Chimera",
  "Hydra",
  "Minotaur",
  "Basilisk",
  "Kraken",
  "Cyclops",
  "Gorgon",
  "Manticore",
  "Griffin",
  "Phoenix",
  "Sphinx",
  "Leviathan",
  "Wendigo",
  "Banshee",
  "Yeti",
  "Dragon",
  "Wyvern",
  "Naga",
  "Jotunn",
  "Fenrir",
  "Jormungandr",
  "Chupacabra",
  "Roc",
  "Kitsune",
  "Oni",
  "Tengu",
  "Yurei",
  "Nue",
  "Bake-kujira",
  "Selkie",
  "Kelpie",
  "Bunyip",
  "Drop Bear",
  "Mokele-mbembe",
  "Ammit",
  "Anubis",
  "Baba Yaga",
  "Dullahan",
  "Púca",
  "Fomorian",
  "Balor",
  "Cailleach",
  "Bean Sidhe",
  "Kappa",
  "Tsuchigumo",
  "Yamata-no-Orochi",
  "Jiangshi",
  "Qilin",
  "Huli Jing",
  "Nian",
  "Aswang",
  "Manananggal",
  "Tikbalang",
  "Kapre",
  "Diwata",
  "Berbalang",
  "Pontianak",
  "Langsuir",
  "Penanggalan",
  "Toyol",
  "Orang Minyak",
  "Hantu Raya",
  "Hantu Air",
  "Hantu Laut",
  "Hantu Galah",
  "Hantu Tetek",
  "Hantu Kum-Kum",
  "Hantu Pocong",
  "Hantu Bungkus",
  "Hantu Jepun",
  "Hantu Kopek",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
  "Hantu Raya",
  "Hantu Tinggi",
  "Hantu Tetek",
  "Hantu Toyol",
  "Hantu Langsuir",
  "Hantu Pontianak",
  "Hantu Penanggal",
  "Hantu Pisang",
];

export const openConversation = mutation({
  handler: async (ctx) => {
    //create convo
    console.log("opening conversation");
    //generater random number
    const randomNumber = Math.floor(Math.random() * 7) + 1;

    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const randomIndex = Math.floor(Math.random() * conversationNames.length);
    const conversationName = `${conversationNames[randomIndex]} ${randomIndex}`;

    const conversationId = await ctx.db.insert("conversations", {
      imageNumber: randomNumber,
      creatorId: identity.tokenIdentifier,
      conversationName: conversationName,
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
    if (creatorId === null) {
      throw new Error("You are not the creator of this conversation");
    }

    await ctx.db.delete(args.id);

    //get ids of messages in convo
    const messages = await ctx.db
      .query("messages")
      .filter((x) => x.eq(x.field("conversationId"), args.id))
      .collect();

    //delete messages
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      await ctx.db.delete(message._id);
    }

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

export const getConversationPreviews = query({
  handler: async (ctx) => {
    //get all conversations
    console.log("getting conversations");
    const conversations = await ctx.db.query("conversations").take(100);

    const conversationPreviews: ConversationPreview[] = [];

    for (let i = 0; i < conversations.length; i++) {
      const conversation = conversations[i];
      const messages = await ctx.db
        .query("messages")
        .filter((x) => x.eq(x.field("conversationId"), conversation._id))
        .order("desc")
        .take(1);

      const preview: ConversationPreview = {
        conversationId: conversation._id,
        message: messages[0]?.message,
        messageId: messages[0]?._id,
      };

      conversationPreviews.push(preview);
    }

    return conversationPreviews;
  },
});
