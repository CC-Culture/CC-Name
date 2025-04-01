"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12"
      style={{
        background: `rgba(255, 255, 255, ${Math.min(0.85, scrollY / 300)})`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10 overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
              <path
                d="M30,50 Q50,20 70,50 Q50,80 30,50"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-wider">CC Name</span>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
          >
            首页
          </Link>
          <Link
            href="/about"
            className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
          >
            关于我们
          </Link>
          <Link
            href="/contact"
            className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
          >
            联系我们
          </Link>
          <Link
            href="/login"
            className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
          >
            登录
          </Link>
        </nav>

        <div className="md:hidden">
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
