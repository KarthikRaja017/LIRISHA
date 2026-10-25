'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPageContent } from '@/lib/api/content';
import { PageContent } from '@/types/content';
import { useSettings } from '@/context/SettingsContext';

interface ContactUsContentProps {
  initialPage?: PageContent | null;
}

interface ContactLocation {
  id: string;
  title: string;
  address: string;
  countryCode?: string;
  phone?: string;
}

const defaultContactLocations: ContactLocation[] = [
  {
    id: 'loc-usa',
    title: 'United States (Client Relations)',
    address: '116 Village Blvd, Suite 220, Princeton, NJ 08540',
    countryCode: 'US',
    phone: '1-855-695-6028',
  },
  {
    id: 'loc-india',
    title: 'India (Global Production Hub)',
    address: 'No.6, Banaswadi Main Road, Dodda Banaswadi, Bangalore - 560 043',
    countryCode: 'IN',
  },
  {
    id: 'loc-phil',
    title: 'Philippines (Retouching Center)',
    address: 'Aeon Towers, J.P. Laurel Avenue, Bajada, Davao City 8000',
    countryCode: 'PH',
  },
];

export const ContactUsContent: React.FC<ContactUsContentProps> = ({
  initialPage,
}) => {
  const { getSettingValue } = useSettings();
  const [pageData, setPageData] = useState<PageContent | null>(
    initialPage || null,
  );

  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    service: 'Real Estate HDR',
    description: '',
    consentSms: true,
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copyToast, setCopyToast] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch page data dynamically if not provided initially
  useEffect(() => {
    let isMounted = true;
    if (!initialPage) {
      getPageContent('contact-us')
        .then((data) => {
          if (isMounted && data) {
            setPageData(data);
          }
        })
        .catch((err) => {
          console.warn('Could not load dynamic contact-us page content:', err);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [initialPage]);

  // Extract dynamic values
  const heroTitle = pageData?.hero?.title || 'Get in Touch with Our Artists';
  const heroTagline =
    pageData?.hero?.tagline ||
    'Whether you need high-volume ecommerce clipping, fine-art portrait retouching, or real estate HDR processing, our 24/7 production shifts are ready to deliver.';

  const contactSection = pageData?.sections?.find(
    (s: any) => s.type === 'contact_info',
  );

  const quoteSection = pageData?.sections?.find(
    (s: any) => s.type === 'quote_form' || s.type === 'inquiry_form',
  );
  const quoteBadge = quoteSection?.badge || '{quoteBadge}';
  const quoteTitle =
    quoteSection?.title ||
    quoteSection?.heading ||
    'Request a Custom Quote or Free Trial';
  const quoteSubtitle =
    quoteSection?.subtitle ||
    quoteSection?.description ||
    'Tell us about your project volume, styling expectations, or submit sample photos for instant evaluation.';
  const quoteButtonText =
    quoteSection?.buttonText || 'Submit Request & Get Free Quote';
  const quoteSuccessTitle =
    quoteSection?.successTitle || 'Inquiry Received Successfully!';
  const quoteSuccessMessage =
    quoteSection?.successMessage ||
    'Thank you for contacting LIRISHA. A dedicated account manager and senior retouching supervisor will review your project and get back to you within one business day.';

  const phone =
    contactSection?.phone || getSettingValue('contact_phone', '1-855-695-6028');

  const email =
    contactSection?.email ||
    getSettingValue('contact_email', 'info@smartphotoeditors.com');

  const mapEmbedUrl =
    contactSection?.mapEmbedUrl ||
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15549.385111286761!2d77.661375!3d13.013607!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae114392e8f37f%3A0x8f482cafd65ddd13!2sSmart%20Photo%20Edits!5e0!3m2!1sen!2sin!4v1711539891005!5m2!1sen!2sin';

  // Parse dynamic locations
  let locations: ContactLocation[] = defaultContactLocations;
  if (
    contactSection?.locations &&
    Array.isArray(contactSection.locations) &&
    contactSection.locations.length > 0
  ) {
    locations = contactSection.locations;
  } else {
    const footerLocsJson = getSettingValue('footer_locations_json', '');
    if (footerLocsJson) {
      try {
        const parsed = JSON.parse(footerLocsJson);
        if (Array.isArray(parsed) && parsed.length > 0) {
          locations = parsed;
        }
      } catch {
        // use default
      }
    }
  }

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopyToast('Email copied to clipboard!');
        setTimeout(() => setCopyToast(null), 3000);
      });
    } else {
      setCopyToast(`Email: ${email}`);
      setTimeout(() => setCopyToast(null), 3000);
    }
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const livechatBtn = document.querySelector(
      '#chat-widget-container',
    ) as HTMLElement;
    if (livechatBtn) {
      livechatBtn.click();
    } else {
      alert(
        'Our 24/7 live chat agent is connecting. You can also reach us via phone or the inquiry form below.',
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) {
      errs.firstName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Work Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid work email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    }
    if (!formData.description.trim()) {
      errs.description = 'Please share details about your editing requirements';
    }
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
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        email: '',
        phone: '',
        service: 'Real Estate HDR',
        description: '',
        consentSms: true,
      });
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1200);
  };

  const contactFaqs = [
    {
      q: 'How soon will I receive a quote or trial edit?',
      a: 'Our account management team replies to all inquiries within 1 to 2 business hours. Free trial edits (up to 3-5 images) are processed and delivered within 12 to 24 hours.',
    },
    {
      q: 'How do we transfer large batches of RAW files?',
      a: 'You can securely upload files via Dropbox, Google Drive, WeTransfer, or our high-speed encrypted SFTP servers. We provide dedicated credentials upon request.',
    },
    {
      q: 'Is there any obligation when requesting a sample edit?',
      a: 'None whatsoever. Our pilot tests are 100% free with zero commitments, allowing you to verify our quality, color fidelity, and turnaround before onboarding.',
    },
    {
      q: 'Do you sign Non-Disclosure Agreements (NDAs)?',
      a: 'Yes. Every client engagement is backed by legally binding bilateral NDAs. Your raw images, product prototypes, and client assets remain strictly confidential.',
    },
  ];

  return (
    <div className="contact-page-inner bg-[#F7F9FC]">
      {/* Toast Notification */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#07152F] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold border-l-4 border-[#1265E8] animate-bounce">
          <i className="fa-solid fa-circle-check text-[#1265E8] text-lg"></i>
          <span>{copyToast}</span>
        </div>
      )}

      {/* 1. HERO BANNER */}
      <section
        className="spe-inner-banner py-12 md:py-16 bg-[#f1f5f4] border-b border-gray-200"
        style={{
          backgroundImage: "url('/images/banner-bg.webp')",
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1265E8] text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#1265E8] animate-pulse"></span>
              <i className="fa-solid fa-headset"></i>
              <span>24/7 Global Post-Production Support</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#07152F] leading-tight mb-3">
              {heroTitle}
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
              {heroTagline}
            </p>
            <ul className="flex items-center gap-2 text-sm text-gray-600 list-none p-0 flex-wrap">
              <li>
                <Link
                  href="/"
                  className="text-[#1265E8] hover:underline font-medium">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">&gt;</li>
              <li className="text-gray-800 font-semibold">Contact Us</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. THREE QUICK CONTACT CARDS */}

      {/* 3. MAIN FORM & LOCATION SHOWCASE */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT COLUMN: THE FORM (7 COLS) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm">
                <div className="mb-8">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#1265E8] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-2">
                    Direct Inquiry Form
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#07152F]">
                    {quoteTitle}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {quoteSubtitle}
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl mb-4">
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                      {quoteSuccessTitle}
                    </h3>
                    <p className="text-sm text-emerald-800 max-w-md mx-auto mb-6">
                      {quoteSuccessMessage}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                      }}
                      className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition shadow-md">
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <i className="fa-regular fa-user text-sm"></i>
                        </span>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          placeholder="e.g. Sarah Jenkins"
                          className={`w-full pl-10 pr-4 py-3 bg-[#fafafa] focus:bg-white text-gray-900 text-sm font-medium border rounded-xl outline-none transition-all ${
                            errors.firstName
                              ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                              : 'border-gray-200 focus:border-[#1265E8] focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-xs text-rose-500 mt-1 font-medium flex items-center gap-1">
                          <i className="fa-solid fa-circle-exclamation"></i>
                          <span>{errors.firstName}</span>
                        </p>
                      )}
                    </div>

                    {/* Email and Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Work Email */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Work Email <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <i className="fa-regular fa-envelope text-sm"></i>
                          </span>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            placeholder="sarah@company.com"
                            className={`w-full pl-10 pr-4 py-3 bg-[#fafafa] focus:bg-white text-gray-900 text-sm font-medium border rounded-xl outline-none transition-all ${
                              errors.email
                                ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                                : 'border-gray-200 focus:border-[#1265E8] focus:ring-2 focus:ring-blue-100'
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-xs text-rose-500 mt-1 font-medium flex items-center gap-1">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <i className="fa-solid fa-phone text-sm"></i>
                          </span>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            placeholder="+1 (555) 000-0000"
                            className={`w-full pl-10 pr-4 py-3 bg-[#fafafa] focus:bg-white text-gray-900 text-sm font-medium border rounded-xl outline-none transition-all ${
                              errors.phone
                                ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                                : 'border-gray-200 focus:border-[#1265E8] focus:ring-2 focus:ring-blue-100'
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-rose-500 mt-1 font-medium flex items-center gap-1">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Primary Service Selection */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Editing Category / Requirement
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#fafafa] focus:bg-white text-gray-900 text-sm font-medium border border-gray-200 rounded-xl outline-none focus:border-[#1265E8] focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer">
                        <option value="Real Estate HDR">
                          Real Estate HDR & Day to Dusk
                        </option>
                        <option value="Portrait Retouching">
                          Portrait & High-End Skin Retouching
                        </option>
                        <option value="Clipping Path & Masking">
                          Handcrafted Clipping Path & Hair Masking
                        </option>
                        <option value="E-Commerce Product Imagery">
                          E-Commerce Marketplace Product Editing
                        </option>
                        <option value="Jewelry Photo Polish">
                          High-End Macro Jewelry Retouching
                        </option>
                        <option value="Fashion & Ghost Mannequin">
                          Fashion Ghost Mannequin & Apparel
                        </option>
                        <option value="Photoshop Special Effects">
                          Photoshop Creative & Photo Restoration
                        </option>
                        <option value="360 Virtual Tour">
                          360° Virtual Tour & Panoramas
                        </option>
                        <option value="Other Custom Services">
                          Other Custom Request
                        </option>
                      </select>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Project Details / Instructions{' '}
                        <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Tell us about the number of images, preferred turnaround time, styling guidelines, or any specific instructions..."
                        className={`w-full p-4 bg-[#fafafa] focus:bg-white text-gray-900 text-sm font-medium border rounded-xl outline-none transition-all leading-relaxed ${
                          errors.description
                            ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                            : 'border-gray-200 focus:border-[#1265E8] focus:ring-2 focus:ring-blue-100'
                        }`}></textarea>
                      {errors.description && (
                        <p className="text-xs text-rose-500 mt-1 font-medium flex items-center gap-1">
                          <i className="fa-solid fa-circle-exclamation"></i>
                          <span>{errors.description}</span>
                        </p>
                      )}
                    </div>

                    {/* File Upload Box */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Attach Sample Photos (Optional)
                      </label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-200 hover:border-[#1265E8] rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/20 transition-all group">
                        <input
                          ref={fileInputRef}
                          multiple
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept="image/*,.pdf,.zip,.rar,.psd"
                        />
                        <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-blue-100 text-[#1265E8] flex items-center justify-center mx-auto text-xl mb-2 transition-colors">
                          <i className="fa-solid fa-cloud-arrow-up"></i>
                        </div>
                        <p className="text-sm font-bold text-gray-800">
                          {selectedFiles.length > 0 ? (
                            <span className="text-[#1265E8]">
                              {selectedFiles.length} file(s) attached:{' '}
                              {selectedFiles.map((f) => f.name).join(', ')}
                            </span>
                          ) : (
                            'Click to browse or drop sample files here'
                          )}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, RAW, PSD or ZIP up to 25MB. For large
                          volumes, share a cloud folder link above.
                        </p>
                      </div>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="consentSms"
                        checked={formData.consentSms}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            consentSms: e.target.checked,
                          })
                        }
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1265E8] focus:ring-blue-500 cursor-pointer"
                      />
                      <label
                        htmlFor="consentSms"
                        className="text-xs text-gray-500 leading-normal cursor-pointer">
                        I agree to receive communications regarding my project
                        quotation and service updates. We respect your privacy
                        and will never share your email with third parties.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1265E8] to-[#00C8F8] hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer">
                      {isSubmitting ? (
                        <>
                          <i className="fa-solid fa-circle-notch fa-spin"></i>
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-regular fa-paper-plane"></i>
                          <span>{quoteButtonText}</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: GLOBAL HUBS, MAP & ASSURANCE (5 COLS) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Global Facilities Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-lg">
                    <i className="fa-solid fa-earth-americas"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#07152F]">
                      Global Production Hubs
                    </h3>
                    <p className="text-xs text-gray-500">
                      Seamless round-the-clock operations
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {locations.map((loc) => (
                    <div
                      key={loc.id}
                      className="p-4 rounded-2xl bg-[#fafafa] border border-gray-100 hover:border-gray-300 transition-all">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#1265E8]"></span>
                        <h4 className="text-sm font-bold text-[#07152F]">
                          {loc.title}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed pl-4">
                        {loc.address}
                      </p>
                      {loc.phone && (
                        <p className="text-xs font-semibold text-[#1265E8] mt-1 pl-4">
                          Direct: {loc.phone}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Google Map Card */}
              <div className="bg-white rounded-3xl p-3 border border-gray-200 shadow-sm overflow-hidden">
                <div className="w-full h-64 rounded-2xl overflow-hidden relative">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="SmartPHOTOeditors Headquarters Location"></iframe>
                </div>
              </div>

              {/* Security & Confidentiality Badges */}
              <div className="bg-[#07152F] text-white rounded-3xl p-6 sm:p-8 shadow-md">
                <h4 className="text-base font-black text-white mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-shield-check text-[#00C8F8]"></i>
                  <span>Client Asset & Data Security</span>
                </h4>
                <div className="space-y-3.5 text-xs text-gray-300">
                  <div className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-[#00C8F8] mt-0.5 text-xs shrink-0"></i>
                    <span>
                      <strong className="text-white">
                        100% Bilateral NDA:
                      </strong>{' '}
                      All media is covered by legally binding confidentiality
                      agreements.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-[#00C8F8] mt-0.5 text-xs shrink-0"></i>
                    <span>
                      <strong className="text-white">
                        256-Bit SSL Transfer:
                      </strong>{' '}
                      Secure FTP, encrypted cloud pipelines, and automatic file
                      archiving.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-[#00C8F8] mt-0.5 text-xs shrink-0"></i>
                    <span>
                      <strong className="text-white">ISO 9001:2015 QA:</strong>{' '}
                      Strict 3-stage peer review guarantees zero defect
                      delivery.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLIENT FAQ SECTION */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#1265E8] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Clear & Transparent
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#07152F] mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Everything you need to know about starting your first project or
              free trial.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {contactFaqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#fafafa] rounded-2xl border border-gray-200 overflow-hidden transition-all hover:border-blue-300">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none">
                    <span className="font-bold text-[#07152F] text-sm md:text-base">
                      {faq.q}
                    </span>
                    <i
                      className={`fa-solid fa-chevron-down text-xs text-gray-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#1265E8]' : ''
                      }`}></i>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
