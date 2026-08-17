"use client";

import { useState, useEffect } from "react";
import { X, Search, Calendar, User, Mail, Phone, AlertCircle, Ban, CheckCircle2 } from "lucide-react";
import { Booking } from "@/lib/types";
import { getBookingByReference, cancelBooking } from "@/lib/booking-store";
import { showToast } from "./toast";

interface BookingLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingLookupModal({ isOpen, onClose }: BookingLookupModalProps) {
  const [referenceCode, setReferenceCode] = useState("AZH-8921");
  const [guestEmail, setGuestEmail] = useState("sarah.jenkins@example.com");

  const [booking, setBooking] = useState<Booking | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setReferenceCode("AZH-8921");
      setGuestEmail("sarah.jenkins@example.com");
      setBooking(null);
      setHasSearched(false);
      setErrorMsg(null);
      setConfirmCancel(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setConfirmCancel(false);

    if (!referenceCode.trim() || !guestEmail.trim()) {
      setErrorMsg("Please enter both Reference Code and Email Address.");
      return;
    }

    const result = getBookingByReference(referenceCode, guestEmail);
    setHasSearched(true);

    if (result) {
      setBooking(result);
    } else {
      setBooking(null);
    }
  };

  const handleCancelBooking = () => {
    if (!booking) return;

    const res = cancelBooking(booking.referenceCode);
    if (res.success) {
      setBooking({ ...booking, status: "cancelled" });
      setConfirmCancel(false);
      showToast("Your reservation has been cancelled.", "info");
    } else {
      setErrorMsg(res.error || "Failed to cancel booking.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-sand-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-serif text-navy">Find My Reservation</h2>
            <p className="text-xs text-muted">Lookup your booking status using reference code and email</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted hover:bg-sand-100 hover:text-ink transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4 rounded-md border border-sand-200 bg-sand-50 p-4">
            <div>
              <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1">
                Booking Reference Code *
              </label>
              <input
                type="text"
                placeholder="e.g. AZH-8921"
                value={referenceCode}
                onChange={(e) => setReferenceCode(e.target.value)}
                className="w-full border border-sand-300 rounded px-3 py-2 text-sm text-ink outline-none uppercase font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1">
                Guest Email Address *
              </label>
              <input
                type="email"
                placeholder="sarah.jenkins@example.com"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full border border-sand-300 rounded px-3 py-2 text-sm text-ink outline-none"
                required
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 font-medium flex items-center gap-1.5">
                <AlertCircle size={14} />
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-navy text-white py-2.5 rounded text-xs font-medium hover:bg-navy-600 transition-colors flex items-center justify-center gap-2"
            >
              <Search size={15} />
              Lookup Booking
            </button>
          </form>

          {/* Results Display */}
          {hasSearched && (
            <div>
              {!booking ? (
                <div className="text-center py-8 border border-dashed border-sand-300 rounded-md">
                  <AlertCircle size={32} className="mx-auto text-muted mb-2" />
                  <p className="text-sm font-medium text-navy">No Reservation Found</p>
                  <p className="text-xs text-muted mt-1 max-w-xs mx-auto">
                    Please double-check your reference code and email. For test lookups, try <strong>AZH-8921</strong> with <strong>sarah.jenkins@example.com</strong>.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 rounded-lg border border-sand-300 p-5 bg-white">
                  {/* Status header */}
                  <div className="flex items-center justify-between border-b border-sand-200 pb-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted block font-medium">
                        Reference Code
                      </span>
                      <span className="font-mono font-bold text-navy text-lg">{booking.referenceCode}</span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        booking.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-800"
                          : booking.status === "cancelled"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {booking.status === "confirmed" && <CheckCircle2 size={13} />}
                      {booking.status === "cancelled" && <Ban size={13} />}
                      {booking.status}
                    </span>
                  </div>

                  {/* Booking Details Grid */}
                  <div className="space-y-2 text-xs text-ink">
                    <div className="flex items-center gap-2 text-navy font-medium">
                      <User size={14} className="text-muted" />
                      <span>{booking.guestName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <Mail size={14} />
                      <span>{booking.guestEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <Phone size={14} />
                      <span>{booking.guestPhone}</span>
                    </div>

                    <div className="border-t border-sand-200 pt-3 mt-3 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-muted">Room Reserved:</span>
                        <span className="font-medium text-navy">{booking.roomName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Stay Dates:</span>
                        <span className="font-medium text-navy">
                          {booking.checkIn} → {booking.checkOut} ({booking.nights} {booking.nights === 1 ? "night" : "nights"})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Guests:</span>
                        <span>
                          {booking.guests.adults} Adults, {booking.guests.children} Children
                        </span>
                      </div>
                      {booking.specialRequests && (
                        <div className="pt-1">
                          <span className="text-muted block mb-0.5">Special Requests:</span>
                          <p className="bg-sand-50 p-2 rounded text-muted italic text-[11px]">
                            &ldquo;{booking.specialRequests}&rdquo;
                          </p>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-navy text-sm pt-2 border-t border-sand-200">
                        <span>Total Paid / Due:</span>
                        <span>${booking.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {booking.status === "confirmed" && (
                    <div className="pt-3 border-t border-sand-200">
                      {!confirmCancel ? (
                        <button
                          onClick={() => setConfirmCancel(true)}
                          className="w-full text-center text-xs font-medium text-rose-600 hover:text-rose-800 transition-colors py-1.5"
                        >
                          Cancel Reservation
                        </button>
                      ) : (
                        <div className="bg-rose-50 border border-rose-200 p-3 rounded text-center space-y-2">
                          <p className="text-xs text-rose-800 font-medium">
                            Are you sure you want to cancel this reservation?
                          </p>
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => setConfirmCancel(false)}
                              className="px-3 py-1 text-xs text-muted hover:text-ink bg-white border border-sand-300 rounded"
                            >
                              Keep Reservation
                            </button>
                            <button
                              onClick={handleCancelBooking}
                              className="px-3 py-1 text-xs text-white bg-rose-600 hover:bg-rose-700 rounded font-medium"
                            >
                              Yes, Confirm Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
