import { useEffect, useState } from "react";
import AOS from "aos";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { initLenis } from "./lib/lenis";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Works from "./components/Works";
import Pricing from "./components/Pricing";
import Testimonials from "./components/TestimonialGlobe";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.9, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
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

  useEffect(() => {
    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setHovering(Boolean(event.target.closest("a, button, input, textarea, select")));
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className={`custom-cursor ${hovering ? "is-hovering" : ""}`}
    />
  );
}

function App() {
  useEffect(() => {
    const lenis = initLenis();
    AOS.init({
      duration: 850,
      once: true,
      easing: "ease-out-cubic",
      offset: 80,
      anchorPlacement: "top-bottom",
    });

    const refreshAnimations = () => AOS.refreshHard();
    window.addEventListener("load", refreshAnimations, { once: true });
    document.fonts?.ready.then(refreshAnimations);

    return () => {
      window.removeEventListener("load", refreshAnimations);
      lenis.destroy();
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
        <About />
        <Services />
        <Works />
        <Pricing />
        <FAQ />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
