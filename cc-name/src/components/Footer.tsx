"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="w-full bg-gray-50 py-8 px-6 md:px-12 border-t border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">CC Name</h3>
            <p className="text-sm text-gray-600">
              基于中国古代诗歌、四书五经以及五行八卦、梅花易数的姓名推荐系统
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">导航</h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                首页
              </Link>
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                关于我们
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                联系我们
              </Link>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">联系我们</h3>
            <p className="text-sm text-gray-600">邮箱: contact@ccname.com</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} CC Name. 保留所有权利。
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
