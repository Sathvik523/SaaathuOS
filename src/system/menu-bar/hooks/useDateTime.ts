"use client";

import { useEffect, useState } from "react";

export interface DateTimeState {
  formatted: string; // e.g. "Sun 2 Aug 7:57 PM"
  dayOfWeek: string;
  dayOfMonth: number;
  monthName: string;
  year: number;
  timeString: string;
}

export function useDateTime(): DateTimeState {
  const [dateTime, setDateTime] = useState<DateTimeState>({
    formatted: "Sun 2 Aug 7:57 PM",
    dayOfWeek: "Sun",
    dayOfMonth: 2,
    monthName: "Aug",
    year: 2026,
    timeString: "7:57 PM",
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "short" });
      const dayOfMonth = now.getDate();
      const monthName = now.toLocaleDateString("en-US", { month: "short" });
      const year = now.getFullYear();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      setDateTime({
        formatted: `${dayOfWeek} ${dayOfMonth} ${monthName} ${timeString}`,
        dayOfWeek,
        dayOfMonth,
        monthName,
        year,
        timeString,
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return dateTime;
}
