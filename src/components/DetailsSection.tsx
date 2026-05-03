"use client";

import { motion } from "framer-motion";
import MandalaMotif from "./MandalaMotif";

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function DetailsSection() {
  return (
    <section
      id="details"
      className="relative section-pad bg-[#FAF3E8] overflow-hidden flex flex-col items-center"
      aria-labelledby="details-heading"
    >
      {/* Background mandala watermarks */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 opacity-10">
          <MandalaMotif size={450} />
        </div>
        <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 opacity-10">
          <MandalaMotif size={350} />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center">

        {/* Section Label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="font-body text-xs tracking-[0.35em] uppercase text-[#C9973A] mb-3"
        >
          ✦ &nbsp; Wedding Details &nbsp; ✦
        </motion.p>

        {/* Section Heading */}
        <motion.h2
          id="details-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
          className="font-script text-5xl sm:text-6xl text-[#2C2C2C] mb-5 leading-tight"
        >
          The Celebration
        </motion.h2>

        <motion.div
          aria-hidden
          className="gold-divider mb-11 sm:mb-12 h-px w-[13rem] sm:w-[15rem] max-w-[min(15rem,85vw)] origin-center shrink-0"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{ transformOrigin: "50% 50%" }}
        />

        {/* Invitation Text */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
          className="font-body text-sm tracking-[0.2em] uppercase text-[#5a5a5a] mb-3"
        >
          Request the honor of your presence
        </motion.p>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
          className="font-body text-sm tracking-[0.1em] text-[#5a5a5a] mb-12 sm:mb-14"
        >
          To celebrate their marriage
        </motion.p>

        {/* ── Date Card (same max width band as venue + family for optical alignment) ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.35}
          className="flex w-full max-w-2xl mx-auto flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 px-5 sm:px-10 py-7 sm:py-9 rounded-2xl shadow-luxury box-border"
          style={{ background: "linear-gradient(135deg, #FEFDF9, #FAF3E8)", border: "1px solid rgba(201,151,58,0.35)" }}
        >
          <div className="text-center">
            <p className="font-display text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C9973A] mb-1">Month</p>
            <p className="font-display text-2xl sm:text-5xl font-semibold text-[#2C2C2C]">MAY</p>
          </div>

          <div className="w-px h-16 hidden sm:block" style={{ background: "linear-gradient(to bottom, transparent, #C9973A, transparent)" }} />
          <div className="h-px w-16 sm:hidden" style={{ background: "linear-gradient(to right, transparent, #C9973A, transparent)" }} />

          <div className="text-center">
            <p className="font-display text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C9973A] mb-1">Day</p>
            <p className="font-script text-gold-gradient text-5xl sm:text-7xl leading-none">08</p>
          </div>

          <div className="w-px h-16 hidden sm:block" style={{ background: "linear-gradient(to bottom, transparent, #C9973A, transparent)" }} />
          <div className="h-px w-16 sm:hidden" style={{ background: "linear-gradient(to right, transparent, #C9973A, transparent)" }} />

          <div className="text-center">
            <p className="font-display text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C9973A] mb-1">Day of Week</p>
            <p className="font-display text-2xl sm:text-5xl font-semibold text-[#2C2C2C] tracking-wide">FRIDAY</p>
          </div>
        </motion.div>

        {/* Year */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
          className="font-display text-xl sm:text-2xl tracking-[0.35em] text-[#5a5a5a] mt-10 mb-10"
        >
          2026
        </motion.p>

        {/* Time → venue stack */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.45}
          className="flex w-full max-w-2xl mx-auto flex-col items-center gap-4 mb-8 text-center"
        >
          <div className="space-y-2 w-full">
            <p className="font-display text-xl sm:text-2xl font-medium tracking-[0.2em] sm:tracking-widest text-[#2C2C2C] uppercase leading-snug">
              From 9.00 AM to 4.30 PM
            </p>
            <p className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-[#5a5a5a]">AT</p>
          </div>
          <p className="font-display text-3xl sm:text-4xl font-bold text-[#2C2C2C] tracking-wide leading-tight">
            Grandeeza Hotel
          </p>
        </motion.div>

        {/* ── Poruwa Ceremony Highlight Box ── */}
        <div className="w-full max-w-2xl mx-auto flex justify-center px-1">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.6}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-center px-6 sm:px-10 py-3.5 sm:py-4 rounded-xl shadow-gold-sm w-full sm:w-auto max-w-full"
            style={{
              background: "linear-gradient(135deg, #C9973A, #E8B238)",
            }}
          >
            <p className="font-display text-xs sm:text-sm md:text-base tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[#FDF8F0] font-semibold text-center leading-snug">
              ✦ &nbsp; Poruwa Ceremony at 9.30 AM &nbsp; ✦
            </p>
          </motion.div>
        </div>

        {/* Family notes */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.65}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-center w-full max-w-2xl mx-auto justify-items-stretch"
        >
          <div className="flex flex-col justify-center px-5 sm:px-6 py-6 rounded-xl min-h-[9rem]" style={{ background: "rgba(201,151,58,0.08)", border: "1px solid rgba(201,151,58,0.2)" }}>
            <p className="font-display text-gold-gradient text-3xl mb-3">Achini</p>
            <p className="font-body text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#5a5a5a] mb-1">Daughter of</p>
            <p className="font-display text-[#2C2C2C] text-sm sm:text-base font-medium leading-snug">Mr. &amp; Mrs. Nanayakkara</p>
          </div>
          <div className="flex flex-col justify-center px-5 sm:px-6 py-6 rounded-xl min-h-[9rem]" style={{ background: "rgba(201,151,58,0.08)", border: "1px solid rgba(201,151,58,0.2)" }}>
            <p className="font-display text-gold-gradient text-3xl mb-3">Chinthaka</p>
            <p className="font-body text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#5a5a5a] mb-1">Son of</p>
            <p className="font-display text-[#2C2C2C] text-sm sm:text-base font-medium leading-snug">Mr. &amp; Mrs. Lokuliyana</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
