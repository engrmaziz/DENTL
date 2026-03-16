"use client";

import { useState, useCallback } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

// Simple global state for basic toast implementation without external store libraries
let toasts: ToastMessage[] = [];
let listeners: Array<(toasts: ToastMessage[]) => void> = [];

const notifyListeners = () => {
  listeners.forEach((listener) => listener(toasts));
};

export function toast(message: string, type: ToastType = "info") {
  const id = Math.random().toString(36).substring(2, 9);
  toasts = [...toasts, { id, message, type }];
  notifyListeners();

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  }, 3000);
}

export function useToast() {
  const [currentToasts, setCurrentToasts] = useState<ToastMessage[]>(toasts);

  // Subscribe to changes
  if (typeof window !== "undefined") {
    if (!listeners.includes(setCurrentToasts)) {
      listeners.push(setCurrentToasts);
    }
  }

  return { toasts: currentToasts, toast };
}
