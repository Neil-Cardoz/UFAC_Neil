"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { useEffect, useState } from "react";

interface ConfidenceRingProps {
  confidence: number; // 0-100
}

export function ConfidenceRing({ confidence }: ConfidenceRingProps) {
  const [mounted, setMounted] = useState(false);
  const count = useCountUp(mounted ? confidence : 0, 1500);

  useEffect(() => {
    setMounted(true);
  }, []);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (confidence / 100) * circumference;

  const color =
    confidence < 40
      ? "hsl(0 72% 51%)" // red
      : confidence < 70
      ? "hsl(32 95% 44%)" // orange
      : "hsl(var(--success))"; // green

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full -rotate-90">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold" style={{ color }}>
          {count}%
        </div>
        <div className="text-xs text-[hsl(var(--text-muted))]">Confidence</div>
      </div>
    </div>
  );
}
