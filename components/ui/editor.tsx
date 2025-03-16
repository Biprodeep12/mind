"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface EditorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function Editor({
  id,
  value,
  onChange,
  placeholder = "Start writing...",
  className,
  disabled = false,
}: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Sync the content from the editable div to the parent component
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Initialize the editor content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div
      className={cn(
        "relative min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2",
        isFocused && "ring-2 ring-ring ring-offset-2",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {!value && !isFocused && (
        <div className="pointer-events-none absolute left-3 top-2 text-muted-foreground">
          {placeholder}
        </div>
      )}
      <div
        id={id}
        ref={editorRef}
        contentEditable={!disabled}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="outline-none min-h-[180px]"
        dangerouslySetInnerHTML={{ __html: value }}
      />
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
        {value.length} characters
      </div>
    </div>
  );
}
