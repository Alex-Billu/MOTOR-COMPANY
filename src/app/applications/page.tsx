"use client";

import React from "react";
import Link from "next/link";
import { Waves, Home, Sprout, Building, Hotel, Activity, ShieldCheck, ChevronRight, Settings } from "lucide-react";

export default function ApplicationsPage() {
  const applications = [
    {
      title: "Agriculture & Farming",
      desc: "Providing high-volume water displacement for drip irrigation, canal extraction, and crop sprinklers. Built with sand-resistant impellers for farming wells.",
      specHighlights: ["High discharge up to 1600 LPM", "Slow speed wear-resistant motor option", "Deep borewell operations"],
      icon: Sprout
    },
    {
      title: "Domestic Water Supply",
      desc: "Quiet, reliable water pumping systems designed for residential apartments, individual homes, overhead tanks, and local sumps.",
      specHighlights: ["Automatic thermal overload protection", "Self-priming capability up to 8m", "Compact monobloc footprint"],
      icon: Home
    },
    {
      title: "Industrial Water Transfer",
      desc: "Designed for continuous heavy-duty cycles (S1 duty) in chemical processing, cooling towers, factories, and municipal systems.",
      specHighlights: ["Three-phase high power ratings", "Cast iron heavy-duty volute casing", "Continuous running safety factors"],
      icon: Settings
    },
    {
      title: "Hotels & Multi-Story Buildings",
      desc: "Consistent head pressure delivery for high-rise buildings, pressure booster systems, and hospitality sanitations.",
      specHighlights: ["Multistage pressure boosting", "Low power consumption ratings", "Whisper-quiet operations"],
      icon: Hotel
    },
    {
      title: "Hospitals & Sanitation",
      desc: "Sterile, rust-free stainless steel submersible pumps for clean drinking water, hospital sumps, and sanitary lines.",
      specHighlights: ["Stainless steel AISI 304 builds", "Water lubricated eco-friendly motor", "Zero rust-pollution standards"],
      icon: Activity
    },
    {
      title: "Irrigation Systems",
      desc: "Delivering massive water volume and head pressure required for pivot systems, overhead crop sprays, and plantation networks.",
      specHighlights: ["High discharge volume", "Flanged pipe connections", "Reliable wide voltage performance"],
      icon: Waves
    },
    {
      title: "Deep Borewell Systems",
      desc: "Slim 4\" and 6\" diameter deep borewell submersibles that pull groundwater from up to 320 meters depth with high head pressure.",
      specHighlights: ["NEMA standard coupler fitting", "Non-return valves (NRV) integrated", "Highly sand-resistant impellers"],
      icon: Building
    }
  ];

  return (
    <div className="min-h-screen bg-primary pt-24 pb-20 relative z-10 industrial-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Page Header */}
        <div className="mb-12">
          <span className="text-xs font-bold tracking-widest text-secondary uppercase">
            Hydraulics at Work
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Applications & Industries
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            OX Pumps are engineered for precise flow displacement across agricultural, commercial, domestic, and industrial sectors.
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, index) => {
            const Icon = app.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Glow backdrop on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Icon */}
                  <div className="p-3 bg-accent/10 border border-accent/20 rounded-xl text-accent w-fit mb-4">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mt-2">
                    {app.desc}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="mt-4 pt-4 border-t border-white/5 space-y-1.5 text-[11px] text-slate-300">
                    {app.specHighlights.map((highlight, idx) => (
                      <li key={idx} className="flex gap-2 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-2">
                  <Link
                    href="/products"
                    className="text-xs font-bold text-slate-400 hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Matching Pumps</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-primary-light/40 to-primary/80 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white">Need Custom Pump Engineering?</h3>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-xl">
              We design specialized pump casings, mechanical shaft seals, and custom flange dimensions for chemical processing and industrial wastewater transfer.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-lg bg-secondary hover:bg-secondary-hover px-8 py-3.5 text-xs font-bold text-white shadow-lg shrink-0"
          >
            Connect With Engineering
          </Link>
        </div>
      </div>
    </div>
  );
}
