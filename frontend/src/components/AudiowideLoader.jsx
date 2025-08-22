"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AudiowideLoader = ({ onLoadingComplete }) => {
  const [loading, setLoading] = useState(true);
  const [zooming, setZooming] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setZooming(true);
      setTimeout(() => {
        setLoading(false);
        if (onLoadingComplete) onLoadingComplete(); // Check if onLoadingComplete is provided
      }, 1000); // Zoom animation duration
    }, 4000); // Initial animation duration

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div
            className="relative w-32 sm:w-48 md:w-56 lg:w-64 xl:w-72 h-32 sm:h-48 md:h-56 lg:h-64 xl:h-72" // Adjust loader size for different screens
            animate={zooming ? { scale: 20 } : { scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Main Path Animation */}
              <motion.path
                d="M20 80 L50 20 L80 80 M30 60 L70 60"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: zooming ? 1 : [0, 1],
                  opacity: zooming ? 1 : [0, 1],
                }}
                transition={{
                  duration: zooming ? 0 : 2.5,
                  ease: "easeInOut",
                  repeat: zooming ? 0 : Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  repeatDelay: 0.5,
                }}
              />

              {/* Floating Dots Animation */}
              {!zooming &&
                [...Array(30)].map((_, index) => (
                  <motion.circle
                    key={index}
                    r="1.5"
                    fill="white"
                    filter="url(#glow)"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      offsetDistance: ["0%", "100%"],
                    }}
                    transition={{
                      duration: 2.5,
                      delay: index * 0.08,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      repeatDelay: 0.5,
                    }}
                  >
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M20 80 L50 20 L80 80 M30 60 L70 60" />
                  </motion.circle>
                ))}
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudiowideLoader;
