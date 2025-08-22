import React, { useMemo } from "react";

/*
  CurvedLoop props:
  - marqueeText: string (required)
  - speed: number (ms between steps; smaller = faster)
  - curveAmount: number (radius/offset intensity)
  - direction: "left" | "right"
  - interactive: boolean (mouse tilt effect)
  - className: string
*/

const CurvedLoop = ({
  marqueeText = "Welcome to React Bits ✦",
  speed = 2,
  curveAmount = 280,
  direction = "right",
  interactive = true,
  className = "",
}) => {
  // Build a long repeated string so it loops seamlessly
  const repeated = useMemo(
    () => new Array(12).fill(marqueeText).join("   •   "),
    [marqueeText]
  );

  const dir = direction === "left" ? -1 : 1;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: 1000,
        userSelect: "none",
      }}
      onMouseMove={
        interactive
          ? (e) => {
              const el = e.currentTarget.querySelector(".curved-track");
              if (!el) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
              const dx = (e.clientX - cx) / rect.width;
              const dy = (e.clientY - cy) / rect.height;
              el.style.transform = `rotateX(${dy * -8}deg) rotateY(${dx * 12}deg)`;
            }
          : undefined
      }
      onMouseLeave={
        interactive
          ? (e) => {
              const el = e.currentTarget.querySelector(".curved-track");
              if (!el) return;
              el.style.transform = `rotateX(0deg) rotateY(0deg)`;
            }
          : undefined
      }
    >
      <svg
        width="100%"
        height="260"
        viewBox="0 0 1200 260"
        style={{ maxWidth: 1200 }}
      >
        {/* Path for the curve */}
        <defs>
          <path
            id="curvePath"
            d={`M 40 ${130 - curveAmount / 10}
                C 400 ${130 - curveAmount},
                  800 ${130 + curveAmount},
                  1160 ${130 + curveAmount / 10}`}
            fill="transparent"
          />
        </defs>

        {/* Animated text along path */}
        <g className="curved-track" style={{ transition: "transform 200ms" }}>
          <text
            fontSize="44"
            fontWeight="800"
            letterSpacing="0.06em"
            fill="currentColor"
          >
            <textPath
              href="#curvePath"
              startOffset="0%"
              method="align"
              spacing="auto"
            >
              {repeated}
            </textPath>
          </text>
        </g>

        {/* Marquee effect by shifting startOffset via CSS animation */}
        <style>{`
          textPath {
            animation: curve-marquee ${40 / Math.max(1, speed)}s linear infinite;
          }
          @keyframes curve-marquee {
            from { startOffset: 0%; }
            to { startOffset: ${dir * 100}%; }
          }
        `}</style>
      </svg>
    </div>
  );
};

export default CurvedLoop;
