"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import botSvg from "../public/bot-svgrepo-com.svg";
import userSvg from "../public/user-svgrepo-com.svg";

const Loading = () => {
  return (
    <div className="skeleton">
      <div className="animate-pulse">Generating...</div>
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI("AIzaSyBMpzsWhgXDO-DBMbaDhyvXhnkGXU0frj0");
  // Initialize the model with gemini-pro model for chat
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const messagesEndRef = useRef(null);

  // Function to handle sending messages

  const sendMessage = async (message) => {
    try {
      setLoading(true);
      // Update messages state with user message
      setMessages((prevMessages) => [...prevMessages, { role: "user", text: message }]);

      // Show typing message while waiting for response
      setMessages((prevMessages) => [...prevMessages, { role: "bot", text: <Loading /> }]);

      // Send user message to the Gemini API
      const result = await model.generateContent(message);

      // Get response from the Gemini API
      const response = await result.response;
      const text = await response.text();

      // Remove typing message
      setMessages((prevMessages) => prevMessages.slice(0, -1));

      // Update messages state with bot response (initially empty)
      setMessages((prevMessages) => [...prevMessages, { role: "bot", text: <Loading /> }]);

      // Typing effect: loop through each character of the response and update state
      for (let i = 0; i < text.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 10)); // Delay between each character
        const partialText = text.substring(0, i + 1); // Get characters up to the current index
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[prevMessages.length - 1].text = partialText; // Update the last message
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <section className="chat-section w-full border border-gray-300 rounded-md h-[63vh] md:h-[70vh] mb-3 overflow-auto">
        <div className="messages-container">
          {messages.length === 0 && (
            <div className="flex justify-center items-center w-full h-[63vh] md:h-[70vh]">
              <p className="text-sm md:text-lg max-w-prose font-medium mb-3 text-gray-500">Start by asking me something...</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"} p-3`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image
                    alt="Avatar"
                    src={msg.role === "user" ? userSvg : botSvg}
                    width={10}
                    height={10}
                  />
                </div>
              </div>
              <div className="chat-header">{msg.role === "user" ? "You" : "Bot"}</div>
              <div
                className={`chat-bubble ${
                  msg.role === "user" ? "chat-bubble-primary" : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </section>
      <div className="relative">
        <input
          type="text"
          placeholder="Ask me anything..."
          className="input input-bordered w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <button
          type="submit"
          className="btn btn-neutral top-0 right-0 absolute"
          onClick={() => sendMessage(document.querySelector('input[type="text"]').value)}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8.004 8.004 0 014 4.044M22 12h-4a8.001 8.001 0 00-7.745-7.996"
              ></path>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </svg>
          )}
        </button>
      </div>
    </>
  );
};

export default Chat;
