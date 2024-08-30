"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

export default function Home() {
  const [conversationId, setConversationId] = useState();
  const openConversation = useMutation(api.conversations.openConversation);
  const closeConversation = useMutation(api.conversations.closeConversation);
  const joinConversation = useMutation(api.conversations.joinConversation);

  const sendMessage = useMutation(api.messages.sendMessage);
  const getMessages = useQuery(api.messages.getMessages, {
    conversationId: conversationId!,
  });

  return (
    <div className="flex flex-col gap-4 py-4 items-center h-full">
      <div className="flex flex-row">
        <button
          className="bg-white border border-white px-4 py-4"
          onClick={() => {
            openConversation.call({}).then((id: any) => {
              setConversationId(id);
            });
          }}
        />
        <span>{conversationId}</span>
        {conversationId !== undefined ? (
          <button
            className="bg-red-500 border border-red-500 px-4 py-4"
            onClick={() => {
              closeConversation.call({}, { id: conversationId! }).then(() => {
                setConversationId(undefined);
              });
            }}
          />
        ) : null}
      </div>
      <span>
        {getMessages?.map(({ _creationTime, message, _id }) => (
          <div key={_id}>{message}</div>
        ))}
      </span>
      {conversationId !== undefined ? (
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            console.log(e.target[0].value);
            sendMessage.call(
              {},
              {
                conversationId: conversationId!,
                message: e.target[0].value,
                userId: "",
              },
            );
            e.target[0].value = "";
          }}
        >
          <input type="text" className="max-w-40 align-bottom text-black" />
        </form>
      ) : (
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            console.log(e.target[0].value);
            joinConversation.call(
              {},
              {
                conversationId: e.target[0].value!,
              },
            );
            setConversationId(e.target[0].value);
            e.target[0].value = "";
          }}
        >
          <input type="text" className="max-w-40 align-bottom text-black" />
        </form>
      )}
    </div>
  );
}
