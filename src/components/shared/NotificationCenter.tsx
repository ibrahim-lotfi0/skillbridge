"use client";

import { useState } from "react";
import { Bell, Check, MailOpen, Sparkles, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { markAsReadAction, markAllAsReadAction } from "@/app/actions/notification";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  notifications: any[];
}

export function NotificationCenter({ notifications = [] }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = async () => {
    await markAllAsReadAction();
  };

  const handleMarkRead = async (id: string) => {
    await markAsReadAction(id);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "SUCCESS": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "MATCH": return <Sparkles className="w-4 h-4 text-blue-500" />;
      case "WARNING": return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default: return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 mt-2 w-80 max-h-[480px] glass-card overflow-hidden z-50 flex flex-col"
            >
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                <h3 className="font-bold text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={handleMarkAllRead}
                    className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <MailOpen className="w-3 h-3" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    <p className="text-xs">All caught up!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-50 dark:divide-slate-800">
                    {notifications.map((n) => (
                      <div 
                        key={n.id} 
                        className={cn(
                          "p-4 transition-colors",
                          !n.read ? "bg-blue-50/30 dark:bg-blue-900/10" : "hover:bg-slate-50 dark:hover:bg-slate-800/30"
                        )}
                      >
                        <div className="flex gap-3">
                          <div className="mt-0.5">{getTypeIcon(n.type)}</div>
                          <div className="flex-1 min-w-0">
                            <p className={cn("text-xs font-bold leading-tight", !n.read ? "text-slate-900 dark:text-white" : "text-slate-500")}>
                                {n.title}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{n.message}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-[9px] text-slate-400">{new Date(n.createdAt).toLocaleDateString()}</span>
                              {!n.read && (
                                <button 
                                  onClick={() => handleMarkRead(n.id)}
                                  className="text-[9px] font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-1.5 py-0.5 rounded"
                                >
                                  Mark read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
