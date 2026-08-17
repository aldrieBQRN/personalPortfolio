"use client";

import Image from "next/image";
import { Users, BedDouble, Maximize, CheckCircle2, XCircle } from "lucide-react";
import { Room } from "@/lib/types";
import { isRoomAvailable } from "@/lib/booking-store";

interface RoomCardProps {
  room: Room;
  checkIn: string;
  checkOut: string;
  onBookNow: (room: Room) => void;
}

export default function RoomCard({ room, checkIn, checkOut, onBookNow }: RoomCardProps) {
  const available = isRoomAvailable(room.id, checkIn, checkOut);

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-md bg-white shadow-card transition-all hover:shadow-lg border border-sand-200">
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={room.image}
            alt={`${room.name} room interior`}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {room.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-navy px-3 py-1 text-xs font-medium text-white shadow-sm">
              {room.badge}
            </span>
          )}

          <span
            className={`absolute right-4 top-4 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md flex items-center gap-1 shadow-sm ${
              available
                ? "bg-emerald-900/80 text-emerald-100"
                : "bg-rose-900/80 text-rose-100"
            }`}
          >
            {available ? (
              <>
                <CheckCircle2 size={12} /> Available
              </>
            ) : (
              <>
                <XCircle size={12} /> Sold Out
              </>
            )}
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-baseline justify-between">
            <h3 className="text-lg font-medium text-navy">{room.name}</h3>
          </div>
          <p className="mt-1 text-sm text-muted">
            From <span className="font-semibold text-ink">${room.price}</span> / night
          </p>

          <p className="mt-2 text-xs text-muted line-clamp-2">{room.description}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-sand-200 pt-4 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <Users size={14} /> Up to {room.guests} Guests
            </span>
            <span className="flex items-center gap-1.5">
              <BedDouble size={14} /> {room.beds}
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize size={14} /> {room.size}m&sup2;
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <button
          onClick={() => onBookNow(room)}
          disabled={!available}
          className={`w-full rounded py-2.5 text-xs font-medium transition-colors ${
            available
              ? "bg-navy text-white hover:bg-navy-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {available ? "Reserve Room" : "Unavailable for Dates"}
        </button>
      </div>
    </article>
  );
}
