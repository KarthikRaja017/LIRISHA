"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TestimonialItem } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";

interface TestimonialsPageEditorProps {
  testimonials: TestimonialItem[];
  onSaveTestimonial: (item: TestimonialItem) => Promise<void>;
  onDeleteTestimonial: (id: string) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const TestimonialsPageEditor: React.FC<TestimonialsPageEditorProps> = ({
  testimonials,
  onSaveTestimonial,
  onDeleteTestimonial,
  showToast,
}) => {
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const handleCreateNew = () => {
    setEditingItem({
      id: `test-${Date.now()}`,
      quote: "Outstanding image turnaround time and meticulous attention to detail.",
      author: "Jane Doe",
      role: "Studio Director",
      company: "Apex Media Group",
      location: "London, UK",
      avatar: "/images/testimonials/avatar-1.webp",
      rating: 5,
      projectType: "Portrait Retouching",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    try {
      await onSaveTestimonial(editingItem);
      showToast("Testimonial saved successfully!");
      setEditingItem(null);
    } catch (err: any) {
      showToast(err.message || "Failed to save testimonial", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial review?")) return;
    try {
      await onDeleteTestimonial(id);
      showToast("Testimonial removed");
    } catch (err: any) {
      showToast(err.message || "Failed to delete testimonial", "error");
    }
  };

  const filtered = testimonials.filter(
    (t) =>
      t.author.toLowerCase().includes(search.toLowerCase()) ||
      t.company.toLowerCase().includes(search.toLowerCase()) ||
      t.quote.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-comments"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">Testimonials Page Studio</h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold whitespace-nowrap shrink-0">
                Route: /testimonials ({testimonials.length} Reviews)
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Control verified client quotes, photographer reviews, ratings, and avatar portraits.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            href="/testimonials"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[#ff5b0a]"></i>
            <span>View Live Page</span>
          </Link>
          <button
            type="button"
            onClick={handleCreateNew}
            className="px-5 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all whitespace-nowrap shrink-0"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add New Review</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-slate-400 text-xs"></i>
          <input
            type="text"
            placeholder="Search reviews by client, company, or quote..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 hover:bg-white focus:bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 outline-none transition-all shadow-xs"
          />
        </div>
        <span className="text-xs font-semibold text-slate-500">Showing {filtered.length} of {testimonials.length} reviews</span>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
                <span className="text-[11px] bg-orange-50 border border-orange-200 text-[#ff5b0a] px-2.5 py-0.5 rounded-full font-bold">
                  {item.projectType}
                </span>
              </div>

              <p className="text-xs text-slate-700 font-medium italic line-clamp-3 leading-relaxed">
                "{item.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shadow-xs flex-shrink-0">
                  {item.avatar ? (
                    <img src={item.avatar} alt={item.author} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-black">
                      {item.author.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="truncate">
                  <h4 className="font-extrabold text-slate-900 text-xs truncate">{item.author}</h4>
                  <p className="text-[10px] text-slate-500 font-medium truncate">
                    {item.role} {item.company ? `• ${item.company}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingItem({ ...item })}
                  className="px-3 py-1 text-xs font-bold bg-slate-100 hover:bg-[#ff5b0a] text-slate-700 hover:text-white rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="w-7 h-7 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg text-xs transition-colors"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Editor */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-comment-dots text-[#ff5b0a]"></i>
                {testimonials.some((t) => t.id === editingItem.id) ? "Edit Testimonial" : "New Client Review"}
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Client Review Quote</label>
                <textarea
                  rows={4}
                  value={editingItem.quote}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
                  placeholder="Detailed client testimonial..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">Client Name</label>
                  <input
                    type="text"
                    value={editingItem.author}
                    onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">Role / Designation</label>
                  <input
                    type="text"
                    value={editingItem.role}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={editingItem.company}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">Location</label>
                  <input
                    type="text"
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">Rating (1 to 5 Stars)</label>
                  <select
                    value={editingItem.rating}
                    onChange={(e) => setEditingItem({ ...editingItem, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{r} Stars</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">Project Type</label>
                  <input
                    type="text"
                    value={editingItem.projectType}
                    onChange={(e) => setEditingItem({ ...editingItem, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                    placeholder="Real Estate HDR"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <i className="fa-regular fa-image text-[#ff5b0a]"></i>
                    Client Avatar Image
                  </label>
                  <ImageUploadButton
                    folder="testimonials"
                    label="Upload Avatar"
                    currentValue={editingItem.avatar}
                    onUploadSuccess={(url) => {
                      setEditingItem({ ...editingItem, avatar: url });
                      showToast("Avatar image uploaded!");
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={editingItem.avatar}
                  onChange={(e) => setEditingItem({ ...editingItem, avatar: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  placeholder="/images/testimonials/avatar.webp"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 font-bold text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5b0a] to-orange-500 hover:from-[#e04f05] hover:to-orange-600 text-white font-bold shadow-md shadow-orange-500/20 transition-all"
                >
                  {saving ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
