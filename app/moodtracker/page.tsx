"use client";

import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type MoodEntry = {
  id: string;
  date: string;
  mood: string;
  timestamp: Timestamp;
};

export default function Home() {
  const [mood, setMood] = useState<string>("");
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [hasLoggedToday, setHasLoggedToday] = useState<boolean>(false);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchMoodHistory(user.uid);
        checkIfUserHasLoggedToday(user.uid);
      } else {
        setUser(null);
        setMoodHistory([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch mood history from Firestore
  const fetchMoodHistory = async (userId: string) => {
    const moodsRef = collection(db, "users", userId, "moods");
    const querySnapshot = await getDocs(moodsRef);
    const history = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().timestamp.toDate().toLocaleString(),
    })) as MoodEntry[];
    setMoodHistory(history);
  };

  // Check if the user has already logged their mood today
  const checkIfUserHasLoggedToday = async (userId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const moodsRef = collection(db, "users", userId, "moods");
    const q = query(
      moodsRef,
      where("timestamp", ">=", Timestamp.fromDate(today))
    );
    const querySnapshot = await getDocs(q);
    setHasLoggedToday(!querySnapshot.empty);
  };

  // Log mood to Firestore
  const handleLogMood = async () => {
    if (mood.trim() === "" || !user || hasLoggedToday) return;

    const newEntry = {
      mood: mood.trim(),
      timestamp: Timestamp.now(),
    };

    try {
      const userMoodsRef = collection(db, "users", user.uid, "moods");
      await addDoc(userMoodsRef, newEntry);
      setMood("");
      fetchMoodHistory(user.uid);
      setHasLoggedToday(true);
    } catch (error) {
      console.error("Error logging mood:", error);
    }
  };

  // Delete a mood entry
  const handleDeleteMood = async (moodId: string) => {
    if (!user) return;

    try {
      const moodRef = doc(db, "users", user.uid, "moods", moodId);
      await deleteDoc(moodRef);
      fetchMoodHistory(user.uid);
    } catch (error) {
      console.error("Error deleting mood:", error);
    }
  };

  // Get the most frequent mood
  const getMostFrequentMood = () => {
    const moodCounts: { [key: string]: number } = {};
    moodHistory.forEach((entry) => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });

    const mostFrequent = Object.keys(moodCounts).reduce((a, b) =>
      moodCounts[a] > moodCounts[b] ? a : b
    );
    return mostFrequent;
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Mood Trends Over Time",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // Chart data
  const chartData = {
    labels: moodHistory.map((entry) => entry.date),
    datasets: [
      {
        label: "Mood Intensity",
        data: moodHistory.map((entry) => {
          switch (entry.mood.toLowerCase()) {
            case "happy":
              return 5;
            case "sad":
              return 1;
            case "neutral":
              return 3;
            case "angry":
              return 2;
            case "excited":
              return 4;
            default:
              return 3;
          }
        }),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Return to Homepage Button */}
        <Link
          href="/"
          className="inline-block mb-8 text-blue-500 hover:text-blue-700 transition-colors"
        >
          ← Return to Homepage
        </Link>

        <h1 className="text-4xl font-bold text-center mb-8">Mood Tracker</h1>

        {/* Mood Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">
            How are you feeling today?
          </h2>
          {user ? (
            <>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter your mood (e.g., Happy, Sad, Neutral)"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={hasLoggedToday}
                />
                <button
                  onClick={handleLogMood}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                  disabled={hasLoggedToday}
                >
                  {hasLoggedToday ? "Already Logged Today" : "Log Mood"}
                </button>
              </div>
              {hasLoggedToday && (
                <p className="text-sm text-gray-500 mt-2">
                  You can only log your mood once per day.
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-500">Please log in to track your mood.</p>
          )}
        </motion.div>

        {/* Mood Summary Section */}
        {user && moodHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Mood Summary</h2>
            <p className="text-lg">
              Your most frequent mood:{" "}
              <span className="font-bold">{getMostFrequentMood()}</span>
            </p>
          </motion.div>
        )}

        {/* Mood History Section */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-md mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Mood History</h2>
            {moodHistory.length === 0 ? (
              <p className="text-gray-500">No mood entries yet.</p>
            ) : (
              <ul className="space-y-2">
                {moodHistory.map((entry, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                  >
                    <span>{entry.mood}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {entry.date}
                      </span>
                      <button
                        onClick={() => handleDeleteMood(entry.id)}
                        className="text-sm text-red-500 hover:text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}

        {/* Mood Chart Section */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Mood Trends</h2>
            <div className="h-96">
              <Line data={chartData} options={chartOptions} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
