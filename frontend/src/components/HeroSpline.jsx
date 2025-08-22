import Spline from '@splinetool/react-spline';
import './hero-spline.css';

export default function HeroSpline({ scene = "https://prod.spline.design/TSuOh6nBtHyg4Nem/scene.splinecode", width = 2000, height = 200 }) {
  return (
    <section className="hero-spline-section" aria-label="Interactive 3D scene">
      <div className="hero-spline-wrap" style={{ width, height }}>
        <Spline scene={scene} />
      </div>
    </section>
  );
}
