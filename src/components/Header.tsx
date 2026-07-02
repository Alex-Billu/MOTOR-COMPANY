"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Phone, Mail, Award, Menu, X, Send } from "lucide-react";
import InquiryModal from "./InquiryModal";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    } else {
      // If we are on another page, navigate to home page first with the hash
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "/", isHash: false },
    { name: "About Us", href: "/#about", isHash: true },
    { name: "Products", href: "/products", isHash: false },
    { name: "Applications", href: "/applications", isHash: false },
    { name: "Certifications", href: "/#certifications", isHash: true },
    { name: "Contact Us", href: "/contact", isHash: false },
  ];

  return (
    <>
      <header className="w-full z-40">
        {/* Top Info Bar */}
        <div className="bg-primary border-b border-white/5 py-2 text-xs text-slate-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
            {/* Certifications Badge */}
            <div className="flex items-center gap-1.5 font-medium text-accent">
              <Award className="h-4 w-4" />
              <span>AN ISO 9001:2008 CERTIFIED COMPANY</span>
            </div>

            {/* Contact details */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
              <a
                href="mailto:oxpumps@gmail.com"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>oxpumps@gmail.com</span>
              </a>
              <a
                href="tel:+919944909904"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>+91 99449 09904</span>
              </a>
              <a
                href="tel:+917708738001"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>+91 77087 38001</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Header Area */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "fixed top-0 bg-primary/90 backdrop-blur-md border-b border-white/5 shadow-lg py-3"
              : "relative bg-primary py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-secondary shadow-lg shadow-secondary/30 group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-black text-xl italic tracking-tighter">OX</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-wide leading-none group-hover:text-accent transition-colors duration-300">
                  OX PUMPS
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-widest mt-0.5">
                  BABA ENGG. WORKS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => link.isHash && handleNavClick(e, link.href.substring(link.href.indexOf("#")))}
                  className={`text-sm font-semibold tracking-wide hover:text-accent transition-colors duration-300 ${
                    pathname === link.href || (link.isHash && pathname + link.href.substring(link.href.indexOf("#")) === link.href)
                      ? "text-accent"
                      : "text-slate-300"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setIsInquiryOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-secondary hover:bg-secondary-hover px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-secondary/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>ENQUIRY NOW</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-30 bg-primary bg-opacity-95 backdrop-blur-lg flex flex-col justify-center px-6">
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            >
              <X className="h-6 w-6" />
            </button>

            <nav className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => link.isHash && handleNavClick(e, link.href.substring(link.href.indexOf("#")))}
                  className={`text-xl font-bold tracking-wide hover:text-accent transition-colors ${
                    pathname === link.href ? "text-accent" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsInquiryOpen(true);
                  }}
                  className="w-full max-w-xs flex items-center justify-center gap-2 rounded-lg bg-secondary py-3.5 text-sm font-bold text-white shadow-lg shadow-secondary/20 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>ENQUIRY NOW</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Spacing for sticky header */}
      {isScrolled && <div className="h-[68px] hidden md:block" />}

      {/* Inquiry Modal */}
      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </>
  );
}
