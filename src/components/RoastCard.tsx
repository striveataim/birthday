import { useEffect, useRef, useState } from "react";

interface Roast {
  emoji: string;
  title: string;
  text: string;
}

interface RoastCardProps {
  roast: Roast;
  index: number;
}

export function RoastCard({ roast, index }: RoastCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`roast-card ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="roast-emoji">{roast.emoji}</div>
      <h3>{roast.title}</h3>
      <p>{roast.text}</p>
    </div>
  );
}
