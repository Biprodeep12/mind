"use client";

import MentalHealthChat from "@/components/AI";
import { useState } from "react";

export default function AiPage() {
  const [, setChat] = useState(false);
  return <MentalHealthChat setChat={setChat} />;
}
