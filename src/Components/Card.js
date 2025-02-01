import React from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Box = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
Box.displayName = "Box";

const Text = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn(className)} {...props} />
));
Text.displayName = "Text";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <Box
    ref={ref}
    className={cn(
      "rounded-xl border bg-white shadow-lg hover:shadow-xl transition-all duration-300",
      "overflow-hidden backdrop-blur-sm hover:scale-105 transform transition duration-300",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <Box
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn("text-2xl font-bold tracking-tight text-gray-900", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <Box ref={ref} className={cn("p-6 bg-gray-50", className)} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent, Box, Text };
