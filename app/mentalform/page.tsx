"use client";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Heart,
  Shield,
  ArrowLeft,
  Sparkles,
  Moon,
  Coffee,
  Users,
  Book,
  Music,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  text: string;
  options: string[];
  category: string;
  icon: React.ReactNode;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Over the past 2 weeks, how often have you felt down or hopeless?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    category: "Mood",
    icon: <Heart className="h-6 w-6 text-purple-500" />,
  },
  {
    id: 2,
    text: "How often do you have little interest or pleasure in doing things?",
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
    category: "Interest",
    icon: <Sparkles className="h-6 w-6 text-blue-500" />,
  },
  {
    id: 3,
    text: "How is your sleep quality lately?",
    options: ["Very good", "Somewhat good", "Poor", "Very poor"],
    category: "Sleep",
    icon: <Moon className="h-6 w-6 text-indigo-500" />,
  },
  {
    id: 4,
    text: "How is your energy level throughout the day?",
    options: ["Consistently good", "Mostly good", "Often low", "Very low"],
    category: "Energy",
    icon: <Coffee className="h-6 w-6 text-amber-500" />,
  },
  {
    id: 5,
    text: "How often do you feel overwhelmed by your thoughts?",
    options: ["Rarely", "Sometimes", "Often", "Almost always"],
    category: "Thoughts",
    icon: <Brain className="h-6 w-6 text-emerald-500" />,
  },
  {
    id: 6,
    text: "How connected do you feel to others around you?",
    options: [
      "Very connected",
      "Somewhat connected",
      "Isolated",
      "Very isolated",
    ],
    category: "Social",
    icon: <Users className="h-6 w-6 text-cyan-500" />,
  },
  {
    id: 7,
    text: "How well can you concentrate on tasks?",
    options: [
      "Very well",
      "Moderately well",
      "With difficulty",
      "Cannot concentrate",
    ],
    category: "Concentration",
    icon: <Book className="h-6 w-6 text-violet-500" />,
  },
  {
    id: 8,
    text: "How often do you find joy in your usual activities?",
    options: ["Most of the time", "Sometimes", "Rarely", "Never"],
    category: "Joy",
    icon: <Music className="h-6 w-6 text-pink-500" />,
  },
];

const getResultMessage = (score: number) => {
  if (score <= 8) {
    return {
      severity: "Healthy Well-being",
      message: "Your responses suggest you're maintaining good mental health.",
      color: "emerald",
      recommendations: [
        "Continue your positive lifestyle habits",
        "Practice regular mindfulness",
        "Maintain social connections",
        "Stay physically active",
      ],
    };
  } else if (score <= 16) {
    return {
      severity: "Mild Concerns",
      message: "Your responses suggest some mild stress or anxiety.",
      color: "blue",
      recommendations: [
        "Consider incorporating meditation",
        "Establish a regular sleep schedule",
        "Talk to friends or family about your feelings",
        "Try journaling your thoughts",
      ],
    };
  } else if (score <= 24) {
    return {
      severity: "Moderate Concerns",
      message: "Your responses suggest moderate levels of distress.",
      color: "purple",
      recommendations: [
        "Consider speaking with a counselor",
        "Practice stress-management techniques",
        "Join support groups",
        "Maintain a daily routine",
      ],
    };
  } else {
    return {
      severity: "Significant Concerns",
      message: "Your responses suggest significant emotional distress.",
      color: "amber",
      recommendations: [
        "Reach out to a mental health professional",
        "Connect with supportive loved ones",
        "Practice self-care activities",
        "Consider mindfulness-based therapy",
      ],
    };
  }
};

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(
      ((currentQuestion + (showResults ? 1 : 0)) / questions.length) * 100
    );
  }, [currentQuestion, showResults]);

  const handleAnswer = async (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);

      // Save to Firestore
      try {
        await addDoc(collection(db, "responses"), {
          timestamp: new Date(),
          answers: newAnswers,
        });
        console.log("Responses stored successfully!");
      } catch (error) {
        console.error("Error storing responses: ", error);
      }
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const calculateScore = () => {
    return answers.reduce((acc, curr) => acc + curr, 0);
  };

  return (
    <>
      <button className="absolute top-6 right-20 text-black">
        <a href="../">
          <X size={50} />
        </a>
      </button>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="h-12 w-12 text-purple-600 dark:text-purple-400" />
              </motion.div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Mindful Mental Health Check
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              A gentle self-reflection tool for your emotional well-being
            </p>
          </motion.div>

          <Card className="p-6 shadow-lg backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
            <Progress value={progress} className="mb-6" />

            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {questions[currentQuestion].icon}
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {questions[currentQuestion].category}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {currentQuestion + 1} of {questions.length}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {questions[currentQuestion].text}
                  </h2>

                  <div className="grid gap-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full text-left justify-start h-auto py-3 bg-opacity-80 hover:bg-opacity-100"
                          onClick={() => handleAnswer(index)}
                        >
                          {option}
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  {currentQuestion > 0 && (
                    <Button variant="ghost" onClick={goBack} className="mt-4">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous Question
                    </Button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {(() => {
                    const score = calculateScore();
                    const result = getResultMessage(score);
                    return (
                      <div className="space-y-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                          }}
                          className="flex items-center justify-center mb-4"
                        >
                          <Shield
                            className={`h-16 w-16 text-${result.color}-500`}
                          />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                          {result.severity}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-center">
                          {result.message}
                        </p>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg"
                        >
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Personalized Recommendations:
                          </h3>
                          <ul className="space-y-3">
                            {result.recommendations.map((rec, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start text-gray-700 dark:text-gray-300"
                              >
                                <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                                {rec}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                        <div className="text-center space-y-4">
                          <Button
                            onClick={resetQuiz}
                            className="bg-purple-500 hover:bg-purple-600 text-white"
                          >
                            Take Assessment Again
                          </Button>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                            Remember: This is a self-reflection tool, not a
                            diagnostic instrument. If you are experiencing
                            emotional distress, please reach out to a mental
                            health professional.
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </>
  );
}
