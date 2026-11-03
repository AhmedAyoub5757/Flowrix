import { Fragment } from "react";
import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export function VaporText({ text, className = "", delay = 0, stagger = 0.018 }) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                className="inline-block"
                initial={{ opacity: 0, y: 14, scale: 1.3, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  ease: EASE,
                  delay: delay + (wordIndex * 3 + charIndex) * stagger,
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

export function AnnotatedWord({ word, className = "text-terracotta" }) {
  return (
    <span className={`relative inline-block align-baseline ${className}`}>
      <span className="inline-block">
        {word.split("").map((char, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: index * 0.035, ease: EASE }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </span>
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
          <span key={tokenIndex} className="inline-block whitespace-nowrap">
            {token.split("").map((char, charIndex) => (
              <motion.span
                key={`${tokenIndex}-${charIndex}`}
                className="inline-block"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: delay + (tokenIndex + charIndex) * stagger,
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </span>
  );
}
