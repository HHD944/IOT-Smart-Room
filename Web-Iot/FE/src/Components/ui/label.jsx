import React from "react";

function Label({ children, className = "", ...props }) {
  return (
    <label className={`block text-sm font-medium mb-2 ${className}`} {...props}>
      {children}
    </label>
  );
}

export { Label };
