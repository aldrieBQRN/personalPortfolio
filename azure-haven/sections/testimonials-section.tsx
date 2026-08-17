import TestimonialCard, { type Testimonial } from "@/components/testimonial-card";

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Absolutely perfect! The service was exceptional and the views were breathtaking. Can't wait to come back!",
    name: "Sarah Johnson",
    date: "March 2026",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "The most relaxing vacation we've ever had. Every detail was perfect. Highly recommend!",
    name: "Michael Chen",
    date: "April 2026",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Luxury at its finest! The staff went above and beyond to make our stay unforgettable.",
    name: "Emma Rodriguez",
    date: "May 2026",
    avatar:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=200&auto=format&fit=crop",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-sand-50 py-20 sm:py-24">
      <div className="container-max text-center">
        <h2 className="text-2xl sm:text-3xl">Guest Stories</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          Real experiences from our valued guests.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
