import { useState } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";
import { EASE } from "./TextEffects";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LinkList({ title, links }) {
  return (
    <div>
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-cream/35">{title}</p>
      <ul className="flex flex-col items-start gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-sm text-cream/65 transition-colors hover:text-cream">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="overflow-hidden bg-ink px-5 pt-16 text-cream sm:px-8 md:pt-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-12 border-b border-cream/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:gap-8">
          <div className="max-w-xs">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-cream/35">Flowrix Studio</p>
            <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Thoughtful design for ambitious ideas.
            </h2>
          </div>

          <LinkList title="Explore" links={NAV_LINKS} />
          <LinkList title="Connect" links={SOCIAL_LINKS} />

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-cream/35">Stay in touch</p>
            {subscribed ? (
              <p className="text-sm text-cream/65">
                <Icon name="check" className="mr-1.5 inline h-4 w-4 text-teal" />
                You&apos;re on the list.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-xs border-b border-cream/20 pb-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 border-0 bg-transparent text-sm text-cream placeholder:text-cream/30 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="text-cream/50 transition-colors hover:text-cream"
                >
                  <Icon name="arrow-right" className="h-4 w-4" />
                </button>
              </form>
            )}
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-cream/35">
              Occasional notes on brand, digital craft, and the work behind the work.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-5 border-b border-cream/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream/35">© {new Date().getFullYear()} Flowrix. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-cream/35 transition-colors hover:text-cream/65">
              Privacy
            </a>
            <a href="#" className="text-xs text-cream/35 transition-colors hover:text-cream/65">
              Terms
            </a>
            <a
              href="#home"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/50 transition-colors hover:border-cream/40 hover:text-cream"
              aria-label="Back to top"
            >
              <Icon name="arrow-up" className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="pt-8">
          <a href="#home" className="group block overflow-hidden whitespace-nowrap text-center leading-[0.78]">
            <span className="font-display text-[18vw] font-semibold tracking-[-0.08em] text-cream/10 transition-colors duration-500 group-hover:text-cream/20 sm:text-[16vw] md:text-[14vw]">
              FLOWRIX
            </span>
          </a>
        </Reveal>
      </div>
    </footer>
  );
}
