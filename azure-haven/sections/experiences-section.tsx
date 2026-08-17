import ExperienceCard, { type Experience } from "@/components/experience-card";

const EXPERIENCES: Experience[] = [
  {
    title: "Relax & Unwind",
    description: "Rejuvenate your mind and body",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Adventure Awaits",
    description: "Thrilling activities and exploration",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Culinary Journey",
    description: "Exquisite dining experiences",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Cultural Discovery",
    description: "Local culture and traditions",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function ExperiencesSection() {
  return (
    <section id="experiences" className="bg-white py-20 sm:py-24">
      <div className="container-max text-center">
        <h2 className="text-2xl sm:text-3xl">Experiences</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          Create memories that last a lifetime.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-5 text-left lg:grid-cols-4">
          {EXPERIENCES.map((experience) => (
            <ExperienceCard key={experience.title} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
}
