"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Loader2,
  Stethoscope,
  MessageCircle,
  X,
  Cross,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_KEY =
  "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

interface MentalHealthChatProps {
  setChat: (value: boolean) => void;
}

export default function MentalHealthChat({ setChat }: MentalHealthChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendMessage(messages: Message[]) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Mental Health Consultation",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "system",
              content:
                "You are Dr. AI, a compassionate and knowledgeable mental health professional. While you cannot diagnose or prescribe medication, you provide evidence-based information, general mental health guidance, and emotional support. Always maintain a professional yet warm demeanor, use appropriate medical terminology when relevant, and emphasize the importance of consulting with licensed mental health professionals for specific medical advice or treatment. Prioritize patient safety and well-being in all interactions.",
            },
            ...messages,
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendMessage([...messages, userMessage]);
      const assistantMessage: Message = {
        role: "assistant",
        content: response.choices[0].message.content,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function ChatMessage({ message }: { message: Message }) {
    const isUser = message.role === "user";

    return (
      <div
        className={cn(
          "flex items-start gap-2 p-2 rounded-lg",
          isUser ? "user-message" : "assistant-message"
        )}
      >
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            isUser ? "bg-gray-500" : "bg-cyan-100"
          )}
        >
          {isUser ? (
            <MessageCircle className="w-5 h-5 text-white" />
          ) : (
            <Stethoscope color="blue" className="w-5 h-5 text-white" />
          )}
        </div>
        <div
          className={cn(
            "flex-1 rounded-lg p-2",
            isUser ? "bg-blue-100" : "bg-green-100"
          )}
        >
          <p className="text-base font-medium text-gray-900">
            {isUser ? "You" : "Dr. AI"}
          </p>
          <p className="mt-1 text-gray-700 whitespace-pre-wrap ">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  function LoadingAnimation() {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-24 h-12" viewBox="0 0 120 40">
              <path
                className="animate-pulse stroke-primary"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                d="M0,20 L10,20 L20,10 L30,30 L40,20 L50,20 L60,10 L70,30 L80,20 L90,20 L100,10 L110,30 L120,20"
              />
            </svg>
          </div>
          <div className="relative z-[90] w-8 h-8 bg-primary rounded-lg animate-pulse flex items-center justify-center">
            <Cross color="white" />
          </div>
        </div>
        <span className="ml-3 text-primary font-medium">
          Dr. AI is thinking...
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="fixed w-full h-full  z-[90] flex justify-center items-center ano">
        <div className="relative flex flex-col bg-white w-[90%] h-[90%] rounded-2xl overflow-hidden ani">
          <button
            className="absolute right-2 top-2 hover:bg-gray-200 rounded-xl"
            onClick={() => setChat(false)}
          >
            <X size={40} />
          </button>
          <header className="bg-white shadow-lg">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="flex items-center gap-3">
                <Stethoscope color="blue" className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Mental Health Consultation
                </h1>
              </div>
              <p className="mt-2 text-gray-600">
                Consult with Dr. AI about your mental health concerns. While I
                can provide general guidance and support, please remember to
                seek professional care for specific mental health issues.
              </p>
            </div>
          </header>

          <main className="flex-1 overflow-hidden">
            <div className="max-w-4xl mx-auto h-full flex flex-col px-4">
              <div className="flex-1 overflow-y-auto py-8 sc">
                {messages.length === 0 ? (
                  <div className="text-center space-y-4">
                    <div className="health-card">
                      <h2 className="text-xl font-semibold text-gray-900 mb-3">
                        Welcome to Your Mental Health Consultation
                      </h2>
                      <p className="text-gray-600 mb-2">
                        I am Dr. AI, your virtual mental health consultant. I am
                        here to provide support, guidance, and a listening ear
                        for your mental well-being journey.
                      </p>
                      <p className="text-gray-600">
                        Important: While I can offer general mental health
                        information and emotional support, I cannot provide
                        specific diagnoses or prescribe medication. For urgent
                        mental health concerns, please contact a licensed mental
                        health professional or emergency services.
                      </p>
                      <div className="mt-6 pb-4 pt-2 bg-green-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-1 text-xl">
                          Crisis Resources
                        </h3>
                        <p className="text-sm text-gray-700">
                          If you are experiencing a mental health crisis or
                          having thoughts of self-harm:
                        </p>
                        <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                          <li>
                            Emergency: Call 911 (US) or your local emergency
                            number
                          </li>
                          <li>
                            988 Suicide & Crisis Lifeline: Call or text 988
                          </li>
                          <li>Crisis Text Line: Text HOME to 741741</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message, index) => (
                      <ChatMessage key={index} message={message} />
                    ))}
                    {isLoading && <LoadingAnimation />}
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="py-4">
                <div className="grid grid-cols-[90%_80px]">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Share your thoughts and feelings..."
                    className="p-2 mr-3 border-[#ccc] border-2 rounded-sm outline-none focus:border-blue-600"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="health-button flex justify-center items-center flex-nowrap gap-2 bg-blue-500 text-white rounded-sm hover:bg-blue-400 cursor-pointer
                    px-1 min-w-[80px]
                    "
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </main>

          <footer className="bg-white border-t border-gray-200 py-4">
            <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-600">
              This is not a substitute for professional mental health care. If
              you Are experiencing a crisis, please seek immediate professional
              help.
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
