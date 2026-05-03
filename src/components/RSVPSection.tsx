"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitRSVP } from "@/lib/supabase";
import MandalaMotif from "./MandalaMotif";

type AttendingOption = "yes" | "no" | null;

interface FormState {
  fullName:        string;
  whatsappNumber:  string;
  attending:       AttendingOption;
}

interface SubmitStatus {
  type:    "success" | "error" | null;
  message: string;
}

const initialForm: FormState = {
  fullName:       "",
  whatsappNumber: "",
  attending:      null,
};

export default function RSVPSection() {
  const [form,      setForm]      = useState<FormState>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [status,    setStatus]    = useState<SubmitStatus>({ type: null, message: "" });

  const isValid =
    form.fullName.trim().length >= 2 &&
    form.whatsappNumber.trim().length >= 9 &&
    form.attending !== null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid || isLoading) return;

    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const result = await submitRSVP({
        full_name:        form.fullName.trim(),
        whatsapp_number:  form.whatsappNumber.trim(),
        attending:        form.attending === "yes",
      });

      if (result.success) {
        setStatus({ type: "success", message: result.message });
        setForm(initialForm);
      } else {
        setStatus({ type: "error", message: result.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Please check your connection." });
    } finally {
      setIsLoading(false);
    }
  }

  const inputBase =
    "form-input w-full min-h-[52px] px-6 py-4 rounded-xl font-body text-base text-[#2C2C2C] bg-[#FFFCF7] border-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 placeholder:text-[#9a8a6e]";

  const labelBase =
    "block font-display text-[11px] sm:text-xs tracking-[0.2em] uppercase font-semibold text-[#7A5310]";

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
          className="font-body text-sm sm:text-[15px] text-[#5a5a5a] mb-10 sm:mb-12 leading-relaxed max-w-md mx-auto"
        >
          Kindly let us know if you will be joining us for this special day. Your presence means the world to us.
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
                      className="w-full max-w-[22rem] px-3 font-body text-[15px] leading-relaxed text-[#4a453c] text-center text-pretty sm:text-base"
                    >
                      {status.message}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45, duration: 0.4 }}
                      className="mt-11 flex w-full shrink-0 justify-center px-2 sm:mt-12"
                    >
                      <motion.button
                        type="button"
                        onClick={() => setStatus({ type: null, message: "" })}
                        whileHover={{ scale: 1.03, boxShadow: "0 6px 24px rgba(201,151,58,0.22)" }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex min-h-[48px] max-w-full items-center justify-center rounded-full border-2 border-[#C9973A]/55 bg-[#FFFCF7]/90 px-8 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7A5310] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-colors hover:border-[#C9973A]/80 hover:bg-[#FDF8F0]"
                      >
                        Submit another response
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-left space-y-10 sm:space-y-12 rounded-2xl w-full max-w-[min(100%,26rem)] sm:max-w-md mx-auto border-2 border-[#C9973A]/25 p-[12px] sm:p-10 md:p-12"
              style={{padding: "15px",
                background: "linear-gradient(165deg, #FFFCF7 0%, #FAF5EC 55%, #F5ECD8 100%)",
                boxShadow: "0 12px 48px rgba(0,0,0,0.07), 0 4px 14px rgba(201,151,58,0.12)",
              }}
              noValidate
              aria-label="RSVP Form"
            >

              {/* Full Name */}
              <div className="flex flex-col gap-3">
                <label htmlFor="rsvp-full-name" className={labelBase}>
                  Full Name
                </label>
                <input
                  id="rsvp-full-name"
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Dilhani Perera"
                  required
                  minLength={2}
                  className={`${inputBase} border-[#C9973A]/38 hover:border-[#C9973A]/55`}
                  aria-required="true"
                  autoComplete="name"
                />
              </div>

              {/* WhatsApp Number */}
              <div className="flex flex-col gap-3">
                <label htmlFor="rsvp-whatsapp" className={labelBase}>
                  WhatsApp Number
                </label>
                <input
                  id="rsvp-whatsapp"
                  type="tel"
                  name="whatsappNumber"
                  value={form.whatsappNumber}
                  onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                  placeholder="+94 7X XXX XXXX"
                  required
                  className={`${inputBase} border-[#C9973A]/38 hover:border-[#C9973A]/55`}
                  aria-required="true"
                  autoComplete="tel"
                />
              </div>

              {/* Attending */}
              <div className="flex flex-col gap-5 pt-1">
                <p id="attending-label" className={labelBase}>
                  Will you be attending?
                </p>
                <div
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
                  role="radiogroup"
                  aria-labelledby="attending-label"
                >
                  {(["yes", "no"] as const).map((option) => (
                    <label
                      key={option}
                      htmlFor={`rsvp-attending-${option}`}
                      className="relative cursor-pointer block"
                    >
                      <input
                        id={`rsvp-attending-${option}`}
                        type="radio"
                        name="attending"
                        value={option}
                        checked={form.attending === option}
                        onChange={() => setForm({ ...form, attending: option })}
                        className="sr-only"
                        aria-checked={form.attending === option}
                      />
                      <motion.div
                        animate={{
                          background:
                            form.attending === option
                              ? "linear-gradient(135deg, #C9973A, #E8B238)"
                              : "#FFFCF7",
                          borderColor:
                            form.attending === option
                              ? "#B8831E"
                              : "rgba(201,151,58,0.42)",
                          color:
                            form.attending === option ? "#FDF8F0" : "#2C2C2C",
                        }}
                        transition={{ duration: 0.25 }}
                        className="min-h-[52px] flex items-center justify-center px-5 py-3.5 sm:px-6 rounded-xl text-center font-display text-[11px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-wider uppercase border-2 leading-tight"
                        style={{
                          boxShadow: form.attending === option
                            ? "0 6px 20px rgba(201,151,58,0.35)"
                            : "inset 0 1px 0 rgba(255,255,255,0.85)",
                        }}
                      >
                        <span className="text-center px-1">
                          {option === "yes" ? "✓  Joyfully Accept" : "✗  Regretfully Decline"}
                        </span>
                      </motion.div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Error message */}
              {status.type === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-body text-sm text-red-700 text-center bg-red-50/95 border-2 border-red-200/90 rounded-xl px-5 py-4 leading-snug"
                  role="alert"
                >
                  {status.message}
                </motion.p>
              )}

              {/* Submit */}
              <div className="mt-2 pt-5 border-t border-[#C9973A]/15">
                <motion.button
                  type="submit"
                  disabled={!isValid || isLoading}
                  whileHover={isValid && !isLoading ? { scale: 1.015 } : {}}
                  whileTap={isValid && !isLoading ? { scale: 0.985 } : {}}
                  className="w-full min-h-[56px] inline-flex items-center justify-center rounded-xl px-4 font-display font-semibold tracking-[0.18em] uppercase text-sm sm:text-[15px] transition-opacity duration-300 border-2 border-transparent leading-none"
                  style={{
                    background:
                      isValid && !isLoading
                        ? "linear-gradient(135deg, #C9973A 0%, #E8B238 55%, #C9973A 100%)"
                        : "rgba(201,151,58,0.22)",
                    color: isValid && !isLoading ? "#FDF8F0" : "#96680F",
                    cursor: isValid && !isLoading ? "pointer" : "not-allowed",
                    boxShadow: isValid && !isLoading ? "0 6px 24px rgba(201,151,58,0.32)" : "none",
                  }}
                  aria-busy={isLoading}
                  aria-label="Submit RSVP — Confirm Attendance"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center justify-center gap-2.5">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-5 h-5 border-2 border-[#FDF8F0]/35 border-t-[#FDF8F0] rounded-full shrink-0"
                      />
                      <span className="leading-none pt-0.5">Submitting…</span>
                    </span>
                  ) : (
                    <span className="leading-none py-0.5">Confirm Attendance</span>
                  )}
                </motion.button>
              </div>
            </motion.form>
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
