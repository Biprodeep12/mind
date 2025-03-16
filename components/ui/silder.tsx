import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  className?: string; // Explicitly add className
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, ...props }, ref) => {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-300">
        <SliderPrimitive.Range className="absolute h-full bg-blue-600" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-blue-600 shadow-md ring-0 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = "Slider";

export { Slider };
