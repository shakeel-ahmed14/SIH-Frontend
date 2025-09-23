import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedDropdownProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export function AnimatedDropdown({ options, selected, onSelect }: AnimatedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-48">
      {/* Dropdown Button with hover effect */}
      <motion.button
        className="w-full px-4 py-2 border rounded-md bg-white text-left flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {selected || "All Categories"}
        <motion.span
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </motion.span>
      </motion.button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg overflow-hidden"
          >
            {options.map((option) => (
              <motion.li
                key={option}
                className="px-4 py-2 cursor-pointer"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: "#e5e7eb", scale: 1.02 }}
                transition={{  stiffness: 100 }}
              >
                {option}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
