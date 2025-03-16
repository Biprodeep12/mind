"use client";

import { useState, useEffect, useCallback } from "react";
import { Bot, Heart, LogOut, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import MentalHealthChat from "@/components/AI";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Nav() {
  const [chat, setChat] = useState<boolean>(false);
  const [user, setUser] = useState(() => auth.currentUser);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, []);

  return (
    <>
      {chat && <MentalHealthChat setChat={setChat} />}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" color="green" />
            <Link href="/" className="text-2xl font-bold">
              MindTrack
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center space-x-2">
            <Button
              onClick={() => setChat(true)}
              className="text-xl backdrop-blur-3xl bg-transparent p-2 rounded-lg hover:bg-white/10 transition"
              asChild
              variant="ghost"
              size="sm"
            >
              <div className="flex gap-3 flex-nowrap flex-row cursor-pointer p-2">
                <Bot color="blue" className="transform scale-150" />
                Dr.AI
              </div>
            </Button>

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
                        src={user?.photoURL || ""}
                        alt={user?.displayName || "User"}
                      />
                      <AvatarFallback>
                        {user?.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="flex-col items-start">
                    <div className="text-sm font-medium">
                      {user?.displayName || "User"}
                    </div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="sm:hidden flex flex-col items-center bg-background py-4 space-y-3">
            <Button
              onClick={() => setChat(true)}
              className="text-xl"
              asChild
              variant="ghost"
            >
              <div className="flex gap-3 flex-nowrap flex-row cursor-pointer">
                <Bot color="blue" className="transform scale-150" />
                Dr.AI
              </div>
            </Button>
            <Button className="text-xl" asChild variant="ghost">
              <Link href={user ? "/dashboard" : "/auth"}>Dashboard</Link>
            </Button>
            <Button className="text-xl" asChild variant="ghost">
              <Link href={user ? "/journal" : "/auth"}>Journal</Link>
            </Button>
            <Button className="text-xl" asChild variant="ghost">
              <Link href={user ? "/resources" : "/auth"}>Resources</Link>
            </Button>

            {user ? (
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={user?.photoURL || ""}
                    alt={user?.displayName || "User"}
                  />
                  <AvatarFallback>
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
                <Button onClick={handleSignOut} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </div>
            ) : (
              <Button className="text-xl" asChild>
                <Link href="/auth">
                  <User color="white" className="transform scale-150" />
                </Link>
              </Button>
            )}
          </nav>
        )}
      </header>
    </>
  );
}
