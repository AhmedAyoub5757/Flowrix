import { useEffect } from "react";
import AOS from "aos";
import { initLenis } from "./lib/lenis";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Works from "./components/Works";
import Pricing from "./components/Pricing";
// import FAQ from "./components/FAQ";
// import Contact from "./components/Contact";

function App() {
  useEffect(() => {
    const lenis = initLenis();
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });

    return () => lenis.destroy();
  }, []);

  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Works />
      <Pricing />
      {/*<FAQ />
      <Contact /> */}

    </main>
  );
}

export default App;
