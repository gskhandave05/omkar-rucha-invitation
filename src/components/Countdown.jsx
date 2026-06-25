import { useEffect, useState } from "react";

function Countdown() {
  const eventDate = new Date("2026-07-04T11:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = eventDate - new Date();

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16">
      <h2 className="text-3xl text-center mb-10">
        Countdown
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {Object.entries(timeLeft).map(([key, value]) => (
          <div
            key={key}
            className="bg-white rounded-3xl shadow-xl p-8 text-center"
          >
            <div className="text-5xl text-amber-700 font-bold">
              {value}
            </div>

            <div className="uppercase tracking-widest mt-2">
              {key}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Countdown;