import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Icon from "./Icon";
import { BlurInText, VaporText, EASE } from "./TextEffects";

const BASE_PRICE = 1500;
const BASE_INCLUDES = [
  "Discovery & strategy call",
  "1 core deliverable",
  "2 rounds of revisions",
];

const ADDONS = [
  { id: "branding", title: "Brand Identity Design", desc: "Logo, visual system & guidelines", price: 800, icon: "palette" },
  { id: "website", title: "Website Design", desc: "Up to 5 custom pages", price: 1200, icon: "layout-template" },
  { id: "motion", title: "Motion & Animation", desc: "Brand animation & micro-interactions", price: 600, icon: "film" },
  { id: "content", title: "Content & Copywriting", desc: "Messaging across all touchpoints", price: 450, icon: "pen-line" },
  { id: "seo", title: "SEO Consulting", desc: "Technical & on-page optimization", price: 350, icon: "search" },
  { id: "priority", title: "Priority Delivery", desc: "2x faster turnaround", price: 500, icon: "zap" },
];

/* ---------------- Background ---------------- */

function PricingBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const sy = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const spotlight = useTransform([sx, sy], ([x, y]) =>
    `radial-gradient(600px circle at ${50 + x * 25}% ${50 + y * 25}%, rgba(21,99,90,0.12), transparent 70%)`
  );

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <div onMouseMove={handleMove} className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay">
        <filter id="grain-pricing">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-pricing)" />
      </svg>
      <div className="absolute -bottom-20 -right-16 h-96 w-96 rounded-full bg-gold/15 blur-[120px] animate-float-slower" />
      <div className="absolute -top-16 left-0 h-80 w-80 rounded-full bg-teal/15 blur-[110px] animate-float-slow" />
      <motion.div className="absolute inset-0 hidden md:block" style={{ background: spotlight }} />
    </div>
  );
}

/* ---------------- Animated price ---------------- */

function AnimatedPrice({ value, className = "" }) {
  const [display, setDisplay] = useState(value);
  const [pulse, setPulse] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    const from = prevValue.current;
    const to = value;
    if (from === to) return;
    setPulse(true);
    let start;
    let raf;
    const duration = 600;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
      else {
        setDisplay(to);
        prevValue.current = to;
        setPulse(false);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <motion.span
      animate={{ scale: pulse ? 1.04 : 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-block ${className}`}
    >
      ${display.toLocaleString()}
    </motion.span>
  );
}

/* ---------------- Addon toggle ---------------- */

function AddonToggle({ addon, isActive, onToggle, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.08 }}
      onClick={() => onToggle(addon.id)}
      className={`group relative flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-500 ${
        isActive
          ? "border-terracotta/40 bg-cream/[0.06] opacity-100"
          : "border-cream/10 bg-transparent opacity-45 hover:opacity-75"
      }`}
    >
      <div className="flex items-center gap-4">
        <motion.span
          animate={{
            backgroundColor: isActive ? "rgba(232,87,45,0.15)" : "rgba(250,246,239,0.05)",
            color: isActive ? "#E8572D" : "rgba(250,246,239,0.4)",
            rotate: isActive ? 0 : -8,
          }}
          transition={{ duration: 0.35 }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        >
          <Icon name={addon.icon} className="w-4 h-4" />
        </motion.span>
        <div>
          <p
            className={`text-sm font-semibold transition-colors duration-300 ${
              isActive ? "text-cream" : "text-cream/60"
            }`}
          >
            {addon.title}
          </p>
          <p className="text-xs text-cream/35 mt-0.5">{addon.desc}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span
          className={`text-sm font-medium transition-colors duration-300 ${
            isActive ? "text-terracotta" : "text-cream/40"
          }`}
        >
          +${addon.price}
        </span>
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors duration-300 ${
            isActive ? "border-terracotta bg-terracotta" : "border-cream/20"
          }`}
        >
          <motion.span
            initial={false}
            animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Icon name="check" className="w-3.5 h-3.5 text-ink" />
          </motion.span>
        </span>
      </div>
    </motion.button>
  );
}

/* ---------------- Pricing card ---------------- */

function PricingCard({ selected }) {
  const total = BASE_PRICE + selected.reduce((sum, id) => sum + ADDONS.find((a) => a.id === id).price, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="animate-shimmer rounded-[2rem] bg-gradient-to-br from-teal via-gold to-terracotta p-[1.5px] lg:sticky lg:top-28"
    >
      <div className="rounded-[1.95rem] bg-ink/95 backdrop-blur-xl p-7 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/40 mb-2">
          Your Package
        </p>

        <div className="mb-6 flex items-baseline">
          <AnimatedPrice value={total} className="font-display text-5xl sm:text-6xl font-semibold text-cream" />
          <span className="ml-2 text-sm text-cream/40">one-time</span>
        </div>

        <div className="h-px bg-cream/10 mb-5" />

        <ul className="flex flex-col gap-2 mb-6">
          {BASE_INCLUDES.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-cream/60">
              <Icon name="check" className="w-3.5 h-3.5 shrink-0 text-teal" />
              {item}
            </li>
          ))}

          <AnimatePresence initial={false}>
            {selected.map((id) => {
              const addon = ADDONS.find((a) => a.id === id);
              return (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, height: 0, y: -6 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex items-center justify-between gap-2 overflow-hidden text-sm text-cream"
                >
                  <span className="flex items-center gap-2">
                    <Icon name="check" className="w-3.5 h-3.5 shrink-0 text-terracotta" />
                    {addon.title}
                  </span>
                  <span className="text-cream/50">+${addon.price}</span>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-terracotta py-3.5 text-sm font-semibold text-cream shadow-lg shadow-terracotta/30"
        >
          Get Started
          <Icon name="arrow-right" className="w-4 h-4" />
        </motion.a>

        <a
          href="#contact"
          className="mt-4 flex items-center justify-center gap-1.5 text-xs text-cream/40 transition-colors hover:text-cream/70"
        >
          Need something custom?
          <span className="underline underline-offset-2">Let's talk</span>
          <Icon name="arrow-up-right" className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}

/* ---------------- Pricing ---------------- */

export default function Pricing() {
  const [selected, setSelected] = useState(["branding"]);

  const toggle = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <section id="pricing" className="px-3 py-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mx-auto w-full max-w-[1680px] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-ink"
      >
        <PricingBackground />

        <div className="relative z-10 px-6 sm:px-10 md:px-14 pt-14 md:pt-16 pb-16 md:pb-20">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14 md:mb-20">
            <div>
              <BlurInText
                text="( Pricing )"
                className="block text-xs font-semibold uppercase tracking-[0.2em] text-cream/40 mb-4"
              />
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-cream">
                <BlurInText text="Build your package" />
              </h2>
            </div>
            <div className="md:pt-12 md:text-right md:ml-auto md:max-w-md">
              <VaporText
                text="Start with a core project, then add exactly what your brand needs. The total updates as you go."
                className="block text-cream/60 text-base leading-relaxed"
              />
            </div>
          </div>

          {/* Split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
            <div className="flex flex-col gap-3">
              {ADDONS.map((addon, i) => (
                <AddonToggle
                  key={addon.id}
                  addon={addon}
                  index={i}
                  isActive={selected.includes(addon.id)}
                  onToggle={toggle}
                />
              ))}
            </div>

            <PricingCard selected={selected} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}