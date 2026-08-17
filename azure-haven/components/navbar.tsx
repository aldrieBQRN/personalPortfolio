"use client";

import { useEffect, useState } from "react";
import { Menu, CalendarCheck } from "lucide-react";
import MobileMenu from "./mobile-menu";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Rooms & Suites", href: "#rooms" },
  { label: "Dining", href: "#dining" },
  { label: "Experiences", href: "#experiences" },
  { label: "Offers", href: "#offers" },
  { label: "Amenities", href: "#amenities" },
];

interface NavbarProps {
  onOpenLookup: () => void;
  onOpenBookingModal: () => void;
}

export default function Navbar({ onOpenLookup, onOpenBookingModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-soft backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-max flex items-center justify-between"
      >
        <a href="#home" className="flex flex-col leading-none">
          <span
            className={`font-serif text-2xl font-semibold ${
              scrolled ? "text-navy" : "text-white"
            }`}
          >
            Azure Haven
          </span>
          <span
            className={`text-[10px] tracking-[0.25em] font-medium ${
              scrolled ? "text-gold-600" : "text-gold-400"
            }`}
          >
            HOTEL &amp; RESORT
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-gold-500 ${
                  scrolled ? "text-ink" : "text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenLookup}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded transition-colors ${
              scrolled
                ? "text-navy border border-navy/30 hover:bg-sand-100"
                : "text-white border border-white/40 hover:bg-white/10"
            }`}
          >
            <CalendarCheck size={14} />
            My Booking
          </button>

          <button
            onClick={onOpenBookingModal}
            className="rounded-sm bg-navy px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-navy-600 shadow-sm"
          >
            Book Now
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenLookup}
            className={`p-2 text-xs font-medium flex items-center gap-1 rounded ${
              scrolled ? "text-navy" : "text-white"
            }`}
            title="My Booking"
          >
            <CalendarCheck size={20} />
          </button>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className={`p-1.5 ${scrolled ? "text-navy" : "text-white"}`}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
        onOpenLookup={onOpenLookup}
        onOpenBookingModal={onOpenBookingModal}
      />
    </header>
  );
}
