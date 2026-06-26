const PETAL_COUNT = 12;

const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  id: i,
  left: `${(i * 8.3) % 100}%`,
  delay: `${(i * 0.7) % 5}s`,
  duration: `${8 + (i % 4) * 2}s`,
  size: 12 + (i % 3) * 4,
}));

export default function FloatingPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal absolute opacity-20"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            fontSize: petal.size,
          }}
        >
          🌸
        </span>
      ))}
    </div>
  );
}
