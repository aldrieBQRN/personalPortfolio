import Image from "next/image";

export interface Experience {
  title: string;
  description: string;
  image: string;
}

export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <article className="group overflow-hidden rounded-md">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-navy">
        {experience.title}
      </h3>
      <p className="text-xs text-muted">{experience.description}</p>
    </article>
  );
}
