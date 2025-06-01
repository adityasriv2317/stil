import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";

type CustomDatePickerProps = {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
};

type ViewMode = "calendar" | "month" | "year";

export default function CustomDatePicker({
  value,
  onChange,
  placeholder = "Select Date of Birth",
  className = "",
}: CustomDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value ? dayjs(value) : null);
  const [viewDate, setViewDate] = useState(dayjs());
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setViewMode("calendar");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const generateCalendar = () => {
    const startOfMonth = viewDate.startOf("month");
    const startDay = startOfMonth.day();
    const daysInMonth = viewDate.daysInMonth();
    const days = [];

    for (let i = 0; i < startDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    return days;
  };

  const handleDateSelect = (day: number | null) => {
    if (!day) return;
    const date = viewDate.date(day);
    setSelectedDate(date);
    onChange(date.format("YYYY-MM-DD"));
    setOpen(false);
    setViewMode("calendar");
  };

  const handleMonthSelect = (monthIndex: number) => {
    setViewDate(viewDate.month(monthIndex));
    setViewMode("calendar");
  };

  const handleYearSelect = (year: number) => {
    setViewDate(viewDate.year(year));
    setViewMode("month");
  };

  const currentYear = viewDate.year();
  const years = Array.from({ length: 18 }, (_, i) => currentYear + i);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      <button
        onClick={() => setOpen(!open)}
        className="min-w-full text-center px-4 py-3 border border-gray-300 rounded-xl bg-black/10 text-white focus:outline-none"
      >
        {selectedDate ? (
          selectedDate.format("YYYY-MM-DD")
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-72 -translate-x-1/5 bg-black border border-gray-700 rounded-xl shadow-lg p-4">
          <div className="flex justify-between items-center text-white mb-2">
            <button
              onClick={() =>
                viewMode === "calendar"
                  ? setViewDate(viewDate.subtract(1, "month"))
                  : viewMode === "month"
                  ? setViewDate(viewDate.subtract(1, "year"))
                  : setViewDate(viewDate.subtract(18, "year"))
              }
              className="text-white hover:bg-purple-500 px-1.5 rounded-md transition"
            >
              ←
            </button>

            <div className="flex gap-2">
              {viewMode !== "year" && (
                <span
                  onClick={() => setViewMode("month")}
                  className="cursor-pointer hover:text-purple-400"
                >
                  {monthNames[viewDate.month()]}
                </span>
              )}
              <span
                onClick={() => setViewMode("year")}
                className="cursor-pointer hover:text-purple-400"
              >
                {viewDate.format("YYYY")}
              </span>
            </div>

            <button
              onClick={() =>
                viewMode === "calendar"
                  ? setViewDate(viewDate.add(1, "month"))
                  : viewMode === "month"
                  ? setViewDate(viewDate.add(1, "year"))
                  : setViewDate(viewDate.add(18, "year"))
              }
            className="text-white hover:bg-purple-500 px-1.5 rounded-md transition"
            >
              →
            </button>
          </div>

          {/* Calendar View */}
          {viewMode === "calendar" && (
            <div className="grid grid-cols-7 gap-1 text-sm text-center text-white w-full">
              {["S", "M", "T", "W", "Th", "F", "Sa"].map((d) => (
                <div key={d} className="font-bold p-2">
                  {d}
                </div>
              ))}
              {generateCalendar().map((day, idx) => {
                const isSelected =
                  selectedDate &&
                  selectedDate.date() === day &&
                  selectedDate.month() === viewDate.month() &&
                  selectedDate.year() === viewDate.year();
                return (
                  <div
                    key={idx}
                    onClick={() => handleDateSelect(day)}
                    className={`p-2 my-1 rounded-lg cursor-pointer transition text-center ease-in ${
                      day
                        ? isSelected
                          ? "bg-purple-600 text-white"
                          : "hover:bg-purple-800 text-white"
                        : ""
                    }`}
                  >
                    {day ?? ""}
                  </div>
                );
              })}
            </div>
          )}

          {/* Month Picker */}
          {viewMode === "month" && (
            <div className="grid grid-cols-3 gap-2 text-white text-sm w-full">
              {monthNames.map((month, idx) => (
                <div
                  key={month}
                  onClick={() => handleMonthSelect(idx)}
                  className="p-2 rounded-lg cursor-pointer text-center hover:bg-purple-800 transition"
                >
                  {month}
                </div>
              ))}
            </div>
          )}

          {/* Year Picker */}
          {viewMode === "year" && (
            <div className="grid grid-cols-3 gap-2 text-white text-sm overflow-hidden w-full">
              {years.map((year) => (
              <div
                key={year}
                onClick={() => handleYearSelect(year)}
                className="p-2 rounded-lg cursor-pointer text-center hover:bg-purple-800 transition"
              >
                {year}
              </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
