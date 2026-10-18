"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceCategory, SubServiceItem } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";

interface ServicesPageEditorProps {
  services: ServiceCategory[];
  onSaveService: (service: ServiceCategory) => Promise<void>;
  onDeleteService: (id: string) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const ServicesPageEditor: React.FC<ServicesPageEditorProps> = ({
  services,
  onSaveService,
  onDeleteService,
  showToast,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    services[0]?.id || ""
  );
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeService =
    services.find((s) => s.id === selectedServiceId) || services[0];

  const [serviceForm, setServiceForm] = useState<ServiceCategory | null>(
    activeService ? { ...activeService } : null
  );

  // Sync form when activeService changes
  React.useEffect(() => {
    if (activeService) {
      setServiceForm({ ...activeService });
    }
  }, [selectedServiceId, services]);

  const handleCreateNewService = () => {
    const newId = `service-${Date.now()}`;
    const newService: ServiceCategory = {
      id: newId,
      slug: `new-service-${Date.now()}`,
      name: "New Service Page",
      tagline: "High-precision image post-production",
      shortDesc: "Short marketing summary...",
      fullDesc: "Detailed breakdown of the editing capabilities...",
      iconClass: "fa-solid fa-wand-magic-sparkles",
      heroImage: "/images/banner-bg.webp",
      beforeSrc: "/images/services/before.webp",
      afterSrc: "/images/services/after.webp",
      beforeAlt: "Before Editing",
      afterAlt: "After Editing",
      turnaroundTime: "12-24 Hours",
      deliverables: ["High-Res JPEG", "Layered PSD"],
      keyBenefits: ["100% Quality Output", "Dedicated Senior Artists"],
      subServices: [],
    };
    setServiceForm(newService);
    setSelectedServiceId(newId);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!serviceForm) return;
    setSaving(true);
    try {
      await onSaveService(serviceForm);
      showToast(`Service '${serviceForm.name}' saved successfully!`);
    } catch (err: any) {
      showToast(err.message || "Failed to save service", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!serviceForm) return;
    if (!confirm(`Are you sure you want to permanently delete service '${serviceForm.name}'?`)) {
      return;
    }
    try {
      await onDeleteService(serviceForm.id);
      showToast("Service deleted");
      const remaining = services.filter((s) => s.id !== serviceForm.id);
      if (remaining.length > 0) {
        setSelectedServiceId(remaining[0].id);
      }
    } catch (err: any) {
      showToast(err.message || "Failed to delete service", "error");
    }
  };

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-layer-group"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">Services Pages Studio</h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-orange-100 text-[#ff5b0a] font-bold whitespace-nowrap shrink-0">
                {services.length} Dedicated Service Pages
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Select and edit any individual service page with hero graphics, before/after comparisons, and sub-services.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          {serviceForm && (
            <Link
              href={`/${serviceForm.slug}`}
              target="_blank"
              className="px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition-all shadow-sm whitespace-nowrap shrink-0"
            >
              <i className="fa-solid fa-arrow-up-right-from-square text-[#ff5b0a]"></i>
              <span>View /{serviceForm.slug}</span>
            </Link>
          )}
          <button
            type="button"
            onClick={handleCreateNewService}
            className="px-4 py-2.5 rounded-xl bg-orange-50 text-[#ff5b0a] border border-orange-200 hover:bg-orange-100 text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap shrink-0"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add Service Page</span>
          </button>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving || !serviceForm}
            className="px-5 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
            <span>{saving ? "Saving..." : "Save Service"}</span>
          </button>
        </div>
      </div>

      {/* Service Page Switcher Pills */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <i className="fa-solid fa-list-check text-[#ff5b0a]"></i>
            Select Service Page to Edit:
          </span>
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
            <input
              type="text"
              placeholder="Filter services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-xl w-56 bg-white text-slate-900 font-semibold focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 outline-none transition-all shadow-xs"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filteredServices.map((service) => {
            const isSelected = service.id === (serviceForm?.id || selectedServiceId);
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => {
                  setSelectedServiceId(service.id);
                  setServiceForm({ ...service });
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? "bg-[#1c2a5a] text-white shadow-md shadow-blue-950/20"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                <i className={`${service.iconClass || "fa-solid fa-wand-magic-sparkles"} ${isSelected ? "text-[#ff5b0a]" : "text-slate-400"} text-xs`}></i>
                <span>{service.name}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isSelected ? "bg-white/20 text-white" : "bg-slate-200/70 text-slate-600"}`}>
                  /{service.slug}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Service Editor Canvas */}
      {serviceForm ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
          {/* Active Service Banner & Meta Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xl shadow-xs">
                  <i className={serviceForm.iconClass || "fa-solid fa-wand-magic-sparkles"}></i>
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">{serviceForm.name}</h3>
                  <span className="text-xs text-slate-500 font-mono font-medium">
                    URL Endpoint: /{serviceForm.slug}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center gap-1.5">
                <i className="fa-regular fa-clock text-emerald-600"></i>
                Turnaround: {serviceForm.turnaroundTime || "12-24 Hours"}
              </span>
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <i className="fa-solid fa-trash-can"></i> Delete Service
              </button>
            </div>
          </div>

          {/* Section 1: Basic Service Information */}
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs font-bold">1</span>
              <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">
                General Page Information
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Service Display Name</label>
                <input
                  type="text"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  placeholder="Portrait Photo Retouching"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">URL Route Slug</label>
                <input
                  type="text"
                  value={serviceForm.slug}
                  onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold font-mono border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  placeholder="portrait"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Turnaround Time</label>
                <input
                  type="text"
                  value={serviceForm.turnaroundTime}
                  onChange={(e) => setServiceForm({ ...serviceForm, turnaroundTime: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  placeholder="12-24 Hours"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Marketing Tagline</label>
                <input
                  type="text"
                  value={serviceForm.tagline}
                  onChange={(e) => setServiceForm({ ...serviceForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  placeholder="Scalable, studio-quality portrait retouching..."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">FontAwesome Icon Class</label>
                <input
                  type="text"
                  value={serviceForm.iconClass}
                  onChange={(e) => setServiceForm({ ...serviceForm, iconClass: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold font-mono border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  placeholder="fa-solid fa-user-tie"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Short Preview Description</label>
              <textarea
                rows={2}
                value={serviceForm.shortDesc}
                onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
                placeholder="Brief summary used in catalog cards..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Full Service Description</label>
              <textarea
                rows={4}
                value={serviceForm.fullDesc}
                onChange={(e) => setServiceForm({ ...serviceForm, fullDesc: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
                placeholder="In-depth explanation of process, software, and outcomes..."
              />
            </div>
          </div>

          {/* Section 2: Hero Banner Image */}
          <div className="space-y-4 text-xs border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs font-bold">2</span>
              <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">
                Hero Banner Graphic
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-5 w-full aspect-video min-h-[140px] max-h-56 bg-slate-900 rounded-2xl overflow-hidden border border-slate-300 flex items-center justify-center p-2 shadow-inner">
                {serviceForm.heroImage ? (
                  <img
                    src={serviceForm.heroImage}
                    alt="Hero preview"
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                ) : (
                  <span className="text-slate-400 font-medium">No Image Set</span>
                )}
              </div>
              <div className="sm:col-span-7 space-y-3.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <i className="fa-regular fa-image text-[#ff5b0a]"></i>
                    Hero Image URL
                  </label>
                  <ImageUploadButton
                    folder="services"
                    label="Upload Banner"
                    currentValue={serviceForm.heroImage}
                    onUploadSuccess={(url) => {
                      setServiceForm({ ...serviceForm, heroImage: url });
                      showToast("Hero banner uploaded!");
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={serviceForm.heroImage}
                  onChange={(e) => setServiceForm({ ...serviceForm, heroImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  placeholder="/images/services/banner.webp"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Interactive Before / After Comparison */}
          <div className="space-y-4 text-xs border-t border-slate-100 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs font-bold">3</span>
                <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">
                  Before / After Interactive Slider Images
                </h4>
              </div>
              <span className="text-slate-500 text-[11px] font-medium hidden sm:inline">
                Displayed in the interactive comparison widget on this service page
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before Image */}
              <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/70 space-y-3.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-800 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Before Editing Image
                  </span>
                  <ImageUploadButton
                    folder="services"
                    label="Upload Before"
                    currentValue={serviceForm.beforeSrc}
                    onUploadSuccess={(url) => {
                      setServiceForm({ ...serviceForm, beforeSrc: url });
                      showToast("Before image uploaded!");
                    }}
                  />
                </div>
                <div className="w-full aspect-video min-h-[140px] max-h-52 bg-slate-900 border border-slate-300 rounded-xl overflow-hidden flex items-center justify-center p-2 shadow-inner">
                  {serviceForm.beforeSrc ? (
                    <img src={serviceForm.beforeSrc} alt="Before" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-slate-400 font-medium">No Before Image</span>
                  )}
                </div>
                <input
                  type="text"
                  value={serviceForm.beforeSrc}
                  onChange={(e) => setServiceForm({ ...serviceForm, beforeSrc: e.target.value })}
                  className="w-full px-3 py-2 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  placeholder="Before image URL"
                />
              </div>

              {/* After Image */}
              <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/70 space-y-3.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-800 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> After Editing Image
                  </span>
                  <ImageUploadButton
                    folder="services"
                    label="Upload After"
                    currentValue={serviceForm.afterSrc}
                    onUploadSuccess={(url) => {
                      setServiceForm({ ...serviceForm, afterSrc: url });
                      showToast("After image uploaded!");
                    }}
                  />
                </div>
                <div className="w-full aspect-video min-h-[140px] max-h-52 bg-slate-900 border border-slate-300 rounded-xl overflow-hidden flex items-center justify-center p-2 shadow-inner">
                  {serviceForm.afterSrc ? (
                    <img src={serviceForm.afterSrc} alt="After" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-slate-400 font-medium">No After Image</span>
                  )}
                </div>
                <input
                  type="text"
                  value={serviceForm.afterSrc}
                  onChange={(e) => setServiceForm({ ...serviceForm, afterSrc: e.target.value })}
                  className="w-full px-3 py-2 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  placeholder="After image URL"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Sub-Services Included */}
          <div className="space-y-4 text-xs border-t border-slate-100 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs font-bold">4</span>
                  <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">
                    Sub-Services & Specialized Tasks ({serviceForm.subServices?.length || 0})
                  </h4>
                </div>
                <p className="text-slate-500 mt-1">
                  Sub-categories offered under this service (e.g. Skin Retouching, Hair Masking, Sky Replacement).
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newItem: SubServiceItem = {
                    id: `sub-${Date.now()}`,
                    name: "New Sub-Service",
                    description: "Specific task description and editing techniques...",
                    link: `/${serviceForm.slug}`,
                  };
                  setServiceForm({
                    ...serviceForm,
                    subServices: [...(serviceForm.subServices || []), newItem],
                  });
                }}
                className="px-4 py-2 rounded-xl bg-orange-50 text-[#ff5b0a] border border-orange-200 hover:bg-orange-100 font-bold flex items-center gap-1.5 transition-all self-start"
              >
                <i className="fa-solid fa-plus"></i> Add Sub-Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceForm.subServices?.map((sub, idx) => (
                <div key={sub.id || idx} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/70 hover:border-orange-300 hover:bg-slate-50 transition-all space-y-3.5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                    <span className="font-extrabold text-slate-900">#{idx + 1} {sub.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setServiceForm({
                          ...serviceForm,
                          subServices: serviceForm.subServices.filter((_, i) => i !== idx),
                        })
                      }
                      className="text-red-500 hover:text-red-700 font-bold flex items-center gap-1"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Name</label>
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => {
                        const updated = [...serviceForm.subServices];
                        updated[idx].name = e.target.value;
                        setServiceForm({ ...serviceForm, subServices: updated });
                      }}
                      className="w-full px-3 py-2 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Description</label>
                    <textarea
                      rows={2}
                      value={sub.description}
                      onChange={(e) => {
                        const updated = [...serviceForm.subServices];
                        updated[idx].description = e.target.value;
                        setServiceForm({ ...serviceForm, subServices: updated });
                      }}
                      className="w-full px-3 py-2 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Deep Link</label>
                    <input
                      type="text"
                      value={sub.link}
                      onChange={(e) => {
                        const updated = [...serviceForm.subServices];
                        updated[idx].link = e.target.value;
                        setServiceForm({ ...serviceForm, subServices: updated });
                      }}
                      className="w-full px-3 py-2 bg-white text-slate-900 font-bold font-mono text-xs border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Deliverables & Key Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-6 text-xs">
            {/* Deliverables */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs font-bold">5</span>
                <label className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">
                  Deliverables (Comma-Separated)
                </label>
              </div>
              <textarea
                rows={3}
                value={serviceForm.deliverables?.join(", ") || ""}
                onChange={(e) =>
                  setServiceForm({
                    ...serviceForm,
                    deliverables: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                placeholder="High-Res JPEG, Layered PSD, TIFF, Transparent PNG"
              />
              <div className="flex flex-wrap gap-1.5">
                {serviceForm.deliverables?.map((d, i) => (
                  <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-bold text-[11px]">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs font-bold">6</span>
                <label className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">
                  Key Benefits (Comma-Separated)
                </label>
              </div>
              <textarea
                rows={3}
                value={serviceForm.keyBenefits?.join(", ") || ""}
                onChange={(e) =>
                  setServiceForm({
                    ...serviceForm,
                    keyBenefits: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                placeholder="100% Quality Output, 12h Express Delivery, Unlimited Revisions"
              />
              <div className="flex flex-wrap gap-1.5">
                {serviceForm.keyBenefits?.map((b, i) => (
                  <span key={i} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-bold text-[11px]">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Save Bar */}
          <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <i className="fa-solid fa-circle-info text-[#ff5b0a]"></i>
              <span>Saving updates /{serviceForm.slug} in the database live.</span>
            </div>
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5b0a] to-orange-500 hover:from-[#e04f05] hover:to-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
              <span>{saving ? "Saving Changes..." : `Save ${serviceForm.name}`}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400">
          <p>No service selected. Click Add Service Page above.</p>
        </div>
      )}
    </div>
  );
};
