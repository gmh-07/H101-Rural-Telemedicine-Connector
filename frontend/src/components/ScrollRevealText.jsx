import { useEffect, useRef, useState } from "react";
import "./ScrollRevealText.css";

export default function ScrollRevealText({
  line1 = "React Bits",
  line2 = "Scroll Down",
  repeat = 8,           // how many times to repeat across the line
  minHeight = 1200,     // scrollable height for the effect area
}) {
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0 → 1

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // progress: when top hits bottom of viewport (0) to when bottom leaves top (1)
        const total = rect.height + vh;
        const p = Math.min(1, Math.max(0, 1 - rect.bottom / total));
        setProgress(p);
      });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          onScroll();
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { threshold: 0 }
    );

    io.observe(el);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const mask = `linear-gradient(90deg, #000 ${progress * 100}%, transparent ${progress * 100}%)`;

  const repeatText = (t) => Array.from({ length: repeat }).map(() => t).join(" ");

  return (
    <section className="scrollreveal" style={{ minHeight }} ref={wrapRef}>
      {/* Foreground masked lines */}
      <div className="scrollreveal__stage" style={{ WebkitMaskImage: mask, maskImage: mask }}>
        <h2 className="scrollreveal__text">{repeatText(line1)}</h2>
        <h2 className="scrollreveal__text">{repeatText(line2)}</h2>
      </div>

      {/* Ghost background lines */}
      <div className="scrollreveal__ghost" aria-hidden="true">
        <h2 className="scrollreveal__text">{repeatText(line1)}</h2>
        <h2 className="scrollreveal__text">{repeatText(line2)}</h2>
      </div>
    </section>
  );
}
