"use client";

import Image from "next/image";
import { Sun, Sparkles, UtensilsCrossed, Gem } from "lucide-react";
import Navbar from "@/components/navbar";
import BookingForm from "@/components/booking-form";

const FEATURES = [
  {
    icon: Sun,
    title: "Oceanfront Views",
    description: "Wake up to stunning panoramic views",
  },
  {
    icon: Sparkles,
    title: "World Class Service",
    description: "Exceptional hospitality 24/7",
  },
  {
    icon: UtensilsCrossed,
    title: "Gourmet Dining",
    description: "Exquisite cuisine from around the world",
  },
  {
    icon: Gem,
    title: "Premium Amenities",
    description: "Unmatched comfort and relaxation",
  },
];

interface HeroSectionProps {
  onOpenLookup: () => void;
  onOpenBookingModal: () => void;
  onSearchAvailability: (search: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  }) => void;
}

export default function HeroSection({
  onOpenLookup,
  onOpenBookingModal,
  onSearchAvailability,
}: HeroSectionProps) {
  return (
    <section id="home" className="relative">
      <div className="relative h-[640px] w-full sm:h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2400&auto=format&fit=crop"
          alt="Oceanfront infinity pool at Azure Haven Resort during sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/20 to-navy-900/40" />

        <Navbar onOpenLookup={onOpenLookup} onOpenBookingModal={onOpenBookingModal} />

        <div className="relative z-10 flex h-full items-center">
          <div className="container-max">
            <div className="max-w-xl text-white">
              <h1 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-[3.4rem]">
                Escape to
                <br />
                Pure Serenity
              </h1>
              <p className="mt-4 max-w-md text-sm text-white/85 sm:text-base">
                Luxury accommodations, breathtaking views, and unforgettable
                experiences await you.
              </p>
              <button
                onClick={onOpenBookingModal}
                className="mt-7 inline-block rounded-sm bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-600 shadow-md"
              >
                Book Your Stay
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-max relative z-20 -mt-16 sm:-mt-14">
        <BookingForm onSearchAvailability={onSearchAvailability} />
      </div>

      <div className="container-max py-20 text-center sm:py-24">
        <h2 className="text-2xl sm:text-3xl font-serif text-navy">
          Where Every Stay
          <br />
          Feels Extraordinary
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
          Discover the perfect blend of luxury, comfort, and natural beauty.
          Your unforgettable getaway begins here.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center gap-3">
              <feature.icon
                size={28}
                strokeWidth={1.5}
                className="text-gold-500"
              />
              <h3 className="text-sm font-semibold text-navy">
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
