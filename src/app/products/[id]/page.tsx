"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Send,
  CheckCircle,
  FileText,
  Workflow,
  Sparkles,
  ChevronRight,
  Shield,
  Layers,
  Zap,
  Gauge,
  Flame,
  Wrench,
  Search,
  Maximize2
} from "lucide-react";
import { productsData, Product } from "@/data/products";
import Pump3DViewer from "@/components/Pump3DViewer";
import InquiryModal from "@/components/InquiryModal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [activeAngle, setActiveAngle] = useState<"perspective" | "front" | "side" | "top">("perspective");
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-white gap-4">
        <p>Loading OX Pump Specification Sheet...</p>
        <Link href="/products" className="text-accent underline text-sm">
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Get similar products
  const relatedPumps = productsData.filter((p) =>
    product.similarPumps.includes(p.id)
  );

  // Icon mapping for features
  const featureIconMap = (feat: string) => {
    const f = feat.toLowerCase();
    if (f.includes("copper") || f.includes("winding")) return Flame;
    if (f.includes("impeller") || f.includes("brass")) return Layers;
    if (f.includes("bearing") || f.includes("ball")) return Gauge;
    if (f.includes("power") || f.includes("consumption") || f.includes("electricity")) return Zap;
    if (f.includes("maintenance")) return Wrench;
    return Shield;
  };

  // 3D parameters based on selected camera angle
  const getCameraAngleProps = () => {
    switch (activeAngle) {
      case "front":
        return { autoRotate: false };
      case "side":
        return { autoRotate: false };
      case "top":
        return { autoRotate: false };
      default:
        return { autoRotate: true };
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-24 pb-20 relative z-10 industrial-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
          <span>Back to Catalog</span>
        </Link>

        {/* 1. Hero / Specifications Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          {/* Left Side: 3D WebGL Model and Angle Select */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className={`relative w-full aspect-square rounded-3xl p-6 glass-card flex flex-col justify-between items-center transition-all ${isZoomed ? "scale-105 border-accent" : ""}`}>
              {/* Zoom Trigger */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Toggle Zoom"
              >
                <Maximize2 className="h-4 w-4" />
              </button>

              <div className="text-center w-full">
                <span className="text-[10px] font-bold text-accent tracking-widest uppercase">
                  {product.category}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  Interactive 3D Engine
                </h2>
              </div>

              {/* 3D viewer with angle properties */}
              <Pump3DViewer
                shape={product.shape3d}
                color={product.color3d}
                {...getCameraAngleProps()}
                className="w-full h-72 md:h-96"
              />

              <div className="text-center text-xs text-slate-400 select-none pb-2">
                Click and drag to rotate the motor housing
              </div>
            </div>

            {/* Angle/Gallery Selector */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => setActiveAngle("perspective")}
                className={`py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                  activeAngle === "perspective"
                    ? "bg-accent border-accent text-primary"
                    : "border-white/5 bg-white/5 text-slate-300 hover:border-white/20"
                }`}
              >
                3D Rotate
              </button>
              <button
                onClick={() => setActiveAngle("front")}
                className={`py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                  activeAngle === "front"
                    ? "bg-accent border-accent text-primary"
                    : "border-white/5 bg-white/5 text-slate-300 hover:border-white/20"
                }`}
              >
                Front View
              </button>
              <button
                onClick={() => setActiveAngle("side")}
                className={`py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                  activeAngle === "side"
                    ? "bg-accent border-accent text-primary"
                    : "border-white/5 bg-white/5 text-slate-300 hover:border-white/20"
                }`}
              >
                Side View
              </button>
              <button
                onClick={() => setActiveAngle("top")}
                className={`py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                  activeAngle === "top"
                    ? "bg-accent border-accent text-primary"
                    : "border-white/5 bg-white/5 text-slate-300 hover:border-white/20"
                }`}
              >
                Top View
              </button>
            </div>
          </div>

          {/* Right Side: Product Intro and Core Specs */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div>
              <span className="text-xs font-bold tracking-widest text-secondary uppercase bg-secondary/15 px-3 py-1 rounded">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
                {product.name}
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed mt-4">
                {product.description}
              </p>
            </div>

            {/* Core buttons */}
            <div className="flex flex-wrap gap-4 pt-2 border-b border-white/5 pb-6">
              <button
                onClick={() => setIsInquiryOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-secondary hover:bg-secondary-hover px-8 py-3.5 text-sm font-bold text-white shadow-lg cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Submit Inquiry</span>
              </button>
              <a
                href={product.brochureUrl}
                download
                className="flex items-center gap-2 rounded-lg border border-white/20 hover:border-accent hover:bg-accent/5 px-8 py-3.5 text-sm font-bold text-white transition-colors duration-200"
              >
                <Download className="h-4 w-4" />
                <span>Download Brochure</span>
              </a>
            </div>

            {/* Technical Specifications Section */}
            <div>
              <h3 className="text-white font-bold text-base uppercase tracking-wider mb-4 border-l-2 border-secondary pl-3">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-primary-light/30 border border-white/5 text-xs">
                  <span className="text-slate-400 font-semibold uppercase">Motor Capacity</span>
                  <span className="text-white font-bold">{product.capacity}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-primary-light/30 border border-white/5 text-xs">
                  <span className="text-slate-400 font-semibold uppercase">Speed</span>
                  <span className="text-white font-bold">{product.speed}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-primary-light/30 border border-white/5 text-xs">
                  <span className="text-slate-400 font-semibold uppercase">Head Range</span>
                  <span className="text-white font-bold">{product.headRange}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-primary-light/30 border border-white/5 text-xs">
                  <span className="text-slate-400 font-semibold uppercase">Discharge (Max)</span>
                  <span className="text-white font-bold">{product.discharge}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-primary-light/30 border border-white/5 text-xs">
                  <span className="text-slate-400 font-semibold uppercase">Pipe Dimensions</span>
                  <span className="text-white font-bold">{product.pipeSize}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-primary-light/30 border border-white/5 text-xs">
                  <span className="text-slate-400 font-semibold uppercase">Suction Lift</span>
                  <span className="text-white font-bold">{product.suctionLift}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Features Section (Copper winding, double bearings) */}
        <section className="py-12 border-t border-white/5">
          <div className="text-left mb-8">
            <h3 className="text-white font-bold text-base uppercase tracking-wider border-l-2 border-secondary pl-3">
              Key Engineering Features
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feat, index) => {
              const Icon = featureIconMap(feat);
              return (
                <div key={index} className="glass-card rounded-xl p-5 flex items-start gap-4 text-left">
                  <div className="p-2.5 rounded-lg bg-accent/10 border border-accent/20 text-accent mt-0.5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Feature Upgrade</h4>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{feat}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Applications Section */}
        <section className="py-12 border-t border-white/5">
          <div className="text-left mb-8">
            <h3 className="text-white font-bold text-base uppercase tracking-wider border-l-2 border-secondary pl-3">
              Applications Area
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {product.applications.map((app, index) => (
              <div key={index} className="p-4 rounded-xl border border-white/5 bg-primary-light/20 flex flex-col gap-2 items-center text-center">
                <Workflow className="h-6 w-6 text-accent" />
                <span className="text-white font-semibold text-xs mt-1">{app}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Related Products Section */}
        {relatedPumps.length > 0 && (
          <section className="py-12 border-t border-white/5">
            <div className="text-left mb-8">
              <h3 className="text-white font-bold text-base uppercase tracking-wider border-l-2 border-secondary pl-3">
                Related Pumps Range
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPumps.map((p) => (
                <div key={p.id} className="glass-card rounded-2xl p-5 flex flex-col justify-between group text-left">
                  <div>
                    <div className="h-36 w-full bg-primary/45 rounded-lg overflow-hidden mb-3">
                      <Pump3DViewer shape={p.shape3d} color={p.color3d} autoRotate={false} className="w-full h-full" />
                    </div>
                    <span className="text-[9px] font-bold text-accent uppercase tracking-wider">{p.category}</span>
                    <h4 className="text-white font-bold text-sm mt-1">{p.name}</h4>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed line-clamp-2">{p.shortDesc}</p>
                  </div>
                  <Link
                    href={`/products/${p.id}`}
                    className="mt-4 text-xs font-bold text-secondary inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <span>Inspect Specs</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        prefilledProduct={product.name}
      />
    </div>
  );
}
