import React, { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "../../utils/cn";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow exit animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 max-w-md w-full md:w-auto p-4 rounded-lg shadow-md border flex items-start gap-3 transition-all duration-300",
        bgColors[type],
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
      data-testid={`toast-${type}`}
    >
      <div className="flex-shrink-0">{icons[type]}</div>

      <div className="flex-1 text-sm">{message}</div>

      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="flex-shrink-0 text-gray-400 hover:text-gray-500"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  children: React.ReactNode;
}

export function ToastContainer({ children }: ToastContainerProps) {
  return (
    <div
      className="fixed bottom-0 right-0 z-50 p-4 space-y-2"
      data-testid="toast-container"
    >
      {children}
    </div>
  );
}
