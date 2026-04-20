import { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  emoji: string;
}

const emojis = ["❤️", "💖", "💕", "✨", "🌸", "🎉", "⭐", "💫", "🌺", "🎊"];

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const initial: Heart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 14 + Math.random() * 18,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setHearts(initial);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {hearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: "absolute",
            left: `${h.x}%`,
            bottom: "-5%",
            fontSize: `${h.size}px`,
            animation: `floatUp ${h.duration}s ease-in ${h.delay}s infinite`,
            opacity: 0,
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
}
