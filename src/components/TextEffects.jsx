import { Fragment } from "react";
import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export function VaporText({ text, className = "", delay = 0, stagger = 0.018 }) {
  const words = text.trim().split(/\s+/);

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <motion.span
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: delay + wordIndex * stagger * 3 }}
            className="inline-block whitespace-nowrap"
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
  return (
    <span className={`relative inline-block align-baseline ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
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

  return (
    <span className={`${className} overflow-visible`}>
      {tokens.map((token, tokenIndex) => {
        if (/^\s+$/.test(token)) {
          return <span key={tokenIndex}>{token}</span>;
        }

        return (
          <motion.span
            key={tokenIndex}
            initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: delay + tokenIndex * stagger,
            }}
            className="inline-block whitespace-nowrap"
          >
            {token}
          </motion.span>
        );
      })}
    </span>
  );
}
