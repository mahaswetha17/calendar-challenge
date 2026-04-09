"use client";

import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isWithinInterval,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarGridProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
}

export default function CalendarGrid({ selectedDate, setSelectedDate }: CalendarGridProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (day < startDate) {
        setEndDate(startDate);
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDateGrid = startOfWeek(monthStart);
  const endDateGrid = endOfWeek(monthEnd);

  const calendarDays = [];
  let day = startDateGrid;

  while (day <= endDateGrid) {
    calendarDays.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="p-6 bg-white w-full">
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-widest">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2 text-center text-xs font-semibold text-blue-500 uppercase">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((d, i) => {
          const isSelected = selectedDate && isSameDay(d, selectedDate);
          const isStart = startDate && isSameDay(d, startDate);
          const isEnd = endDate && isSameDay(d, endDate);
          const isBetween = startDate && endDate && isWithinInterval(d, { start: startDate, end: endDate });
          const isCurrentMonth = isSameMonth(d, monthStart);

          return (
            <div
              key={i}
              onClick={() => onDateClick(d)}
              className={`h-12 flex items-center justify-center cursor-pointer transition-all rounded-lg
                ${!isCurrentMonth ? "text-gray-300" : "text-gray-700"}
                ${isBetween && !isStart && !isEnd ? "bg-blue-50 text-blue-700" : ""}
                ${(isStart || isEnd) ? "bg-blue-500 text-white font-bold shadow-md" : "hover:bg-gray-100"}
                ${isSelected && !isStart && !isEnd ? "ring-2 ring-blue-300" : ""}
              `}
            >
              {format(d, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
}