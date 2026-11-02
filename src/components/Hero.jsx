import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Icon from "./Icon";

const SERVICES = [
  { title: "Branding Identity", icon: "palette" },
  { title: "Website Design", icon: "layout-template" },
  { title: "Motion Design", icon: "film" },
  { title: "Content Consulting", icon: "message-square-text" },
];

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const labelStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.1, delayChildren: 0.25 },
  },
};
const itemVariant = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

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
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(#241F28 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

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

export default function Hero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 950);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="relative pt-28 md:pt-32 pb-6 px-3">
      {/* Panel — intentionally wider than the content grid used in later sections, not full-bleed */}
      <div className="relative mx-auto w-full max-w-[1680px] min-h-[150vh] sm:min-h-[90vh] md:min-h-[85vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-ivory border border-ink/10">
        <HeroBackground />

        {/* Curtain reveal */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "top" }}
          className="absolute inset-0 z-20 bg-ink"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-12 md:block h-full p-7 sm:p-10 md:p-0">
          {/* Bottom-left: label + brand name */}
          <motion.div
            variants={labelStagger}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            className="md:absolute md:bottom-12 md:left-10 lg:left-14 md:max-w-xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta mb-3"
            >
              <Icon name="sparkles" className="w-3.5 h-3.5" />
              Creative Agency
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-display font-semibold leading-[0.95] text-ink text-[clamp(3rem,11vw,7.5rem)]"
            >
              Flowrix
            </motion.h1>
          </motion.div>

          {/* Top-right: description */}
          <motion.p
            variants={fadeDown}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            transition={{ delay: 0.15 }}
            className="md:absolute md:top-12 md:right-10 lg:right-14 md:max-w-xs text-left md:text-right text-ink/70 text-base leading-relaxed"
          >
            We help ambitious brands grow through sharp strategy, considered
            design, and work that genuinely moves the needle.
          </motion.p>

          {/* Bottom-right: CTA + services card */}
          <div className="md:absolute md:bottom-12 md:right-10 lg:right-14 flex flex-col items-start md:items-end gap-5">
            <motion.a
              href="#contact"
              variants={fadeUp}
              initial="hidden"
              animate={show ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream shadow-lg shadow-terracotta/30"
            >
              Get Started
              <Icon name="arrow-right" className="w-4 h-4" />
            </motion.a>

            <motion.div
              variants={cardVariant}
              initial="hidden"
              animate={show ? "visible" : "hidden"}
              className="w-full sm:w-72 rounded-2xl border border-ink/10 bg-cream/90 backdrop-blur-xl p-4 shadow-xl shadow-ink/5"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/40 mb-3 px-1">
                What we do
              </p>
              <ul className="flex flex-col gap-1">
                {SERVICES.map((s) => (
                  <motion.li
                    key={s.title}
                    variants={itemVariant}
                    className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-ivory transition-colors"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                      <Icon name={s.icon} className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-medium text-ink/80">{s.title}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}