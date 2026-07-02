"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Award, ArrowUpRight, Facebook, Twitter, Linkedin, ShieldCheck } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Products Catalog", href: "/products" },
    { name: "Applications Hub", href: "/applications" },
    { name: "Certifications", href: "/#certifications" },
    { name: "Contact & Support", href: "/contact" },
  ];

  const productCategories = [
    { name: "Monobloc Pumps", href: "/products?category=Domestic%20Pumps" },
    { name: "Centrifugal Pumps", href: "/products?category=Agricultural%20%26%20Domestic" },
    { name: "Submersible Pumps", href: "/products?category=Submersible%20Pumps" },
    { name: "Borewell Submersible", href: "/products?category=Borewell%20Pumps" },
    { name: "Deep Suction Jet", href: "/products?category=Domestic%20%26%20Deep%20Suction" },
  ];

  return (
    <footer className="w-full bg-primary border-t border-white/5 bg-gradient-to-b from-primary to-[#050B13] pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-secondary shadow-lg shadow-secondary/30">
                <span className="text-white font-black text-xl italic">OX</span>
              </div>
              <span className="text-lg font-bold text-white tracking-wide">
                OX PUMPS
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mt-2">
              OX Pumps (a brand by Baba Engg. Works) is an ISO 9001:2008 certified Indian water pump manufacturer. We specialize in producing premium, high-efficiency water pumps for domestic, agricultural, and industrial sectors.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent border border-accent/20">
                <ShieldCheck className="h-3.5 w-3.5" />
                ISO 9001:2008
              </span>
            </div>
          </div>

          {/* Site Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-secondary pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-accent text-sm flex items-center gap-1.5 transition-colors duration-200"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-secondary pl-3">
              Pump Categories
            </h4>
            <ul className="space-y-2">
              {productCategories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="text-slate-400 hover:text-accent text-sm flex items-center gap-1.5 transition-colors duration-200"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-secondary pl-3">
              Headquarters
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm leading-relaxed">
                  <strong>Baba Engg. Works</strong><br />
                  2/118-F Rajiv Gandhi Nagar,<br />
                  Mylampatti, Coimbatore - 641062,<br />
                  Tamil Nadu, India
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-4.5 w-4.5 text-secondary shrink-0" />
                <div className="flex flex-col text-sm text-slate-400">
                  <a href="tel:+919944909904" className="hover:text-accent transition-colors">+91 99449 09904</a>
                  <a href="tel:+917708738001" className="hover:text-accent transition-colors">+91 77087 38001</a>
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-4.5 w-4.5 text-secondary shrink-0" />
                <a
                  href="mailto:oxpumps@gmail.com"
                  className="text-slate-400 hover:text-accent text-sm transition-colors"
                >
                  oxpumps@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social and Copyright */}
        <div className="border-t border-white/5 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} OX Pumps (Baba Engg. Works). All Rights Reserved. Designed for premium hydraulic performance.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-secondary text-slate-400 hover:text-white transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-secondary text-slate-400 hover:text-white transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-secondary text-slate-400 hover:text-white transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
