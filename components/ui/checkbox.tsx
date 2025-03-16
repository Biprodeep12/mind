import * as React from "react";
import { cn } from "@/lib/utils";
const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-5 w-5 rounded border border-gray-300 bg-white checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
