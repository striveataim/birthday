import { ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  scrollY: number;
  offset: number;
}

export function ParallaxSection({ children, scrollY, offset }: ParallaxSectionProps) {
  const factor = Math.max(0, 1 - Math.abs(scrollY - offset) / 600);
  const translateY = (scrollY - offset) * 0.15;

  return (
    <section
      className="parallax-section"
      style={{
        transform: `translateY(${translateY}px)`,
        opacity: 0.3 + factor * 0.7,
      }}
    >
      {children}
    </section>
  );
}
