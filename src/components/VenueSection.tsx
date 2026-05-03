"use client";

import { motion } from "framer-motion";
import MandalaMotif from "./MandalaMotif";

// ── Deep link: Grandeeza Hotel, 772 Colombo-Negombo Rd, Negombo
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Grandeeza+Hotel+772+Colombo+Negombo+Road+Negombo+Sri+Lanka&travelmode=driving";

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] as const } },
});

export default function VenueSection() {
  return (
    <section
      id="venue"
      className="relative section-pad bg-[#FAF3E8] overflow-hidden flex flex-col items-center"
      aria-labelledby="venue-heading"
    >
      {/* Background mandala */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.06]">
        <MandalaMotif size={550} className="mandala-spin-reverse" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* Label */}
        <motion.p
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body text-xs tracking-[0.35em] uppercase text-[#C9973A] mb-3"
        >
          ✦ &nbsp; Venue &amp; Navigation &nbsp; ✦
        </motion.p>

        {/* Heading */}
        <motion.h2
          id="venue-heading"
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-script text-5xl sm:text-6xl text-[#2C2C2C] mb-5 leading-tight"
        >
          Find Us Here
        </motion.h2>

        <motion.div
          aria-hidden
          className="gold-divider mb-9 sm:mb-10 h-px w-[13rem] sm:w-[15rem] max-w-[min(15rem,85vw)] origin-center shrink-0"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{ transformOrigin: "50% 50%" }}
        />

        {/* Address → travel tips → open in Maps (no inline embed) */}
        <div className="w-full flex flex-col items-stretch gap-8 sm:gap-10 text-left">

          {/* Venue details */}
          <motion.div
            variants={fadeUp(0.25)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full rounded-2xl px-5 sm:px-8 py-6 sm:py-7 box-border"
            style={{
              background: "linear-gradient(135deg, #FEFDF9, #FAF3E8)",
              border: "1px solid rgba(201,151,58,0.35)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(201,151,58,0.15)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 max-w-3xl mx-auto">
              <div
                className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center sm:mt-0.5"
                style={{ background: "linear-gradient(135deg, #C9973A, #E8B238)" }}
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    fill="#FDF8F0"
                  />
                </svg>
              </div>
              <div className="text-center sm:text-left flex-1 min-w-0">
                <p className="font-display text-xl sm:text-2xl font-bold text-[#2C2C2C] mb-1.5">Grandeeza Hotel</p>
                <p className="font-body text-sm text-[#5a5a5a] leading-relaxed">
                  772 Colombo – Negombo Rd,<br />
                  Negombo, Sri Lanka
                </p>
                <p className="font-body text-xs tracking-wider uppercase text-[#C9973A] mt-2.5">
                  Ballroom Hall 2 &amp; 3
                </p>
              </div>
            </div>
          </motion.div>

          {/* Directions */}
          <motion.div
            variants={fadeUp(0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 w-full text-center text-sm"
          >
            {[
              { icon: "🚗", label: "From Colombo", detail: "Approx. 40 min via Negombo Rd" },
              { icon: "🏔️", label: "From Kandy", detail: "Approx. 3½ hrs via Colombo" },
              { icon: "🏨", label: "Parking", detail: "Free on-site parking available" },
            ].map(({ icon, label, detail }) => (
              <div
                key={label}
                className="flex flex-col justify-center px-4 py-5 sm:py-6 rounded-xl min-h-[7.5rem]"
                style={{ background: "rgba(201,151,58,0.07)", border: "1px solid rgba(201,151,58,0.2)" }}
              >
                <p className="text-2xl mb-2 leading-none">{icon}</p>
                <p className="font-display font-semibold text-[#2C2C2C] text-sm">{label}</p>
                <p className="font-body text-xs text-[#5a5a5a] mt-2 leading-snug">{detail}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA isolated — avoids overlapping cards on hover / dense layouts */}
          <div className="flex justify-center w-full pt-2 sm:pt-4 pb-1">
            <motion.a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp(0.5)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(201,151,58,0.45)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-display font-semibold text-[#FDF8F0] tracking-wide text-sm sm:text-base max-w-[calc(100vw-2rem)]"
              style={{
                background: "linear-gradient(135deg, #C9973A 0%, #E8B238 60%, #C9973A 100%)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
                boxShadow: "0 4px 20px rgba(201,151,58,0.35)",
              }}
              aria-label="Open Grandeeza Hotel in Google Maps for directions"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
              </svg>
              Open in Google Maps
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
