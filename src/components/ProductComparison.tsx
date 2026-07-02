"use client";

import React from "react";
import { X, ArrowLeftRight, Check } from "lucide-react";
import { Product } from "@/data/products";

interface ProductComparisonProps {
  comparedProducts: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductComparison({
  comparedProducts,
  onRemove,
  onClear,
  isOpen,
  onClose,
}: ProductComparisonProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-primary/90 backdrop-blur-md" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-primary-light/95 p-6 shadow-2xl backdrop-blur-md md:p-8 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-6 w-6 text-accent" />
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Product Comparison Matrix
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onClear}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {comparedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ArrowLeftRight className="h-16 w-16 text-slate-500 mb-4" />
            <p className="text-slate-300 text-lg">No products selected for comparison.</p>
            <p className="text-slate-500 text-sm mt-1">Add pumps from the products catalog to compare them side-by-side.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 pr-4 text-xs font-semibold text-slate-400 uppercase w-1/4">Specification</th>
                  {comparedProducts.map((product) => (
                    <th key={product.id} className="py-4 px-4 w-1/4 relative">
                      <button
                        onClick={() => onRemove(product.id)}
                        className="absolute top-2 right-2 p-1 rounded bg-white/5 text-slate-400 hover:bg-secondary hover:text-white transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <div className="text-sm font-bold text-white mt-4">{product.name}</div>
                      <div className="text-xs text-accent mt-0.5">{product.category}</div>
                    </th>
                  ))}
                  {/* Fill empty comparison columns */}
                  {Array.from({ length: Math.max(0, 3 - comparedProducts.length) }).map((_, i) => (
                    <th key={`empty-th-${i}`} className="py-4 px-4 w-1/4 text-center text-slate-600 text-xs font-normal italic">
                      Empty Slot
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                {/* Capacity */}
                <tr>
                  <td className="py-4 pr-4 font-semibold text-white">Motor Capacity</td>
                  {comparedProducts.map((p) => (
                    <td key={`capacity-${p.id}`} className="py-4 px-4">{p.capacity}</td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - comparedProducts.length) }).map((_, i) => (
                    <td key={`empty-cap-${i}`} className="py-4 px-4 text-slate-600">-</td>
                  ))}
                </tr>
                {/* Speed */}
                <tr>
                  <td className="py-4 pr-4 font-semibold text-white">Speed</td>
                  {comparedProducts.map((p) => (
                    <td key={`speed-${p.id}`} className="py-4 px-4">{p.speed}</td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - comparedProducts.length) }).map((_, i) => (
                    <td key={`empty-speed-${i}`} className="py-4 px-4 text-slate-600">-</td>
                  ))}
                </tr>
                {/* Head Range */}
                <tr>
                  <td className="py-4 pr-4 font-semibold text-white">Head Range</td>
                  {comparedProducts.map((p) => (
                    <td key={`head-${p.id}`} className="py-4 px-4">{p.headRange}</td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - comparedProducts.length) }).map((_, i) => (
                    <td key={`empty-head-${i}`} className="py-4 px-4 text-slate-600">-</td>
                  ))}
                </tr>
                {/* Discharge */}
                <tr>
                  <td className="py-4 pr-4 font-semibold text-white">Discharge</td>
                  {comparedProducts.map((p) => (
                    <td key={`disc-${p.id}`} className="py-4 px-4">{p.discharge}</td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - comparedProducts.length) }).map((_, i) => (
                    <td key={`empty-disc-${i}`} className="py-4 px-4 text-slate-600">-</td>
                  ))}
                </tr>
                {/* Pipe Size */}
                <tr>
                  <td className="py-4 pr-4 font-semibold text-white">Pipe Size</td>
                  {comparedProducts.map((p) => (
                    <td key={`pipe-${p.id}`} className="py-4 px-4">{p.pipeSize}</td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - comparedProducts.length) }).map((_, i) => (
                    <td key={`empty-pipe-${i}`} className="py-4 px-4 text-slate-600">-</td>
                  ))}
                </tr>
                {/* Suction Lift */}
                <tr>
                  <td className="py-4 pr-4 font-semibold text-white">Suction Lift</td>
                  {comparedProducts.map((p) => (
                    <td key={`lift-${p.id}`} className="py-4 px-4">{p.suctionLift}</td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - comparedProducts.length) }).map((_, i) => (
                    <td key={`empty-lift-${i}`} className="py-4 px-4 text-slate-600">-</td>
                  ))}
                </tr>
                {/* Key Features */}
                <tr>
                  <td className="py-4 pr-4 font-semibold text-white">Key Features</td>
                  {comparedProducts.map((p) => (
                    <td key={`feat-${p.id}`} className="py-4 px-4 text-xs space-y-1">
                      {p.features.map((f, index) => (
                        <div key={index} className="flex gap-1 items-start">
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - comparedProducts.length) }).map((_, i) => (
                    <td key={`empty-feat-${i}`} className="py-4 px-4 text-slate-600">-</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
