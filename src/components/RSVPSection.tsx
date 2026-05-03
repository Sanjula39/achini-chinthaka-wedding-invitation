"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitRSVP } from "@/lib/supabase";
import MandalaMotif from "./MandalaMotif";

const GUEST_COUNT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

interface SubmitStatus {
  type:    "success" | "error" | null;
  message: string;
}

export default function RSVPSection() {
  const [guestCount, setGuestCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingChoice, setPendingChoice] = useState<"yes" | "no" | null>(null);
  const [status, setStatus] = useState<SubmitStatus>({ type: null, message: "" });

  async function submitChoice(attending: boolean) {
    if (isLoading) return;

    setIsLoading(true);
    setPendingChoice(attending ? "yes" : "no");
    setStatus({ type: null, message: "" });

    try {
      const result = await submitRSVP({
        attending,
        guest_count: attending ? guestCount : null,
      });

      if (result.success) {
        setStatus({ type: "success", message: result.message });
      } else {
        setStatus({
          type: "error",
          message: result.error ?? "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please check your connection.",
      });
    } finally {
      setIsLoading(false);
      setPendingChoice(null);
    }
  }

  const choiceBtnBase =
    "relative w-full min-h-[58px] sm:min-h-[60px] rounded-xl text-center font-display text-[11px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.14em] uppercase border-2 leading-tight px-5 py-4 transition-shadow duration-200 disabled:opacity-55 disabled:cursor-not-allowed";

  return (
    <section
      id="rsvp"
      className="relative section-pad bg-[#FAF3E8] overflow-hidden flex flex-col items-center"
      aria-labelledby="rsvp-heading"
    >
      {/* Background mandalas */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] mandala-spin">
          <MandalaMotif size={700} />
        </div>
        <div className="absolute -top-20 -left-20 opacity-10">
          <MandalaMotif size={280} />
        </div>
        <div className="absolute -bottom-20 -right-20 opacity-10">
          <MandalaMotif size={280} />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center text-center px-4 sm:px-6">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-xs tracking-[0.35em] uppercase text-[#C9973A] mb-3"
        >
          ✦ &nbsp; Digital RSVP &nbsp; ✦
        </motion.p>

        {/* Heading */}
        <motion.h2
          id="rsvp-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-script text-5xl sm:text-6xl text-[#2C2C2C] mb-5 leading-tight"
        >
          Confirm Attendance
        </motion.h2>

        <motion.div
          aria-hidden
          className="gold-divider mx-auto mb-6 sm:mb-7 h-px w-[13rem] sm:w-[15rem] max-w-[min(15rem,85vw)] origin-center shrink-0"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{ transformOrigin: "50% 50%" }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-body text-sm sm:text-[15px] text-[#5a5a5a] mb-8 sm:mb-10 leading-relaxed max-w-md mx-auto"
        >
          Your presence means the world to us. Choose how many guests your invitation covers (family count), then tap Accept or Decline — no name or phone needed.
        </motion.p>

        {/* ── Form ── */}
        <AnimatePresence mode="wait">
          {status.type === "success" ? (
            <motion.div
              key="success"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative mx-auto w-full max-w-md text-center"
            >
              {/* Outer frame — warm gold rim, soft lift */}
              <div
                className="relative overflow-hidden rounded-[1.75rem] p-[1px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18),0_0_0_1px_rgba(201,151,58,0.12),0_0_60px_-8px_rgba(201,151,58,0.25)]"
                style={{
                  background:
                    "linear-gradient(145deg, #E8B238 0%, #C9973A 38%, #F5DE97 62%, #B8831E 100%)",
                }}
              >
                {/* Inner invitation panel */}
                <div
                  className="relative rounded-[1.65rem] px-8 py-10 sm:px-10 sm:py-11 md:py-12"
                  style={{
                    background:
                      "linear-gradient(168deg, #FEFDF9 0%, #FFFCF7 42%, #FAF5EC 78%, #F3E6D4 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(201,151,58,0.08)",
                  }}
                >
                  {/* Soft gold wash */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full opacity-[0.14] blur-3xl"
                    style={{ background: "radial-gradient(circle, #E8B238, transparent 70%)" }}
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full opacity-[0.12] blur-3xl"
                    style={{ background: "radial-gradient(circle, #C9973A, transparent 70%)" }}
                    aria-hidden
                  />

                  {/* Single centered column — avoids drift from motion transforms / mixed layout */}
                  <div className="relative flex w-full flex-col items-center text-center">
                    {/* Confetti sparkle */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 22, delay: 0.08 }}
                      className="mb-5 flex shrink-0 justify-center gap-2 text-lg sm:text-xl"
                      aria-hidden
                    >
                      <span className="inline-block drop-shadow-sm">✧</span>
                      <span className="inline-block translate-y-0.5 drop-shadow-sm">🎉</span>
                      <span className="inline-block drop-shadow-sm">✧</span>
                    </motion.div>

                    {/* Seal + check — explicit flex row centers the circle reliably */}
                    <div className="mb-6 flex w-full shrink-0 justify-center px-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.12 }}
                        className="flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-full shadow-[0_8px_28px_rgba(201,151,58,0.45),inset_0_2px_0_rgba(255,255,255,0.45)] ring-4 ring-[#FDF8F0]/95 ring-offset-2 ring-offset-[#FAF5EC]"
                        style={{
                          background:
                            "linear-gradient(145deg, #E8B238 0%, #C9973A 50%, #B8831E 100%)",
                        }}
                      >
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-cream-100"
                          aria-hidden
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.45 }}
                      className="mb-4 w-full max-w-[18ch] px-2 font-script text-[2.35rem] leading-tight tracking-tight text-transparent sm:text-[2.75rem] bg-gradient-to-br from-[#7A5310] via-[#C9973A] to-[#E8B238] bg-clip-text text-center"
                    >
                      Thank You!
                    </motion.p>

                    {/* Fade-in only — scaleX on motion.div was anchoring visually to the left in some browsers */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.28, duration: 0.5 }}
                      className="mb-7 block h-px w-full max-w-[min(13rem,85vw)] shrink-0 bg-gradient-to-r from-transparent via-[#C9973A]/85 to-transparent"
                      aria-hidden
                    />

                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.32, duration: 0.45 }}
                      className="w-full max-w-[22rem] px-3 pb-1 font-body text-[15px] leading-relaxed text-[#4a453c] text-center text-pretty sm:text-base"
                    >
                      {status.message}
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              role="group"
              aria-label="RSVP — tap once to submit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center rounded-2xl w-full max-w-[min(100%,26rem)] sm:max-w-md mx-auto border-2 border-[#C9973A]/25 p-[15px] sm:p-10 md:p-11"
              style={{
                background:
                  "linear-gradient(165deg, #FFFCF7 0%, #FAF5EC 55%, #F5ECD8 100%)",
                boxShadow:
                  "0 12px 48px rgba(0,0,0,0.07), 0 4px 14px rgba(201,151,58,0.12)",
                  padding: "15px",
              }}
            >
              <p className="font-display text-[11px] sm:text-xs tracking-[0.22em] uppercase font-semibold text-[#7A5310] mb-5">
                Will you be attending?
              </p>

              <div className="mb-6 flex w-full flex-col items-stretch text-center">
                <label
                  htmlFor="rsvp-guest-count"
                  className="mb-2 block font-display text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#7A5310]"
                >
                  Guests (incl. you) 
                </label>
                <select
                  id="rsvp-guest-count"
                  value={guestCount}
                  disabled={isLoading}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  aria-describedby="rsvp-guest-count-hint"
                  className="w-full min-h-[52px] cursor-pointer appearance-none rounded-xl border-2 border-[#C9973A]/38 bg-[#FFFCF7] py-3.5 pl-4 pr-11 font-body text-base text-[#2C2C2C] text-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:border-[#C9973A]/55 focus:border-[#B8831E] focus:outline-none focus:ring-2 focus:ring-[#C9973A]/25 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[56px] sm:text-[17px]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237A5310' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  {GUEST_COUNT_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
                <p
                  id="rsvp-guest-count-hint"
                  className="mt-2 text-center font-body text-xs leading-snug text-[#5a5a5a]"
                >
                  Used when you accept so we can plan seating. Ignored if you decline.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:gap-5">
                <motion.button
                  type="button"
                  disabled={isLoading}
                  onClick={() => submitChoice(true)}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  aria-busy={isLoading && pendingChoice === "yes"}
                  className={`${choiceBtnBase} inline-flex items-center justify-center gap-3 bg-[#FFFCF7] border-[rgba(201,151,58,0.42)] text-[#2C2C2C] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] hover:border-[#C9973A]/65 hover:shadow-[0_6px_22px_rgba(201,151,58,0.2)]`}
                >
                  {isLoading && pendingChoice === "yes" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block h-5 w-5 shrink-0 rounded-full border-2 border-[#C9973A]/35 border-t-[#C9973A]"
                        aria-hidden
                      />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <span className="px-1">✓ Joyfully Accept</span>
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  disabled={isLoading}
                  onClick={() => submitChoice(false)}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  aria-busy={isLoading && pendingChoice === "no"}
                  className={`${choiceBtnBase} inline-flex items-center justify-center gap-3 bg-[#FFFCF7] border-[rgba(201,151,58,0.42)] text-[#2C2C2C] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] hover:border-[#C9973A]/65 hover:shadow-[0_6px_22px_rgba(201,151,58,0.2)]`}
                >
                  {isLoading && pendingChoice === "no" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block h-5 w-5 shrink-0 rounded-full border-2 border-[#C9973A]/35 border-t-[#C9973A]"
                        aria-hidden
                      />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <span className="px-1">✗ Regretfully Decline</span>
                  )}
                </motion.button>
              </div>

              {status.type === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 font-body text-sm text-red-700 text-center bg-red-50/95 border-2 border-red-200/90 rounded-xl px-5 py-4 leading-snug"
                  role="alert"
                >
                  {status.message}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 sm:mt-16 font-body text-sm text-[#5a5a5a] space-y-3 text-center px-2"
        >
          <p className="tracking-[0.25em] uppercase text-[#7A5310] font-semibold text-xs mb-3">Direct Contact</p>
          <p>
            Chinthaka:{" "}
            <a
              href="tel:+94717419183"
              className="text-[#2C2C2C] underline decoration-[#C9973A]/50"
              aria-label="Call Chinthaka at 071 7419183"
            >
              071 7419183
            </a>
          </p>
          <p>
            Achini:{" "}
            <a
              href="tel:+94710187193"
              className="text-[#2C2C2C] underline decoration-[#C9973A]/50"
              aria-label="Call Achini at 071 0187193"
            >
              071 0187193
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
