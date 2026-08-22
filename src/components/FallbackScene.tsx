import './fallback-scene.css';

/**
 * Section 33: if WebGL isn't available, the app must not break — it
 * falls back to a 2D technological interface that keeps the same
 * visual language (grid, glow, crest) without any 3D rendering cost.
 */
export default function FallbackScene() {
  return (
    <div className="fallback-scene" aria-hidden="true">
      <div className="fallback-grid" />
      <div className="fallback-glow" />
      <img
        src={`${import.meta.env.BASE_URL}assets/logo/crest.png`}
        alt=""
        className="fallback-crest flicker"
        draggable={false}
      />
      <div className="fallback-badge eyebrow">3D SYSTEM FALLBACK · 2D MODE</div>
    </div>
  );
}
