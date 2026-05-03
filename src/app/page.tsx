import HeroSection     from "@/components/HeroSection";
import DetailsSection   from "@/components/DetailsSection";
import CountdownSection from "@/components/CountdownSection";
import VenueSection     from "@/components/VenueSection";
import GallerySection   from "@/components/GallerySection";
import RSVPSection      from "@/components/RSVPSection";
import Footer           from "@/components/Footer";

// ── Navigation anchor links ──────────────────────────────────────
const NAV_LINKS = [
  { href: "#hero",      label: "Home"      },
  { href: "#details",   label: "Details"   },
  { href: "#countdown", label: "Countdown" },
  { href: "#venue",     label: "Venue"     },
  { href: "#gallery",   label: "Gallery"   },
  { href: "#rsvp",      label: "RSVP"      },
];

export default function WeddingPage() {
  return (
    <main className="relative">

      {/* Sticky (not fixed): stays on scroll but keeps layout height — avoids covering hero */}
      <nav
        role="navigation"
        aria-label="Page navigation"
        className="sticky top-0 left-0 right-0 z-50 w-full backdrop-blur-md"
        style={{
          background: "rgba(253,248,240,0.88)",
          borderBottom: "1px solid rgba(201,151,58,0.20)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 min-h-14 flex items-center justify-between gap-4">
          <span
            className="font-script text-2xl leading-none text-gold-gradient shrink-0"
            aria-label="Achini and Chinthaka"
          >
            Achini &amp; Chinthaka
          </span>
          <ul className="hidden sm:flex items-center gap-6 list-none" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-body text-xs tracking-[0.15em] uppercase text-[#5a5a5a] hover:text-[#C9973A] transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Page Sections ── */}
      <HeroSection />
      <DetailsSection />
      <CountdownSection />
      <VenueSection />
      <GallerySection />
      <RSVPSection />
      <Footer />
    </main>
  );
}
