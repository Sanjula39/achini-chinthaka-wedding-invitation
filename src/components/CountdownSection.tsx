"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import MandalaMotif from "./MandalaMotif";

// ── Target: May 08, 2026, 09:30 AM SLST (UTC+5:30) ───────────────
const WEDDING_DATE = new Date("2026-05-08T09:30:00+05:30");

interface TimeLeft {
  days:    number;
  hours:   number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface CountdownBoxProps {
  value: number;
  label: string;
  delay: number;
}

function CountdownBox({ value, label, delay }: CountdownBoxProps) {
  const display = String(value).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-center"
    >
      <div
        className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center rounded-xl"
        style={{
          background: "#FEFDF9",
          border: "2px solid #C9973A",
          boxShadow: "0 4px 20px rgba(201,151,58,0.2), inset 0 1px 0 rgba(245,222,151,0.5)",
        }}
      >
        {/* Inner gold accent */}
        <div
          className="absolute inset-[3px] rounded-lg opacity-10"
          style={{ background: "linear-gradient(135deg, #C9973A, transparent)" }}
        />
        <motion.span
          key={value}
          initial={{ scale: 1.15, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-[#C9973A] relative z-10"
        >
          {display}
        </motion.span>
      </div>
      <p className="font-body text-[8px] sm:text-xs tracking-[0.25em] uppercase text-[#96680F] mt-3 font-medium">
        {label}
      </p>
    </motion.div>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  const tick = useCallback(() => setTimeLeft(calculateTimeLeft()), []);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  const isPast = WEDDING_DATE.getTime() < Date.now();

  return (
    <section
      id="countdown"
      className="relative section-pad bg-[#FDF8F0] overflow-hidden flex flex-col items-center"
      aria-labelledby="countdown-heading"
    >
      {/* Background mandalas */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center">
        <div className="opacity-5 mandala-spin">
          <MandalaMotif size={600} />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-xs tracking-[0.35em] uppercase text-[#C9973A] mb-4"
        >
          ✦ &nbsp; Counting Down &nbsp; ✦
        </motion.p>

        {/* Heading */}
        <motion.h2
          id="countdown-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-script text-5xl sm:text-6xl text-[#2C2C2C] mb-3"
        >
          Until the Poruwa
        </motion.h2>

        <motion.div
          className="gold-divider w-48 mx-auto mb-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-display text-sm text-[#5a5a5a] tracking-widest uppercase mb-12"
        >
          May 08, 2026 &nbsp;·&nbsp; 9:30 AM SLST
        </motion.p>

        {/* Countdown display */}
        {isPast ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-8 py-6 rounded-2xl"
            style={{ background: "linear-gradient(135deg, #C9973A, #E8B238)", boxShadow: "0 0 30px rgba(201,151,58,0.4)" }}
          >
            <p className="font-script text-4xl text-[#FDF8F0]">The celebration has begun! 🎉</p>
          </motion.div>
        ) : (
          <div className="flex items-start justify-center gap-2 sm:gap-6 md:gap-8 max-w-full px-2">
            {mounted && (
              <>
                <CountdownBox value={timeLeft.days}    label="Days"    delay={0.1} />
                <div className="flex flex-col items-center justify-center h-16 sm:h-24 md:h-28">
                  <span className="font-display text-xl sm:text-3xl text-[#C9973A] font-bold leading-none -mt-2">:</span>
                </div>
                <CountdownBox value={timeLeft.hours}   label="Hours"   delay={0.2} />
                <div className="flex flex-col items-center justify-center h-16 sm:h-24 md:h-28">
                  <span className="font-display text-xl sm:text-3xl text-[#C9973A] font-bold leading-none -mt-2">:</span>
                </div>
                <CountdownBox value={timeLeft.minutes} label="Minutes" delay={0.3} />
                <div className="flex flex-col items-center justify-center h-16 sm:h-24 md:h-28">
                  <span className="font-display text-xl sm:text-3xl text-[#C9973A] font-bold leading-none -mt-2">:</span>
                </div>
                <CountdownBox value={timeLeft.seconds} label="Seconds" delay={0.4} />
              </>
            )}
          </div>
        )}

        {/* Liyawel-inspired ornament row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-3 mt-14"
        >
          <div className="gold-divider w-20" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2L13.5 8L19.5 6L15 11L22 12L15 13L19.5 18L13.5 16L12 22L10.5 16L4.5 18L9 13L2 12L9 11L4.5 6L10.5 8Z" fill="#C9973A" />
          </svg>
          <div className="gold-divider w-20" />
        </motion.div>
      </div>
    </section>
  );
}
