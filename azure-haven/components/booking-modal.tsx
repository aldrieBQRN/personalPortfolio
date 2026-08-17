"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Calendar, Users, CheckCircle, Copy, AlertTriangle } from "lucide-react";
import { Room, Booking } from "@/lib/types";
import { calculateNights, createBooking, isRoomAvailable } from "@/lib/booking-store";
import { showToast } from "./toast";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: Room | null;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: number;
  initialChildren?: number;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedRoom,
  initialCheckIn = "2026-09-15",
  initialCheckOut = "2026-09-18",
  initialAdults = 2,
  initialChildren = 0,
}: BookingModalProps) {
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [step, setStep] = useState<"details" | "confirmed">("details");
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCheckIn(initialCheckIn);
      setCheckOut(initialCheckOut);
      setAdults(initialAdults);
      setChildren(initialChildren);
      setStep("details");
      setConfirmedBooking(null);
      setErrorMessage(null);
    }
  }, [isOpen, initialCheckIn, initialCheckOut, initialAdults, initialChildren]);

  if (!isOpen || !selectedRoom) return null;

  const nights = calculateNights(checkIn, checkOut);
  const roomSubtotal = selectedRoom.price * nights;
  const taxesAndFees = Math.round(roomSubtotal * 0.12); // 12% Resort & Local Tax
  const totalAmount = roomSubtotal + taxesAndFees;

  const available = isRoomAvailable(selectedRoom.id, checkIn, checkOut);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (nights <= 0) {
      setErrorMessage("Check-out date must be after check-in date.");
      return;
    }

    if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
      setErrorMessage("Please complete all required guest contact fields.");
      return;
    }

    const result = createBooking({
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      nights,
      guests: { adults, children },
      totalAmount,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
    });

    if (result.success && result.booking) {
      setConfirmedBooking(result.booking);
      setStep("confirmed");
      showToast(`Booking ${result.booking.referenceCode} confirmed successfully!`, "success");
    } else {
      setErrorMessage(result.error || "Failed to create booking.");
    }
  };

  const handleCopyCode = () => {
    if (!confirmedBooking) return;
    navigator.clipboard.writeText(confirmedBooking.referenceCode);
    setCopied(true);
    showToast("Booking Reference copied to clipboard!", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sand-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-serif text-navy">
              {step === "details" ? "Reserve Your Stay" : "Booking Confirmed!"}
            </h2>
            <p className="text-xs text-muted">
              {step === "details"
                ? "Complete your details to confirm your reservation"
                : "Thank you for choosing Azure Haven Resort"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted hover:bg-sand-100 hover:text-ink transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {step === "details" ? (
          <form onSubmit={handleSubmitBooking} className="p-6 space-y-6">
            {/* Room Summary Card */}
            <div className="flex flex-col sm:flex-row gap-4 rounded-md border border-sand-200 bg-sand-50 p-4">
              <div className="relative h-28 w-full sm:w-40 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={selectedRoom.image}
                  alt={selectedRoom.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-medium text-navy text-lg">{selectedRoom.name}</h3>
                  <p className="text-xs text-muted mt-1">{selectedRoom.description}</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-navy bg-white border border-sand-200 px-2.5 py-1 rounded">
                    ${selectedRoom.price} / night
                  </span>
                  <span className="text-xs text-muted">
                    Max capacity: {selectedRoom.guests} guests
                  </span>
                </div>
              </div>
            </div>

            {/* Error / Alert */}
            {errorMessage && (
              <div className="flex items-center gap-2 rounded-md bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-700">
                <AlertTriangle size={16} className="shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {!available && (
              <div className="flex items-center gap-2 rounded-md bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-800">
                <AlertTriangle size={16} className="shrink-0 text-amber-600" />
                <span>Notice: This room type is fully booked for your selected dates. Please adjust dates.</span>
              </div>
            )}

            {/* Dates & Guests Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1">
                  Check-in Date
                </label>
                <div className="flex items-center border border-sand-300 rounded-md px-3 py-2 bg-white">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full text-sm outline-none text-ink"
                    required
                  />
                  <Calendar size={16} className="text-muted shrink-0 ml-1" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1">
                  Check-out Date
                </label>
                <div className="flex items-center border border-sand-300 rounded-md px-3 py-2 bg-white">
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full text-sm outline-none text-ink"
                    required
                  />
                  <Calendar size={16} className="text-muted shrink-0 ml-1" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1">
                  Adults
                </label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full border border-sand-300 rounded-md px-3 py-2 text-sm text-ink outline-none bg-white"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Adult" : "Adults"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1">
                  Children
                </label>
                <select
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full border border-sand-300 rounded-md px-3 py-2 text-sm text-ink outline-none bg-white"
                >
                  {[0, 1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Child" : "Children"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Personal Information */}
            <div className="space-y-4 border-t border-sand-200 pt-5">
              <h4 className="text-sm font-medium text-navy uppercase tracking-wider">Guest Information</h4>

              <div>
                <label className="block text-xs text-muted mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full border border-sand-300 rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-navy"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="eleanor@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full border border-sand-300 rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-navy"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full border border-sand-300 rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-navy"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-muted mb-1">Special Requests (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Quiet room, late check-in, dietary preferences..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full border border-sand-300 rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-navy"
                />
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="rounded-md bg-sand-50 p-4 border border-sand-200 space-y-2 text-xs text-ink">
              <div className="flex justify-between">
                <span>
                  ${selectedRoom.price} × {nights} {nights === 1 ? "night" : "nights"}
                </span>
                <span>${roomSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Resort &amp; Local Tax (12%)</span>
                <span>${taxesAndFees.toLocaleString()}</span>
              </div>
              <div className="border-t border-sand-300 pt-2 flex justify-between font-semibold text-sm text-navy">
                <span>Total Amount Due</span>
                <span>${totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-medium text-muted hover:text-ink transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!available || nights <= 0}
                className={`px-6 py-2.5 text-xs font-medium text-white rounded transition-colors ${
                  available && nights > 0
                    ? "bg-navy hover:bg-navy-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Confirm Reservation (${totalAmount.toLocaleString()})
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle size={36} />
            </div>

            <div>
              <h3 className="text-2xl font-serif text-navy">Reservation Confirmed!</h3>
              <p className="text-xs text-muted mt-1">
                Your booking details have been saved locally to your device.
              </p>
            </div>

            {/* Reference Code Highlight */}
            <div className="mx-auto max-w-sm rounded-lg bg-sand-100 border border-gold-300 p-4 text-center">
              <span className="block text-xs uppercase tracking-wider text-muted font-medium mb-1">
                Booking Reference Code
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold font-mono tracking-widest text-navy">
                  {confirmedBooking?.referenceCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 text-muted hover:text-navy transition-colors"
                  title="Copy Code"
                >
                  <Copy size={18} />
                </button>
              </div>
              {copied && <span className="text-[10px] text-emerald-600 font-medium">Copied!</span>}
            </div>

            {/* Booking Details Summary */}
            <div className="text-left max-w-md mx-auto rounded-md bg-sand-50 p-4 border border-sand-200 text-xs space-y-2">
              <div className="flex justify-between border-b border-sand-200 pb-2">
                <span className="text-muted">Guest Name:</span>
                <span className="font-medium text-navy">{confirmedBooking?.guestName}</span>
              </div>
              <div className="flex justify-between border-b border-sand-200 pb-2">
                <span className="text-muted">Room:</span>
                <span className="font-medium text-navy">{confirmedBooking?.roomName}</span>
              </div>
              <div className="flex justify-between border-b border-sand-200 pb-2">
                <span className="text-muted">Dates:</span>
                <span className="font-medium text-navy">
                  {confirmedBooking?.checkIn} to {confirmedBooking?.checkOut} ({confirmedBooking?.nights} nights)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Total Paid / Due:</span>
                <span className="font-semibold text-navy">${confirmedBooking?.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={onClose}
                className="bg-navy text-white px-6 py-2.5 text-xs font-medium rounded hover:bg-navy-600 transition-colors"
              >
                Done &amp; Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
