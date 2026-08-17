import Image from "next/image";

interface OfferBannerProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  image: string;
}

export default function OfferBanner({
  eyebrow,
  title,
  description,
  ctaLabel,
  image,
}: OfferBannerProps) {
  return (
    <div className="relative">
      <div className="relative h-[420px] w-full sm:h-[460px]">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/70 via-navy-900/25 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="container-max">
          <div className="max-w-md text-white">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-400">
              {eyebrow}
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl">{title}</h2>
            <p className="mt-3 text-sm text-white/85">{description}</p>
            <a
              href="#booking"
              className="mt-6 inline-block rounded-sm bg-navy px-6 py-3 text-sm font-medium text-white hover:bg-navy-600"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
