import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Icon from "./Icon";
import { BlurInText, AnnotatedWord, EASE } from "./TextEffects";

const WORK_IMAGES = [
  "/assets/work-1.webp",
  "/assets/work-2.webp",
  "/assets/work-3.webp",
  "/assets/work-4.webp",
  "/assets/work-5.webp",
  "/assets/work-6.webp",
];

/* ---------------- Background (minimal, recedes) ---------------- */

function HeroBackground() {
  const ref = useRef(null);
  const isNearViewport = useInView(ref, { once: false, margin: "300px 0px" });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const glow = useTransform(
    [sx, sy],
    ([x, y]) => `radial-gradient(900px circle at ${50 + x * 20}% ${50 + y * 20}%, rgba(232,87,45,0.06), transparent 65%)`
  );

  useEffect(() => {
    if (!isNearViewport) return undefined;
    const handleMove = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isNearViewport, mx, my]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-multiply">
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>
      <motion.div className="absolute inset-0 hidden md:block" style={{ background: glow }} />
    </div>
  );
}

/* ---------------- Vertical work-image marquee ---------------- */

function ImageColumn({ images, direction = "up", duration = 36 }) {
  const loop = [...images, ...images];
  return (
    <div className="relative h-full flex-1 overflow-hidden" data-aos="fade-up" data-aos-duration="900">
      <div
        className={`flex flex-col gap-4 ${direction === "up" ? "animate-scroll-up" : "animate-scroll-down"}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((src, i) => (
          <div
            key={i}
            data-aos="zoom-in"
            data-aos-delay={(i % images.length) * 100}
            data-aos-duration="800"
            className="aspect-[3/4] w-full shrink-0 overflow-hidden rounded-2xl"
          >
            <img
              src={src}
              alt=""
              width="900"
              height="1200"
              loading={i < 2 ? "eager" : "lazy"}
              fetchPriority={i < 2 ? "high" : "low"}
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkMarquee({ className = "" }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const hydrate = () => setIsHydrated(true);
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(hydrate, { timeout: 1500 });
      return () => window.cancelIdleCallback(idleId);
    }
    const timeoutId = window.setTimeout(hydrate, 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const colA = isHydrated ? [WORK_IMAGES[0], WORK_IMAGES[2], WORK_IMAGES[4]] : [WORK_IMAGES[0]];
  const colB = isHydrated ? [WORK_IMAGES[1], WORK_IMAGES[3], WORK_IMAGES[5]] : [WORK_IMAGES[1]];

  return (
    <div className={`pointer-events-none absolute z-0 ${className}`} data-aos="fade-left" data-aos-duration="1200">
      <div className="flex h-full gap-4 px-2">
        <ImageColumn images={colA} direction="up" duration={34} />
        <ImageColumn images={colB} direction="down" duration={40} />
      </div>
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cream via-cream/80 to-transparent sm:h-40" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream via-cream/80 to-transparent sm:h-40" />
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream to-transparent" />
    </div>
  );
}

/* ---------------- Hero ---------------- */

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <HeroBackground />

      <div
        className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-center px-4 pb-20 pt-32 sm:px-6 md:min-h-[calc(100svh-6rem)] md:px-10 md:pb-24 md:pt-40 xl:min-h-[min(760px,calc(100svh-6rem))]"
      >
        <WorkMarquee className="inset-y-0 right-5 hidden w-[37%] lg:block xl:right-12 xl:w-[34%]" />

        <div className="relative z-10 lg:max-w-[60%]">
          {/* Headline */}
          <h1
            className="font-display font-semibold leading-[0.94] tracking-[-0.055em] text-ink"
          >
            <span className="mb-2 block pl-1 font-body text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-ink/45 sm:text-xs">
              <BlurInText text="We build" />
            </span>
            <span className="block text-[clamp(4.5rem,12vw,8.5rem)]">
              <AnnotatedWord word="Brands" />
            </span>
            <span className="mt-2 block pl-[0.08em] text-[clamp(2.8rem,7vw,5.5rem)]">
              <BlurInText text="that move." delay={0.3} />
            </span>
          </h1>

          {/* Supporting copy + CTA */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            className="mt-8 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg"
            data-aos="fade-up"
            data-aos-delay="650"
            data-aos-duration="800"
          >
            Flowrix is a creative agency built for founders and teams who refuse to blend in — strategy, design and motion, working as one.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
            className="mt-8"
            data-aos="fade-up"
            data-aos-delay="750"
            data-aos-duration="800"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-terracotta/25 transition-shadow hover:shadow-xl hover:shadow-terracotta/30"
              data-aos="zoom-in"
              data-aos-delay="800"
              data-aos-duration="700"
            >
              Start a project
              <Icon name="arrow-right" className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}