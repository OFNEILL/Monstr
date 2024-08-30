"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";

export default function Home() {
  const openConversation = useMutation(api.conversations.openConversation);
  const closeConversation = useMutation(api.conversations.closeConversation);
  const [conversationId, setConversationId] = useState();
  return (
    <div>
      <button
        className="bg-white border border-white px-4 py-4"
        onClick={() => {
          openConversation.call({}).then((id: any) => {
            setConversationId(id);
          });
        }}
      />
      <button
        className="bg-red-500 border border-red-500 px-4 py-4"
        onClick={() => {
          closeConversation.call({}, { id: conversationId! });
        }}
      />
    </div>
  );
}
