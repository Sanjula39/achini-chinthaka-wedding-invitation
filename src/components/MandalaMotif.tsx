// components/MandalaMotif.tsx
// Gold Kandyan mandala SVG — replicates the lotus/flower patterns
// from the invitation card's corner ornaments.

interface MandalaMotifProps {
  size?: number;
  className?: string;
  opacity?: number;
}

export default function MandalaMotif({
  size = 400,
  className = "",
  opacity = 1,
}: MandalaMotifProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="goldGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#F5DE97" />
          <stop offset="50%"  stopColor="#C9973A" />
          <stop offset="100%" stopColor="#7A5310" />
        </radialGradient>
        <radialGradient id="goldGrad2" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#E8B238" />
          <stop offset="100%" stopColor="#96680F" />
        </radialGradient>
      </defs>

      {/* ── Outer ring petals (12 petals) ── */}
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={`outer-${i}`}
          cx="100"
          cy="100"
          rx="8"
          ry="42"
          fill="url(#goldGrad)"
          fillOpacity="0.75"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}

      {/* ── Mid ring petals (8 petals) ── */}
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={`mid-${i}`}
          cx="100"
          cy="100"
          rx="6"
          ry="28"
          fill="url(#goldGrad2)"
          fillOpacity="0.90"
          transform={`rotate(${i * 45 + 22.5} 100 100)`}
        />
      ))}

      {/* ── Inner decorative ring ── */}
      <circle cx="100" cy="100" r="32" fill="none" stroke="#C9973A" strokeWidth="1" strokeOpacity="0.7" />
      <circle cx="100" cy="100" r="28" fill="none" stroke="#E8B238" strokeWidth="0.5" strokeOpacity="0.5" />

      {/* ── Inner petals (6 petals) ── */}
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse
          key={`inner-${i}`}
          cx="100"
          cy="100"
          rx="5"
          ry="18"
          fill="#C9973A"
          fillOpacity="0.95"
          transform={`rotate(${i * 60} 100 100)`}
        />
      ))}

      {/* ── Decorative dot ring ── */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad   = (angle * Math.PI) / 180;
        const r     = 55;
        const cx    = 100 + r * Math.sin(rad);
        const cy    = 100 - r * Math.cos(rad);
        return (
          <circle key={`dot-${i}`} cx={cx} cy={cy} r="1.8" fill="#E8B238" fillOpacity="0.8" />
        );
      })}

      {/* ── Center lotus ── */}
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={`lotus-${i}`}
          cx="100"
          cy="100"
          rx="3.5"
          ry="10"
          fill="#F5DE97"
          transform={`rotate(${i * 45} 100 100)`}
        />
      ))}

      {/* ── Center jewel ── */}
      <circle cx="100" cy="100" r="7" fill="url(#goldGrad)" />
      <circle cx="100" cy="100" r="3.5" fill="#FDF8F0" fillOpacity="0.9" />
      <circle cx="100" cy="100" r="1.5" fill="#C9973A" />
    </svg>
  );
}
