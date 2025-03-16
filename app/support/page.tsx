"use client";

import { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue, off } from "firebase/database";
import { useAuth } from "@/lib/useAuth"; // Adjust the import based on your auth setup

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
}

export default function CommunitySupport() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const db = getDatabase();

  useEffect(() => {
    const messagesRef = ref(db, "messages");
    const listener = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMessages(messageList.reverse()); // Reverse to show latest messages at the bottom
      } else {
        setMessages([]);
      }
    });

    return () => off(messagesRef, "value", listener);
  }, [db]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      const message = {
        user: user.displayName || "Anonymous",
        content: newMessage,
        timestamp: new Date().toLocaleString(),
      };
      push(ref(db, "messages"), message);
      setNewMessage("");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Community Chat</h1>
      <p className="text-gray-700 mb-8 text-center">
        Chat with others in real time. Share your thoughts, ask questions, and
        connect!
      </p>

      <div className="max-w-2xl mx-auto">
        {user ? (
          <form onSubmit={handleSubmit} className="mb-8">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </form>
        ) : (
          <p className="text-center text-gray-700">
            Please sign in to send messages.
          </p>
        )}

        <div className="space-y-6 h-[400px] overflow-y-auto p-4 bg-white rounded-lg shadow-md">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-lg ${
                message.user === (user?.displayName || "Anonymous")
                  ? "bg-blue-100 ml-auto max-w-[80%]"
                  : "bg-gray-100 mr-auto max-w-[80%]"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{message.user}</span>
                <span className="text-sm text-gray-500">
                  {message.timestamp}
                </span>
              </div>
              <p className="text-gray-700">{message.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
