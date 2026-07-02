"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct?: string;
}

export default function InquiryModal({ isOpen, onClose, prefilledProduct = "" }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, product: prefilledProduct }));
      setIsSubmitted(false);
    }
  }, [isOpen, prefilledProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-primary-light/95 p-6 shadow-2xl backdrop-blur-md md:p-8 animate-float">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Get In Touch
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Product Inquiry Form
              </h3>
              <p className="text-slate-300 text-sm mt-1">
                Fill out the details below, and our engineering team will contact you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-primary/50 px-4 py-2.5 text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-primary/50 px-4 py-2.5 text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-primary/50 px-4 py-2.5 text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Product / Model of Interest
                </label>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-primary/50 px-4 py-2.5 text-white focus:border-accent focus:outline-none transition-colors"
                >
                  <option value="" className="bg-primary-light">General Inquiry</option>
                  <option value="Mini Monobloc Self Priming Pump" className="bg-primary-light">Mini Monobloc Self Priming Pump</option>
                  <option value="Regenerative Self Priming Stage Monobloc Pump" className="bg-primary-light">Regenerative Self Priming Stage Monobloc Pump</option>
                  <option value="Single Phase Centrifugal Monobloc Pump" className="bg-primary-light">Single Phase Centrifugal Monobloc Pump</option>
                  <option value="Three Phase Centrifugal Monobloc Pump" className="bg-primary-light">Three Phase Centrifugal Monobloc Pump</option>
                  <option value="Slow Speed Centrifugal Monobloc Pump" className="bg-primary-light">Slow Speed Centrifugal Monobloc Pump</option>
                  <option value="Horizontal Openwell Submersible Pump" className="bg-primary-light">Horizontal Openwell Submersible Pump</option>
                  <option value="Vertical Openwell Submersible Pump" className="bg-primary-light">Vertical Openwell Submersible Pump</option>
                  <option value="4 Inch Borewell Submersible Pump" className="bg-primary-light">4 Inch Borewell Submersible Pump</option>
                  <option value="6 Inch Borewell Submersible Pump" className="bg-primary-light">6 Inch Borewell Submersible Pump</option>
                  <option value="Single & Multistage Jet Pump" className="bg-primary-light">Single & Multistage Jet Pump</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about your requirements (e.g. flow rate, pipe size, head height)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-primary/50 px-4 py-2.5 text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-secondary py-3 text-sm font-bold text-white hover:bg-secondary-hover transition-colors shadow-lg shadow-secondary/20 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Inquiry...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 className="h-16 w-16 text-emerald-400 mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-white mb-2">Inquiry Submitted!</h3>
            <p className="text-slate-300">
              Thank you for contacting OX Pumps. Our engineering team will review your requirements and get back to you shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
