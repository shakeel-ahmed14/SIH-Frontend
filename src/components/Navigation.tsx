import React, { useEffect, useRef, useState } from "react";
import {
  Home,
  Code,
  Map,
  Users,
  Download,
  Shield,
  HelpCircle,
  Settings,
  Menu,
  X,
  HeartHandshake,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import pancakeLogo from "../images/pancakes.png";


type NavItem = { id: string; label: string; Icon: React.FC<any> };

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "namaste-codes", label: "Namaste Codes", Icon: HeartHandshake },
  { id: "tm2-codes", label: "TM2 / ICD-11", Icon: Code },
  { id: "mappings", label: "Mappings", Icon: Map },
  { id: "profiles", label: "Patient Records", Icon: Users },
  { id: "downloads", label: "FHIR Downloads", Icon: Download },
  { id: "admin", label: "Admin", Icon: Shield },
  { id: "help", label: "Help", Icon: HelpCircle },
  { id: "settings", label: "Settings", Icon: Settings },
];

interface SidebarNavProps {
  currentPage?: string;
  onPageChange?: (id: string) => void;
  onToggle?: (open: boolean) => void;
}

/* Framer Motion variants */
const sidebarVariants: Variants = {
  open: { width: 264, transition: { type: "spring", stiffness: 240, damping: 28 } },
  closed: { width: 72, transition: { type: "spring", stiffness: 300, damping: 32 } },
};

const logoTextVariants: Variants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.18 } },
  closed: { opacity: 0, x: -20, transition: { duration: 0.12 } },
};

const navListVariants: Variants = {
  open: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
  closed: {},
};

const navItemVariants: Variants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.18 } },
  closed: { opacity: 1, x: -8, transition: { duration: 0.12 } },
};

const mobileDrawerVariants: Variants = {
  open: { x: 0, transition: { type: "tween", duration: 0.24 } },
  closed: { x: "-100%", transition: { type: "tween", duration: 0.24 } },
};


export function Navigation({ currentPage = "home", onPageChange, onToggle }: SidebarNavProps) {
  const [open, setOpen] = useState<boolean>(true); // desktop expanded by default
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // After open state is defined
  useEffect(() => {
    if (onToggle) onToggle(open);
  }, [open, onToggle]);


  // Close mobile drawer on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click outside to close mobile drawer
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!mobileOpen) return;
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [mobileOpen]);

  const handleClick = (id: string) => {
    onPageChange?.(id);
    // close mobile drawer after selection
    setMobileOpen(false);
  };



  return (
    <>
      {/* Hamburger for small screens (top-left) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((s) => !s)}
          className="p-2 rounded-md bg-white/90 text-slate-700 shadow-md ring-1 ring-slate-200 backdrop-blur"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Left vertical bar for md+ (collapsible) */}
      <motion.aside
        className="hidden md:flex flex-col top-0 left-0 min-h-screen z-40 ease-in-out bg-white border border-slate-200 shadow-sm overflow-hidden m-6 mr-0 rounded-lg"
        initial={false}
        animate={open ? "open" : "closed"}
        variants={sidebarVariants}
        style={{ minWidth: 64 }} // ensure minimum so layout doesn't collapse
      >
        {/* Logo + toggle */}
        <div className="flex items-center h-20 px-4 border-b border-slate-200 bg-white">
          {open ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <img
                  src={pancakeLogo}
                  alt="AyushVardhan logo"
                  className="w-9 h-9 object-contain flex-shrink-0"
                />
                <motion.span
                  className="text-slate-700 font-semibold text-base"
                  variants={logoTextVariants}
                >
                  AyushVardhan Console
                </motion.span>
              </div>
              <button
                aria-label="Collapse sidebar"
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              aria-label="Expand sidebar"
              onClick={() => setOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        <motion.nav className="flex-1 overflow-y-auto" initial={false} animate={open ? "open" : "closed"}>
          <motion.ul
            className="py-4 space-y-1 overflow-hidden" variants={navListVariants} role="list"
          >
            {NAV_ITEMS.map((item) => {
              const active = currentPage === item.id;
              const Icon = item.Icon;
              return (
                <motion.li key={item.id} variants={navItemVariants}>
                  <motion.button
                    onClick={() => handleClick(item.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all rounded-lg
                      ${open ? "justify-start" : "justify-center"}
                      ${active ? "bg-slate-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className={`w-5 h-5 ${active ? "text-white" : "text-slate-500 group-hover:text-green-600"}`} />
                    {open && <span className="truncate">{item.label}</span>}
                  </motion.button>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.nav>

        <div className="px-4 py-5 border-t border-slate-200 bg-white">
          <motion.div initial={false} animate={open ? "open" : "closed"} variants={logoTextVariants}>
            {open ? (
              <div className="text-xs text-slate-500">
                v1.0 &bull; Connected
              </div>
            ) : (
              <div className="text-center text-xs text-slate-500">v1.0</div>
            )}
          </motion.div>
        </div>
      </motion.aside>

      {/* Mobile drawer (overlay) */}
      <div
        className={`fixed inset-0 z-40 md:hidden pointer-events-none transition-opacity duration-200 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
          }`}
        aria-hidden={!mobileOpen}
      >
        {/* overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: mobileOpen ? 1 : 0 }}
          onClick={() => setMobileOpen(false)}
        />

        {/* drawer */}
        <motion.div
          ref={drawerRef}
          className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl"
          initial="closed"
          animate={mobileOpen ? "open" : "closed"}
          variants={mobileDrawerVariants}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
            <div className="font-semibold text-slate-700">Code Mapping Portal</div>
            <button aria-label="Close" onClick={() => setMobileOpen(false)} className="p-1 rounded-lg hover:bg-green-50 hover:text-green-600 text-slate-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-2">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = currentPage === item.id;
                const Icon = item.Icon;
                return (
                  <li key={item.id}>
                    <motion.button
                      onClick={() => handleClick(item.id)}
                      whileHover={{ x: 6 }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg font-medium
                        ${active ? "bg-green-600 text-white" : "text-slate-600 hover:bg-green-50 hover:text-green-700"}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </motion.div>
      </div>
    </>
  );
}