import { useEffect, useRef, useState } from "react";

interface CakeCSSProps {
  candlesLit: boolean;
}

function CylinderLayer({
  radius,
  height,
  topColor,
  sideColor,
  bottomColor,
  y,
  segments = 20,
}: {
  radius: number;
  height: number;
  topColor: string;
  sideColor: string;
  bottomColor: string;
  y: number;
  segments?: number;
}) {
  const faces = Array.from({ length: segments }, (_, i) => {
    const angle = (i / segments) * 360;
    const faceWidth = 2 * radius * Math.sin(Math.PI / segments);
    return { angle, faceWidth };
  });

  return (
    <div
      style={{
        position: "absolute",
        width: radius * 2,
        height: radius * 2,
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) translateY(${y}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Side faces */}
      {faces.map(({ angle, faceWidth }, i) => {
        const shade = 0.6 + 0.4 * Math.abs(Math.cos((angle * Math.PI) / 180));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: faceWidth + 1,
              height: height,
              top: "50%",
              left: "50%",
              transform: `translateX(-50%) translateY(-50%) rotateY(${angle}deg) translateZ(${radius}px)`,
              background: sideColor,
              filter: `brightness(${shade})`,
              backfaceVisibility: "hidden",
            }}
          />
        );
      })}

      {/* Top face */}
      <div
        style={{
          position: "absolute",
          width: radius * 2,
          height: radius * 2,
          top: "50%",
          left: "50%",
          borderRadius: "50%",
          transform: `translate(-50%, -50%) rotateX(90deg) translateZ(${height / 2}px)`,
          background: topColor,
          backfaceVisibility: "hidden",
        }}
      />

      {/* Bottom face */}
      <div
        style={{
          position: "absolute",
          width: radius * 2,
          height: radius * 2,
          top: "50%",
          left: "50%",
          borderRadius: "50%",
          transform: `translate(-50%, -50%) rotateX(-90deg) translateZ(${height / 2}px)`,
          background: bottomColor,
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
}

function Candle3D({
  x,
  z,
  lit,
  color,
}: {
  x: number;
  z: number;
  lit: boolean;
  color: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: 14,
        height: 14,
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) translateY(-230px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Candle body cylinder */}
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * 360;
        const shade = 0.7 + 0.3 * Math.abs(Math.cos((angle * Math.PI) / 180));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 5,
              height: 50,
              top: "50%",
              left: "50%",
              transform: `translateX(-50%) translateY(-50%) rotateY(${angle}deg) translateZ(7px)`,
              background: color,
              filter: `brightness(${shade})`,
              backfaceVisibility: "hidden",
            }}
          />
        );
      })}
      {/* Wick */}
      <div
        style={{
          position: "absolute",
          width: 2,
          height: 8,
          top: "50%",
          left: "50%",
          background: "#333",
          transform: "translate(-50%, -50%) translateY(-29px) translateZ(7px)",
          zIndex: 10,
        }}
      />
      {/* Flame */}
      {lit && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) translateY(-44px) translateZ(7px)",
            zIndex: 20,
          }}
        >
          <div className="flame-outer" />
          <div className="flame-inner" />
        </div>
      )}
    </div>
  );
}

function FrostingDrip({
  radius,
  y,
  color,
}: {
  radius: number;
  y: number;
  color: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: radius * 2 + 8,
        height: radius * 2 + 8,
        borderRadius: "50%",
        transform: `translate(-50%, -50%) translateY(${y}px)`,
        background: color,
        transformStyle: "preserve-3d",
      }}
    />
  );
}

const candleData = [
  { x: 0, z: 0, color: "#ff99cc" },
  { x: 35, z: 12, color: "#ffcc66" },
  { x: -35, z: 12, color: "#99ccff" },
  { x: 15, z: -35, color: "#cc99ff" },
  { x: -15, z: -35, color: "#ff9966" },
];

export function CakeCSS({ candlesLit }: CakeCSSProps) {
  const [rotation, setRotation] = useState(0);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    const animate = (ts: number) => {
      if (lastRef.current) {
        const delta = ts - lastRef.current;
        setRotation((r) => r + delta * 0.025);
      }
      lastRef.current = ts;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      style={{
        width: 340,
        height: 340,
        perspective: 700,
        perspectiveOrigin: "50% 35%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "floatCake 3s ease-in-out infinite",
      }}
    >
      <div
        style={{
          width: 340,
          height: 340,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(18deg) rotateY(${rotation}deg)`,
        }}
      >
        {/* Plate */}
        <CylinderLayer
          radius={130}
          height={12}
          topColor="radial-gradient(circle, #fce4ec, #f8bbd0)"
          sideColor="#f48fb1"
          bottomColor="#e91e63"
          y={100}
          segments={24}
        />

        {/* Frosting bottom drip ring */}
        <FrostingDrip radius={108} y={60} color="rgba(255,255,255,0.55)" />

        {/* Bottom tier */}
        <CylinderLayer
          radius={108}
          height={80}
          topColor="radial-gradient(circle, #fff0f5, #f8bbd0)"
          sideColor="#f06292"
          bottomColor="#e91e63"
          y={40}
          segments={24}
        />

        {/* Frosting mid drip ring */}
        <FrostingDrip radius={82} y={-16} color="rgba(255,240,248,0.7)" />

        {/* Middle tier */}
        <CylinderLayer
          radius={82}
          height={70}
          topColor="radial-gradient(circle, #fff0f5, #f48fb1)"
          sideColor="#ec407a"
          bottomColor="#c2185b"
          y={-55}
          segments={20}
        />

        {/* Frosting top drip ring */}
        <FrostingDrip radius={58} y={-106} color="rgba(255,255,255,0.65)" />

        {/* Top tier */}
        <CylinderLayer
          radius={58}
          height={60}
          topColor="radial-gradient(circle, #fff5f9, #fce4ec)"
          sideColor="#e91e63"
          bottomColor="#ad1457"
          y={-148}
          segments={16}
        />

        {/* Candles */}
        {candleData.map((c, i) => (
          <Candle3D key={i} x={c.x} z={c.z} lit={candlesLit} color={c.color} />
        ))}

        {/* Decorative star on top */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) translateY(-195px) translateZ(58px)",
            fontSize: "1.8rem",
            zIndex: 30,
          }}
        >
          ⭐
        </div>

        {/* Decoration dots - bottom tier */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <div
              key={`bd-${i}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: ["#ff6699","#ffcc00","#66ccff","#cc66ff","#ff9966","#99ff99","#ff6633","#aaddff"][i],
                boxShadow: `0 0 8px 2px ${["#ff6699","#ffcc00","#66ccff","#cc66ff","#ff9966","#99ff99","#ff6633","#aaddff"][i]}`,
                transform: `translate(-50%, -50%) translateX(${Math.cos(a) * 112}px) translateZ(${Math.sin(a) * 112}px) translateY(35px)`,
                zIndex: 10,
              }}
            />
          );
        })}

        {/* Decoration dots - mid tier */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <div
              key={`md-${i}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: ["#ffcc00","#ff66cc","#66ffcc","#cc66ff","#ff9933","#33ccff"][i],
                boxShadow: `0 0 6px 2px ${["#ffcc00","#ff66cc","#66ffcc","#cc66ff","#ff9933","#33ccff"][i]}`,
                transform: `translate(-50%, -50%) translateX(${Math.cos(a) * 85}px) translateZ(${Math.sin(a) * 85}px) translateY(-60px)`,
                zIndex: 10,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
