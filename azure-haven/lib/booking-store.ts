import { Booking, Room } from "./types";
import { ROOMS } from "./rooms-data";

const STORAGE_KEY = "azure_haven_bookings_v1";

const INITIAL_SEED_BOOKINGS: Booking[] = [
  {
    referenceCode: "AZH-8921",
    roomId: "deluxe-ocean-view",
    roomName: "Deluxe Ocean View",
    checkIn: "2026-09-10",
    checkOut: "2026-09-14",
    nights: 4,
    guests: { adults: 2, children: 0 },
    totalAmount: 1196,
    guestName: "Sarah Jenkins",
    guestEmail: "sarah.jenkins@example.com",
    guestPhone: "+1 (555) 234-5678",
    specialRequests: "High floor requested, late check-in around 8 PM.",
    status: "confirmed",
    createdAt: "2026-08-10T10:00:00.000Z",
  },
  {
    referenceCode: "AZH-3419",
    roomId: "luxury-suite",
    roomName: "Luxury Suite",
    checkIn: "2026-09-15",
    checkOut: "2026-09-18",
    nights: 3,
    guests: { adults: 2, children: 1 },
    totalAmount: 1797,
    guestName: "Michael Vance",
    guestEmail: "m.vance@example.com",
    guestPhone: "+1 (555) 987-6543",
    specialRequests: "Honeymoon setup, flower bouquet.",
    status: "confirmed",
    createdAt: "2026-08-12T14:30:00.000Z",
  },
];

export function getStoredBookings(): Booking[] {
  if (typeof window === "undefined") return INITIAL_SEED_BOOKINGS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_BOOKINGS));
      return INITIAL_SEED_BOOKINGS;
    }
    return JSON.parse(raw) as Booking[];
  } catch (error) {
    console.error("Error reading bookings from localStorage:", error);
    return INITIAL_SEED_BOOKINGS;
  }
}

function saveBookings(bookings: Booking[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    window.dispatchEvent(new Event("azure_haven_booking_change"));
  } catch (error) {
    console.error("Error saving bookings to localStorage:", error);
  }
}

export function isRoomAvailable(
  roomId: string,
  checkIn: string,
  checkOut: string,
  excludeReferenceCode?: string
): boolean {
  const room = ROOMS.find((r) => r.id === roomId);
  if (!room) return false;

  const bookings = getStoredBookings();
  const overlappingBookings = bookings.filter((b) => {
    if (b.roomId !== roomId) return false;
    if (b.status === "cancelled") return false;
    if (excludeReferenceCode && b.referenceCode === excludeReferenceCode) return false;

    // Check date overlap: b.checkIn < checkOut && b.checkOut > checkIn
    return b.checkIn < checkOut && b.checkOut > checkIn;
  });

  return overlappingBookings.length < room.totalUnits;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

export function generateReferenceCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "AZH-";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function createBooking(
  bookingData: Omit<Booking, "referenceCode" | "status" | "createdAt">
): { success: boolean; booking?: Booking; error?: string } {
  if (!isRoomAvailable(bookingData.roomId, bookingData.checkIn, bookingData.checkOut)) {
    return {
      success: false,
      error: "Sorry, this room is no longer available for the selected dates.",
    };
  }

  const referenceCode = generateReferenceCode();
  const newBooking: Booking = {
    ...bookingData,
    referenceCode,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  const bookings = getStoredBookings();
  const updatedBookings = [newBooking, ...bookings];
  saveBookings(updatedBookings);

  return {
    success: true,
    booking: newBooking,
  };
}

export function getBookingByReference(
  referenceCode: string,
  guestEmail: string
): Booking | null {
  const bookings = getStoredBookings();
  const cleanCode = referenceCode.trim().toUpperCase();
  const cleanEmail = guestEmail.trim().toLowerCase();

  const found = bookings.find(
    (b) =>
      b.referenceCode.toUpperCase() === cleanCode &&
      b.guestEmail.toLowerCase() === cleanEmail
  );

  return found || null;
}

export function cancelBooking(referenceCode: string): { success: boolean; error?: string } {
  const bookings = getStoredBookings();
  const cleanCode = referenceCode.trim().toUpperCase();

  const index = bookings.findIndex((b) => b.referenceCode.toUpperCase() === cleanCode);
  if (index === -1) {
    return { success: false, error: "Booking not found." };
  }

  if (bookings[index].status === "cancelled") {
    return { success: false, error: "Booking is already cancelled." };
  }

  bookings[index].status = "cancelled";
  saveBookings(bookings);

  return { success: true };
}
