import {
  Waves,
  HeartPulse,
  Dumbbell,
  Umbrella,
  ConciergeBell,
  Wifi,
  PlaneTakeoff,
  BellRing,
} from "lucide-react";
import AmenityItem from "@/components/amenity-item";

const AMENITIES = [
  {
    icon: Waves,
    title: "Infinity Pool",
    description: "Stunning oceanfront infinity pool",
  },
  {
    icon: HeartPulse,
    title: "Spa & Wellness",
    description: "Rejuvenating treatments and therapies",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "State-of-the-art equipment 24/7",
  },
  {
    icon: Umbrella,
    title: "Private Beach",
    description: "Exclusive access to pristine beach",
  },
  {
    icon: ConciergeBell,
    title: "Concierge Service",
    description: "Personalized service for your every need",
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "High-speed internet throughout resort",
  },
  {
    icon: PlaneTakeoff,
    title: "Airport Transfer",
    description: "Complimentary airport transportation",
  },
  {
    icon: BellRing,
    title: "Room Service",
    description: "24/7 in-room dining service",
  },
];

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="bg-sand-50 py-20 sm:py-24">
      <div className="container-max text-center">
        <h2 className="text-2xl sm:text-3xl">Resort Amenities</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          Everything you need for an unforgettable stay.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-5 text-left sm:grid-cols-4">
          {AMENITIES.map((amenity) => (
            <AmenityItem
              key={amenity.title}
              icon={amenity.icon}
              title={amenity.title}
              description={amenity.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
