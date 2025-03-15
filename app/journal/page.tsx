import Link from "next/link"
import { Calendar, Edit, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JournalPage() {
  // Sample journal entries - in a real app, these would come from your database
  const journalEntries = [
    {
      id: "1",
      title: "Feeling more hopeful today",
      excerpt: "Today was much better than yesterday. I managed to get out of bed early and...",
      date: "Mar 15, 2025",
      mood: "Good",
      tags: ["hopeful", "progress"],
    },
    {
      id: "2",
      title: "Therapy session reflections",
      excerpt: "My session with Dr. Smith was really insightful today. We discussed...",
      date: "Mar 13, 2025",
      mood: "Neutral",
      tags: ["therapy", "insight"],
    },
    {
      id: "3",
      title: "Struggling with motivation",
      excerpt: "Finding it hard to get motivated today. Everything feels like an uphill battle...",
      date: "Mar 10, 2025",
      mood: "Low",
      tags: ["struggle", "motivation"],
    },
    {
      id: "4",
      title: "Weekend plans with friends",
      excerpt: "Looking forward to meeting up with Alex and Jordan this weekend. It's been a while...",
      date: "Mar 8, 2025",
      mood: "Good",
      tags: ["social", "plans"],
    },
  ]

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Journal</h1>
          <p className="text-muted-foreground mt-1">Express your thoughts and track your journey</p>
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
          <Input placeholder="Search entries..." className="pl-8" />
        </div>

        <Tabs defaultValue="all" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Entries</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {journalEntries.map((entry) => (
          <Card key={entry.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle>{entry.title}</CardTitle>
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    entry.mood === "Good"
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
              <p className="text-sm text-muted-foreground line-clamp-3">{entry.excerpt}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {entry.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
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
    </div>
  )
}

