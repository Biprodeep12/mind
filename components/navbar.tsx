"use client";

import { Bot, Heart, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import MentalHealthChat from "@/components/AI";
import { useState } from "react";

export default function Nav() {
  const [chat, setChat] = useState<boolean>(false);
  return (
    <>
      {chat && <MentalHealthChat setChat={setChat} />}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center">
            <Heart className="h-6 w-6 text-primary" color="green" />
            <Link href="/" className="text-2xl font-bold">
              MindTrack
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button
                onClick={() => setChat(true)}
                className="text-xl"
                asChild
                variant="ghost"
                size="sm"
              >
                <div className="flex gap-3 flex-nowrap flex-row cursor-pointer">
                  <Bot color="blue" className="transform scale-150" />
                  Dr.AI
                </div>
              </Button>
              <Button className="text-xl" asChild variant="ghost" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button className="text-xl" asChild variant="ghost" size="sm">
                <Link href="/journal">Journal</Link>
              </Button>
              <Button className="text-xl" asChild variant="ghost" size="sm">
                <Link href="/resources">Resources</Link>
              </Button>
              <Button className="text-xl" asChild size="sm">
                <Link href="/profile">
                  <User className="transform scale-125" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
