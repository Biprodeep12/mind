"use client";

import { useParams } from "next/navigation";
import JournalEntryForm from "@/components/journal-entry-form";

export default function EditJournalEntryPage() {
  const params = useParams();
  const entryId = params?.id ? String(params.id) : "";

  return <JournalEntryForm entryId={entryId} />;
}
