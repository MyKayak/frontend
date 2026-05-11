"use client"

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

interface Button {
  label: string,
  path: string,
  isActive: boolean
}

interface NavProps {
  isAdmin?: boolean
}

const Nav = ({ isAdmin }: NavProps) => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const buttons: Button[] = [
    { label: "MyKayak", path: "/", isActive: false },
    { label: "Gare", path: "/races", isActive: false },
    { label: "Atleti", path: "/athletes", isActive: false },
    { label: "Società", path: "/teams", isActive: false },
    { label: "Medagliere", path: "/medal_table", isActive: false },
    { label: "Ranking", path: "/rankings", isActive: false },
  ];

  buttons.forEach((button) => {
    if (button.path === path) {
      button.isActive = true;
    }
  });

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 z-50 flex items-center justify-center w-full p-4 font-medium transition-all">
      <div className="hidden lg:flex gap-2 p-2 bg-sky-200/20 w-fit rounded-full backdrop-blur-xl backdrop-brightness-80% border border-white/5 shadow-2xl">
        {buttons.map((button) => (
          <Link 
            key={button.path} 
            className={`px-5 py-3 rounded-full hover:bg-sky-200/10 transition-all ${button.isActive ? "bg-sky-200/20 cursor-default shadow-lg shadow-sky-500/10" : ""}`} 
            href={button.path}
          >
            {button.label}
          </Link>
        ))}
        {isAdmin && (
          <Link
            href="/dashboard"
            className={`px-5 py-3 rounded-full flex items-center gap-2 transition-all font-bold
              ${path === '/dashboard'
                ? 'bg-red-600/30 text-red-300'
                : 'hover:bg-red-600/20 text-red-400 hover:text-red-300'
              }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        )}
      </div>

      <div className="lg:hidden z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 p-3 px-6 bg-sky-200/20 rounded-full backdrop-blur-xl backdrop-brightness-80% border border-white/10 text-white shadow-2xl transition-transform active:scale-95"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.div>
          <span className="uppercase text-[10px] font-black tracking-[0.2em]">{isOpen ? "Chiudi" : "Menu"}</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 lg:hidden flex flex-col items-center justify-center bg-black/80 backdrop-blur-2xl p-6 z-40"
          >
            <div className="flex flex-col gap-3 w-full max-w-sm">
              {buttons.map((button, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 30 }}
                  key={button.path}
                >
                  <Link
                    href={button.path}
                    className={`block w-full text-center p-6 rounded-[2rem] text-2xl font-black italic uppercase tracking-tighter transition-all
                      ${button.isActive 
                        ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40 scale-105' 
                        : 'bg-white/5 text-white/70 active:bg-white/10 active:scale-95'
                      }`}
                  >
                    {button.label}
                  </Link>
                </motion.div>
              ))}
              
              {isAdmin && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: buttons.length * 0.05, type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Link
                    href="/dashboard"
                    className={`block w-full text-center p-6 rounded-[2rem] text-2xl font-black italic uppercase tracking-tighter transition-all flex items-center justify-center gap-4
                      ${path === '/dashboard'
                        ? 'bg-red-600 text-white shadow-2xl shadow-red-600/40 scale-105'
                        : 'bg-red-600/10 text-red-400 border border-red-500/20 active:scale-95'
                      }`}
                  >
                    <LayoutDashboard className="w-6 h-6" />
                    Dashboard
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Nav
