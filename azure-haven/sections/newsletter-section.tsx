import Newsletter from "@/components/newsletter";

export default function NewsletterSection() {
  return (
    <section className="bg-navy-900 py-16 text-center text-white">
      <div className="container-max">
        <h2 className="text-2xl text-white sm:text-3xl">Stay Connected</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
          Subscribe to receive special offers and updates.
        </p>
        <div className="mt-6">
          <Newsletter />
        </div>
      </div>
    </section>
  );
}
