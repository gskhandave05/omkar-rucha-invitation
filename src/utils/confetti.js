import confetti from "canvas-confetti";

const INVITE_COLORS = ["#ba7a76", "#d4af37", "#e2b4b1", "#f7dcda", "#8a4f4c", "#e8ce73"];

export function fireCardConfetti(element) {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

  confetti({
    particleCount: 60,
    spread: 65,
    startVelocity: 28,
    gravity: 0.9,
    ticks: 180,
    origin: { x, y },
    colors: INVITE_COLORS,
    disableForReducedMotion: true,
    scalar: 0.9,
  });

  confetti({
    particleCount: 25,
    spread: 100,
    startVelocity: 18,
    gravity: 0.6,
    ticks: 140,
    origin: { x, y },
    colors: INVITE_COLORS,
    shapes: ["circle"],
    scalar: 0.6,
  });
}

export function fireGrandConfetti() {
  const burst = (x, delay = 0) => {
    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 80,
        startVelocity: 32,
        origin: { x, y: 0.55 },
        colors: INVITE_COLORS,
        disableForReducedMotion: true,
      });
    }, delay);
  };

  burst(0.25, 0);
  burst(0.5, 120);
  burst(0.75, 240);

  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 120,
      startVelocity: 40,
      origin: { x: 0.5, y: 0.5 },
      colors: INVITE_COLORS,
      ticks: 220,
    });
  }, 350);
}
