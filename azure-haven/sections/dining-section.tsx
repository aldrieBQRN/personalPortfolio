import DiningCard from "@/components/dining-card";

const DINING_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1400&auto=format&fit=crop",
    alt: "Oceanfront dining table set for sunset dinner",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1400&auto=format&fit=crop&sat=-30",
    alt: "Chef-plated gourmet dish",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
    alt: "Interior of the resort's fine dining restaurant",
  },
];

export default function DiningSection() {
  return (
    <section id="dining" className="bg-white py-20 sm:py-24">
      <div className="container-max grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,320px)_1fr]">
        <div>
          <h2 className="text-2xl sm:text-3xl">Dining Excellence</h2>
          <p className="mt-3 text-sm text-muted">
            Savor unforgettable culinary experiences crafted by our
            world-class chefs.
          </p>
          <a
            href="#dining"
            className="mt-5 inline-block rounded-sm border border-navy px-5 py-2 text-sm font-medium text-navy hover:bg-navy hover:text-white"
          >
            View All Restaurants
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {DINING_IMAGES.map((img) => (
            <DiningCard key={img.alt} image={img.src} alt={img.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
