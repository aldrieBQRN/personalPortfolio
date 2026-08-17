import type { LucideIcon } from "lucide-react";

interface AmenityItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function AmenityItem({
  icon: Icon,
  title,
  description,
}: AmenityItemProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-md bg-white p-6 text-center shadow-soft">
      <Icon size={26} className="text-gold-500" strokeWidth={1.5} />
      <h3 className="text-sm font-semibold text-navy">{title}</h3>
      <p className="text-xs leading-relaxed text-muted">{description}</p>
    </div>
  );
}
