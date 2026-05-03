"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import MandalaMotif from "./MandalaMotif";

// ── Gallery: four unique pre-shoot images only ──────────────────────
const GALLERY_ITEMS = [
  { id: 1, src: "/images/gallery/photo-1.jpeg", alt: "Achini & Chinthaka — By the lake" },
  { id: 2, src: "/images/gallery/photo-2.jpeg", alt: "Achini & Chinthaka — Hilltop vista" },
  { id: 3, src: "/images/gallery/photo-3.jpeg", alt: "Achini & Chinthaka — Forest embrace" },
  { id: 4, src: "/images/gallery/photo-4.jpeg", alt: "Achini & Chinthaka — Open skies" },
] as const;

interface GalleryItemProps {
  item: (typeof GALLERY_ITEMS)[number];
  index: number;
}

function GalleryItem({ item, index }: GalleryItemProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      className="gallery-item relative aspect-[4/5] sm:aspect-[3/4] mx-auto w-full max-w-[min(100%,22rem)] sm:mx-0 sm:max-w-none rounded-xl overflow-hidden"
      style={{
        border: "1px solid rgba(201,151,58,0.25)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 40px rgba(201,151,58,0.25)",
        borderColor: "rgba(201,151,58,0.55)",
        zIndex: 10,
      }}
    >
      {/* Placeholder (shown until image loads) */}
      {!loaded && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ background: "linear-gradient(135deg, #FAF3E8, #EDE1CA)" }}
        >
          <div className="text-center opacity-50">
            <MandalaMotif size={60} opacity={0.5} />
            <p className="font-body text-[10px] tracking-widest uppercase text-[#C9973A] mt-2">
              Photo {item.id}
            </p>
          </div>
        </div>
      )}

      {/* Actual image — z-index above placeholder once loaded */}
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-700"
        sizes="(max-width: 640px) min(100vw, 22rem), 50vw"
        unoptimized
        onLoad={() => setLoaded(true)}
        style={{ zIndex: loaded ? 1 : 0 }}
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex items-end p-4"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "linear-gradient(to top, rgba(122,83,16,0.6) 0%, transparent 70%)",
          zIndex: 20,
        }}
      >
        <p className="font-body text-xs text-[#FDF8F0] tracking-wide">{item.alt}</p>
      </motion.div>
    </motion.div>
  );
}


export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative section-pad bg-[#FDF8F0] overflow-hidden flex flex-col items-center"
      aria-labelledby="gallery-heading"
    >
      {/* Corner mandalas */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-10 pointer-events-none select-none">
        <MandalaMotif size={300} />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 opacity-10 pointer-events-none select-none">
        <MandalaMotif size={300} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-6">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-xs tracking-[0.35em] uppercase text-[#C9973A] mb-4 text-center"
        >
          ✦ &nbsp; Our Story &nbsp; ✦
        </motion.p>

        {/* Heading */}
        <motion.h2
          id="gallery-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-script text-5xl sm:text-6xl text-[#2C2C2C] mb-5 sm:mb-6 text-center leading-tight"
        >
          Before the Wedding
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-sm sm:text-[15px] text-[#5a5a5a] text-center mb-7 sm:mb-8 max-w-xl mx-auto w-full leading-relaxed px-2 text-pretty"
        >
          A glimpse into our journey together — captured among the hills and forests of Sri Lanka.
        </motion.p>

        <motion.div
          aria-hidden
          className="gold-divider mx-auto mb-10 sm:mb-12 h-px w-[13rem] sm:w-[15rem] max-w-[min(15rem,85vw)] origin-center shrink-0"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          style={{ transformOrigin: "50% 50%" }}
        />

        {/* ── Four photos: centered 2×2 grid ── */}
        <div className="mx-auto grid w-full grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:justify-items-stretch sm:gap-6">
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
