import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Icon from "./Icon";
import { BlurInText, VaporText, EASE } from "./TextEffects";

const SERVICES = [
  {
    title: "Branding Identity",
    image: "/assets/service-branding.webp",
    accent: "terracotta",
    bullets: [
      { icon: "fingerprint", text: "Logo & Visual Identity" },
      { icon: "book-open", text: "Brand Guidelines" },
      { icon: "mic", text: "Tone of Voice" },
      { icon: "compass", text: "Brand Strategy" },
    ],
  },
  {
    title: "Website Design",
    image: "/assets/service-website.webp",
    accent: "teal",
    bullets: [
      { icon: "layout-template", text: "UX / UI Design" },
      { icon: "smartphone", text: "Responsive Development" },
      { icon: "layers", text: "Design Systems" },
      { icon: "gauge", text: "Performance Optimization" },
    ],
  },
  {
    title: "Motion Design",
    image: "/assets/service-motion.webp",
    accent: "gold",
    bullets: [
      { icon: "film", text: "Brand Animation" },
      { icon: "clapperboard", text: "Motion Graphics" },
      { icon: "sparkles", text: "Video Editing" },
      { icon: "mouse-pointer-click", text: "Micro-interactions" },
    ],
  },
  {
    title: "Content Consulting",
    image: "/assets/service-content.webp",
    accent: "terracotta",
    bullets: [
      { icon: "message-square-text", text: "Content Strategy" },
      { icon: "pen-line", text: "Copywriting" },
      { icon: "search", text: "SEO Consulting" },
      { icon: "share-2", text: "Social Storytelling" },
    ],
  },
];

const ACCENT_TEXT = { terracotta: "text-terracotta", teal: "text-teal", gold: "text-gold" };
const ACCENT_BG = {
  terracotta: "bg-terracotta/15 text-terracotta",
  teal: "bg-teal/15 text-teal",
  gold: "bg-gold/15 text-gold",
};
const ACCENT_ROW = {
  terracotta: "hover:border-terracotta/40",
  teal: "hover:border-teal/40",
  gold: "hover:border-gold/40",
};

/* ---------------- Background ---------------- */

function ServicesBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const sy = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const spotlight = useTransform([sx, sy], ([x, y]) =>
    `radial-gradient(600px circle at ${50 + x * 25}% ${50 + y * 25}%, rgba(201,160,74,0.10), transparent 70%)`
  );

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <div onMouseMove={handleMove} className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-terracotta/20 blur-[110px] animate-float-slow" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-teal/20 blur-[120px] animate-float-slower" />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 rounded-full bg-gold/10 blur-[100px] animate-float-slow" />
      <motion.div className="absolute inset-0 hidden md:block" style={{ background: spotlight }} />
    </div>
  );
}

/* ---------------- Row ---------------- */

