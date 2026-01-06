"use client";

import { Bell, Clock } from "lucide-react";
import { Notification } from "./NotificationModal";

interface NotificationDropdownProps {
  notifications: Notification[];
  unreadCount: number;
  onNotificationClick: (notification: Notification) => void;
  onClose: () => void;
  isMobile?: boolean;
}

export default function NotificationDropdown({
  notifications,
  unreadCount,
  onNotificationClick,
  onClose,
  isMobile = false,
}: NotificationDropdownProps) {
  if (isMobile) {
    return (
      <div className="md:hidden border-t border-violet-500/20 bg-black/95 backdrop-blur-xl">
        <div className="px-4 py-3 border-b border-violet-500/20 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="text-xs text-fuchsia-400">{unreadCount} new</span>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => onNotificationClick(notification)}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
        <div className="px-4 py-2 border-t border-violet-500/20">
          <button className="w-full text-center text-xs text-violet-400 hover:text-violet-300 transition-colors py-1">
            View all notifications
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 mt-2 w-80 rounded-xl border border-violet-500/30 bg-black/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden">
        <div className="px-4 py-3 border-b border-violet-500/20 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="text-xs text-fuchsia-400">{unreadCount} new</span>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => onNotificationClick(notification)}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
        <div className="px-4 py-2 border-t border-violet-500/20">
          <button className="w-full text-center text-xs text-violet-400 hover:text-violet-300 transition-colors py-1">
            View all notifications
          </button>
        </div>
      </div>
    </>
  );
}

function NotificationItem({
  notification,
  onClick,
}: {
  notification: Notification;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 text-left hover:bg-violet-600/10 transition-all duration-300 border-b border-violet-500/10 last:border-b-0 ${
        !notification.read ? "bg-violet-600/5" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
            !notification.read ? "bg-fuchsia-500" : "bg-zinc-600"
          }`}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">
            {notification.title}
          </p>
          <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5">
            {notification.message}
          </p>
          <div className="flex items-center gap-1 mt-1.5">
            <Clock className="w-3 h-3 text-zinc-500" />
            <span className="text-xs text-zinc-500">{notification.time}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function EmptyState() {
  return (
    <div className="px-4 py-8 text-center">
      <Bell className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
      <p className="text-sm text-zinc-500">No notifications yet</p>
    </div>
  );
}
