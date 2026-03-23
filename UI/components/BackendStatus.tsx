"use client";

import { useBackendStatus } from "@/hooks/useBackendStatus";
import { motion } from "framer-motion";

export function BackendStatus() {
  const { status, healthData } = useBackendStatus();

  const statusConfig = {
    online: {
      color: "bg-green-500",
      label: "Backend: Online",
      ragInfo: healthData?.rag?.initialized ? "RAG: Active" : "RAG: Inactive",
    },
    offline: {
      color: "bg-red-500",
      label: "Backend: Offline",
      ragInfo: "RAG: Unknown",
    },
    checking: {
      color: "bg-amber-500",
      label: "Backend: Checking...",
      ragInfo: "RAG: Unknown",
    },
  };

  const config = statusConfig[status];

  return (
    <div className="group relative">
      <motion.div
        className={`w-2 h-2 rounded-full ${config.color}`}
        animate={
          status === "online"
            ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="absolute left-0 top-full mt-2 w-48 p-2 bg-[hsl(var(--bg-card))] border border-[hsl(var(--border))] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <p className="text-xs text-[hsl(var(--text-primary))] font-medium">
          {config.label}
        </p>
        <p className="text-xs text-[hsl(var(--text-muted))] mt-1">
          {config.ragInfo}
        </p>
        {status === "online" && healthData && (
          <p className="text-xs text-[hsl(var(--text-muted))] mt-1">
            {healthData.service}
          </p>
        )}
      </div>
    </div>
  );
}
