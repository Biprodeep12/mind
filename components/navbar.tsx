import { Bot, Heart } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-2 items-center">
          <Heart className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold">
            MindTrack
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild variant="ghost" size="sm">
              <div className="flex items-center justify-center">
                <Bot color="blue" />
                <Link href="/AI">Dr.AI</Link>
              </div>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/journal">Journal</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/resources">Resources</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/profile">Profile</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
