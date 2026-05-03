"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MandalaMotif from "./MandalaMotif";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100svh-5rem)] flex flex-col items-center justify-start overflow-x-hidden bg-[#FDF8F0] pt-6 pb-14 sm:pt-8 md:pt-10 md:pb-16"
      aria-label="Wedding Invitation Hero"
    >
      {/* ── Animated background mandalas ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Top-left corner */}
        <motion.div
          className="absolute -top-24 -left-24 mandala-spin"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.18 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <MandalaMotif size={380} />
        </motion.div>

        {/* Top-right corner */}
        <motion.div
          className="absolute -top-24 -right-24 mandala-spin-reverse"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.18 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        >
          <MandalaMotif size={380} />
        </motion.div>

        {/* Bottom-left corner */}
        <motion.div
          className="absolute -bottom-24 -left-24 mandala-spin-reverse"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.6 }}
        >
          <MandalaMotif size={320} />
        </motion.div>

        {/* Bottom-right corner */}
        <motion.div
          className="absolute -bottom-24 -right-24 mandala-spin"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.9 }}
        >
          <MandalaMotif size={320} />
        </motion.div>

        {/* Central background mandala (large) */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mandala-spin"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.06 }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
        >
          <MandalaMotif size={700} />
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Pre-heading */}
        <motion.p
          className="font-body text-xs tracking-[0.35em] uppercase text-[#C9973A] mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          ✦ &nbsp; A Kandyan Celebration &nbsp; ✦
        </motion.p>

        {/* Invitation text */}
        <motion.h1
          className="font-script text-3xl sm:text-4xl md:text-5xl text-[#2C2C2C] leading-snug mb-4 mt-1"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
        >
          We invite you to celebrate the wedding of
        </motion.h1>

        {/* Couple names */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 my-6"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 1.3 }}
        >
          <span className="font-script text-gold-gradient text-6xl sm:text-7xl md:text-8xl leading-none">
            Achini
          </span>
          <span className="font-display text-[#C9973A] text-3xl sm:text-4xl leading-none">&amp;</span>
          <span className="font-script text-gold-gradient text-6xl sm:text-7xl md:text-8xl leading-none">
            Chinthaka
          </span>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          className="gold-divider w-64 sm:w-80 my-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        />

        {/* Couple photo */}
        <motion.div
          className="relative w-72 sm:w-96 md:w-[440px] aspect-[3/4] rounded-2xl overflow-hidden shadow-luxury border border-[#C9973A]/30 mt-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8 }}
        >
          <Image
            src="/images/hero.jpeg"
            alt="Achini and Chinthaka — Pre-shoot photo"
            fill
            className="object-cover"
            priority
            unoptimized
            sizes="(max-width: 768px) 288px, 440px"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#7A5310]/30 via-transparent to-transparent" />
        </motion.div>

        {/* Date teaser */}
        <motion.p
          className="font-display text-sm sm:text-base tracking-widest uppercase text-[#C9973A] mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        >
          May 08 &nbsp;·&nbsp; 2026 &nbsp;·&nbsp; Grandeeza Hotel, Negombo
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          className="flex flex-col items-center mt-10 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.0 }}
        >
          <span className="font-body text-xs tracking-widest uppercase text-[#96680F]/70">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#C9973A] text-xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
