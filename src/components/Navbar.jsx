import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronDown,
  Film,
  LayoutTemplate,
  Menu,
  MessageSquareText,
  Palette,
  Plus,
  X,
} from "lucide-react";

const NAV_LINKS = ["Home", "About", "Services", "Works"];

const SERVICES = [
  { title: "Branding Identity", icon: Palette, desc: "Visual systems that stick.", tone: "terracotta", image: "/assets/service-branding.jpg" },
  { title: "Website Design", icon: LayoutTemplate, desc: "Interfaces that convert.", tone: "teal", image: "/assets/service-website.jpg" },
  { title: "Motion Design", icon: Film, desc: "Movement with meaning.", tone: "gold", image: "/assets/service-motion.jpg" },
  { title: "Content Consulting", icon: MessageSquareText, desc: "Stories that land.", tone: "wine", image: "/assets/service-content.jpg" },
];

function MagneticButton({ children = "Let's Talk" }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.25,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.25,
    });
  };

  return (
    <motion.a
      ref={ref}
      href="#contact"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.2 }}
      className="relative flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-cream shadow-md shadow-terracotta/30 transition-shadow hover:shadow-lg hover:shadow-terracotta/40"
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </motion.a>
  );
}

function ServiceItems({ mobile = false, onSelect }) {
  return (
    <div className={mobile ? "grid gap-1" : "grid grid-cols-2 gap-3"}>
      {SERVICES.map((service, index) => {
        const ServiceIcon = service.icon;
        return (
          <motion.a
            key={service.title}
            href="#services"
            onClick={onSelect}
            initial={mobile ? undefined : { opacity: 0, y: 12 }}
            animate={mobile ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className={`group flex items-center gap-3 rounded-2xl transition-colors ${
              mobile ? "px-3 py-3 hover:bg-cream/10" : "bg-cream/60 p-4 hover:bg-ivory"
            }`}
          >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              service.tone === "terracotta"
                ? "bg-terracotta/10 text-terracotta group-hover:bg-terracotta"
                : service.tone === "teal"
                  ? "bg-teal/10 text-teal group-hover:bg-teal"
                  : service.tone === "gold"
                    ? "bg-gold/15 text-gold group-hover:bg-gold"
                    : "bg-[#6B4A4F]/10 text-[#6B4A4F] group-hover:bg-[#6B4A4F]"
            } transition-colors group-hover:text-cream`}
          >
            <ServiceIcon className="h-5 w-5" aria-hidden="true" />
          </span>
            <span className="min-w-0">
              <span className={`block text-sm font-semibold ${mobile ? "text-cream" : "text-ink"}`}>
                {service.title}
              </span>
              <span className={`mt-0.5 block text-xs ${mobile ? "text-cream/50" : "text-ink/60"}`}>
                {service.desc}
              </span>
            </span>
            <ArrowUpRight
              className={`ml-auto h-4 w-4 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 ${
                mobile ? "text-cream/60" : "text-ink/50"
              }`}
              aria-hidden="true"
            />
          </motion.a>
        );
      })}
    </div>
  );
}

function DesktopServices({ onClose }) {
  const [activeService, setActiveService] = useState(0);
  const active = SERVICES[activeService];

  return (
    <div className="grid w-full max-w-5xl grid-cols-[1.05fr_1.7fr] gap-8 overflow-hidden rounded-[2rem] border border-ink/10 bg-cream/95 p-5 shadow-2xl shadow-ink/15 backdrop-blur-xl">
      <div className="relative min-h-[330px] overflow-hidden rounded-[1.5rem] bg-ink">
        <AnimatePresence mode="wait">
          <motion.img
            key={active.image}
            src={active.image}
            alt=""
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.72, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-6 text-cream">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-cream/60">
            <span>What we do</span>
            <span>0{activeService + 1} / 04</span>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-terracotta">Selected service</p>
            <h3 className="max-w-xs font-display text-4xl leading-[0.95]">{active.title}</h3>
            <a href="#services" onClick={onClose} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cream/70 hover:text-cream">
              View service               <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-2">
        <div className="mb-6 flex items-end justify-between border-b border-ink/10 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Capabilities</p>
            <p className="mt-1 font-display text-2xl text-ink">Built for momentum.</p>
          </div>
          <ArrowDownLeft className="mb-1 h-5 w-5 text-terracotta" aria-hidden="true" />
        </div>
        <div className="flex-1">
          {SERVICES.map((service, index) => (
            <motion.a
              key={service.title}
              href="#services"
              onMouseEnter={() => setActiveService(index)}
              onFocus={() => setActiveService(index)}
              onClick={onClose}
              className={`group flex items-center gap-4 border-b border-ink/10 py-5 transition-colors ${
                activeService === index ? "text-ink" : "text-ink/45"
              }`}
            >
              <span className="w-8 font-display text-sm text-terracotta">0{index + 1}</span>
              <span className="flex-1">
                <span className="block font-display text-2xl leading-none transition-transform group-hover:translate-x-1">{service.title}</span>
                <span className="mt-1 block text-xs text-ink/50">{service.desc}</span>
              </span>
              <ArrowUpRight className={`h-5 w-5 transition-all ${activeService === index ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} aria-hidden="true" />
            </motion.a>
          ))}
        </div>
        <a href="#services" onClick={onClose} className="mt-5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-ink/50 hover:text-ink">
          Explore the full approach           <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 20));

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={mounted ? { y: 0, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <motion.nav
          onMouseLeave={() => {
            setHovered(null);
            setServicesOpen(false);
          }}
          animate={{
            backgroundColor: scrolled ? "rgba(250,246,239,0.9)" : "rgba(250,246,239,0.62)",
            boxShadow: scrolled ? "0 8px 30px rgba(36,31,40,0.12)" : "0 4px 16px rgba(36,31,40,0.05)",
          }}
          className="hidden items-center gap-1 rounded-full border border-ink/10 px-3 py-2 backdrop-blur-xl md:flex"
        >
          <a href="#home" className="flex items-center px-1 pr-4" aria-label="Flowrix home">
            <img src="/assets/logo.jpg" alt="Flowrix" className="h-8 w-8 rounded-full object-cover" />
          </a>

          {NAV_LINKS.map((link) => {
            const isServices = link === "Services";
            return isServices ? (
              <button
                key={link}
                type="button"
                aria-expanded={servicesOpen}
                onMouseEnter={() => {
                  setHovered(link);
                  setServicesOpen(true);
                }}
                onClick={() => setServicesOpen((open) => !open)}
                className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {hovered === link && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ivory" />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  {link}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </span>
              </button>
            ) : (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onMouseEnter={() => {
                  setHovered(link);
                  setServicesOpen(false);
                }}
                className="relative px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {hovered === link && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ivory" />
                )}
                <span className="relative z-10">{link}</span>
              </a>
            );
          })}

          <div className="pl-3">
            <MagneticButton />
          </div>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {servicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            className="fixed inset-x-0 top-24 z-40 hidden justify-center px-4 md:flex"
          >
            <DesktopServices onClose={() => setServicesOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={mounted ? { y: 0, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-ink/10 bg-cream/85 px-5 py-4 backdrop-blur-xl md:hidden"
      >
        <a href="#home" onClick={closeMobile} aria-label="Flowrix home">
          <img src="/assets/logo.jpg" alt="Flowrix" className="h-8 w-8 rounded-full object-cover" />
        </a>
        <div className="flex items-center gap-3">
          <a href="#contact" onClick={closeMobile} className="rounded-full bg-terracotta px-4 py-2 text-xs font-semibold text-cream">
            Let's talk
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink/15"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink px-6 pb-10 pt-28 text-cream md:hidden"
          >
            <div className="mb-12 flex items-end justify-between border-b border-cream/15 pb-5">
              <span className="text-xs uppercase tracking-[0.22em] text-cream/45">Navigation</span>
              <span className="font-display text-sm text-terracotta">Flowrix / 2026</span>
            </div>
            <nav className="flex flex-col">
              {NAV_LINKS.map((link, index) =>
                link === "Services" ? (
                  <div key={link} className="border-b border-cream/15">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((open) => !open)}
                      className="flex w-full items-center justify-between py-4 text-left font-display text-4xl font-medium"
                      aria-expanded={mobileServicesOpen}
                    >
                      <span><sup className="mr-3 align-super font-body text-xs text-terracotta">0{index + 1}</sup>{link}</span>
                      <Plus className={`h-6 w-6 text-cream/50 transition-transform ${mobileServicesOpen ? "rotate-45" : ""}`} aria-hidden="true" />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-3">
                          <ServiceItems mobile onSelect={closeMobile} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={closeMobile}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.06 }}
                    className="border-b border-cream/15 py-4 font-display text-4xl font-medium transition-colors hover:text-terracotta"
                  >
                    <sup className="mr-3 align-super font-body text-xs text-terracotta">0{index + 1}</sup>{link}
                  </motion.a>
                )
              )}
            </nav>
            <div className="mt-10 flex items-center justify-between text-xs text-cream/45">
              <span>Strategy. Design. Growth.</span>
              <a href="#contact" onClick={closeMobile} className="text-cream underline underline-offset-4">Start a project</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
