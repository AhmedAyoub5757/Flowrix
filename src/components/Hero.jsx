import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Icon from "./Icon";
import { EASE } from "./TextEffects";

const SERVICES = [
  { title: "Branding Identity", icon: "palette" },
  { title: "Website Design", icon: "layout-template" },
  { title: "Motion Design", icon: "film" },
  { title: "Content Consulting", icon: "message-square-text" },
];

const LABEL_TEXT = "Creative Agency";

/* ---------------- Background ---------------- */

function HeroBackground() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const orb1X = useTransform(springX, [-1, 1], [-30, 30]);
  const orb1Y = useTransform(springY, [-1, 1], [-20, 20]);
  const orb2X = useTransform(springX, [-1, 1], [25, -25]);
  const orb2Y = useTransform(springY, [-1, 1], [20, -20]);
  const orb3X = useTransform(springX, [-1, 1], [15, -15]);
  const orb3Y = useTransform(springY, [-1, 1], [-15, 15]);

  const spotlight = useTransform([springX, springY], ([sx, sy]) =>
    `radial-gradient(520px circle at ${50 + sx * 30}% ${50 + sy * 30}%, rgba(232,87,45,0.10), transparent 70%)`
  );

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="absolute inset-0 overflow-hidden"
    >
      {/* flowing lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35]"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        {[
          { d: "M-50,420 C200,350 350,500 600,380 S900,250 1050,320", color: "#15635A", w: 2 },
          { d: "M-50,520 C250,460 400,560 650,470 S950,380 1050,440", color: "#E8572D", w: 2 },
          { d: "M-50,180 C220,120 380,220 620,140 S920,60 1050,120", color: "#C9A04A", w: 1.5 },
        ].map((line, i) => (
          <motion.path
            key={i}
            d={line.d}
            fill="none"
            stroke={line.color}
            strokeWidth={line.w}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.3 + i * 0.2, ease: EASE }}
          />
        ))}
      </svg>

      <div className="absolute -top-16 -left-10 animate-float-slow">
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          className="h-72 w-72 md:h-96 md:w-96 rounded-full bg-terracotta/30 blur-[90px]"
        />
      </div>
      <div className="absolute bottom-0 right-0 animate-float-slower">
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          className="h-80 w-80 md:h-[26rem] md:w-[26rem] rounded-full bg-teal/25 blur-[100px]"
        />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float-slow">
        <motion.div
          style={{ x: orb3X, y: orb3Y }}
          className="h-56 w-56 rounded-full bg-gold/25 blur-[80px]"
        />
      </div>

      <motion.div className="absolute inset-0 hidden md:block" style={{ background: spotlight }} />
    </div>
  );
}

/* ---------------- Light sweep reveal ---------------- */

function LightSweep() {
  return (
    <motion.div
      initial={{ x: "-120%" }}
      animate={{ x: "220%" }}
      transition={{ duration: 1.3, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-cream/70 to-transparent"
    />
  );
}

/* ---------------- Kinetic label ---------------- */

function KineticLabel() {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.035, delayChildren: 0.5 }}
      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta mb-4 [perspective:400px]"
    >
      <motion.span
        variants={{ hidden: { rotate: 0 }, visible: { rotate: 360 } }}
        transition={{ duration: 1.2, ease: EASE }}
        className="inline-block"
      >
        <Icon name="sparkles" className="w-3.5 h-3.5 animate-spin-slow" />
      </motion.span>
      <span className="inline-flex">
        {LABEL_TEXT.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, rotateX: -90, y: 8 },
              visible: { opacity: 1, rotateX: 0, y: 0 },
            }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ transformOrigin: "bottom center", display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}

/* ---------------- Masked heading reveal ---------------- */

function RevealHeading() {
  return (
    <h1 className="font-display font-semibold leading-[0.95] text-ink text-[clamp(3rem,11vw,7.5rem)] overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
        className="inline-block"
      >
        Flowrix
      </motion.span>
    </h1>
  );
}

/* ---------------- Services card ---------------- */

function ServicesCard() {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sRotateX = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const sRotateY = useSpring(rotateY, { stiffness: 150, damping: 15 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(-py * 10);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
      style={{ perspective: 800 }}
      className="w-full sm:w-80"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() => {
          rotateX.set(0);
          rotateY.set(0);
        }}
        style={{ rotateX: sRotateX, rotateY: sRotateY, transformStyle: "preserve-3d" }}
        className="animate-shimmer rounded-[1.75rem] bg-gradient-to-r from-teal via-gold to-terracotta p-[1.5px]"
      >
        <div className="rounded-[1.7rem] bg-cream/95 backdrop-blur-xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink/40 mb-3 px-1">
            What we do
          </p>
          <ul className="flex flex-col gap-1">
            {SERVICES.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.3 + i * 0.1 }}
                className="group relative flex items-center gap-3 overflow-hidden rounded-xl px-2 py-2.5"
              >
                <span className="absolute inset-y-0 left-0 w-0.5 scale-y-0 bg-terracotta transition-transform duration-300 group-hover:scale-y-100" />
                <span className="absolute inset-0 -translate-x-full bg-ivory transition-transform duration-300 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 text-[10px] font-semibold text-ink/30 w-4">
                  0{i + 1}
                </span>
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-teal group-hover:text-cream">
                  <Icon name={s.icon} className="w-4 h-4" />
                </span>
                <span className="relative z-10 text-sm font-medium text-ink/80 transition-transform duration-300 group-hover:translate-x-0.5">
                  {s.title}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Hero ---------------- */

export default function Hero() {
  return (
    <section id="home" className="relative pt-28 md:pt-32 pb-6 px-3">
      {/* Panel — intentionally wider than the content grid used in later sections, not full-bleed */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative mx-auto w-full max-w-[1680px] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-ivory border border-ink/10"
      >
        <HeroBackground />
        <LightSweep />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto_1fr_auto] gap-10 md:gap-6 p-7 sm:p-10 md:p-12 lg:p-16 min-h-[auto] md:min-h-[85vh]">
          {/* Top-right: description */}
          <motion.p
            initial={{ opacity: 0, y: -30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="order-2 md:order-none md:col-start-2 md:row-start-1 md:justify-self-end md:max-w-xs text-left md:text-right text-ink/70 text-base leading-relaxed"
          >
            We help ambitious brands grow through sharp strategy, considered
            design, and work that genuinely moves the needle.
          </motion.p>

          {/* Bottom-left: label + brand name */}
          <div className="order-1 md:order-none md:col-start-1 md:row-start-3 md:self-end">
            <KineticLabel />
            <RevealHeading />
          </div>

          {/* Bottom-right: CTA + services card */}
          <div className="order-3 md:order-none md:col-start-2 md:row-start-3 md:self-end flex flex-col items-start md:items-end gap-5">
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream shadow-lg shadow-terracotta/30"
            >
              Get Started
              <Icon
                name="arrow-right"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.a>

            <ServicesCard />
          </div>
        </div>
      </motion.div>
    </section>
  );
}