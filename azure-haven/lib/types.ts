export type BookingStatus = "confirmed" | "cancelled" | "completed";

export interface Room {
  id: string;
  name: string;
  category: "deluxe" | "suite" | "villa" | "bungalow";
  image: string;
  price: number;
  guests: number;
  beds: string;
  size: number;
  totalUnits: number;
  badge?: string;
  description: string;
  amenities: string[];
}

export interface Booking {
  referenceCode: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
  };
  totalAmount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface AvailabilityFilter {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}
