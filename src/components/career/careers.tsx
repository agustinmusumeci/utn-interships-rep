import { useId } from "react";
import CareerBadge from "./careerBadge";

export interface CareersProps {
  styles?: string;
  careers?: Array<{ id: string; name: string; color: string; bg: string } | null>;
  isCard?: boolean;
}

export default function Careers({ styles = "", careers = [], isCard = false }: CareersProps) {
  const id = useId();

  const shouldMarquee = careers.length >= 2 && isCard;
  return (
    <div className={"overflow-hidden " + (shouldMarquee ? "marquee-wrapper " : "flex flex-row gap-2 ") + styles}>
      <div className={shouldMarquee ? "marquee-track flex flex-row gap-2" : "contents"}>
        {careers.map((career, i) => (
          <CareerBadge
            key={`career-badge-${i}-${id}`}
            text={career?.name}
            color={career?.color}
            bg={career?.bg}
          />
        ))}
        {shouldMarquee &&
          careers.map((career, i) => (
            <CareerBadge
              key={`career-badge-marquee-${i}-${id}`}
              text={career?.name}
              color={career?.color}
              bg={career?.bg}
            />
          ))}
      </div>
      {careers.length === 0 && <CareerBadge text="Desconocida" />}
    </div>
  );
}
