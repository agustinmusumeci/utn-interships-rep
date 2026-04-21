export interface CareerBadgeProps {
  color?: string;
  bg?: string;
  text?: string;
}

export default function CareerBadge({ color = "", bg = "", text = "Desconocida" }: CareerBadgeProps) {
  return (
    <p
      className="px-4 py-1 rounded-sm bg-neutral border border-muted"
      style={{ color: color, backgroundColor: bg }}
    >
      {text}
    </p>
  );
}
