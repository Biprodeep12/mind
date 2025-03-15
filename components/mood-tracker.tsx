"use client";

import type React from "react";

import { useState } from "react";
import { Frown, Meh, Smile, ThumbsDown, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MoodLevel = 1 | 2 | 3 | 4 | 5;
type MoodOption = {
  value: MoodLevel;
  label: string;
  icon: React.ReactNode;
  color: string;
};

const moodOptions: MoodOption[] = [
  {
    value: 1,
    label: "Very Low",
    icon: <ThumbsDown className="h-8 w-8" />,
    color:
      "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-800/30",
  },
  {
    value: 2,
    label: "Low",
    icon: <Frown className="h-8 w-8" />,
    color:
      "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:hover:bg-orange-800/30",
  },
  {
    value: 3,
    label: "Neutral",
    icon: <Meh className="h-8 w-8" />,
    color:
      "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-800/30",
  },
  {
    value: 4,
    label: "Good",
    icon: <Smile className="h-8 w-8" />,
    color:
      "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-800/30",
  },
  {
    value: 5,
    label: "Excellent",
    icon: <ThumbsUp className="h-8 w-8" />,
    color:
      "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-800/30",
  },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {moodOptions.map((option) => (
          <Button
            key={option.value}
            variant="outline"
            className={cn(
              "flex h-auto flex-col items-center justify-center gap-1 p-3",
              selectedMood === option.value ? option.color : ""
            )}
            onClick={() => setSelectedMood(option.value)}
          >
            {option.icon}
            <span className="text-xs font-medium">{option.label}</span>
          </Button>
        ))}
      </div>

      {selectedMood && (
        <Card className="p-4 bg-slate-50 dark:bg-slate-900">
          <div className="text-center">
            <p className="font-medium">
              You selected:{" "}
              {moodOptions.find((m) => m.value === selectedMood)?.label}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Would you like to add some notes about how you are feeling?
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
