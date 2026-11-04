import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { AnnotatedWord, BlurInText, EASE, VaporText } from "./TextEffects";

/* ---------------- Count up number ---------------- */

function CountUp({ value, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start;
    let raf;
    let active = true;
    const step = (ts) => {
      if (!active) return;
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(step);
    return () => {
      active = false;
      cancelAnimationFrame(raf);
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ---------------- 3D tilt wrapper (hover) ---------------- */

function TiltWrapper({ children, className = "" }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sx = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const sy = useSpring(rotateY, { stiffness: 150, damping: 15 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 9);
    rotateX.set(-py * 9);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      whileHover={{ scale: 1.03 }}
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d", transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Stat card ---------------- */

const ACCENTS = {
  terracotta: { text: "text-terracotta", bg: "bg-terracotta/10", glow: "hover:shadow-terracotta/20" },
  teal: { text: "text-teal", bg: "bg-teal/10", glow: "hover:shadow-teal/20" },
  gold: { text: "text-gold", bg: "bg-gold/10", glow: "hover:shadow-gold/20" },
};

const STATS = [
  { value: 120, suffix: "+", label: "Projects Delivered", accent: "terracotta", numberFirst: true, lift: "" },
  { value: 8, suffix: "+", label: "Years of Experience", accent: "teal", numberFirst: false, lift: "md:-translate-y-8" },
  { value: 97, suffix: "%", label: "Client Satisfaction", accent: "gold", numberFirst: true, lift: "" },
];

function StatCard({ stat, index }) {
  const accent = ACCENTS[stat.accent];

  const number = (
    <span className={`font-display text-5xl font-semibold sm:text-6xl ${accent.text}`}>
      <CountUp value={stat.value} suffix={stat.suffix} />
    </span>
  );
  const label = (
    <BlurInText
      text={stat.label}
      delay={0.4 + index * 0.1}
      className="ml-auto block max-w-[9rem] text-right text-sm font-medium text-ink/60"
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -55, y: 54, scale: 0.92 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.16 }}
      style={{ transformPerspective: 1000, transformOrigin: "top" }}
      className={`w-full sm:w-64 ${stat.lift}`}
    >
      <TiltWrapper
        className={`group relative flex h-56 flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-cream p-6 shadow-md shadow-ink/5 transition-[border-color,box-shadow,background-color] duration-300 ${accent.glow} hover:border-ink/20 hover:bg-ivory/70 hover:shadow-xl`}
      >
        <span
          className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full ${accent.bg} blur-2xl transition-transform duration-500 group-hover:scale-125`}
        />
        <span className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {stat.numberFirst ? (
          <>
            <div className="relative z-10 self-start">{number}</div>
            <div className="relative z-10 self-end">{label}</div>
          </>
        ) : (
          <>
            <div className="relative z-10 self-end">{label}</div>
            <div className="relative z-10 self-start">{number}</div>
          </>
        )}
      </TiltWrapper>
    </motion.div>
  );
}

/* ---------------- About ---------------- */

export default function About() {
  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
      }}
      className="px-4 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -24 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink/40"
            >
              ( About Us )
            </motion.p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-ink">
              <BlurInText text="We turn" />{" "}
              <AnnotatedWord word="ambitious" />{" "}
              <BlurInText text="ideas into brands that grow." delay={0.35} />
            </h2>
          </motion.div>

          <motion.div
            className="md:pt-12"
            variants={{
              hidden: { opacity: 0, x: 24 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE, delay: 0.12 } },
            }}
          >
            <VaporText
              text="Flowrix is a creative agency built for founders and teams who refuse to blend in. We pair sharp strategic thinking with design and motion craft — turning scattered ideas into brands that move markets."
              className="block text-base sm:text-lg leading-relaxed text-ink/70"
            />
          </motion.div>
        </div>

        {/* Stat cards */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-6 md:mt-28 md:gap-8"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
          }}
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}