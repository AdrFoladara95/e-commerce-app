import React, { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChatSupport() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! 👋 How can we help you today?",
      sender: "support",
    },
  ]);

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        text: trimmedMessage,
        sender: "user",
      },
    ]);

    setMessage("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] text-gray-900">
      {/* Header */}
      <header className="relative flex items-center justify-center bg-white px-5 py-5 shadow-sm md:px-8 md:py-6 lg:px-10">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 flex h-10 w-10 items-center justify-center md:left-8"
          aria-label="Go back"
        >
          <ArrowLeft
            size={20}
            className="md:h-6 md:w-6"
          />
        </button>

        <div className="text-center">
          <h1 className="text-xl font-semibold md:text-2xl">
            Chat Support
          </h1>

          <p className="mt-1 text-xs text-green-500 md:text-sm">
            Support is available
          </p>
        </div>
      </header>

      {/* Messages */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col space-y-4 overflow-y-auto px-5 py-5 sm:px-6 md:px-8 md:py-6 lg:px-10">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`flex ${
              item.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm md:max-w-[65%] md:px-5 md:py-4 md:text-base ${
                item.sender === "user"
                  ? "rounded-br-md bg-indigo-500 text-white"
                  : "rounded-bl-md bg-white text-gray-700 shadow-sm"
              }`}
            >
              {item.text}
            </div>
          </div>
        ))}
      </main>

      {/* Message Input */}
      <div className="border-t border-gray-200 bg-white p-4 md:p-5">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 md:px-4 md:py-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-sm outline-none md:text-base"
            />

            <button
              onClick={handleSend}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white md:h-10 md:w-10"
              aria-label="Send message"
            >
              <Send
                size={17}
                className="md:h-4.5 md:w-4.5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}