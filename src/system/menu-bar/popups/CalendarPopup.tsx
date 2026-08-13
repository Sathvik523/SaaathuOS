"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendarPopup({ isOpen, onClose }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  if (!isOpen) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-16 right-3 z-50 w-80 rounded-2xl border border-white/10 bg-[#1E1F24]/95 p-4 text-white shadow-2xl backdrop-blur-3xl select-none animate-in fade-in zoom-in-95 duration-120">
        {/* Month Header & Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-[#007AFF]" />
            <span className="text-[14px] font-bold">{monthName} {year}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/10"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextMonth}
              className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/10"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 gap-1 pt-3 text-center text-[10px] font-bold text-white/40 uppercase">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* Date Grid */}
        <div className="grid grid-cols-7 gap-1 pt-2 text-center text-[12px] font-medium">
          {days.map((d, index) => {
            if (d === null) {
              return <div key={`empty-${index}`} className="h-7 w-7" />;
            }

            const isToday = isCurrentMonth && d === today.getDate();

            return (
              <div
                key={d}
                className={`flex h-7 w-7 items-center justify-center rounded-full mx-auto transition-colors ${
                  isToday
                    ? "bg-[#FF3B30] text-white font-bold shadow-md"
                    : "text-white/80 hover:bg-white/10 cursor-pointer"
                }`}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
