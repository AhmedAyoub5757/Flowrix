import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";
import { BlurInText, VaporText, AnnotatedWord, EASE } from "./TextEffects";

const BUDGETS = ["Just a question", "< $2k", "$2k – 5k", "$5k – 15k", "$15k+"];

/* ---------------- Underline field ---------------- */

function UnderlineField({ label, type = "text", value, onChange, required = false, textarea = false, rows = 3 }) {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";

  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink/40">
        {label} {!required && <span className="normal-case text-ink/30">(optional)</span>}
      </label>
      <div className="relative">
        <Tag
          type={!textarea ? type : undefined}
          required={required}
          rows={textarea ? rows : undefined}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={textarea ? "What are you looking to build?" : ""}
          className="w-full resize-none border-0 border-b border-ink/15 bg-transparent py-3 font-display text-xl sm:text-2xl text-ink placeholder:text-ink/25 outline-none"
        />
        <motion.span
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-center bg-terracotta"
        />
      </div>
    </div>
  );
}

function BudgetChips({ value, onChange }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink/40">
        Project budget <span className="normal-case text-ink/30">(optional)</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {BUDGETS.map((b) => {
          const isActive = value === b;
          return (
            <button
              type="button"
              key={b}
              onClick={() => onChange(isActive ? "" : b)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ${
                isActive
                  ? "border-terracotta bg-terracotta text-cream"
                  : "border-ink/15 text-ink/60 hover:border-ink/30"
              }`}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Success view ---------------- */

const CONFETTI_COLORS = ["#E8572D", "#15635A", "#C9A04A"];

function useConfetti() {
  return useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.3;
        const distance = 70 + Math.random() * 90;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          size: 4 + Math.random() * 5,
          delay: Math.random() * 0.15,
        };
      }),
    []
  );
}

function SuccessView({ name, onReset }) {
  const particles = useConfetti();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-10 text-center"
    >
      <div className="relative mb-6 h-20 w-20">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{ x: p.x, y: p.y, opacity: 0, scale: 1 }}
            transition={{ duration: 1, delay: p.delay, ease: EASE }}
            style={{ backgroundColor: p.color, width: p.size, height: p.size }}
            className="absolute left-1/2 top-1/2 rounded-full"
          />
        ))}

        <motion.svg viewBox="0 0 80 80" className="relative h-20 w-20" initial="hidden" animate="visible">
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="#15635A"
            strokeWidth="3"
            variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
            transition={{ duration: 0.6, ease: EASE }}
          />
          <motion.path
            d="M24 41 L35 52 L57 29"
            fill="none"
            stroke="#15635A"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
            transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
          />
        </motion.svg>
      </div>

      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-2">
        Thank you{name ? `, ${name.split(" ")[0]}` : ""}!
      </h3>
      <p className="mb-8 max-w-xs text-ink/60">
        Your message is in. We read every one personally and reply within 24 hours.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink/50 transition-colors hover:text-ink"
      >
        <Icon name="rotate-ccw" className="w-3.5 h-3.5" />
        Send another message
      </button>
    </motion.div>
  );
}

/* ---------------- Contact info row ---------------- */

function ContactRow({ icon, label, href }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag href={href} className="group flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta transition-colors duration-300 group-hover:bg-terracotta group-hover:text-cream">
        <Icon name={icon} className="w-4 h-4" />
      </span>
      <span className="text-sm font-medium text-ink/70 transition-colors duration-300 group-hover:text-ink">
        {label}
      </span>
    </Tag>
  );
}

/* ---------------- Contact ---------------- */

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("success");
  };

  const handleReset = () => {
    setForm({ name: "", email: "", budget: "", message: "" });
    setStatus("idle");
  };

  return (
    <section id="contact" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20">
          {/* Left: heading + info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <BlurInText
              text="( Contact )"
              className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 mb-4"
            />
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] text-ink mb-6">
              <BlurInText text="Let's build" /> <AnnotatedWord word="something" /> <BlurInText text="great." delay={0.4} />
            </h2>
            <VaporText
              text="Tell us what you're working on. We typically reply within a day with next steps."
              className="block max-w-sm text-base leading-relaxed text-ink/60 mb-10"
            />

            <div className="flex flex-col gap-4 mb-10">
              <ContactRow icon="mail" label="hello@flowrix.studio" href="mailto:hello@flowrix.studio" />
              <ContactRow icon="phone" label="+1 (415) 555-0132" href="tel:+14155550132" />
              <ContactRow icon="map-pin" label="San Francisco, CA" />
            </div>

            {/* <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.icon}
                  href={s.href}
                  whileHover={{ scale: 1.1, rotate: -6 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition-colors duration-300 hover:border-ink/30 hover:text-ink"
                >
                  <Icon name={s.icon} className="w-4 h-4" />
                </motion.a>
              ))}
            </div> */}
          </motion.div>

          {/* Right: form, no card, no background */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <motion.div layout>
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <SuccessView key="success" name={form.name} onReset={handleReset} />
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-7"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                      <UnderlineField
                        label="Your name"
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      />
                      <UnderlineField
                        label="Email address"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      />
                    </div>

                    <BudgetChips value={form.budget} onChange={(b) => setForm((f) => ({ ...f, budget: b }))} />

                    <UnderlineField
                      label="Message"
                      required
                      textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    />

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-2 flex w-fit items-center justify-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-terracotta/30"
                    >
                      Send message
                      <Icon name="send" className="w-4 h-4" />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}