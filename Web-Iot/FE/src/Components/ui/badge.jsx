export function Badge({ className, variant = "default", children }) {
  const variants = {
    default: "bg-primary text-primary-foreground",
    success: "bg-green-500/20 text-green-300 border-green-500/30",
    destructive: "bg-red-500/20 text-red-300 border-red-500/30",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
