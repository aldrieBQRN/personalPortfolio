import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

const QUICK_LINKS = ["About Us", "Rooms & Suites", "Dining", "Experiences", "Offers", "Contact"];
const GUEST_SERVICES = ["Concierge", "Room Service", "Spa & Wellness", "Activities", "Transportation", "FAQ"];

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-900 pt-16 text-white/80">
      <div className="container-max grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-xl text-white">Azure Haven</p>
          <p className="text-[10px] tracking-[0.25em] text-gold-400">
            HOTEL &amp; RESORT
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            A luxury hotel &amp; resort offering unparalleled hospitality and
            unforgettable experiences.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h3 className="text-sm font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            {QUICK_LINKS.map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-gold-400">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Guest services">
          <h3 className="text-sm font-semibold text-white">Guest Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            {GUEST_SERVICES.map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-gold-400">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact Info</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
              123 Ocean Drive, Paradise Island, PI 12345
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-gold-400" />
              +1 (869) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-gold-400" />
              info@azurehaven.com
            </li>
          </ul>
        </div>
      </div>

      <div className="container-max flex items-center justify-center gap-5 border-t border-white/10 py-6">
        <a href="#" aria-label="Facebook" className="hover:text-gold-400">
          <Facebook size={18} />
        </a>
        <a href="#" aria-label="Instagram" className="hover:text-gold-400">
          <Instagram size={18} />
        </a>
        <a href="#" aria-label="Twitter" className="hover:text-gold-400">
          <Twitter size={18} />
        </a>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-max flex flex-col items-center justify-between gap-2 text-xs text-white/50 sm:flex-row">
          <p>&copy; 2026 Azure Haven Hotel &amp; Resort. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gold-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
