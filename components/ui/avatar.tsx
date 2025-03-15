import * as React from "react";
import { cn } from "@/lib/utils"; // Ensure cn is properly defined

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
});
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, src, ...props }, ref) => {
  // Provide default avatar URL if src is empty or undefined
  const imageSrc =
    src && src.trim() !== "" ? src : "https://i.postimg.cc/fRmLWBk6/pro.png";

  return (
    <img
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      src={imageSrc}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center bg-gray-200 text-gray-500",
        className
      )}
      {...props}
    >
      {children || "?"}
    </div>
  );
});
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
