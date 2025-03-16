"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Edit, Plus, Search, Loader2 } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Nav from "@/components/navbar";

interface JournalEntry {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  mood: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function JournalPage() {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setIsLoading(true);
        const entriesQuery = query(
          collection(db, "journalEntries"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(entriesQuery);

        const entries: JournalEntry[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<JournalEntry, "id">;
          entries.push({
            id: doc.id,
            ...data,
            date:
              data.date ||
              new Date(
                (
                  data.createdAt as unknown as { toDate: () => Date }
                )?.toDate?.() || data.createdAt
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
          });
        });

        setJournalEntries(entries);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
        setError("Failed to load journal entries");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  // Filter entries based on search query and active tab
  const filteredEntries = journalEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "favorites")
      return matchesSearch && entry.tags.includes("favorite");
    if (activeTab === "tags") return matchesSearch && entry.tags.length > 0;

    return matchesSearch;
  });

  return (
    <>
      <Nav />

      <div className="container py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Journal</h1>
            <p className="text-muted-foreground mt-1">
              Express your thoughts and track your journey
            </p>
          </div>
          <Button asChild>
            <Link href="/journal/new">
              <Plus className="mr-2 h-4 w-4" />
              New Entry
            </Link>
          </Button>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search entries..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList>
              <TabsTrigger value="all">All Entries</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading entries...</span>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No journal entries found
            </p>
            <Button asChild>
              <Link href="/journal/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Entry
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle>{entry.title}</CardTitle>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        entry.mood === "Good" || entry.mood === "Great"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : entry.mood === "Neutral"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      {entry.mood}
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {entry.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {entry.excerpt}
                  </p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="ghost" className="w-full gap-1" asChild>
                    <Link href={`/journal/${entry.id}`}>
                      <Edit className="h-4 w-4" />
                      Read & Edit
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
