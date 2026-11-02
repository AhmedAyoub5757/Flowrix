import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Icon from "./Icon";

const NAV_LINKS = ["Home", "About", "Works", "Pricing", "FAQ", "Contact"];

const SERVICES = [
  { title: "Branding Identity", icon: "palette", desc: "Visual systems that stick." },
  { title: "Website Design", icon: "layout-template", desc: "Interfaces that convert." },
  { title: "Motion Design", icon: "film", desc: "Movement with meaning." },
  { title: "Content Consulting", icon: "message-square-text", desc: "Stories that land." },
];

function MagneticButton({ children }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.25, y: y * 0.25 });
  };

  return (
    <motion.a
      ref={ref}
      href="#contact"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.2 }}
      className="relative flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-cream shadow-md shadow-terracotta/30 hover:shadow-lg hover:shadow-terracotta/40 transition-shadow"
    >
      Let's Talk
      <Icon name="arrow-up-right" className="w-4 h-4" />
    </motion.a>
  );
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 20));

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Desktop / Tablet floating pill */}
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={mounted ? { y: 0, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
      >
        <motion.nav
          onMouseLeave={() => {
            setHovered(null);
            setServicesOpen(false);
          }}
          animate={{
            backgroundColor: scrolled ? "rgba(250,246,239,0.85)" : "rgba(250,246,239,0.55)",
            boxShadow: scrolled
              ? "0 8px 30px rgba(36,31,40,0.12)"
              : "0 4px 16px rgba(36,31,40,0.05)",
          }}
          className="hidden md:flex items-center gap-1 rounded-full border border-ink/10 backdrop-blur-xl px-3 py-2"
        >
          {/* Logo */}
          <a href="#home" className="flex items-center pr-4 pl-1">
            <img
              src="/assets/logo.jpg"
              alt="Flowrix"
              className="h-8 w-8 rounded-full object-cover"
            />
          </a>

          {/* Links */}
          {NAV_LINKS.map((link) =>
            link === "Services" ? null : (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onMouseEnter={() => {
                  setHovered(link);
                  setServicesOpen(false);
                }}
                className="relative px-4 py-2 text-sm font-medium text-ink/80 hover:text-ink transition-colors"
              >
                {hovered === link && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ivory"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{link}</span>
              </a>
            )
          )}

          {/* Services trigger */}
          <button
            onMouseEnter={() => {
              setHovered("Services");
              setServicesOpen(true);
            }}
            className="relative px-4 py-2 text-sm font-medium text-ink/80 hover:text-ink transition-colors flex items-center gap-1"
          >
            {hovered === "Services" && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-ivory"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              Services
              <Icon
                name="chevron-down"
                className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </span>
          </button>

          <div className="pl-3">
            <MagneticButton />
          </div>
        </motion.nav>
      </motion.header>

      {/* Services mega-panel */}
      <AnimatePresence>
        {servicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            className="fixed top-24 inset-x-0 z-40 hidden md:flex justify-center px-4"
          >
            <div className="grid grid-cols-4 gap-3 rounded-3xl border border-ink/10 bg-cream/95 backdrop-blur-xl p-4 shadow-xl shadow-ink/10">
              {SERVICES.map((s, i) => (
                <motion.a
                  key={s.title}
                  href="#services"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group flex w-44 flex-col gap-3 rounded-2xl p-4 hover:bg-ivory transition-colors"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal group-hover:bg-teal group-hover:text-cream transition-colors">
                    <Icon name={s.icon} className="w-5 h-5" />
                  </span>
                  <span>
                    <p className="text-sm font-semibold text-ink">{s.title}</p>
                    <p className="text-xs text-ink/60 mt-0.5">{s.desc}</p>
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={mounted ? { y: 0, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        className="fixed top-0 inset-x-0 z-50 flex md:hidden items-center justify-between px-5 py-4 bg-cream/80 backdrop-blur-xl border-b border-ink/10"
      >
        <img src="/assets/logo.jpg" alt="Flowrix" className="h-8 w-8 rounded-full object-cover" />

        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="relative h-10 w-10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
            className="absolute h-0.5 w-5 bg-ink rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="absolute h-0.5 w-5 bg-ink rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
            className="absolute h-0.5 w-5 bg-ink rounded-full"
          />
        </button>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-ink flex flex-col justify-center px-8 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {[...NAV_LINKS.slice(0, 2), "Services", ...NAV_LINKS.slice(2)].map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="text-3xl font-display font-medium text-cream/90 hover:text-terracotta transition-colors py-2"
                >
                  {link}
                </motion.a>
              ))}
            </nav>

            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream"
            >
              Let's Talk
              <Icon name="arrow-up-right" className="w-4 h-4" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}