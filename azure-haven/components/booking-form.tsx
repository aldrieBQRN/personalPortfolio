"use client";

import { useState } from "react";
import { Calendar, ChevronDown, Search } from "lucide-react";
import { showToast } from "./toast";

interface BookingFormProps {
  onSearchAvailability?: (search: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  }) => void;
}

export default function BookingForm({ onSearchAvailability }: BookingFormProps) {
  const [checkIn, setCheckIn] = useState("2026-09-15");
  const [checkOut, setCheckOut] = useState("2026-09-18");
  const [guestsOption, setGuestsOption] = useState("2 Adults, 0 Children");

  const parseGuests = (opt: string) => {
    if (opt.includes("1 Adult")) return { adults: 1, children: 0 };
    if (opt.includes("2 Adults, 1 Child")) return { adults: 2, children: 1 };
    if (opt.includes("2 Adults, 2 Children")) return { adults: 2, children: 2 };
    if (opt.includes("4 Adults")) return { adults: 4, children: 0 };
    return { adults: 2, children: 0 };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (checkIn >= checkOut) {
      showToast("Check-out date must be after check-in date.", "error");
      return;
    }

    const guests = parseGuests(guestsOption);
    if (onSearchAvailability) {
      onSearchAvailability({ checkIn, checkOut, ...guests });
    }

    // Smooth scroll to rooms section
    const roomsElem = document.getElementById("rooms");
    if (roomsElem) {
      roomsElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <form
      id="booking"
      aria-label="Check availability"
      className="grid grid-cols-1 gap-4 rounded-md bg-white p-6 shadow-card sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-sand-200 lg:p-3"
      onSubmit={handleSubmit}
    >
      <label className="flex flex-col gap-1 px-3 py-1 text-left">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          Check In
        </span>
        <span className="flex items-center justify-between gap-2">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent text-sm text-ink outline-none"
          />
          <Calendar size={16} className="shrink-0 text-muted" />
        </span>
      </label>

      <label className="flex flex-col gap-1 px-3 py-1 text-left">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          Check Out
        </span>
        <span className="flex items-center justify-between gap-2">
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-transparent text-sm text-ink outline-none"
          />
          <Calendar size={16} className="shrink-0 text-muted" />
        </span>
      </label>

      <label className="flex flex-col gap-1 px-3 py-1 text-left">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          Guests
        </span>
        <span className="flex items-center justify-between gap-2">
          <select
            value={guestsOption}
            onChange={(e) => setGuestsOption(e.target.value)}
            className="w-full appearance-none bg-transparent text-sm text-ink outline-none cursor-pointer"
          >
            <option>2 Adults, 0 Children</option>
            <option>1 Adult, 0 Children</option>
            <option>2 Adults, 1 Child</option>
            <option>2 Adults, 2 Children</option>
            <option>4 Adults, 0 Children</option>
          </select>
          <ChevronDown size={16} className="shrink-0 text-muted" />
        </span>
      </label>

      <div className="flex items-center px-1 py-1 lg:pl-4">
        <button
          type="submit"
          className="w-full rounded-sm bg-navy px-4 py-3.5 text-sm font-medium text-white transition-colors hover:bg-navy-600 flex items-center justify-center gap-2"
        >
          <Search size={16} />
          Check Availability
        </button>
      </div>
    </form>
  );
}
