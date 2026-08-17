import Image from "next/image";

export default function DiningCard({
  image,
  alt,
}: {
  image: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-md">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}
