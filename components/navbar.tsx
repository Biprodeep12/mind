"use client";

import { Bot, Heart, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import MentalHealthChat from "@/components/AI";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "firebase/auth";

export default function Nav() {
  const [chat, setChat] = useState<boolean>(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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

              {/* Keep these options visible for all users */}
              <Button className="text-xl" asChild variant="ghost" size="sm">
                <Link href={user ? "/dashboard" : "/auth"}>Dashboard</Link>
              </Button>
              <Button className="text-xl" asChild variant="ghost" size="sm">
                <Link href={user ? "/journal" : "/auth"}>Journal</Link>
              </Button>
              <Button className="text-xl" asChild variant="ghost" size="sm">
                <Link href={user ? "/resources" : "/auth"}>Resources</Link>
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.photoURL || ""}
                          alt={user.displayName || "User"}
                        />
                        <AvatarFallback>
                          {user.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem className="flex-col items-start">
                      <div className="text-sm font-medium">
                        {user.displayName || "User"}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile" className="flex w-full">
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button className="text-xl" asChild size="sm">
                  <Link href="/auth">
                    <User color="white" className="transform scale-150" />
                  </Link>
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
