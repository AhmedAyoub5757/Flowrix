import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Parallax, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/parallax";

import Icon from "./Icon";
import { BlurInText, EASE } from "./TextEffects";

const PROJECTS = [
  { title: "Lumen Skincare", category: "Branding Identity", image: "/assets/work-1.jpg" },
  { title: "Northwind Capital", category: "Website Design", image: "/assets/work-2.jpg" },
  { title: "Orbit Audio", category: "Motion Design", image: "/assets/work-3.jpg" },
  { title: "Verdant Foods", category: "Branding Identity", image: "/assets/work-4.jpg" },
  { title: "Pulse Fitness", category: "Website Design", image: "/assets/work-5.jpg" },
  { title: "Solace Studio", category: "Content Consulting", image: "/assets/work-6.jpg" },
];

export default function Works() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = PROJECTS.length;

  return (
    <section id="works" className="px-4 py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-16 md:mb-20">
          <div>
            <BlurInText
              text=" Works "
              className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 mb-4"
            />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink">
              <BlurInText text="Selected projects" />
            </h2>
          </div>
          <div className="md:text-right md:ml-auto md:max-w-sm">
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="block text-base leading-relaxed text-ink/60"
            >
              A handful of recent collaborations — each one a different problem, the same obsession with craft.
            </motion.p>
          </div>
        </div>
      </div>

      {/* 3D curved carousel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <Swiper
          modules={[EffectCoverflow, Parallax, Autoplay]}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          parallax
          speed={700}
          slidesPerView="auto"
          autoplay={{ delay: 4000, disableOnInteraction: true, pauseOnMouseEnter: true }}
          coverflowEffect={{
            rotate: 32,
            stretch: 0,
            depth: 220,
            modifier: 1,
            slideShadows: false,
          }}
          className="!overflow-visible !px-4"
        >
          {/* background parallax accent, moves slower than slides */}
          <div
            slot="container-start"
            data-swiper-parallax="-30%"
            className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
          >
            <span className="font-display text-[18vw] font-semibold text-ink/[0.03] whitespace-nowrap">
              FLOWRIX WORKS
            </span>
          </div>

          {PROJECTS.map((project, i) => (
            <SwiperSlide
              key={project.title}
              className="!w-[72vw] sm:!w-[420px] md:!w-[480px]"
            >
              {({ isActive }) => (
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-ink/10 bg-ivory">
                  <div
                    data-swiper-parallax="-15%"
                    className="absolute inset-[-10%] h-[120%] w-[120%]"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />

                  {/* caption */}
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : 0.5,
                      y: isActive ? 0 : 10,
                      filter: isActive ? "blur(0px)" : "blur(2px)",
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-cream/60 mb-1">
                        {project.category}
                      </p>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-cream">
                        {project.title}
                      </h3>
                    </div>

                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-ink"
                    >
                      <Icon name="arrow-up-right" className="w-4 h-4" />
                    </motion.a>
                  </motion.div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* controls */}
      <div className="mx-auto mt-10 flex max-w-7xl items-center justify-center gap-6 px-4">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-ink/40 hover:text-ink"
          aria-label="Previous project"
        >
          <Icon name="arrow-left" className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 text-xs font-medium text-ink/50">
          <span className="font-display text-ink">0{activeIndex + 1}</span>
          <span className="relative h-px w-24 overflow-hidden bg-ink/10">
            <motion.span
              animate={{ width: `${((activeIndex + 1) / total) * 100}%` }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-y-0 left-0 bg-terracotta"
            />
          </span>
          <span>0{total}</span>
        </div>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-ink/40 hover:text-ink"
          aria-label="Next project"
        >
          <Icon name="arrow-right" className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}