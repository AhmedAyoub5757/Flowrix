import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export function VaporText({ text, className = "", delay = 0, stagger = 0.018 }) {
  const words = text.trim().split(/\s+/);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05, margin: "0px" });

  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <motion.span
            initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
            animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : undefined}
            transition={{ duration: 0.6, ease: EASE, delay: delay + wordIndex * stagger * 3 }}
            className="inline-block"
          >
            {word}
          </motion.span>
          {wordIndex < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

export function AnnotatedWord({ word, className = "text-terracotta" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05, margin: "0px" });

  return (
    <span ref={ref} className={`relative inline-block align-baseline ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
        transition={{ duration: 0.5, ease: EASE }}
        className="inline-block"
      >
        {word}
      </motion.span>
    </span>
  );
}

export function BlurInText({ text, className = "", delay = 0, stagger = 0.03 }) {
  const tokens = text.split(/(\s+)/);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05, margin: "0px" });

  return (
    <span ref={ref} className={`${className} overflow-visible`}>
      {tokens.map((token, tokenIndex) => {
        if (/^\s+$/.test(token)) {
          return <span key={tokenIndex}>{token}</span>;
        }

        return (
          <motion.span
            key={tokenIndex}
            initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: delay + tokenIndex * stagger,
            }}
            className="inline-block"
          >
            {token}
          </motion.span>
        );
      })}
    </span>
  );
}
