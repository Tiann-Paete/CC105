import { useState } from "react";
import { HiMenu, HiSearch, HiShoppingCart } from "react-icons/hi";
import Drawer from "./drawer";
import styles from "../styles/styles.module.css"; // Import your CSS file

// Custom Link component for menu items
const CustomLink = ({ href, children }) => (
  <a href={href} className="hover:text-blue-600 dark:hover:text-blue-400">{children}</a>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between ${styles.homeContainer} ${styles.blurEffect} `}>
      {/* Header */}
      <header className="bg-green-800 w-full h-20 flex justify-between items-center mb-22">
        {/* Burger Menu Icon */}
        <div className="md:hidden">
          <HiMenu
            className="w-8 h-8 text-gray-600 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
        {/* Menu Items */}
        <div className={`ml-20 font-semibold text-white flex items-center space-x-4 md:flex hidden ${isMenuOpen ? "flex" : "hidden"}`}>
          <CustomLink href="/categories" className="mr-4">Categories</CustomLink>
          <CustomLink href="/supplies" className="mr-4">Supplies</CustomLink>
          <CustomLink href="/about" className="mr-4">About</CustomLink>
          <CustomLink href="/contact">Contact</CustomLink>
        </div>
        <div className="flex items-center relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
          />
          <HiSearch className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400 pointer-events-none" />
        </div>
        <div className="mr-20 text-white font-semibold gap-4 flex items-center space-x-4">
          <CustomLink href="/Signin" >Sign In</CustomLink>
          <CustomLink href="/Signup">Sign Up</CustomLink>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-3xl font-bold text-center">Welcome to Nar's School Supplies</h1>
        <p className="text-lg text-center max-w-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod ligula in enim
          consequat, nec dapibus libero dapibus.
        </p>
        <div className="flex space-x-4">
          <a href="/Signin" className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors duration-300 ease-in-out">
            <HiShoppingCart className="w-6 h-6 mr-2" />
            Shop Now
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-sm text-center text-gray-500 dark:text-gray-400">
        &copy; 2024 Nars School Supplies. All rights reserved.
      </footer>

      {/* Drawer */}
      <Drawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </main>
  );
}
