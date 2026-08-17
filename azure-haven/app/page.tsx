"use client";

import { useState } from "react";
import HeroSection from "@/sections/hero-section";
import RoomsSection from "@/sections/rooms-section";
import OffersSection from "@/sections/offers-section";
import ExperiencesSection from "@/sections/experiences-section";
import DiningSection from "@/sections/dining-section";
import TestimonialsSection from "@/sections/testimonials-section";
import ParadiseCtaSection from "@/sections/paradise-cta-section";
import AmenitiesSection from "@/sections/amenities-section";
import NewsletterSection from "@/sections/newsletter-section";
import Footer from "@/components/footer";
import BookingModal from "@/components/booking-modal";
import BookingLookupModal from "@/components/booking-lookup-modal";
import ToastContainer from "@/components/toast";
import { Room } from "@/lib/types";
import { ROOMS } from "@/lib/rooms-data";

export default function Home() {
  const [checkIn, setCheckIn] = useState("2026-09-15");
  const [checkOut, setCheckOut] = useState("2026-09-18");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);

  const handleOpenBookingModal = (room?: Room) => {
    setSelectedRoom(room || ROOMS[0]);
    setIsBookingModalOpen(true);
  };

  const handleSearchAvailability = (search: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  }) => {
    setCheckIn(search.checkIn);
    setCheckOut(search.checkOut);
    setAdults(search.adults);
    setChildren(search.children);
  };

  return (
    <main className="min-h-screen bg-white">
      <HeroSection
        onOpenLookup={() => setIsLookupModalOpen(true)}
        onOpenBookingModal={() => handleOpenBookingModal()}
        onSearchAvailability={handleSearchAvailability}
      />

      <RoomsSection
        checkIn={checkIn}
        checkOut={checkOut}
        onBookRoom={(room) => handleOpenBookingModal(room)}
      />

      <OffersSection />
      <ExperiencesSection />
      <DiningSection />
      <TestimonialsSection />
      <ParadiseCtaSection />
      <AmenitiesSection />
      <NewsletterSection />
      <Footer />

      {/* Global Modals & Toast System */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedRoom={selectedRoom}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
        initialAdults={adults}
        initialChildren={children}
      />

      <BookingLookupModal
        isOpen={isLookupModalOpen}
        onClose={() => setIsLookupModalOpen(false)}
      />

      <ToastContainer />
    </main>
  );
}
