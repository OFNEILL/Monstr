"use client";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import {
  ArrowLeftIcon,
  MessageCircleMoreIcon,
  ReplyIcon,
  SquarePenIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { Fragment, useRef, useState, useEffect, useCallback } from "react";

export default function Home() {
  const [conversationId, setConversationId] = useState();
  const [replyingTo, setReplyingTo] = useState();
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
  const getConversationPreviews = useQuery(
    api.conversations.getConversationPreviews,
  );
  const deleteMessage = useMutation(api.messages.deleteMessage);
  const { user } = useUser();
  const [room, setRoom] = useQueryState("room");
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
      messageId: replyingTo,
      message: message.value,
      userId: user?.id ?? "",
    });
    message.value = "";
    const textarea = messageInputRef.current;
    if (textarea) {
      textarea.style.height = "32px"; // or whatever the initial height should be
    }
    setReplyingTo(undefined);
  };
  useEffect(() => {
    // Scroll to the bottom whenever getMessages changes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [getMessages]);
  useEffect(() => {
    setReplyingTo(undefined);
    conversationId && setRoom(conversationId as any);
  }, [conversationId, setRoom]);
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
  useEffect(() => {
    if (room) {
      getConversations?.find(({ _id }) => _id === room) &&
        setConversationId(room as any);
    }
  }, [room, getConversations, setRoom]);
  useEffect(() => {
    if (
      getConversations &&
      !getConversations?.find(({ _id }) => _id === conversationId)
    ) {
      setRoom(null);
    }
  }, [getConversations, conversationId, setRoom]);

  return (
    <div
      className={cn(
        "flex w-full flex-col",
        conversationId !== undefined &&
          "absolute h-[100dvh] bg-black sm:relative sm:bg-transparent sm:h-screen",
      )}
    >
      <span
        className={cn(
          "flex items-center justify-between border-b border-b-zinc-900 px-4 py-3.5",
          conversationId !== undefined && "hidden lg:flex",
        )}
      >
        <h1 className="lg:text-xl text-lg">All Rooms</h1>
        <span>
          <span
            className="flex cursor-pointer items-center gap-2 rounded-md bg-zinc-900 px-2 sm:py-1.5 py-2 text-sm hover:bg-opacity-60"
            onClick={() => {
              openConversation.call({}).then((id: any) => {
                setConversationId(id);
              });
            }}
          >
            <SquarePenIcon size={16} strokeWidth={1.5} />
            <p className="sm:block hidden">Open Conversation</p>
          </span>
        </span>
      </span>
      <div className={cn("flex", "lg:h-[calc(100%-60px)] h-full")}>
        <div
          className={cn(
            "flex flex-col gap-4 lg:border-r lg:border-r-zinc-900 p-2 pt-0 overflow-y-auto overflow-x-hidden lg:min-w-80 lg:w-80 w-full",
            conversationId !== undefined && "hidden lg:flex",
            conversationId === undefined && "lg:h-full h-[calc(100%-60px)]",
          )}
        >
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
            {getConversations?.map(({ _id, imageNumber, conversationName }) => {
              const messagePreview = getConversationPreviews?.find(
                ({ conversationId }) => conversationId === _id,
              )?.message;
              return (
                <div
                  key={_id}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm hover:bg-zinc-900 hover:bg-opacity-60",
                    conversationId === _id ? "bg-zinc-900 bg-opacity-60" : "",
                  )}
                  onClick={() => {
                    setConversationId(_id);
                  }}
                >
                  <span className="aspect-square h-14 w-14 min-w-14 overflow-hidden rounded-md">
                    <Image
                      src={`/avatars/monstr-${imageNumber}.jpg`}
                      alt="Logo"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="w-full max-w-40 xs:max-w-52 md:max-w-72 lg:max-w-44">
                    <p className="font-semibold">{conversationName}</p>
                    <p
                      className={cn(
                        "overflow-hidden text-ellipsis whitespace-nowrap",
                        messagePreview
                          ? "text-muted-foreground"
                          : "text-zinc-500/60 italic",
                      )}
                    >
                      {getConversationPreviews?.filter(
                        ({ conversationId }) => conversationId === _id,
                      )[0]?.message || "No messages"}
                    </p>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {conversationId !== undefined &&
        getConversations?.find(({ _id }) => _id === conversationId) ? (
          <div className="flex flex-grow flex-col h-full justify-between">
            <div className="flex justify-between items-center border-b border-b-zinc-900 p-2 sm:py-2.5 py-2">
              <span className="flex gap-2 items-center">
                <span className="aspect-square flex lg:hidden justify-center items-center overflow-hidden rounded-md p-1">
                  <ArrowLeftIcon
                    size={16}
                    strokeWidth={1.5}
                    className="cursor-pointer"
                    onClick={() => {
                      setConversationId(undefined);
                    }}
                  />
                </span>
                <span className="aspect-square h-10 w-10 overflow-hidden rounded-md">
                  <Image
                    src={`/avatars/monstr-${
                      getConversations?.find(
                        ({ _id }) => _id === conversationId,
                      )?.imageNumber
                    }.jpg`}
                    alt="Logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm">
                    {
                      getConversations?.find(
                        (conversation) => conversation._id === conversationId,
                      )?.conversationName
                    }
                  </span>
                  <span className="text-xs text-zinc-500/60 xs:block hidden">
                    {conversationId}
                  </span>
                </span>
              </span>
              {getConversations
                ?.find(({ _id }) => _id === conversationId)
                ?.creatorId.split("|")[1] === user?.id && (
                <>
                  <span
                    className="border border-red-500 rounded-md text-sm px-2 py-1.5 bg-red-500 bg-opacity-60 cursor-pointer hover:bg-opacity-80 lg:flex hidden"
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
                  <span
                    className="border border-red-500 rounded-md text-sm px-2 py-1.5 bg-red-500 bg-opacity-60 cursor-pointer hover:bg-opacity-80 flex lg:hidden"
                    onClick={() => {
                      closeConversation
                        .call({}, { id: conversationId! })
                        .then(() => {
                          setConversationId(undefined);
                        });
                    }}
                  >
                    <Trash2Icon size={16} strokeWidth={1.5} />
                  </span>
                </>
              )}
            </div>
            <span
              className="flex flex-grow flex-col w-full p-2.5 gap-2 overflow-x-hidden overflow-y-auto"
              ref={scrollRef}
            >
              {getMessages?.map(({ message, _id, userId, messageId }) => (
                <Fragment key={_id}>
                  {userId.split("|")[1] === user?.id ? (
                    <div
                      className="flex flex-col items-end w-fit ml-auto gap-2 scroll-m-2"
                      id={_id}
                    >
                      {messageId && (
                        <span
                          className="flex gap-2 cursor-pointer"
                          onClick={() => {
                            const scrollMessage = document.getElementById(
                              messageId,
                            ) as HTMLDivElement;
                            scrollMessage &&
                              scrollMessage.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                          }}
                        >
                          {(() => {
                            const message = getMessages?.find(
                              ({ _id }) => _id === messageId,
                            )?.message;
                            return (
                              <div
                                className={cn(
                                  "bg-zinc-900 rounded-md w-fit p-1.5 text-sm lg:max-w-xl md:max-w-lg max-w-60 overflow-hidden text-ellipsis whitespace-nowrap opacity-75 select-none",
                                  message
                                    ? "text-muted-foreground"
                                    : "text-zinc-500/80 italic",
                                )}
                              >
                                {message || "Message has been deleted"}
                              </div>
                            );
                          })()}
                          <span className="w-1 h-full rounded-md bg-[#d3f806]" />
                        </span>
                      )}
                      <div className="group flex flex-row-reverse items-center gap-2 w-fit">
                        <div className="bg-blue-600 rounded-md w-fit p-1.5 text-sm lg:max-w-xl md:max-w-lg max-w-60 min-w-0 text-wrap">
                          {message
                            .split(" ")
                            .map((word: string, index: number) => {
                              const isLastWord =
                                index === message.split(" ").length - 1;
                              const isLink =
                                word.startsWith("http") ||
                                word.startsWith("www") ||
                                word.endsWith(".com");

                              if (isLink) {
                                return (
                                  <Fragment key={index}>
                                    <Link
                                      href={
                                        word.startsWith("www") ||
                                        word.endsWith(".com")
                                          ? `https://${word}`
                                          : word
                                      }
                                      target="_blank"
                                      rel="noreferrer"
                                      className="font-semibold text-wrap break-words"
                                    >
                                      {word}
                                    </Link>
                                    {!isLastWord && " "}
                                  </Fragment>
                                );
                              }

                              return (
                                <Fragment key={index}>
                                  {word}
                                  {!isLastWord && " "}
                                </Fragment>
                              );
                            })}
                        </div>
                        <span className="flex gap-2 group-hover:opacity-100 transition-opacity duration-100 opacity-0">
                          <ReplyIcon
                            size={16}
                            strokeWidth={1.5}
                            className="text-zinc-400 cursor-pointer"
                            onClick={() => {
                              setReplyingTo(_id);
                            }}
                          />
                          <Trash2Icon
                            size={16}
                            strokeWidth={1.5}
                            className="text-red-600 cursor-pointer"
                            onClick={() => {
                              deleteMessage.call({}, { messageId: _id });
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col gap-2 mr-auto w-fit items-start scroll-m-2"
                      id={_id}
                    >
                      {messageId && (
                        <span
                          className="flex flex-row-reverse gap-2 cursor-pointer"
                          onClick={() => {
                            const scrollMessage = document.getElementById(
                              messageId,
                            ) as HTMLDivElement;
                            scrollMessage &&
                              scrollMessage.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                          }}
                        >
                          {(() => {
                            const message = getMessages?.find(
                              ({ _id }) => _id === messageId,
                            )?.message;
                            return (
                              <div
                                className={cn(
                                  "bg-zinc-900 rounded-md w-fit p-1.5 text-sm lg:max-w-xl md:max-w-lg max-w-60 overflow-hidden text-ellipsis whitespace-nowrap opacity-75 select-none",
                                  message
                                    ? "text-muted-foreground"
                                    : "text-zinc-500/80 italic",
                                )}
                              >
                                {message || "Message has been deleted"}
                              </div>
                            );
                          })()}
                          <span className="w-1 h-full rounded-md bg-[#d3f806]" />
                        </span>
                      )}
                      <div className="flex items-center gap-2 group w-fit">
                        <span className="aspect-square h-6 w-6 min-w-6 min-h-6 overflow-hidden rounded-full">
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
                        <div className="bg-zinc-600 rounded-md w-fit p-1.5 text-sm lg:max-w-xl md:max-w-lg max-w-60 min-w-0 text-wrap">
                          {message
                            .split(" ")
                            .map((word: string, index: number) => {
                              const isLastWord =
                                index === message.split(" ").length - 1;
                              const isLink =
                                word.startsWith("http") ||
                                word.startsWith("www") ||
                                word.endsWith(".com");

                              if (isLink) {
                                return (
                                  <Fragment key={index}>
                                    <Link
                                      href={
                                        word.startsWith("www") ||
                                        word.endsWith(".com")
                                          ? `https://${word}`
                                          : word
                                      }
                                      target="_blank"
                                      rel="noreferrer"
                                      className="font-semibold break-words"
                                    >
                                      {word}
                                    </Link>
                                    {!isLastWord && " "}
                                  </Fragment>
                                );
                              }

                              return (
                                <Fragment key={index}>
                                  {word}
                                  {!isLastWord && " "}
                                </Fragment>
                              );
                            })}
                        </div>
                        <span className="flex gap-2 group-hover:opacity-100 transition-opacity duration-100 opacity-0">
                          <ReplyIcon
                            size={16}
                            strokeWidth={1.5}
                            className="text-zinc-400 cursor-pointer"
                            onClick={() => {
                              setReplyingTo(_id);
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  )}
                </Fragment>
              ))}
            </span>
            <form onSubmit={handleFormSubmit} ref={messageFormRef}>
              {replyingTo && (
                <div className="flex items-start gap-2 p-2 border-t border-t-zinc-900 justify-between">
                  <span className="flex gap-2 lg:items-center items-start lg:flex-row flex-col">
                    <span className="text-muted-foreground text-sm">
                      Replying to:
                    </span>
                    <span className="bg-zinc-900 bg-opacity-60 rounded-md p-1.5 text-sm lg:max-w-xl md:max-w-lg max-w-60 overflow-hidden text-ellipsis whitespace-nowrap min-w-0 text-zinc-500/90">
                      {
                        getMessages?.find(({ _id }) => _id === replyingTo)
                          ?.message
                      }
                    </span>
                  </span>
                  <span
                    className="cursor-pointer text-red-600 text-sm"
                    onClick={() => {
                      setReplyingTo(undefined);
                    }}
                  >
                    <XIcon
                      size={16}
                      strokeWidth={1.5}
                      onClick={() => {
                        setReplyingTo(undefined);
                      }}
                    />
                  </span>
                </div>
              )}
              <span className="p-2 w-full flex">
                <textarea
                  ref={messageInputRef}
                  className="w-full rounded-md text-sm px-2 py-1.5 border border-zinc-900 bg-zinc-900 bg-opacity-60 h-8 resize-none overflow-hidden"
                  onChange={autoHeight}
                  onKeyDown={handleKeyDown}
                  placeholder="Send a message..."
                />
              </span>
            </form>
          </div>
        ) : (
          <div className="hidden justify-center items-center flex-col flex-grow gap-6 lg:flex">
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
