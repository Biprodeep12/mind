"use client"

import { useState } from "react"
import { Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Suggestion = {
  id: string
  category: "exercise" | "mindfulness" | "social" | "creative"
  title: string
  description: string
  timeEstimate: string
  difficulty: "easy" | "medium" | "hard"
}

const suggestions: Suggestion[] = [
  {
    id: "1",
    category: "exercise",
    title: "Quick Walk",
    description: "Take a 10-minute walk outside to clear your mind.",
    timeEstimate: "10 min",
    difficulty: "easy",
  },
  {
    id: "2",
    category: "mindfulness",
    title: "Deep Breathing",
    description: "Practice deep breathing exercises to reduce stress.",
    timeEstimate: "5 min",
    difficulty: "easy",
  },
  {
    id: "3",
    category: "social",
    title: "Connect",
    description: "Message a friend or family member you haven't spoken to recently.",
    timeEstimate: "15 min",
    difficulty: "medium",
  },
]

export default function DailySuggestions() {
  const [completedActivities, setCompletedActivities] = useState<string[]>([])

  const toggleCompleted = (id: string) => {
    setCompletedActivities((prev) =>
      prev.includes(id) ? prev.filter((activityId) => activityId !== id) : [...prev, id],
    )
  }

  const getCategoryColor = (category: Suggestion["category"]) => {
    switch (category) {
      case "exercise":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "mindfulness":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "social":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "creative":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400"
    }
  }

  return (
    <div className="space-y-3">
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <Button
            size="sm"
            variant="outline"
            className={`rounded-full h-6 w-6 p-1 ${
              completedActivities.includes(suggestion.id) ? "bg-primary text-primary-foreground" : ""
            }`}
            onClick={() => toggleCompleted(suggestion.id)}
          >
            {completedActivities.includes(suggestion.id) && <Check className="h-3 w-3" />}
          </Button>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p
                  className={`font-medium ${completedActivities.includes(suggestion.id) ? "line-through text-muted-foreground" : ""}`}
                >
                  {suggestion.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>
              </div>
              <Badge variant="secondary" className={getCategoryColor(suggestion.category)}>
                {suggestion.timeEstimate}
              </Badge>
            </div>
          </div>

          <Button size="sm" variant="ghost" className="rounded-full h-6 w-6 p-1">
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  )
}

