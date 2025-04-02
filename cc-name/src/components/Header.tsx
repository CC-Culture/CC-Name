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
            <Image
              src="/yi-seal.svg"
              alt="易字印章"
              width={60}
              height={60}
              className="mr-4"
            />
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
            href="/surname-culture"
            className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
          >
            百家姓文化
          </Link>
          <Link
            href="/about"
            className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
          >
            关于我们
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
