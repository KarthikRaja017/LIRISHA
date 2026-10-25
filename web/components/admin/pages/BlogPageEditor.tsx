"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ResourceArticle } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";

interface BlogPageEditorProps {
  resources: ResourceArticle[];
  onSaveResource: (item: ResourceArticle) => Promise<void>;
  onDeleteResource: (id: string) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const BlogPageEditor: React.FC<BlogPageEditorProps> = ({
  resources,
  onSaveResource,
  onDeleteResource,
  showToast,
}) => {
  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState<ResourceArticle | null>(null);
  const [saving, setSaving] = useState(false);

  // Filter only Blog posts
  const blogPosts = resources.filter(
    (item) => item.category === "Blog" || item.category === "blog"
  );

  const filtered = blogPosts.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(q))) ||
      (item.author && item.author.toLowerCase().includes(q))
    );
  });

  const handleCreateNew = () => {
    const now = Date.now();
    const defaultSlug = `new-blog-post-${now}`;
    setEditingItem({
      id: `blog-${now}`,
      slug: defaultSlug,
      category: "Blog",
      title: "New Blog Post Headline",
      excerpt: "A concise overview summarizing the core takeaways of this article...",
      content: `In this post, we explore best practices, modern techniques, and industry workflows.

Post-production image editing continues to transform visual commerce. Discover how automated enhancements alongside skilled manual retouching elevate catalog quality.

Key Takeaways:
- Maintain strict color fidelity across all digital channels
- Utilize non-destructive layers in editing suites
- Standardize turnaround workflows for high volume`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      author: "LIRISHA Editorial Team",
      readTime: "5 min read",
      image: "/images/about/professionals-1.webp",
      link: `/blog/${defaultSlug}`,
      tags: ["Photo Editing", "Photography Tips", "Industry Trends"],
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    try {
      // Ensure slug and link are synchronized
      const cleanSlug = editingItem.slug.trim().toLowerCase().replace(/^\/+/, "").replace(/\.php$/i, "");
      const payload: ResourceArticle = {
        ...editingItem,
        slug: cleanSlug,
        category: "Blog",
        link: `/blog/${cleanSlug}`,
      };

      await onSaveResource(payload);
      showToast(`Blog post '${payload.title}' saved successfully!`);
      setEditingItem(null);
    } catch (err: any) {
      showToast(err.message || "Failed to save blog post", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete the blog post:\n"${title}"?`)) {
      return;
    }
    try {
      await onDeleteResource(id);
      showToast("Blog post deleted successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to delete blog post", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-blog"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">
                Blog Posts Studio
              </h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1265E8] font-bold whitespace-nowrap shrink-0">
                Route: /blog ({blogPosts.length} Published)
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Create, edit, format content, update featured images, and manage all articles published on your /blog feed.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            href="/blog"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            <span>View Public /blog</span>
          </Link>
          <button
            type="button"
            onClick={handleCreateNew}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1265E8] to-[#00C8F8] hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all whitespace-nowrap shrink-0"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Create New Blog Post</span>
          </button>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
          <input
            type="text"
            placeholder="Search by title, excerpt, tag, author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 hover:bg-white focus:bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/15 outline-none transition-all"
          />
        </div>
        <div className="text-xs font-bold text-gray-500 self-end sm:self-auto">
          Showing {filtered.length} of {blogPosts.length} blog posts
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-gray-300 space-y-3">
          <i className="fa-solid fa-pen-nib text-gray-300 text-4xl"></i>
          <h3 className="text-gray-700 font-bold text-base">No blog posts found</h3>
          <p className="text-gray-400 text-xs max-w-sm mx-auto">
            {search ? `No articles matching "${search}"` : "You haven't created any blog posts yet."}
          </p>
          <button
            type="button"
            onClick={handleCreateNew}
            className="px-4 py-2 rounded-xl bg-[#1265E8] text-white font-bold text-xs shadow-md hover:bg-blue-700 inline-flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Create Your First Blog Post</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="h-48 bg-slate-900 overflow-hidden relative">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-xs">
                      No Image Provided
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#07152F]/90 backdrop-blur-md text-[#00C8F8] text-[10px] font-bold rounded-lg shadow-sm border border-cyan-500/30">
                    Blog Post
                  </span>
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-medium rounded">
                    {item.readTime || "5 min read"}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span className="font-semibold text-gray-700">
                      <i className="fa-regular fa-user mr-1 text-[#1265E8]"></i>
                      {item.author || "Editorial"}
                    </span>
                    <span>
                      <i className="fa-regular fa-calendar mr-1 text-gray-400"></i>
                      {item.date}
                    </span>
                  </div>

                  <span className="inline-block text-[10px] text-gray-400 font-mono">
                    /blog/{item.slug}
                  </span>

                  <h3 className="font-extrabold text-gray-900 text-sm line-clamp-2 leading-snug group-hover:text-[#1265E8] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-blue-50 text-[#1265E8] px-2 py-0.5 rounded font-semibold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-gray-100 bg-slate-50/70 flex items-center justify-between gap-2">
                <Link
                  href={`/blog/${item.slug}`}
                  target="_blank"
                  className="text-xs text-[#1265E8] hover:underline font-bold inline-flex items-center gap-1"
                  title="Open live post in new tab"
                >
                  <span>Preview</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </Link>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...item })}
                    className="px-3.5 py-1.5 text-xs bg-[#1265E8] hover:bg-blue-700 text-white rounded-xl transition-all font-bold shadow-sm inline-flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-pen-to-square text-[10px]"></i>
                    <span>Edit Post</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title)}
                    className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-700 rounded-xl text-xs transition-colors"
                    title="Delete post"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Edit / Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1265E8] flex items-center justify-center text-lg">
                  <i className="fa-solid fa-newspaper"></i>
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">
                    {resources.some((r) => r.id === editingItem.id) ? "Edit Blog Post" : "Create New Blog Post"}
                  </h3>
                  <span className="text-[11px] text-gray-500 font-mono">
                    Live Route: /blog/{editingItem.slug}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              {/* Title */}
              <div>
                <label className="block font-bold text-gray-800 mb-1.5">
                  Blog Headline / Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const updates: any = { title };
                    // If creating new post, automatically suggest slug from title
                    if (!resources.some((r) => r.id === editingItem.id)) {
                      updates.slug = title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)+/g, "");
                    }
                    setEditingItem({ ...editingItem, ...updates });
                  }}
                  className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-bold border border-gray-300 rounded-xl focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/15 shadow-sm outline-none transition-all text-sm"
                  placeholder="e.g. 5 Real Estate Photography Mistakes..."
                  required
                />
              </div>

              {/* Slug & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-800 mb-1.5">
                    URL Slug Identifier <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center bg-slate-50 border border-gray-300 rounded-xl px-3 focus-within:border-[#1265E8] focus-within:ring-4 focus-within:ring-blue-500/15">
                    <span className="text-gray-400 font-mono text-[11px] shrink-0">/blog/</span>
                    <input
                      type="text"
                      value={editingItem.slug}
                      onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                      className="w-full py-2.5 px-1 bg-transparent text-gray-900 font-mono text-[11px] font-bold outline-none"
                      placeholder="post-slug-identifier"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-800 mb-1.5">
                    Category (Preset to Blog)
                  </label>
                  <input
                    type="text"
                    value={editingItem.category}
                    disabled
                    className="w-full px-3.5 py-2.5 bg-gray-100 text-gray-600 font-bold border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Short Excerpt */}
              <div>
                <label className="block font-bold text-gray-800 mb-1.5">
                  Short Excerpt / Teaser Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={editingItem.excerpt}
                  onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/15 shadow-sm outline-none leading-relaxed transition-all"
                  placeholder="Summary displayed on blog cards and search engines..."
                  required
                />
              </div>

              {/* Full Blog Content */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-800">
                    Full Blog Post Body Content <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-gray-400 font-medium">
                    Supports multiline text, paragraphs, and markdown
                  </span>
                </div>
                <textarea
                  rows={10}
                  value={editingItem.content || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-sans text-xs border border-gray-300 rounded-xl focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/15 shadow-sm outline-none leading-relaxed transition-all"
                  placeholder="Write or paste your full blog post content here. Separate paragraphs with blank lines..."
                  required
                />
              </div>

              {/* Featured Image */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-800 flex items-center gap-1.5">
                    <i className="fa-regular fa-image text-[#1265E8]"></i>
                    Featured Image URL
                  </label>
                  <ImageUploadButton
                    folder="blog"
                    label="Upload Image"
                    currentValue={editingItem.image}
                    onUploadSuccess={(url) => {
                      setEditingItem({ ...editingItem, image: url });
                      showToast("Featured blog image uploaded!");
                    }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 bg-white text-gray-900 font-mono text-[11px] border border-gray-300 rounded-xl focus:border-[#1265E8] shadow-sm outline-none"
                    placeholder="/images/resources/sample.webp"
                    required
                  />
                  {editingItem.image && (
                    <div className="w-12 h-10 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 shrink-0">
                      <img src={editingItem.image} alt="Thumb" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Author, Date, ReadTime */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-800 mb-1.5">Author</label>
                  <input
                    type="text"
                    value={editingItem.author}
                    onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                    className="w-full px-3 py-2 bg-white text-gray-900 font-semibold border border-gray-300 rounded-xl focus:border-[#1265E8] shadow-sm outline-none"
                    placeholder="e.g. LIRISHA Studio"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-800 mb-1.5">Read Time</label>
                  <input
                    type="text"
                    value={editingItem.readTime}
                    onChange={(e) => setEditingItem({ ...editingItem, readTime: e.target.value })}
                    className="w-full px-3 py-2 bg-white text-gray-900 font-semibold border border-gray-300 rounded-xl focus:border-[#1265E8] shadow-sm outline-none"
                    placeholder="e.g. 5 min read"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-800 mb-1.5">Date Published</label>
                  <input
                    type="text"
                    value={editingItem.date}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    className="w-full px-3 py-2 bg-white text-gray-900 font-semibold border border-gray-300 rounded-xl focus:border-[#1265E8] shadow-sm outline-none"
                    placeholder="e.g. Oct 22, 2026"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block font-bold text-gray-800 mb-1.5">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={editingItem.tags ? editingItem.tags.join(", ") : ""}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] shadow-sm outline-none"
                  placeholder="e.g. AI Editing, Retouching, E-Commerce, Photoshop"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 font-bold text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#1265E8] to-[#00C8F8] hover:from-blue-700 hover:to-cyan-600 text-white font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                >
                  <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-check"}`}></i>
                  <span>{saving ? "Saving Post..." : "Save Blog Post"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
