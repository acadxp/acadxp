"use client";

import { X, Clock } from "lucide-react";

export interface Notification {
  id: number;
  title: string;
  message: string;
  content: string;
  time: string;
  read: boolean;
  type: string;
}

interface NotificationModalProps {
  notification: Notification;
  onClose: () => void;
}

export default function NotificationModal({
  notification,
  onClose,
}: NotificationModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-black border border-violet-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-violet-500/20 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-white">
              {notification.title}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-xs text-zinc-500">{notification.time}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-violet-600/10 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5">
          <p className="text-zinc-300 text-sm leading-relaxed">
            {notification.content}
          </p>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-violet-500/20 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-violet-600/10 transition-all duration-300"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300"
          >
            Mark as read
          </button>
        </div>
      </div>
    </div>
  );
}
