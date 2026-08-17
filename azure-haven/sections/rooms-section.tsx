"use client";

import { useState } from "react";
import RoomCard from "@/components/room-card";
import { ROOMS } from "@/lib/rooms-data";
import { Room } from "@/lib/types";

interface RoomsSectionProps {
  checkIn: string;
  checkOut: string;
  onBookRoom: (room: Room) => void;
}

export default function RoomsSection({ checkIn, checkOut, onBookRoom }: RoomsSectionProps) {
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Accommodations" },
    { id: "deluxe", label: "Deluxe Rooms" },
    { id: "suite", label: "Suites" },
    { id: "villa", label: "Villas" },
    { id: "bungalow", label: "Bungalows" },
  ];

  const filteredRooms = filterCategory === "all"
    ? ROOMS
    : ROOMS.filter((r) => r.category === filterCategory);

  return (
    <section id="rooms" className="bg-sand-50 py-20 sm:py-24">
      <div className="container-max text-center">
        <h2 className="text-2xl sm:text-3xl font-serif text-navy">Rooms &amp; Suites</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          Elegant spaces designed for ultimate comfort, privacy, and serene ocean views.
        </p>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-colors ${
                filterCategory === cat.id
                  ? "bg-navy text-white"
                  : "bg-white text-muted hover:bg-sand-200 border border-sand-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              checkIn={checkIn}
              checkOut={checkOut}
              onBookNow={onBookRoom}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