function ServiceRow({ service, index, active, setActive }) {
  const isActive = active === index;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      onMouseEnter={() => setActive(index)}
      onClick={() => setActive(isActive ? null : index)}
      className={`group relative cursor-pointer border-b border-cream/10 transition-colors duration-500 ${ACCENT_ROW[service.accent]}`}
    >

      {/* Desktop row */}
      <motion.div
        initial={false}
        animate={{
          paddingTop: isActive ? 32 : 24,
          paddingBottom: isActive ? 32 : 24,
        }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative hidden md:grid md:grid-cols-[15%_25%_50%_10%] items-center"
      >
        <motion.span
          animate={{
            color: isActive
              ? service.accent === "terracotta" ? "#E8572D" : service.accent === "teal" ? "#15635A" : "#C9A04A"
              : "rgba(250,246,239,0.3)",
            scale: isActive ? 1.18 : 1,
            x: isActive ? 4 : 0,
          }}
          transition={{ duration: 0.35, ease: EASE }}
          className={`font-display text-xl lg:text-2xl font-semibold origin-left`}
        >
          0{index + 1}
        </motion.span>

        <motion.span
          animate={{
            color: isActive
              ? service.accent === "terracotta" ? "#E8572D" : service.accent === "teal" ? "#15635A" : "#C9A04A"
              : "rgba(250,246,239,0.7)",
            x: isActive ? 10 : 0,
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className="font-display text-xl lg:text-2xl font-medium"
        >
          {service.title}
        </motion.span>

        <div className="relative h-24 flex items-center">
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                initial={{ opacity: 0, x: -10, filter: "blur(3px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 10, filter: "blur(3px)" }}
                transition={{ duration: 0.65, ease: EASE }}
                className="flex items-center gap-6"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.96, rotate: 2 }}
                  transition={{ duration: 0.75, ease: EASE }}
                  className="h-32 w-64 shrink-0 overflow-hidden rounded-2xl shadow-lg shadow-black/20"
                >
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    width="1200"
                    height="800"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8, ease: EASE }}
                  />
                </motion.div>

                <ul className="flex flex-col gap-2.5">
                  {service.bullets.map((b, bi) => (
                    <motion.li
                      key={b.text}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.35, delay: 0.1 + bi * 0.08, ease: EASE }}
                      className="flex items-center gap-2 text-sm text-cream/60 transition-colors duration-300 hover:text-cream"
                    >
                      <motion.span
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${ACCENT_BG[service.accent]}`}
                      >
                        <Icon name={b.icon} className="w-3.5 h-3.5" />
                      </motion.span>
                      {b.text}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.a
          href="#contact"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Start a project for ${service.title}`}
          animate={{
            rotate: isActive ? 45 : 0,
            scale: isActive ? 1.1 : 1,
            color: isActive
              ? service.accent === "terracotta" ? "#E8572D" : service.accent === "teal" ? "#15635A" : "#C9A04A"
              : "rgba(250,246,239,0.6)",
          }}
          transition={{ duration: 0.35, ease: EASE }}
          className="relative z-10 flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-cream/15 transition-colors duration-300 group-hover:border-cream/40"
        >
          <Icon name="arrow-up-right" className="w-4 h-4" />
        </motion.a>
      </motion.div>

      {/* Mobile accordion header */}
      <div className="md:hidden relative flex items-center justify-between py-5">
        <div className="flex items-center gap-4">
          <span className={`font-display text-xs ${isActive ? ACCENT_TEXT[service.accent] : "text-cream/60"}`}>
            0{index + 1}
          </span>
          <span className="font-display text-lg font-medium text-cream">{service.title}</span>
        </div>
        <motion.span animate={{ rotate: isActive ? 135 : 0 }} transition={{ duration: 0.3 }} className="text-cream/50">
          <Icon name="plus" className="w-4 h-4" />
        </motion.span>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="md:hidden overflow-hidden"
          >
            <div className="pb-6 flex flex-col gap-4">
              <motion.img
                src={service.image}
                alt={service.title}
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: EASE }}
                className="h-36 w-full rounded-xl object-cover"
              />
              <ul className="flex flex-col gap-2">
                {service.bullets.map((b, bi) => (
                  <motion.li
                    key={b.text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 + bi * 0.07 }}
                    className="flex items-center gap-2 text-sm text-cream/60"
                  >
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full ${ACCENT_BG[service.accent]}`}>
                      <Icon name={b.icon} className="w-3.5 h-3.5" />
                    </span>
                    {b.text}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------------- Services ---------------- */

export default function Services() {
  const [active, setActive] = useState(null);

  return (
    <section className="px-3 py-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] bg-ink md:rounded-[3rem]"
      >
        <ServicesBackground />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 px-6 sm:px-10 md:px-14 pt-14 md:pt-16 pb-10">
          <div>
            <BlurInText
              text="( Services )"
              className="block text-xs font-semibold uppercase tracking-[0.2em] text-cream/60 mb-4"
            />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-cream">
              <BlurInText text="What we're great at" />
            </h2>
          </div>

          <div className="md:pt-12 md:justify-self-end md:text-right md:max-w-md">
            <VaporText
              text="Four crafts, one connected process — each built to work together so your brand moves as one, not four disconnected pieces."
              className="block text-cream/60 text-base leading-relaxed"
            />
          </div>
        </div>

        <div
          onMouseLeave={() => setActive(null)}
          className="relative z-10 border-t border-cream/10 mx-6 sm:mx-10 md:mx-14 mb-14"
        >
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.title} service={service} index={i} active={active} setActive={setActive} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}