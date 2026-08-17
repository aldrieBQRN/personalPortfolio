import Image from "next/image";
import { Star } from "lucide-react";

export interface Testimonial {
  quote: string;
  name: string;
  date: string;
  avatar: string;
}

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <figure className="rounded-md bg-white p-6 shadow-card">
      <div className="flex gap-0.5 text-gold-500" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="mt-4 text-sm text-muted">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <div className="relative h-9 w-9 overflow-hidden rounded-full">
          <Image
            src={testimonial.avatar}
            alt={`Portrait of ${testimonial.name}`}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-ink">{testimonial.name}</p>
          <p className="text-xs text-muted">{testimonial.date}</p>
        </div>
      </figcaption>
    </figure>
  );
}
