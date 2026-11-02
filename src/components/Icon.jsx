import { useEffect } from "react";

export default function Icon({ name, className = "", ...props }) {
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  return <i data-lucide={name} className={className} {...props}></i>;
}