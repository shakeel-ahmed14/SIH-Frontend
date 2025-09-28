import React, { useState } from "react";
import "../Product.css";
import Spline from "@splinetool/react-spline";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LandingProps {
  onNavigate: (page: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="product-container w-full">
      {/* Background */}
      <div className="background-spline">
        <Spline scene="https://prod.spline.design/X3eEwWfsat5SfMSW/scene.splinecode" />
      </div>

      {/* Centered Content */}
      <div className="landing-content absolute left-1/2 top-86 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center text-center text-white">
        {/* Image above heading */}
        <motion.img
          src="/src/images/pancakes.png"
          alt="Logo"
          className="w-32 h-32 object-contain"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />

        {/* Centered text */}
        <motion.h1
          className="text-5xl font-extrabold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Welcome to AyushVardhan
        </motion.h1>

        <motion.p
          className="mt-2 text-lg font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Three Standards. One Vision. Infinite Healthcare Solutions.
        </motion.p>
      </div>

      {/* Button at bottom center */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={() => onNavigate("home")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center justify-center rounded-full 
               bg-white/30 backdrop-blur-md border border-white/40 
               text-black shadow-lg hover:bg-white/40 overflow-hidden"
          initial={{ opacity: 0, y: 50, width: 64, height: 64 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            width: isHovered ? 160 : 64,
            height: 64
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ 
            width: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 0.1 },
            opacity: { duration: 0.8 },
            y: { duration: 0.8 }
          }}
        >
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.div
                key="arrow-only"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="flex items-center justify-center w-full h-full"
              >
                <ArrowRight size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="get-started"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="flex items-center justify-center gap-2 w-full h-full"
              >
                <span className="font-medium text-sm whitespace-nowrap">Get Started</span>
                <ArrowRight size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default Landing;