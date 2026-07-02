"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Eye, ArrowRight, ArrowLeftRight, Check, Sparkles, Filter, ChevronRight, X, Send } from "lucide-react";
import { productsData, Product } from "@/data/products";
import Pump3DViewer from "@/components/Pump3DViewer";
import ProductComparison from "@/components/ProductComparison";
import InquiryModal from "@/components/InquiryModal";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Quick View Modal States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Compare States
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Inquiry Modal States
  const [inquiryProduct, setInquiryProduct] = useState<string>("");
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // Initialize filter from URL query param
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      setSelectedCategory(catParam);
    }
  }, [searchParams]);

  // Categories list
  const categories = [
    "All",
    "Domestic Pumps",
    "Agricultural & Domestic",
    "Industrial & Agricultural",
    "Agricultural & Industrial",
    "Submersible Pumps",
    "Borewell Pumps",
    "Domestic & Deep Suction",
  ];

  // Filtering Logic
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Compare Handling
  const handleToggleCompare = (product: Product) => {
    setComparedProducts((prev) => {
      const isAlreadyAdded = prev.some((p) => p.id === product.id);
      if (isAlreadyAdded) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        if (prev.length >= 3) {
          alert("You can compare up to 3 pumps at a time.");
          return prev;
        }
        return [...prev, product];
      }
    });
  };

  const handleRemoveCompare = (id: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearCompare = () => {
    setComparedProducts([]);
  };

  const handleOpenInquiry = (productName: string) => {
    setInquiryProduct(productName);
    setIsInquiryOpen(true);
    setQuickViewProduct(null);
  };

  return (
    <div className="min-h-screen bg-primary pt-24 pb-20 relative z-10 industrial-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold tracking-widest text-secondary uppercase">
              Product Hub
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              OX Industrial Pump Catalog
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              High-efficiency Indian manufactured water pumps for clean domestic supply, heavy agricultural irrigation, and industrial transfer.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5.5 w-5.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search pumps by name, flow rate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-primary-light/45 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 -mx-4 px-4 scrollbar-none">
          <div className="flex items-center gap-1 text-slate-400 text-xs font-bold uppercase tracking-wider shrink-0 mr-2">
            <Filter className="h-4 w-4" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-accent border-accent text-primary shadow-lg shadow-accent/20"
                  : "bg-primary-light/30 border-white/5 text-slate-300 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Sparkles className="h-16 w-16 text-slate-500 mb-4" />
            <p className="text-slate-300 text-lg">No water pumps match your search.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs font-semibold text-accent hover:text-white mt-2 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isComparing = comparedProducts.some((p) => p.id === product.id);

              return (
                <div
                  key={product.id}
                  className="glass-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Category label */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-2.5 py-1 rounded">
                      {product.category}
                    </span>
                    <button
                      onClick={() => handleToggleCompare(product)}
                      className={`p-2 rounded-lg border transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                        isComparing
                          ? "bg-accent border-accent text-primary shadow-lg shadow-accent/20"
                          : "border-white/5 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                      }`}
                      title={isComparing ? "Remove comparison" : "Compare this pump"}
                    >
                      <ArrowLeftRight className="h-3.5 w-3.5" />
                      <span>{isComparing ? "Comparing" : "Compare"}</span>
                    </button>
                  </div>

                  {/* 3D Rendering Preview Container */}
                  <div className="h-48 w-full bg-primary/45 rounded-xl overflow-hidden mb-4 relative flex items-center justify-center">
                    <Pump3DViewer
                      shape={product.shape3d}
                      color={product.color3d}
                      autoRotate={false}
                      className="w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Title & Specs */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed line-clamp-2">
                      {product.shortDesc}
                    </p>

                    <div className="grid grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-white/5 text-left">
                      <div>
                        <div className="text-[9px] text-slate-500 uppercase font-semibold">Capacity</div>
                        <div className="text-xs text-white font-medium mt-0.5">{product.capacity}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-500 uppercase font-semibold">Head Range</div>
                        <div className="text-xs text-white font-medium mt-0.5">{product.headRange}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-500 uppercase font-semibold">Discharge</div>
                        <div className="text-xs text-white font-medium mt-0.5">{product.discharge}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-500 uppercase font-semibold">Pipe Dimensions</div>
                        <div className="text-xs text-white font-medium mt-0.5">{product.pipeSize}</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 hover:border-white/30 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Quick View</span>
                    </button>
                    <Link
                      href={`/products/${product.id}`}
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-secondary hover:bg-secondary-hover px-4 py-2.5 text-xs font-bold text-white transition-all cursor-pointer"
                    >
                      <span>Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Compare Bar */}
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-28 z-40 max-w-sm w-full bg-primary-light/95 border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold text-white">Comparison Tray</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accent/20 text-accent">
              {comparedProducts.length}/3
            </span>
          </div>

          <div className="flex items-center gap-2">
            {comparedProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-1 text-[10px] bg-primary px-2.5 py-1.5 rounded-lg border border-white/5 text-white max-w-[100px] truncate relative"
              >
                <span className="truncate">{p.name.split(" ").slice(0, 2).join(" ")}</span>
                <button
                  onClick={() => handleRemoveCompare(p.id)}
                  className="text-slate-400 hover:text-white p-0.5 ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleClearCompare}
              className="text-[10px] font-bold text-slate-400 hover:text-white text-center py-2 cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={() => setIsCompareOpen(true)}
              className="rounded bg-accent hover:bg-accent/80 text-primary text-[10px] font-extrabold text-center py-2 shadow-lg shadow-accent/10 cursor-pointer"
            >
              Compare Side-by-Side
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      <ProductComparison
        comparedProducts={comparedProducts}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemove={handleRemoveCompare}
        onClear={handleClearCompare}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={() => setQuickViewProduct(null)} />
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-primary-light/95 p-6 shadow-2xl backdrop-blur-md md:p-8 flex flex-col md:flex-row gap-6 animate-float">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Quick 3D Preview (Left) */}
            <div className="w-full md:w-1/2 h-64 bg-primary/45 rounded-xl overflow-hidden relative">
              <Pump3DViewer shape={quickViewProduct.shape3d} color={quickViewProduct.color3d} className="w-full h-full" />
            </div>

            {/* Info (Right) */}
            <div className="w-full md:w-1/2 flex flex-col justify-between text-left">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-accent uppercase">{quickViewProduct.category}</span>
                <h3 className="text-xl font-bold text-white mt-1">{quickViewProduct.name}</h3>
                <p className="text-slate-300 text-xs mt-2 leading-relaxed">{quickViewProduct.shortDesc}</p>

                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/5 text-slate-300 text-xs">
                  <div>
                    <strong>Capacity:</strong> {quickViewProduct.capacity}
                  </div>
                  <div>
                    <strong>Speed:</strong> {quickViewProduct.speed}
                  </div>
                  <div>
                    <strong>Head:</strong> {quickViewProduct.headRange}
                  </div>
                  <div>
                    <strong>Pipe Size:</strong> {quickViewProduct.pipeSize}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6">
                <button
                  onClick={() => handleOpenInquiry(quickViewProduct.name)}
                  className="rounded-lg bg-secondary hover:bg-secondary-hover py-2.5 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  Enquiry Now
                </button>
                <Link
                  href={`/products/${quickViewProduct.id}`}
                  className="flex items-center justify-center gap-1 rounded-lg border border-white/20 hover:bg-white/5 py-2.5 text-xs font-bold text-white transition-colors"
                >
                  <span>Full Details</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        prefilledProduct={inquiryProduct}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-primary flex items-center justify-center text-white">
        Loading OX Pumps Catalog...
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
