import React from "react";
import "../Product.css";
import Spline from "@splinetool/react-spline";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface LandingProps {
  onNavigate: (page: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
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
          Welcome to Ayush Vardhan
        </motion.h1>

        <motion.p
          className="mt-2 text-lg font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Explore ICD-11, TM2, and NAMASTE codes
        </motion.p>
      </div>

      {/* Button at bottom center */}
      <motion.button
        onClick={() => onNavigate("home")}
        className="go-btn w-16 h-16 flex items-center justify-center rounded-full 
             bg-white/30 backdrop-blur-md border border-white/40 
             text-black shadow-lg hover:bg-white/40 transition 
             absolute bottom-10 left-[91%] transform -translate-x-[90%] z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowRight />
      </motion.button>
    </div>
  );
};

export default Landing;
