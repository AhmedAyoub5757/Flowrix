import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { EASE } from "./TextEffects";
import Icon from "./Icon";

const TESTIMONIALS = [
  {
    id: "london",
    quote: "Flowrix rebuilt our identity from scratch and somehow made it feel like it was always ours.",
    name: "Imogen Clarke",
    role: "Marketing Director",
    company: "Halden & Co.",
    city: "London",
    country: "GB",
    lat: 51.51,
    lng: -0.13,
    image: "https://i.pravatar.cc/300?img=11",
    rating: 5,
    tone: 1,
  },
  {
    id: "new-york",
    quote: "The new site shipped in six weeks and conversions were up within days. Disciplined process, zero drag.",
    name: "Marcus Lee",
    role: "Head of Growth",
    company: "Northfield Supply",
    city: "New York",
    country: "US",
    lat: 40.71,
    lng: -74.0,
    image: "https://i.pravatar.cc/300?img=12",
    rating: 5,
    tone: 2,
  },
  {
    id: "san-francisco",
    quote: "We handed them a messy pitch deck and got back a brand system our investors actually remembered.",
    name: "Priya Anand",
    role: "Founder",
    company: "Loopwell",
    city: "San Francisco",
    country: "US",
    lat: 37.77,
    lng: -122.42,
    image: "https://i.pravatar.cc/300?img=33",
    rating: 5,
    tone: 3,
  },
  {
    id: "tokyo",
    quote: "The motion work they produced for our launch film is still the best creative asset we own.",
    name: "Haruto Sato",
    role: "Brand Manager",
    company: "Kiyora Foods",
    city: "Tokyo",
    country: "JP",
    lat: 35.68,
    lng: 139.69,
    image: "https://i.pravatar.cc/300?img=14",
    rating: 4,
    tone: 4,
  },
  {
    id: "singapore",
    quote: "Our content finally has a point of view. They didn't just write copy, they taught us how to talk.",
    name: "Natalie Fong",
    role: "Content Lead",
    company: "Tidal Works",
    city: "Singapore",
    country: "SG",
    lat: 1.28,
    lng: 103.83,
    image: "https://i.pravatar.cc/300?img=25",
    rating: 5,
    tone: 5,
  },
  {
    id: "mumbai",
    quote: "They understood our market faster than agencies twice their size. The strategy work alone paid for the engagement.",
    name: "Aarav Mehta",
    role: "CMO",
    company: "Veda Wellness",
    city: "Mumbai",
    country: "IN",
    lat: 19.08,
    lng: 72.88,
    image: "https://i.pravatar.cc/300?img=52",
    rating: 5,
    tone: 1,
  },
  {
    id: "dubai",
    quote: "From logo to launch campaign in one connected process — no agency we'd worked with before pulled that off.",
    name: "Lina Haddad",
    role: "Co-Founder",
    company: "Dunes Hospitality",
    city: "Dubai",
    country: "AE",
    lat: 25.2,
    lng: 55.27,
    image: "https://i.pravatar.cc/300?img=47",
    rating: 4,
    tone: 2,
  },
  {
    id: "berlin",
    quote: "Sharp, fast, and honest about what wouldn't work. Exactly what a rebrand under deadline needed.",
    name: "Felix Brandt",
    role: "Creative Director",
    company: "Rauch Studio",
    city: "Berlin",
    country: "DE",
    lat: 52.52,
    lng: 13.4,
    image: "https://i.pravatar.cc/300?img=68",
    rating: 5,
    tone: 3,
  },
];

function TestimonialPanel({ items, eyebrow, heading, caption, autoplay, interval, action }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 20 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const spotlight = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(250,246,239,0.12), transparent 70%)`
  );
  const active = items[activeIndex];

  useEffect(() => {
    if (!autoplay || isPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % items.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [autoplay, interval, isPaused, items.length]);

  const handlePointerMove = (event) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      className="relative overflow-hidden bg-ink px-6 py-12 text-cream sm:px-10 md:px-14 md:py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal/25 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-terracotta/20 blur-[110px]" />

      <div className="relative z-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
            {eyebrow}
          </p>
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            {heading}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-cream/60">{caption}</p>
          <div className="mt-8">{action}</div>
        </div>

        <motion.article
          ref={cardRef}
          onMouseMove={handlePointerMove}
          onMouseLeave={resetPointer}
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          key={active.id}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="group relative rounded-[2rem] border border-cream/10 bg-cream/[0.06] p-6 shadow-2xl shadow-black/20 transition-colors duration-500 hover:border-cream/25 sm:p-8"
        >
          <motion.div className="pointer-events-none absolute inset-0 rounded-[2rem]" style={{ background: spotlight }} />
          <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold/15 blur-3xl transition-transform duration-500 group-hover:scale-150" />
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.img
                src={active.image}
                alt={active.name}
                whileHover={{ scale: 1.12, rotate: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="relative h-14 w-14 rounded-full object-cover ring-2 ring-cream/10"
              />
              <div>
                <p className="font-semibold">{active.name}</p>
                <p className="text-sm text-cream/50">{active.role} · {active.company}</p>
              </div>
            </div>
            <span className="text-gold" aria-label={`${active.rating} out of 5 stars`}>
              {"★".repeat(active.rating)}
            </span>
          </div>
          <blockquote className="font-display text-2xl leading-snug text-cream/90 sm:text-3xl">
            “{active.quote}”
          </blockquote>
          <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.15em] text-cream/40">
            <span>{active.city}, {active.country}</span>
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          </div>
          <div className="mt-6 flex items-center gap-1.5" role="tablist" aria-label="Testimonials">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show testimonial from ${item.name}`}
                onClick={() => setActiveIndex(index)}
                className="group/dot flex h-4 items-center"
              >
                <span
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "w-8 bg-terracotta" : "w-2 bg-cream/20 group-hover/dot:bg-cream/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="px-3 py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative mx-auto w-full max-w-[1680px] overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-ink/10"
      >
        <TestimonialPanel
          items={TESTIMONIALS}
          eyebrow="( Testimonials )"
          heading="Trusted by brands on every continent"
          caption="A few words from the people we've built strategy, design and motion for."
          autoplay
          interval={3800}
          action={
            <a
              href="#contact"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-terracotta px-4 text-sm font-medium text-cream transition-colors hover:bg-terracotta/90"
            >
              Start a project
              <Icon name="arrow-right" className="w-3.5 h-3.5" />
            </a>
          }
        />
      </motion.div>
    </section>
  );
}