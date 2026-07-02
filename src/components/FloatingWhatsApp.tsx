"use client";

import React from "react";
import { MessageSquareCode } from "lucide-react";

export default function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/919944909904?text=Hello%20OX%20Pumps,%20I%20am%20interested%20in%20your%20water%20pumps.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group cursor-pointer"
      title="Chat on WhatsApp"
    >
      {/* Glow Effect */}
      <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping group-hover:opacity-40" />

      {/* Custom Icon (using MessageSquareCode or simply a clean SVGWide message icon) */}
      <svg
        className="w-7 h-7 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.119.957 11.998.957 6.566.957 2.143 5.329 2.139 10.76c-.001 1.704.457 3.364 1.326 4.819l-.973 3.55 3.655-.945zm11.19-7.254c-.26-.13-1.536-.759-1.772-.843-.236-.085-.407-.13-.578.13-.171.26-.66.843-.808 1.012-.148.17-.296.19-.556.06-1.127-.565-2.015-1.066-2.822-2.455-.213-.367.213-.341.61-.1.356-.679.356-.992.356-1.22 0-.227-.114-.455-.228-.683-.114-.228-.578-1.393-.792-1.905-.208-.502-.416-.434-.578-.442l-.492-.01c-.17 0-.448.064-.683.32-.236.256-.9.88-.9 2.146 0 1.266.92 2.49 1.047 2.66.128.17 1.812 2.768 4.39 3.88.613.264 1.092.422 1.464.54.618.196 1.18.169 1.624.103.495-.074 1.536-.628 1.752-1.235.216-.608.216-1.13.151-1.236-.065-.106-.236-.17-.496-.3z" />
      </svg>
    </a>
  );
}
