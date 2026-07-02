"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageCircle, CheckCircle2, Award } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    }, 1200);
  };

  const whatsappUrl = "https://wa.me/919944909904?text=Hello%20OX%20Pumps,%20I%20have%20an%20enquiry.";

  return (
    <div className="min-h-screen bg-primary pt-24 pb-20 relative z-10 industrial-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-bold tracking-widest text-secondary uppercase">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Contact OX Pumps Headquarters
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Have questions about our pump models, certifications, or custom manufacturing capability? Reach out to our Coimbatore factory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Contact Information & WhatsApp */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            {/* Info Cards */}
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-6">
              {/* Address */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-secondary rounded-xl text-white mt-1">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider">Factory Address</h4>
                  <p className="text-slate-300 text-sm leading-relaxed mt-1">
                    <strong>Baba Engg. Works</strong><br />
                    2/118-F Rajiv Gandhi Nagar,<br />
                    Mylampatti, Coimbatore - 641062,<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-secondary rounded-xl text-white mt-1">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider">Phone Contacts</h4>
                  <p className="text-slate-300 text-sm leading-relaxed mt-1">
                    <a href="tel:+919944909904" className="hover:text-accent transition-colors block">+91 99449 09904</a>
                    <a href="tel:+917708738001" className="hover:text-accent transition-colors block mt-0.5">+91 77087 38001</a>
                  </p>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-secondary rounded-xl text-white mt-1">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider">Email Address</h4>
                  <p className="text-slate-300 text-sm mt-1">
                    <a href="mailto:oxpumps@gmail.com" className="hover:text-accent transition-colors block">
                      oxpumps@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Chat Card */}
            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md">
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-emerald-500 rounded-xl text-white">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Direct WhatsApp Chat</h4>
                  <p className="text-slate-300 text-xs mt-1">
                    Want to send hydraulic specs or site details over chat? Connect with our manager directly.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded bg-emerald-500 hover:bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-colors cursor-pointer shadow-lg shadow-emerald-500/10"
                  >
                    <span>Start Chat</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ISO certified company assurance */}
            <div className="p-5 rounded-2xl border border-white/5 bg-primary-light/35 flex items-center gap-4">
              <Award className="h-10 w-10 text-accent shrink-0" />
              <div>
                <h5 className="text-white text-xs font-bold uppercase tracking-wider">AN ISO 9001:2008 Certified Company</h5>
                <p className="text-slate-400 text-xs mt-0.5">Operating under strict manufacturing standards, quality check verification, and test bench logging.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Form & Map */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Contact Form */}
            <div className="glass-card rounded-2xl p-6 md:p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 className="h-16 w-16 text-emerald-400 mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-300 text-sm">
                    Thank you for writing to OX Pumps. Our engineering desk will review your details and respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4 border-l-2 border-secondary pl-3">
                    Send Factory message
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-primary/50 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter contact number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-primary/50 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-primary/50 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Agricultural Bulk Inquiry, Custom Casing Spec..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-primary/50 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                      Message Body
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-primary/50 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-secondary py-3 text-xs font-bold text-white hover:bg-secondary-hover transition-colors shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Google Map Iframe (Fully responsive & styled) */}
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10 relative">
              <iframe
                title="OX Pumps Location Map"
                src="https://maps.google.com/maps?q=Mylampatti%2C%20Coimbatore%20-%20641062&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
