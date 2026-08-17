"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, CalendarCheck } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  onOpenLookup: () => void;
  onOpenBookingModal: () => void;
}

export default function MobileMenu({
  open,
  onClose,
  links,
  onOpenLookup,
  onOpenBookingModal,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-navy-900/60 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-50 flex h-full w-[82%] max-w-sm flex-col bg-white p-6 shadow-2xl lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-xl text-navy">Azure Haven</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="text-navy"
              >
                <X size={24} />
              </button>
            </div>

            <ul className="mt-8 flex flex-col gap-5">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="text-base font-medium text-ink hover:text-gold-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto space-y-3 pt-6 border-t border-sand-200">
              <button
                onClick={() => {
                  onClose();
                  onOpenLookup();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-sm border border-navy px-4 py-2.5 text-center text-sm font-medium text-navy hover:bg-sand-100 transition-colors"
              >
                <CalendarCheck size={16} />
                Lookup My Booking
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenBookingModal();
                }}
                className="w-full rounded-sm bg-navy px-5 py-3 text-center text-sm font-medium text-white hover:bg-navy-600 transition-colors"
              >
                Book Now
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
