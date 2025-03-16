import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;

export const SheetTrigger = DialogPrimitive.Trigger;

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 transition-opacity" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-md rounded-t-lg bg-white p-6 shadow-lg transition-transform",
        "data-[state=open]:translate-y-0 data-[state=closed]:translate-y-full",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

SheetContent.displayName = "SheetContent";

export const SheetHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 text-center">{children}</div>
);

export const SheetTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-bold">{children}</h2>
);

export const SheetDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => <p className="text-sm text-gray-600">{children}</p>;
