"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GalleryTab, GalleryItem } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";

interface GalleryPageEditorProps {
  galleryTabs: GalleryTab[];
  onSaveTab: (tab: GalleryTab) => Promise<void>;
  onDeleteTab: (id: string) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const GalleryPageEditor: React.FC<GalleryPageEditorProps> = ({
  galleryTabs,
  onSaveTab,
  onDeleteTab,
  showToast,
}) => {
  const [selectedTabId, setSelectedTabId] = useState<string>(
    galleryTabs[0]?.id || ""
  );
  const [saving, setSaving] = useState(false);

  const activeTab =
    galleryTabs.find((t) => t.id === selectedTabId) || galleryTabs[0];

  const [tabForm, setTabForm] = useState<GalleryTab | null>(
    activeTab ? { ...activeTab } : null
  );

  React.useEffect(() => {
    if (activeTab) {
      setTabForm({ ...activeTab });
    }
  }, [selectedTabId, galleryTabs]);

  const handleAddNewTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab: GalleryTab = {
      id: newId,
      name: "New Gallery Category",
      items: [
        {
          id: `item-${Date.now()}`,
          title: "Comparison Sample",
          beforeSrc: "/images/gallery/sample-before.webp",
          beforeAlt: "Before",
          afterSrc: "/images/gallery/sample-after.webp",
          afterAlt: "After",
        },
      ],
    };
    setTabForm(newTab);
    setSelectedTabId(newId);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!tabForm) return;
    setSaving(true);
    try {
      await onSaveTab(tabForm);
      showToast(`Gallery Tab '${tabForm.name}' saved successfully!`);
    } catch (err: any) {
      showToast(err.message || "Failed to save gallery tab", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!tabForm) return;
    if (!confirm(`Delete gallery category '${tabForm.name}' and all its comparison photos?`)) {
      return;
    }
    try {
      await onDeleteTab(tabForm.id);
      showToast("Gallery category removed");
      const remaining = galleryTabs.filter((t) => t.id !== tabForm.id);
      if (remaining.length > 0) {
        setSelectedTabId(remaining[0].id);
      }
    } catch (err: any) {
      showToast(err.message || "Failed to delete tab", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-images"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">Sample Images Studio</h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 font-bold whitespace-nowrap shrink-0">
                Route: /sample-images
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Manage category tabs and interactive before/after photo comparisons.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            href="/sample-images"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[#ff5b0a]"></i>
            <span>View Live Gallery</span>
          </Link>
          <button
            type="button"
            onClick={handleAddNewTab}
            className="px-4 py-2.5 rounded-xl bg-orange-50 text-[#ff5b0a] border border-orange-200 hover:bg-orange-100 text-xs font-bold flex items-center gap-2 whitespace-nowrap shrink-0 transition-all"
          >
            <i className="fa-solid fa-plus"></i> Add Category
          </button>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving || !tabForm}
            className="px-5 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
            <span>{saving ? "Saving..." : "Save Gallery Tab"}</span>
          </button>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {galleryTabs.map((tab) => {
          const isSelected = tab.id === (tabForm?.id || selectedTabId);
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setSelectedTabId(tab.id);
                setTabForm({ ...tab });
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap shrink-0 transition-all ${
                isSelected
                  ? "bg-[#1c2a5a] text-white shadow-md shadow-blue-950/20"
                  : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm"
              }`}
            >
              <i className={`fa-solid fa-folder-open ${isSelected ? "text-[#ff5b0a]" : "text-slate-400"}`}></i>
              <span>{tab.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                {tab.items?.length || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Form */}
      {tabForm ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex-1 max-w-md">
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                <i className="fa-solid fa-tag text-[#ff5b0a] mr-1.5"></i>
                Category Tab Display Name
              </label>
              <input
                type="text"
                value={tabForm.name}
                onChange={(e) => setTabForm({ ...tabForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold text-sm border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                placeholder="Category Name"
              />
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  const newItem: GalleryItem = {
                    id: `item-${Date.now()}`,
                    title: "New Comparison Pair",
                    beforeSrc: "",
                    beforeAlt: "Before",
                    afterSrc: "",
                    afterAlt: "After",
                  };
                  setTabForm({
                    ...tabForm,
                    items: [...(tabForm.items || []), newItem],
                  });
                }}
                className="px-4 py-2.5 rounded-xl bg-orange-50 text-[#ff5b0a] border border-orange-200 hover:bg-orange-100 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <i className="fa-solid fa-plus"></i> Add Comparison Pair
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-3.5 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 rounded-xl transition-all"
              >
                <i className="fa-solid fa-trash-can mr-1"></i> Delete Tab
              </button>
            </div>
          </div>

          {/* Items Grid */}
          <div className="space-y-6">
            {tabForm.items?.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-5 sm:p-6 border border-slate-200 rounded-2xl bg-slate-50/70 hover:border-orange-300 hover:bg-slate-50 transition-all space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-pink-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...tabForm.items];
                        updated[idx].title = e.target.value;
                        setTabForm({ ...tabForm, items: updated });
                      }}
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 w-72 focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                      placeholder="Comparison Title"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setTabForm({
                        ...tabForm,
                        items: tabForm.items.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <i className="fa-solid fa-trash-can"></i> Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  {/* Before */}
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-800 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Before Editing
                      </span>
                      <ImageUploadButton
                        folder="gallery"
                        label="Upload"
                        currentValue={item.beforeSrc}
                        onUploadSuccess={(url) => {
                          const updated = [...tabForm.items];
                          updated[idx].beforeSrc = url;
                          setTabForm({ ...tabForm, items: updated });
                        }}
                      />
                    </div>
                    <div className="w-full aspect-video min-h-[140px] max-h-52 bg-slate-900 border border-slate-300 rounded-xl overflow-hidden flex items-center justify-center p-2 shadow-inner">
                      {item.beforeSrc ? (
                        <img src={item.beforeSrc} alt="Before" className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-slate-400 font-medium">No Image</span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={item.beforeSrc}
                      onChange={(e) => {
                        const updated = [...tabForm.items];
                        updated[idx].beforeSrc = e.target.value;
                        setTabForm({ ...tabForm, items: updated });
                      }}
                      className="w-full px-3 py-2 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                      placeholder="Before Image URL"
                    />
                  </div>

                  {/* After */}
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-800 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> After Editing
                      </span>
                      <ImageUploadButton
                        folder="gallery"
                        label="Upload"
                        currentValue={item.afterSrc}
                        onUploadSuccess={(url) => {
                          const updated = [...tabForm.items];
                          updated[idx].afterSrc = url;
                          setTabForm({ ...tabForm, items: updated });
                        }}
                      />
                    </div>
                    <div className="w-full aspect-video min-h-[140px] max-h-52 bg-slate-900 border border-slate-300 rounded-xl overflow-hidden flex items-center justify-center p-2 shadow-inner">
                      {item.afterSrc ? (
                        <img src={item.afterSrc} alt="After" className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-slate-400 font-medium">No Image</span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={item.afterSrc}
                      onChange={(e) => {
                        const updated = [...tabForm.items];
                        updated[idx].afterSrc = e.target.value;
                        setTabForm({ ...tabForm, items: updated });
                      }}
                      className="w-full px-3 py-2 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                      placeholder="After Image URL"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Save Bar */}
          <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <i className="fa-solid fa-circle-info text-[#ff5b0a]"></i>
              <span>Save updates to publish this gallery category live.</span>
            </div>
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5b0a] to-orange-500 hover:from-[#e04f05] hover:to-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
              <span>{saving ? "Saving Changes..." : `Save ${tabForm.name}`}</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
