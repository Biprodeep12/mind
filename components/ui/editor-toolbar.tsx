"use client";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface EditorToolbarProps {
  editor: HTMLDivElement | null;
  className?: string;
}

export function EditorToolbar({ editor, className }: EditorToolbarProps) {
  const execCommand = (command: string, value?: string) => {
    if (!editor) return;

    editor.focus();
    document.execCommand(command, false, value ?? undefined);
  };

  return (
    <div className={`flex flex-wrap gap-1 p-1 border-b ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => execCommand("bold")}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => execCommand("italic")}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => execCommand("insertUnorderedList")}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => execCommand("insertOrderedList")}
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => execCommand("justifyLeft")}
        title="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => execCommand("justifyCenter")}
        title="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => execCommand("justifyRight")}
        title="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
