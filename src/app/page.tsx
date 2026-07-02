"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, Settings, Award, ShieldCheck, HelpCircle, Phone, ArrowUpRight, CheckCircle2, ChevronRight, Waves } from "lucide-react";
import Pump3DViewer from "@/components/Pump3DViewer";
import WaterSplashBackground from "@/components/WaterSplashBackground";
import InquiryModal from "@/components/InquiryModal";
import { productsData } from "@/data/products";
import { motion } from "framer-motion";

export default function HomePage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleEnquiryClick = (productName: string) => {
    setSelectedProduct(productName);
    setIsInquiryOpen(true);
  };

  const whyChooseUs = [
    {
      title: "ISO Certified Quality",
      desc: "OX Pumps is AN ISO 9001:2008 certified manufacturer, ensuring rigorous adherence to standard manufacturing procedures and strict quality checks.",
      icon: Award
    },
    {
      title: "Quality Assurance",
      desc: "Every water pump undergoes multi-stage hydraulic and electrical safety testing at our advanced Coimbatore laboratory before packaging.",
      icon: ShieldCheck
    },
    {
      title: "Expert Manufacturing",
      desc: "Constructed at Baba Engg. Works with state-of-the-art machinery, precision copper windings, and dynamically balanced impellers.",
      icon: Settings
    },
    {
      title: "Advanced Testing Facilities",
      desc: "Our automated pump test bed measures precise flow rates, discharge head pressures, and power consumption specs in real-time.",
      icon: Waves
    },
    {
      title: "24/7 Customer Support",
      desc: "Dedicated engineering support to assist you with pump selection, installations, and after-sales service across the country.",
      icon: HelpCircle
    }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-primary via-[#0f284a] to-primary overflow-hidden industrial-grid">
        {/* Dynamic Water Splash Particles */}
        <WaterSplashBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Text */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 w-fit"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[11px] font-bold tracking-widest text-accent uppercase">
                  Coimbatore's Premium Pump Manufacturer
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
              >
                Reliable Pumps <br />
                <span className="text-gradient-red">For Every Need</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed"
              >
                Leading manufacturer of high-performance Domestic, Agricultural, and Industrial water pumps. Built to last with copper windings, brass impellers, and premium ball bearings.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap gap-4 mt-2"
              >
                <Link
                  href="/products"
                  className="flex items-center gap-2 rounded-lg bg-secondary hover:bg-secondary-hover px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-secondary/30 transition-all cursor-pointer hover:scale-[1.03]"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleEnquiryClick("General Inquiry")}
                  className="flex items-center gap-2 rounded-lg border border-white/20 hover:border-accent hover:bg-accent/5 px-8 py-3.5 text-sm font-bold text-white transition-all cursor-pointer"
                >
                  <span>Quick Enquiry</span>
                </button>
              </motion.div>
            </div>

            {/* Hero Right 3D Model Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[300px] md:min-h-[420px]"
            >
              <div className="absolute inset-0 rounded-full bg-accent/5 blur-3xl" />
              <div className="w-full h-full max-w-[450px] aspect-square relative z-10 glass-card rounded-3xl p-4 flex flex-col justify-between items-center group">
                <div className="text-center w-full pt-4">
                  <span className="text-[10px] font-bold text-accent tracking-widest uppercase">
                    Interactive 3D Preview
                  </span>
                  <h3 className="text-white font-bold text-base mt-1">
                    Mini Monobloc Pump
                  </h3>
                </div>
                {/* 3D Viewer */}
                <Pump3DViewer
                  shape="monobloc"
                  color="#0066cc"
                  autoRotate={true}
                  className="w-full h-64 md:h-80"
                />
                <div className="text-center pb-4 text-xs text-slate-400 select-none">
                  Drag to rotate 3D model
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Key Highlights Bar */}
      <section className="bg-primary-light border-y border-white/5 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-white">ISO 9001</div>
              <div className="text-slate-400 text-xs mt-1 uppercase tracking-wider">Certified Company</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">100%</div>
              <div className="text-slate-400 text-xs mt-1 uppercase tracking-wider">Copper Windings</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">Coimbatore</div>
              <div className="text-slate-400 text-xs mt-1 uppercase tracking-wider">Manufacturing Hub</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">10+</div>
              <div className="text-slate-400 text-xs mt-1 uppercase tracking-wider">Product Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Us Section */}
      <section id="about" className="py-20 bg-primary relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* About text */}
            <div className="flex flex-col gap-6 text-left">
              <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                About Baba Engg. Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Manufacturing High-Quality Water Pumps Since Decades
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                OX Pumps, manufactured under <strong>Baba Engg. Works</strong> in Mylampatti, Coimbatore, stands as a hallmark of premium engineering. Coimbatore is known globally as a key water pump manufacturing hub, and we inherit this legacy of quality.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                We design and supply water pumps conforming to AN ISO 9001:2008 standards. Our product catalog features high-grade cast iron casings, dynamically balanced bronze/brass impellers, thermal protectors, and double-shielded ball bearings. From domestic drinking supply to complex industrial water transfer, OX Pumps runs reliably under all conditions.
              </p>
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-white">100% Quality Inspected Components</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-white">Double-Shielded Ball Bearings</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-white">High head & discharge capacities</span>
                </div>
              </div>
            </div>

            {/* About 3D rendering (Submersible type) */}
            <div className="flex justify-center">
              <div className="w-full max-w-[420px] aspect-[4/5] rounded-3xl p-6 glass-card-red flex flex-col justify-between items-center group relative overflow-hidden">
                <div className="text-center w-full">
                  <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">
                    Engineering Excellence
                  </span>
                  <h3 className="text-white font-bold text-base mt-1">
                    Borewell Submersible Pump
                  </h3>
                </div>
                {/* 3D Viewer */}
                <Pump3DViewer
                  shape="submersible"
                  color="#00a28f"
                  autoRotate={true}
                  className="w-full h-80"
                />
                <div className="text-center text-xs text-slate-400 select-none pb-2">
                  Drag to inspect mechanical stage rings
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Products Catalog Highlight */}
      <section className="py-20 bg-primary-light bg-opacity-40 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-widest text-accent uppercase">
            Our Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
            Our Premium Pump Categories
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm mb-12">
            Explore our line of custom water pumps. Click on any category below or browse the full product page to check specifications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1: Monobloc */}
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 text-left group">
              <div className="h-44 w-full rounded-xl bg-primary/80 overflow-hidden relative">
                <Pump3DViewer shape="monobloc" color="#0055bb" autoRotate={false} className="w-full h-full" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                Domestic Monobloc Pumps
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Mini self-priming and regenerative monobloc pumps perfect for residential apartments, lawns, overhead tanks, and pressure boosting systems.
              </p>
              <Link href="/products?category=Domestic%20Pumps" className="text-xs font-bold text-accent mt-2 inline-flex items-center gap-1 hover:text-white transition-colors">
                <span>View Products</span>
                <ChevronRight className="h-4.5 w-4.5" />
              </Link>
            </div>

            {/* Category 2: Centrifugal */}
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 text-left group">
              <div className="h-44 w-full rounded-xl bg-primary/80 overflow-hidden relative">
                <Pump3DViewer shape="centrifugal" color="#1e5b8a" autoRotate={false} className="w-full h-full" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                Centrifugal Volume Pumps
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Single and three phase heavy duty monobloc pumps designed for agriculture irrigation, cooling systems, and industrial water distribution.
              </p>
              <Link href="/products?category=Agricultural%20%26%20Domestic" className="text-xs font-bold text-accent mt-2 inline-flex items-center gap-1 hover:text-white transition-colors">
                <span>View Products</span>
                <ChevronRight className="h-4.5 w-4.5" />
              </Link>
            </div>

            {/* Category 3: Submersible */}
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 text-left group">
              <div className="h-44 w-full rounded-xl bg-primary/80 overflow-hidden relative">
                <Pump3DViewer shape="submersible" color="#008888" autoRotate={false} className="w-full h-full" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                Borewell & Openwell Submersibles
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Stainless steel submersible pumps for openwell sumps and 4/6 inch deep borewells. Eliminates dry run, priming, and noise issues.
              </p>
              <Link href="/products?category=Submersible%20Pumps" className="text-xs font-bold text-accent mt-2 inline-flex items-center gap-1 hover:text-white transition-colors">
                <span>View Products</span>
                <ChevronRight className="h-4.5 w-4.5" />
              </Link>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/products"
              className="flex items-center gap-2 rounded-lg bg-secondary hover:bg-secondary-hover px-10 py-3.5 text-sm font-bold text-white shadow-lg cursor-pointer"
            >
              <span>Browse Full Catalog</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose OX Pumps */}
      <section className="py-20 bg-primary relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text side */}
            <div className="lg:col-span-5 flex flex-col gap-4 text-left">
              <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                OX Strength
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Why Choose OX Water Pumps?
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                OX Pumps, crafted at Baba Engg. Works in Mylampatti, represents reliability. From material procurement to precision assembly, our industrial engineering translates into lower electricity bills and zero breakdowns.
              </p>
              <div className="mt-4 p-5 rounded-xl border border-white/5 bg-primary-light/35 backdrop-blur-md">
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-secondary rounded-lg text-white">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">ISO 9001:2008 Certified</h4>
                    <p className="text-slate-400 text-xs mt-1">Conforming to strict Indian and international manufacturing quality standards.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* List grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyChooseUs.map((w, index) => (
                <div key={index} className="glass-card rounded-xl p-5 flex flex-col gap-3 text-left">
                  <div className="p-2.5 bg-accent/10 border border-accent/20 rounded-lg text-accent w-fit">
                    <w.icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-white font-bold text-base">{w.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Certifications Section */}
      <section id="certifications" className="py-20 bg-primary-light bg-opacity-40 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-widest text-accent uppercase">
            Validation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-12">
            Certifications & Quality Badges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-primary border border-white/5 flex flex-col items-center gap-4 text-center">
              <Award className="h-16 w-16 text-accent" />
              <h3 className="text-lg font-bold text-white">ISO 9001:2008</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Certification for Quality Management Systems. Our processes cover research, development, forging, coil winding, and hydraulic validation testing.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-primary border border-white/5 flex flex-col items-center gap-4 text-center">
              <ShieldCheck className="h-16 w-16 text-secondary" />
              <h3 className="text-lg font-bold text-white">Bureau of Indian Standards</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Conforms strictly to standard specifications for electrical pumps, offering high head output, low temperature rise, and safety standards.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-primary border border-white/5 flex flex-col items-center gap-4 text-center">
              <Settings className="h-16 w-16 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">100% Quality Tested</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Every motor is test-run on automated hydraulic test benches to verify performance ratings under real discharge loads before delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Call To Action / Quick Inquiry */}
      <section className="py-20 bg-primary relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Need Custom Technical Support?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Our engineering team will help you select the exact HP rating, pipe dimensions, and impeller type based on your water table level.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => handleEnquiryClick("General Inquiry")}
              className="w-full sm:w-auto rounded-lg bg-secondary hover:bg-secondary-hover px-10 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03] cursor-pointer"
            >
              Request A Callback
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto rounded-lg border border-white/20 hover:border-accent hover:bg-accent/5 px-10 py-4 text-sm font-bold text-white transition-colors duration-200"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        prefilledProduct={selectedProduct}
      />
    </div>
  );
}
