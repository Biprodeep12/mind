"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Calendar, Save, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Editor } from "@/components/ui/editor";

// Define the mood options
const moodOptions = [
  {
    value: "Great",
    label: "Great",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  },
  {
    value: "Good",
    label: "Good",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  },
  {
    value: "Neutral",
    label: "Neutral",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  },
  {
    value: "Low",
    label: "Low",
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  },
  {
    value: "Very Low",
    label: "Very Low",
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  },
];

interface JournalEntry {
  id?: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

interface JournalEntryFormProps {
  entryId?: string;
}

export default function JournalEntryForm({ entryId }: JournalEntryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [entry, setEntry] = useState<JournalEntry>({
    title: "",
    content: "",
    mood: "Neutral",
    tags: [],
    date: new Date().toISOString().split("T")[0],
  });

  // Fetch existing entry if editing
  useEffect(() => {
    const fetchEntry = async () => {
      if (!entryId) return;

      try {
        setIsLoading(true);
        setError("");
        const docRef = doc(db, "journalEntries", entryId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as JournalEntry;
          setEntry({
            id: docSnap.id,
            title: data.title,
            content: data.content,
            mood: data.mood,
            tags: data.tags,
            date: data.date,
          });
        } else {
          setError("Entry not found");
          setTimeout(() => router.push("/journal"), 2000);
        }
      } catch (error) {
        console.error("Error fetching entry:", error);
        setError("Failed to load journal entry");
      } finally {
        setIsLoading(false);
      }
    };

    if (entryId) {
      fetchEntry();
    }
  }, [entryId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleMoodChange = (value: string) => {
    setEntry((prev) => ({ ...prev, mood: value }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!entry.tags.includes(tagInput.trim().toLowerCase())) {
        setEntry((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim().toLowerCase()],
        }));
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEntry((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!entry.title.trim() || !entry.content.trim()) {
      setError(
        "Please provide both a title and content for your journal entry"
      );
      return;
    }

    try {
      setIsLoading(true);
      const timestamp = new Date();

      if (entryId) {
        // Update existing entry
        const docRef = doc(db, "journalEntries", entryId);
        await updateDoc(docRef, {
          ...entry,
          updatedAt: timestamp,
        });
        setSuccess("Entry updated successfully");
      } else {
        // Create new entry
        // Generate an excerpt from the content (strip HTML tags)
        const plainTextContent = entry.content.replace(/<[^>]*>/g, "");
        const excerpt =
          plainTextContent.substring(0, 100) +
          (plainTextContent.length > 100 ? "..." : "");

        await addDoc(collection(db, "journalEntries"), {
          ...entry,
          excerpt,
          createdAt: timestamp,
          updatedAt: timestamp,
        });
        setSuccess("Entry saved successfully");
      }

      // Redirect after a short delay to show the success message
      setTimeout(() => router.push("/journal"), 1000);
    } catch (error) {
      console.error("Error saving entry:", error);
      setError("Failed to save your journal entry");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/journal">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Journal
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">
          {entryId ? "Edit Journal Entry" : "New Journal Entry"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {entryId
            ? "Update your thoughts and feelings"
            : "Express your thoughts and feelings"}
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {isLoading && !entry.id ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading entry...</span>
        </div>
      ) : (
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Journal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={entry.title}
                  onChange={handleChange}
                  placeholder="Give your entry a title..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="mood" className="text-sm font-medium">
                    How are you feeling?
                  </label>
                  <Select value={entry.mood} onValueChange={handleMoodChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your mood" />
                    </SelectTrigger>
                    <SelectContent>
                      {moodOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center">
                            <span
                              className={`inline-block w-3 h-3 rounded-full mr-2 ${
                                option.color.split(" ")[0]
                              }`}
                            ></span>
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={entry.date}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Journal Entry
                </label>
                <Editor
                  id="content"
                  value={entry.content}
                  onChange={(value: string) =>
                    setEntry((prev) => ({ ...prev, content: value }))
                  }
                  placeholder="Write your thoughts here..."
                  className="min-h-[200px] border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="tags" className="text-sm font-medium">
                  Tags (press Enter to add)
                </label>
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add tags to categorize your entry..."
                />

                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs flex items-center"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {entryId ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {entryId ? "Update Entry" : "Save Entry"}
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
}
