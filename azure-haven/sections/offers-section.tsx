import OfferBanner from "@/components/offer-banner";

export default function OffersSection() {
  return (
    <section id="offers" className="bg-sand-50">
      <OfferBanner
        eyebrow="Special Offer"
        title="Book Direct & Save"
        description="Enjoy up to 20% off your stay when you book directly through our website."
        ctaLabel="Book Now & Save"
        image="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2200&auto=format&fit=crop"
      />
    </section>
  );
}
