import { Room } from "./types";

export const ROOMS: Room[] = [
  {
    id: "deluxe-ocean-view",
    name: "Deluxe Ocean View",
    category: "deluxe",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1600&auto=format&fit=crop",
    price: 299,
    guests: 2,
    beds: "1 King Bed",
    size: 45,
    totalUnits: 10,
    description:
      "Enjoy breathtaking ocean views from your private balcony with floor-to-ceiling windows and luxury marble bathroom.",
    amenities: ["Ocean View Balcony", "Free Wi-Fi", "Espresso Machine", "Rainfall Shower", "Smart TV"],
  },
  {
    id: "luxury-suite",
    name: "Luxury Suite",
    category: "suite",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop",
    price: 599,
    guests: 3,
    beds: "1 King Bed + Lounge",
    size: 75,
    totalUnits: 5,
    badge: "Popular",
    description:
      "Spacious suite featuring a separate living room, private plunge pool, and dedicated butler service.",
    amenities: ["Private Plunge Pool", "24/7 Butler Service", "Ocean Front", "King Bed", "Mini Bar"],
  },
  {
    id: "presidential-villa",
    name: "Presidential Villa",
    category: "villa",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1600&auto=format&fit=crop",
    price: 1299,
    guests: 6,
    beds: "2 King Beds",
    size: 120,
    totalUnits: 2,
    badge: "Exclusive",
    description:
      "The pinnacle of luxury resort living with private infinity pool, direct beach access, chef's kitchen, and personal concierge.",
    amenities: ["Private Infinity Pool", "Direct Beach Access", "2 King Suites", "Dining Terrace", "Chef Service"],
  },
  {
    id: "beachfront-bungalow",
    name: "Beachfront Bungalow",
    category: "bungalow",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1600&auto=format&fit=crop",
    price: 450,
    guests: 2,
    beds: "1 King Bed",
    size: 55,
    totalUnits: 6,
    badge: "New",
    description:
      "Steps away from white sandy shores with a wrap-around porch, hammocks, outdoor tropical shower, and sunset views.",
    amenities: ["Steps to Beach", "Outdoor Tropical Shower", "King Bed", "Sunset View Porch", "Sonos Sound System"],
  },
  {
    id: "royal-haven-suite",
    name: "Royal Haven Suite",
    category: "suite",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1600&auto=format&fit=crop",
    price: 850,
    guests: 4,
    beds: "2 King Beds",
    size: 95,
    totalUnits: 4,
    description:
      "Panoramic ocean panoramas, expansive dining terrace, Jacuzzi bath, and VIP airport transfer service.",
    amenities: ["Panormaic Ocean View", "Private Jacuzzi", "VIP Airport Transfer", "Sub-Zero Bar", "Daily Spa Pass"],
  },
];
