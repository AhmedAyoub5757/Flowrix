import Lenis from "lenis";

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  const handleAnchorClick = (event) => {
    const link = event.target.closest("a[href^='#']");
    if (!link || link.getAttribute("href") === "#") return;

    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    lenis.scrollTo(target, { offset: -24, duration: 1.2 });
  };

  document.addEventListener("click", handleAnchorClick);

  let frame;
  function raf(time) {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  }
  frame = requestAnimationFrame(raf);

  return {
    destroy() {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    },
  };
}