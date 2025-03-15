"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneCall, Globe, AlertTriangle, XCircle } from "lucide-react";

const crisisHotlines = [
  {
    country: "United States",
    number: "1-800-273-8255",
    website: "https://suicidepreventionlifeline.org/",
    description: "24/7 free and confidential support for people in distress.",
  },
  {
    country: "United Kingdom",
    number: "116 123",
    website: "https://www.samaritans.org/",
    description: "Emotional support for those struggling with mental health.",
  },
  {
    country: "Canada",
    number: "1-833-456-4566",
    website: "https://www.crisisservicescanada.ca/",
    description: "Support for individuals in crisis across Canada.",
  },
  {
    country: "India",
    number: "9152987821",
    website: "https://snehi.org/",
    description: "Counseling and mental health support services.",
  },
  {
    country: "Australia",
    number: "13 11 14",
    website: "https://www.lifeline.org.au/",
    description: "24/7 crisis support and suicide prevention services.",
  },
];

const Crisis: React.FC = () => {
  const [isVisible] = useState(true);
  const router = useRouter();

  if (!isVisible) return null;

  return (
    <div className="crisis-container relative flex flex-col items-center justify-center p-4 space-y-4 min-h-screen w-full bg-gradient-to-r from-red-900 via-gray-800 to-red-900 text-white">
      <div className="relative flex flex-col items-center justify-center p-8 space-y-8 min-h-screen w-full bg-gradient-to-r from-red-900 via-gray-800 to-red-900 text-white">
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 right-4 text-white bg-red-700 hover:bg-red-800 p-2 rounded-full shadow-md"
        >
          <XCircle className="w-6 h-6" />
        </button>
        <div className="text-center px-4">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            🚨 Crisis Hotlines 🚨
          </h1>
          <p className="text-lg mt-3 font-medium">
            You are not alone. Immediate help is available.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
          {crisisHotlines.map((hotline, index) => (
            <Card
              key={index}
              className="p-6 shadow-xl border border-red-500 rounded-2xl bg-gray-900 transition-transform transform hover:scale-105 hover:shadow-2xl text-white"
            >
              <CardContent className="flex flex-col items-center space-y-5 text-center">
                <h2 className="text-3xl font-bold text-red-400">
                  {hotline.country}
                </h2>
                <p className="text-lg font-semibold text-red-300">
                  {hotline.number}
                </p>
                <p className="text-base text-gray-300 italic">
                  {hotline.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-5 w-full">
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg w-full sm:w-auto text-lg font-semibold shadow-md">
                    <a
                      href={`tel:${hotline.number}`}
                      className="flex items-center space-x-2"
                    >
                      <PhoneCall className="w-6 h-6" />
                      <span>Call Now</span>
                    </a>
                  </Button>
                  <Button
                    className="border border-red-500 text-black hover:bg-green-700 hover:text-white px-5 py-3 rounded-lg w-full sm:w-auto text-lg font-semibold"
                    variant="outline"
                  >
                    <Link
                      href={hotline.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <Globe className="w-6 h-6" />
                      <span>Visit Site</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center px-4 mt-10 bg-red-800 border-l-4 border-red-600 p-4 rounded-md shadow-md">
          <div className="flex items-center justify-center space-x-2">
            <AlertTriangle className="text-red-300 w-6 h-6" />
            <p className="text-md text-white font-semibold">
              If you or someone you know is in crisis, please reach out. Help is
              available 24/7.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crisis;
