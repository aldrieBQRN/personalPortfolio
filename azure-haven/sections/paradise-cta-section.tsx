import Image from "next/image";

export default function ParadiseCtaSection() {
  return (
    <section className="relative">
      <div className="relative h-[420px] w-full sm:h-[460px]">
        <Image
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2400&auto=format&fit=crop"
          alt="Resort infinity pool overlooking the ocean at sunset"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/70 via-navy-900/25 to-transparent" />

        <div className="relative z-10 flex h-full items-center">
          <div className="container-max">
            <div className="max-w-md text-white">
              <h2 className="text-2xl sm:text-3xl">Your Paradise Awaits</h2>
              <p className="mt-3 text-sm text-white/85">
                Ready to experience luxury like never before? Book your dream
                getaway today.
              </p>
              <a
                href="#booking"
                className="mt-6 inline-block rounded-sm bg-navy px-6 py-3 text-sm font-medium text-white hover:bg-navy-600"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
