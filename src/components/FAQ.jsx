import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";
import { BlurInText, VaporText, EASE } from "./TextEffects";

const FAQS = [
  {
    q: "What's included in a typical project?",
    a: "Every engagement starts with a discovery call and strategy sprint, then moves into the core deliverable — brand identity, website, motion, or content. You get two structured rounds of revisions and a clear handoff of all final files and source assets.",
  },
  {
    q: "How long does a project take?",
    a: "Most single-service projects run 3–6 weeks depending on scope. Combined packages (branding + website, for example) typically run 6–10 weeks. We'll give you a concrete timeline before any work begins — no open-ended retainers unless you want one.",
  },
  {
    q: "Do you work with startups, or only established brands?",
    a: "Both. Roughly half of what we do is early-stage founders building a brand from zero, the other half is established companies repositioning or extending an existing one. The process flexes to where you're starting from.",
  },
  {
    q: "Can I book just one service, like motion design alone?",
    a: "Yes — every service on the Pricing section can be booked on its own. Most clients do start with one and add others later once they see how the first piece lands.",
  },
  {
    q: "How does pricing actually work?",
    a: "A fixed base covers strategy and your core deliverable. From there you add exactly the services you need — the Pricing section above lets you build that out live and see the total update as you go. No hourly billing, no surprise invoices.",
  },
  {
    q: "What happens if I need changes after launch?",
    a: "Small fixes within 30 days of delivery are covered. Beyond that, we offer lightweight monthly support retainers for brands that want an ongoing design partner rather than a one-off project.",
  },
];

/* ---------------- Desktop index item ---------------- */

function IndexItem({ item, index, isActive, onSelect }) {
  return (
    <button
      onClick={() => onSelect(index)}
      onMouseEnter={() => onSelect(index)}
      className="group relative flex w-full items-start gap-4 py-5 text-left"
    >
      <span className="relative flex w-6 shrink-0 justify-center">
        {isActive && (
          <motion.span
            layoutId="faq-indicator"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="absolute inset-y-1 w-0.5 rounded-full bg-terracotta"
          />
        )}
      </span>

      <span
        className={`font-display text-sm pt-1 transition-colors duration-300 ${
          isActive ? "text-terracotta" : "text-ink/35"
        }`}
      >
        0{index + 1}
      </span>

      <span
        className={`font-display text-xl sm:text-2xl md:text-[1.75rem] font-medium leading-snug transition-all duration-300 ${
          isActive ? "text-ink translate-x-1" : "text-ink/60 group-hover:text-ink"
        }`}
      >
        {item.q}
      </span>
    </button>
  );
}

/* ---------------- Answer panel ---------------- */

function AnswerPanel({ item, index }) {
  return (
    <div className="relative hidden lg:block lg:sticky lg:top-28 h-[22rem] overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ivory/70">
      {/* ghost numeral */}
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: -20 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="pointer-events-none absolute -right-6 -bottom-10 font-display text-[14rem] font-semibold text-ink/[0.04] leading-none"
        >
          0{index + 1}
        </motion.span>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="relative z-10 flex h-full flex-col justify-center p-8 lg:p-10"
        >
          <Icon name="message-circle-question" className="w-7 h-7 text-terracotta mb-5" />
          <h3 className="font-display text-2xl font-semibold text-ink mb-4">{item.q}</h3>
          <p className="text-ink/60 leading-relaxed">{item.a}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Mobile accordion ---------------- */

function MobileAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="lg:hidden flex flex-col">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-ink/10">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="flex items-start gap-3">
                <span className={`font-display text-xs pt-1 ${isOpen ? "text-terracotta" : "text-ink/30"}`}>
                  0{i + 1}
                </span>
                <span className={`font-display text-lg font-medium ${isOpen ? "text-ink" : "text-ink/60"}`}>
                  {item.q}
                </span>
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 135 : 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 text-ink/50"
              >
                <Icon name="plus" className="w-4 h-4" />
              </motion.span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pl-8 pr-4 text-sm leading-relaxed text-ink/60">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- FAQ ---------------- */

export default function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section id="faq" className="px-3 py-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mx-auto w-full max-w-[1680px]"
      >
        <div className="relative z-10 px-6 sm:px-10 md:px-14 pt-14 md:pt-16 pb-16 md:pb-20">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 md:mb-16">
            <div>
              <BlurInText
                text="( FAQ )"
                className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 mb-4"
              />
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink">
                <BlurInText text="Questions, answered" />
              </h2>
            </div>
            <div className="md:pt-12 md:text-right md:ml-auto md:max-w-md">
              <VaporText
                text="Everything we're asked before kicking off a project. Still curious about something else? Just ask."
                className="block text-ink/60 text-base leading-relaxed"
              />
            </div>
          </div>

          {/* Desktop split index */}
          <div className="hidden lg:grid grid-cols-[1.1fr_0.9fr] gap-16">
            <div className="flex flex-col divide-y divide-ink/10">
              {FAQS.map((item, i) => (
                <IndexItem key={item.q} item={item} index={i} isActive={active === i} onSelect={setActive} />
              ))}
            </div>
            <AnswerPanel item={FAQS[active]} index={active} />
          </div>

          {/* Mobile accordion */}
          <MobileAccordion />

          {/* CTA strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-16 md:mt-20 flex flex-col items-center gap-5 text-center"
          >
            <p className="text-ink/50 text-sm">Still have questions?</p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream shadow-lg shadow-terracotta/30 transition-transform hover:scale-105"
            >
              Get in touch
              <Icon
                name="arrow-up-right"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}