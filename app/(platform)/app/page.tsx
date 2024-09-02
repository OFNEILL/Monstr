"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { MessageCircleMoreIcon, SquarePenIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef, useState, useEffect, useCallback } from "react";

export default function Home() {
  const [conversationId, setConversationId] = useState();
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const messageFormRef = useRef<HTMLFormElement>(null);
  const scrollRef = useRef<HTMLSpanElement>(null);
  const [userImages, setUserImages] = useState({} as Record<string, string>);
  const [loadingImages, setLoadingImages] = useState(
    {} as Record<string, boolean>,
  );
  const openConversation = useMutation(api.conversations.openConversation);
  const closeConversation = useMutation(api.conversations.closeConversation);
  const joinConversation = useMutation(api.conversations.joinConversation);
  const getConversations = useQuery(api.conversations.getConversations);
  const sendMessage = useMutation(api.messages.sendMessage);
  const getMessages = useQuery(api.messages.getMessages, {
    conversationId: conversationId!,
  });
  // const getLatestMessage = useQuery(api.messages.getLatestMessage, {
  //   conversationId: conversationId!,
  // });

  const { user } = useUser();
  const getUser = useCallback(
    async (userId: string) => {
      if (loadingImages[userId] || userImages[userId]) return;

      setLoadingImages((prev) => ({ ...prev, [userId]: true }));
      try {
        const response = await fetch(`/api/getUser?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const userData = await response.json();
        setUserImages((prev) => ({ ...prev, [userId]: userData.imageUrl }));
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoadingImages((prev) => ({ ...prev, [userId]: false }));
      }
    },
    [loadingImages, userImages],
  );
  const autoHeight = () => {
    const text = messageInputRef.current as HTMLElement;
    text.style.height = "18px";
    text.style.height = `${text.scrollHeight}px`;
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (!e.repeat) {
        e.preventDefault();
        const event = new Event("submit", { bubbles: true, cancelable: true });
        messageFormRef.current?.dispatchEvent(event);
      }
    }
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = e.currentTarget.elements[0] as HTMLTextAreaElement;

    sendMessage({
      conversationId: conversationId!,
      message: message.value,
      userId: user?.id ?? "",
    });
    message.value = "";
    const textarea = messageInputRef.current;
    if (textarea) {
      textarea.style.height = "32px"; // or whatever the initial height should be
    }
  };
  useEffect(() => {
    // Scroll to the bottom whenever getMessages changes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [getMessages]);
  useEffect(() => {
    if (getMessages) {
      const uniqueUserIds = new Set(
        getMessages.map(({ userId }) => userId.split("|")[1]),
      );
      uniqueUserIds.forEach((cleanUserId) => {
        if (!userImages[cleanUserId] && !loadingImages[cleanUserId]) {
          getUser(cleanUserId);
        }
      });
    }
  }, [getMessages, getUser, userImages, loadingImages]);

  return (
    <div className="flex w-full flex-col">
      <span className="flex items-center justify-between border-b border-b-zinc-900 px-4 py-3.5">
        <h1 className="text-xl">All Rooms</h1>
        <span>
          <span
            className="flex cursor-pointer items-center gap-2 rounded-md bg-zinc-900 px-2 py-1.5 text-sm hover:bg-opacity-60"
            onClick={() => {
              openConversation.call({}).then((id: any) => {
                setConversationId(id);
              });
            }}
          >
            <SquarePenIcon size={16} strokeWidth={1.5} />
            Open Conversation
          </span>
        </span>
      </span>
      <div className="flex h-[calc(100%-60px)]">
        <div className="flex flex-col gap-4 h-full border-r border-r-zinc-900 p-2 pt-0 overflow-y-auto overflow-x-hidden">
          <span className="px-2 sticky pt-4 pb-2 top-0 bg-black flex flex-col gap-4">
            <span>
              <h2 className="font-semibold">Inbox</h2>
              <p className="text-sm">
                Maximising efficiency and Achieving peace.
              </p>
            </span>
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                joinConversation.call(
                  {},
                  {
                    conversationId: e.target[0].value!,
                  },
                );
                setConversationId(e.target[0].value);
                e.target[0].value = "";
              }}
              className="pb-1.5"
            >
              <input
                className="w-full rounded-md text-sm px-2 py-1.5 border border-zinc-900 bg-zinc-900 bg-opacity-60"
                placeholder="Enter room ID to join conversation"
              />
            </form>
          </span>
          <div className="flex flex-col gap-2">
            {getConversations?.map(({ _id }) => (
              <div
                key={_id}
                className={`flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm hover:bg-zinc-900 hover:bg-opacity-60 ${conversationId === _id ? "bg-zinc-900 bg-opacity-60" : ""}`}
                onClick={() => {
                  setConversationId(_id);
                }}
              >
                <span className="aspect-square h-14 w-14 min-w-14 overflow-hidden rounded-md">
                  <Image
                    src={`/avatars/monstr-${Math.floor(Math.random() * (8 - 1 + 1)) + 1}.jpg`}
                    alt="Logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="w-full max-w-72">
                  <p className="font-semibold">{_id}</p>
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                    lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </span>
              </div>
            ))}
          </div>
        </div>
        {conversationId !== undefined ? (
          <div className="flex flex-grow flex-col h-ful justify-between">
            <div className="flex justify-between items-center border-b border-b-zinc-900 p-2">
              <span className="flex gap-2 items-center">
                <span className="aspect-square h-10 w-10 overflow-hidden rounded-md">
                  <Image
                    src={`/avatars/monstr-${Math.floor(Math.random() * (8 - 1 + 1)) + 1}.jpg`}
                    alt="Logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="text-sm">{conversationId}</span>
              </span>
              <span
                className="border border-red-500 rounded-md text-sm px-2 py-1.5 bg-red-500 bg-opacity-60 cursor-pointer hover:bg-opacity-80"
                onClick={() => {
                  closeConversation
                    .call({}, { id: conversationId! })
                    .then(() => {
                      setConversationId(undefined);
                    });
                }}
              >
                Close Conversation
              </span>
            </div>
            <span
              className="flex flex-grow flex-col w-full p-2.5 gap-2 overflow-x-hidden overflow-y-auto"
              ref={scrollRef}
            >
              {getMessages?.map(({ _creationTime, message, _id, userId }) => (
                <Fragment key={_id}>
                  {userId.split("|")[1] === user?.id ? (
                    <div className="bg-blue-600 rounded-md w-fit ml-auto p-1.5 text-sm max-w-xl text-wrap">
                      {message.split(" ").map((word: string) => {
                        if (word.startsWith("http") || word.startsWith("www")) {
                          return (
                            <Link
                              key={word}
                              href={
                                word.startsWith("www")
                                  ? `https://${word}`
                                  : word
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold"
                            >
                              {word}
                            </Link>
                          );
                        }
                        return word + " ";
                      })}
                    </div>
                  ) : (
                    <div className="mr-auto flex items-center gap-2">
                      <span className="aspect-square h-6 w-6 overflow-hidden rounded-full">
                        {loadingImages[userId.split("|")[1]] ? (
                          <div className="h-full w-full bg-zinc-700 animate-pulse"></div>
                        ) : (
                          <Image
                            src={
                              userImages[userId.split("|")[1]] ||
                              "/avatars/no-avatar.jpg"
                            }
                            alt="User Avatar"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </span>
                      <div className="bg-zinc-600 rounded-md w-fit p-1.5 text-sm max-w-xl text-wrap">
                        {message.split(" ").map((word: string) => {
                          if (
                            word.startsWith("http") ||
                            word.startsWith("www")
                          ) {
                            return (
                              <Link
                                key={word}
                                href={
                                  word.startsWith("www")
                                    ? `https://${word}`
                                    : word
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="font-semibold"
                              >
                                {word}
                              </Link>
                            );
                          }
                          return word + " ";
                        })}
                      </div>
                    </div>
                  )}
                </Fragment>
              ))}
            </span>
            <form
              onSubmit={handleFormSubmit}
              className="p-2"
              ref={messageFormRef}
            >
              <textarea
                ref={messageInputRef}
                className="w-full rounded-md text-sm px-2 py-1.5 border border-zinc-900 bg-zinc-900 bg-opacity-60 h-8 resize-none overflow-hidden"
                onChange={autoHeight}
                onKeyDown={handleKeyDown}
                placeholder="Send a message..."
              />
            </form>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col flex-grow gap-6">
            <span className="border-2 border-slate-50 rounded-full p-4">
              <MessageCircleMoreIcon size={64} strokeWidth={1.5} />
            </span>
            <span className="flex flex-col items-center gap-4">
              <span className="flex flex-col items-center gap-2">
                <h3 className="text-lg">Your Conversations</h3>
                <p className="opacity-65 text-sm">
                  Join a conversation to start chatting
                </p>
              </span>
              <span
                className="flex cursor-pointer items-center gap-2 rounded-md bg-zinc-900 px-2 py-1.5 text-sm hover:bg-opacity-60"
                onClick={() => {
                  openConversation.call({}).then((id: any) => {
                    setConversationId(id);
                  });
                }}
              >
                Open Conversation
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
