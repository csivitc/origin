'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target: 28 Aug 2026 11:00:00
    const targetDate = new Date('2026-08-28T11:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNum = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6 mt-12 font-mono-custom">
      {/* DAYS */}
      <div className="flex flex-col items-center group">
        <div className="bg-[#121212] border border-[#2A2A2A] group-hover:border-[#FF4D1C] transition-colors px-4 sm:px-6 py-3 min-w-[70px] sm:min-w-[90px] text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <span className="text-2xl sm:text-4xl font-bold text-[#FF4D1C] glow-orange-text">
            {formatNum(timeLeft.days)}
          </span>
        </div>
        <span className="text-[10px] sm:text-xs text-[#8A8A8A] mt-2 tracking-widest uppercase">
          DAYS
        </span>
      </div>

      <span className="text-[#FF4D1C] text-xl font-bold pb-6">:</span>

      {/* HOURS */}
      <div className="flex flex-col items-center group">
        <div className="bg-[#121212] border border-[#2A2A2A] group-hover:border-[#FF4D1C] transition-colors px-4 sm:px-6 py-3 min-w-[70px] sm:min-w-[90px] text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <span className="text-2xl sm:text-4xl font-bold text-[#FF4D1C] glow-orange-text">
            {formatNum(timeLeft.hours)}
          </span>
        </div>
        <span className="text-[10px] sm:text-xs text-[#8A8A8A] mt-2 tracking-widest uppercase">
          HRS
        </span>
      </div>

      <span className="text-[#FF4D1C] text-xl font-bold pb-6">:</span>

      {/* MINUTES */}
      <div className="flex flex-col items-center group">
        <div className="bg-[#121212] border border-[#2A2A2A] group-hover:border-[#FF4D1C] transition-colors px-4 sm:px-6 py-3 min-w-[70px] sm:min-w-[90px] text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <span className="text-2xl sm:text-4xl font-bold text-[#F2F0EB] group-hover:text-[#FF4D1C] transition-colors">
            {formatNum(timeLeft.minutes)}
          </span>
        </div>
        <span className="text-[10px] sm:text-xs text-[#8A8A8A] mt-2 tracking-widest uppercase">
          MIN
        </span>
      </div>

      <span className="text-[#FF4D1C] text-xl font-bold pb-6">:</span>

      {/* SECONDS */}
      <div className="flex flex-col items-center group">
        <div className="bg-[#121212] border border-[#2A2A2A] group-hover:border-[#FF4D1C] transition-colors px-4 sm:px-6 py-3 min-w-[70px] sm:min-w-[90px] text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <span className="text-2xl sm:text-4xl font-bold text-[#FF4D1C] glow-orange-text">
            {formatNum(timeLeft.seconds)}
          </span>
        </div>
        <span className="text-[10px] sm:text-xs text-[#8A8A8A] mt-2 tracking-widest uppercase">
          SEC
        </span>
      </div>
    </div>
  );
}
