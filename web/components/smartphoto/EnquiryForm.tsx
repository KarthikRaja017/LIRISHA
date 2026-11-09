"use client";

import React, { useState } from "react";

export interface EnquiryFormProps {
  initialData?: {
    heading?: string;
    subtitle?: string;
    buttonText?: string;
    successHeading?: string;
    successMessage?: string;
  };
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ initialData }) => {
  const heading = initialData?.heading || "Get Your Free Quote & 5 Sample Edits";
  const buttonText = initialData?.buttonText || "Submit Free Trial Request";
  const successHeading = initialData?.successHeading || "Request Received!";
  const successMessage =
    initialData?.successMessage ||
    "Thank you for contacting LIRISHA. Our senior post-production lead will review your files and get back to you with calibrated samples within 12 hours.";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    requirements: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Please enter your name";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Please enter a valid work email";
    }
    if (!formData.phone.trim()) errs.phone = "Please enter your phone number";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="enquiry" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative subtle ambient circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-100/40 to-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>Fast Turnaround Guarantee</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {heading}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-500">
            Tell us about your shoot volume, deadlines, and requirements. We will tailor a dedicated workflow for your studio.
          </p>
        </div>

        {/* Lead Capture Card */}
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="bg-white/95 backdrop-blur-xl border border-emerald-200 rounded-3xl p-10 sm:p-12 shadow-2xl text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-3xl mx-auto mb-5 border border-emerald-200 shadow-sm">
                <i className="fa-solid fa-check" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {successHeading}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto mb-8">
                {successMessage}
              </p>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    requirements: "",
                  });
                  setSelectedFile(null);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <span>Send Another Enquiry</span>
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-5"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-rose-500 font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="sarah@studio.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-rose-400 focus:ring-rose-200"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-500 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? "border-rose-400 focus:ring-rose-200"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-rose-500 font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Project Scope &amp; Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. 500 catalog photos/week, pure white background, drop shadow, 24h turnaround..."
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 bg-slate-50/70 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Attach Sample Images (Optional)
                </label>
                <label
                  htmlFor="sample-file"
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 cursor-pointer transition-colors"
                >
                  <i className="fa-solid fa-cloud-arrow-up text-slate-400 text-lg" />
                  <span className="text-xs font-semibold text-slate-600">
                    {selectedFile
                      ? selectedFile.name
                      : "Drag & drop or browse raw image files (Max 50MB)"}
                  </span>
                  <input
                    id="sample-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <span>{buttonText}</span>
                    <i className="fa-solid fa-arrow-right text-[10px]" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-400">
                🔒 Under strict bilateral NDA. We never share or publish your images.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
