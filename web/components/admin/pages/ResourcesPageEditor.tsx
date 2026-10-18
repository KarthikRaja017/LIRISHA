"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ResourceArticle } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";

interface ResourcesPageEditorProps {
  resources: ResourceArticle[];
  onSaveResource: (item: ResourceArticle) => Promise<void>;
  onDeleteResource: (id: string) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const ResourcesPageEditor: React.FC<ResourcesPageEditorProps> = ({
  resources,
  onSaveResource,
  onDeleteResource,
  showToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState<ResourceArticle | null>(null);
  const [saving, setSaving] = useState(false);

  const categories = ["All", "Case Studies", "Articles", "Blog", "Guides"];

  const handleCreateNew = () => {
    setEditingItem({
      id: `resource-${Date.now()}`,
      slug: `article-${Date.now()}`,
      category: selectedCategory === "All" ? "Case Studies" : selectedCategory,
      title: "New Case Study / Article Headline",
      excerpt: "Executive overview and operational challenges solved...",
      content: "Comprehensive case study walkthrough and deliverables...",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      author: "SPE Editorial Team",
      readTime: "5 min read",
      image: "/images/resources/sample.webp",
      link: "/case-study",
      tags: ["Editing", "Case Study"],
      metrics: [
        { label: "Turnaround Time", value: "12 Hours" },
        { label: "Accuracy Rate", value: "99.8%" },
      ],
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    try {
      await onSaveResource(editingItem);
      showToast(`Article '${editingItem.title}' saved successfully!`);
      setEditingItem(null);
    } catch (err: any) {
      showToast(err.message || "Failed to save article", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource post?")) return;
    try {
      await onDeleteResource(id);
      showToast("Post deleted");
    } catch (err: any) {
      showToast(err.message || "Failed to delete resource", "error");
    }
  };

  const filtered = resources.filter((item) => {
    const matchesCat =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-newspaper"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">Case Studies & Articles Studio</h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold whitespace-nowrap shrink-0">
                Route: /case-study ({resources.length} Published)
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Control case study outcomes, client results, blog articles, and technical photography guides.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            href="/case-study"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[#ff5b0a]"></i>
            <span>View Case Studies</span>
          </Link>
          <button
            type="button"
            onClick={handleCreateNew}
            className="px-5 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all whitespace-nowrap shrink-0"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add New Post</span>
          </button>
        </div>
      </div>

      {/* Categories & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? "bg-[#1c2a5a] text-white shadow-md shadow-blue-950/20"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-72">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-2.5 text-slate-400 text-xs"></i>
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 hover:bg-white focus:bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 outline-none transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-44 bg-slate-900 overflow-hidden relative">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-xs">
                    No Featured Image
                  </div>
                )}
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#1c2a5a]/85 backdrop-blur-md text-white text-[10px] font-bold rounded-lg shadow-sm">
                  {item.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[10px] text-slate-400 font-mono font-medium">/{item.slug}</span>
                <h3 className="font-extrabold text-slate-900 text-sm line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 font-normal line-clamp-2 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-medium">
                {item.date} • {item.readTime}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setEditingItem({ ...item })}
                  className="px-3 py-1 text-xs bg-slate-200/80 hover:bg-[#ff5b0a] hover:text-white text-slate-700 rounded-lg transition-colors font-bold"
                >
                  Edit Post
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

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-newspaper text-[#ff5b0a]"></i>
                {resources.some((r) => r.id === editingItem.id) ? "Edit Resource Post" : "Create New Post"}
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
                <label className="block font-bold text-slate-800 mb-1.5">Article Headline Title</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">URL Route Slug</label>
                  <input
                    type="text"
                    value={editingItem.slug}
                    onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold font-mono text-[11px] border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  >
                    <option value="Case Studies">Case Studies</option>
                    <option value="Articles">Articles</option>
                    <option value="Blog">Blog</option>
                    <option value="Guides">Guides</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Short Excerpt / Summary</label>
                <textarea
                  rows={2}
                  value={editingItem.excerpt}
                  onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Full Article / Case Study Content</label>
                <textarea
                  rows={6}
                  value={editingItem.content || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-mono text-xs border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
                  placeholder="Detailed markdown or HTML article content..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <i className="fa-regular fa-image text-[#ff5b0a]"></i>
                    Featured Image URL
                  </label>
                  <ImageUploadButton
                    folder="resources"
                    label="Upload Image"
                    currentValue={editingItem.image}
                    onUploadSuccess={(url) => {
                      setEditingItem({ ...editingItem, image: url });
                      showToast("Featured image uploaded!");
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={editingItem.image}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">Author</label>
                  <input
                    type="text"
                    value={editingItem.author}
                    onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                    className="w-full px-3 py-2 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">Read Time</label>
                  <input
                    type="text"
                    value={editingItem.readTime}
                    onChange={(e) => setEditingItem({ ...editingItem, readTime: e.target.value })}
                    className="w-full px-3 py-2 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1.5">Date Published</label>
                  <input
                    type="text"
                    value={editingItem.date}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    className="w-full px-3 py-2 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  />
                </div>
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
                  {saving ? "Saving..." : "Save Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
