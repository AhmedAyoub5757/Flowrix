import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Pricing = lazy(() => import("./components/Pricing"));
const FAQ = lazy(() => import("./components/FAQ"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const Works = lazy(() => import("./components/Works"));
const Testimonials = lazy(() => import("./components/TestimonialGlobe"));

function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.15, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className="page-loader pointer-events-none fixed inset-0 z-[90] flex items-center justify-center"
    >
      <div className="w-40">
        <div className="mb-3 flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cream/60">
          <span>Flowrix</span>
          <span>Studio</span>
        </div>
        <div className="h-px overflow-hidden bg-cream/20">
          <div className="page-loader__bar h-full w-full bg-terracotta" />
        </div>
      </div>
    </motion.div>
  );
}

function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 35, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 500, damping: 35, mass: 0.2 });
  const [hovering, setHovering] = useState(false);
  const hoverState = useRef(false);

  useEffect(() => {
    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const nextHoverState = Boolean(event.target.closest("a, button, input, textarea, select"));
      if (nextHoverState !== hoverState.current) {
        hoverState.current = nextHoverState;
        setHovering(nextHoverState);
      }
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className={`custom-cursor ${hovering ? "is-hovering" : ""}`}
    />
  );
}

function DeferredSection({ Component, id, minHeight = "min-h-32" }) {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad || !ref.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={ref} id={id}>
      {shouldLoad ? (
        <Suspense fallback={<div className={minHeight} aria-hidden="true" />}>
          <Component />
        </Suspense>
      ) : (
        <div className={minHeight} aria-hidden="true" />
      )}
    </div>
  );
}

function App() {
  useEffect(() => {
    let active = true;
    let aos;
    let lenis;
    const initializeAos = async () => {
      const [{ default: AOS }] = await Promise.all([
        import("aos"),
        import("aos/dist/aos.css"),
      ]);
      if (!active) return;
      aos = AOS;
      aos.init({
        duration: 850,
        once: true,
        easing: "ease-out-cubic",
        offset: 80,
        anchorPlacement: "top-bottom",
      });
      const refreshAnimations = () => aos?.refresh();
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          if ("requestIdleCallback" in window) {
            window.requestIdleCallback(refreshAnimations, { timeout: 1000 });
          } else {
            window.setTimeout(refreshAnimations, 0);
          }
        });
      }
    };
    initializeAos();
    const initializeLenis = async () => {
      const { initLenis } = await import("./lib/lenis");
      if (active) lenis = initLenis();
    };
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(initializeLenis, { timeout: 1200 });
      return () => {
        active = false;
        window.cancelIdleCallback(idleId);
        lenis?.destroy();
      };
    }
    const timeoutId = window.setTimeout(initializeLenis, 500);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        <PageLoader />
      </AnimatePresence>
      <CustomCursor />
      <main className="overflow-hidden">
        <Navbar />
        <Hero />
        <DeferredSection Component={About} id="about" minHeight="min-h-[820px]" />
        <DeferredSection Component={Services} id="services" minHeight="min-h-[980px]" />
        <DeferredSection Component={Works} id="works" minHeight="min-h-[900px]" />
        <DeferredSection Component={Pricing} id="pricing" minHeight="min-h-[720px]" />
        <DeferredSection Component={FAQ} id="faq" minHeight="min-h-[560px]" />
        <DeferredSection Component={Testimonials} minHeight="min-h-[720px]" />
        <DeferredSection Component={Contact} id="contact" minHeight="min-h-[900px]" />
      </main>
      <DeferredSection Component={Footer} minHeight="min-h-64" />
    </>
  );
}

export default App;
