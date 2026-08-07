import React from "react";

function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white rounded-xl border shadow-sm p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ children, className = "", ...props }) {
  return (
    <h2 className={`text-xl font-bold ${className}`} {...props}>
      {children}
    </h2>
  );
}

function CardDescription({ children, className = "", ...props }) {
  return (
    <p className={`text-gray-500 text-sm ${className}`} {...props}>
      {children}
    </p>
  );
}

function CardContent({ children, className = "", ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ children, className = "", ...props }) {
  return (
    <div className={`mt-4 flex items-center ${className}`} {...props}>
      {children}
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
