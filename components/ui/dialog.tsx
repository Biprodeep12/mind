import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 transition-opacity" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg transition-transform",
        "data-[state=open]:scale-100 data-[state=closed]:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

DialogContent.displayName = "DialogContent";

export const DialogHeader = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn("mb-4 text-center", className)}>{children}</div>;

export const DialogTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <h2 className={cn("text-lg font-bold", className)}>{children}</h2>;

export const DialogDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <p className={cn("text-sm text-gray-600", className)}>{children}</p>;
