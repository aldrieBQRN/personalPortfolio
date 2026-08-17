"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  text: string;
}

let toastListeners: ((toasts: ToastMessage[]) => void)[] = [];
let toastsState: ToastMessage[] = [];

export function showToast(text: string, type: "success" | "error" | "info" = "success") {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast: ToastMessage = { id, type, text };
  toastsState = [...toastsState, newToast];
  toastListeners.forEach((listener) => listener(toastsState));

  setTimeout(() => {
    removeToast(id);
  }, 4000);
}

function removeToast(id: string) {
  toastsState = toastsState.filter((t) => t.id !== id);
  toastListeners.forEach((listener) => listener(toastsState));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    toastListeners.push(setToasts);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== setToasts);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center justify-between gap-3 p-4 rounded-md shadow-lg border text-sm transition-all duration-300 ${
            toast.type === "success"
              ? "bg-emerald-900/90 text-emerald-100 border-emerald-700"
              : toast.type === "error"
              ? "bg-rose-900/90 text-rose-100 border-rose-700"
              : "bg-navy-900/90 text-sand-100 border-navy-700"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === "success" ? (
              <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle size={18} className="shrink-0 text-rose-400" />
            )}
            <span>{toast.text}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
