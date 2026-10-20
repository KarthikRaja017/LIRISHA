"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { dropboxService } from "../services/dropbox.service";
import { DropboxBrowseResult, DropboxFile, DropboxSubfolder } from "../types/dropbox.types";

interface DropboxExplorerProps {
  initialPath?: string;
  title?: string;
  subtitle?: string;
}

export function DropboxExplorer({
  initialPath = "",
  title = "Dropbox Cloud Storage Explorer",
  subtitle = "Browse, preview, and upload photos and files directly from your Dropbox account.",
}: DropboxExplorerProps) {
  const [currentPath, setCurrentPath] = useState<string>(initialPath);
  const [data, setData] = useState<DropboxBrowseResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Upload state
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preview / Lightbox state
  const [previewFile, setPreviewFile] = useState<DropboxFile | null>(null);

  // New folder state
  const [creatingFolder, setCreatingFolder] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [showNewFolderModal, setShowNewFolderModal] = useState<boolean>(false);

  // Load contents of current folder
  const loadFolder = useCallback(async (path: string, refresh = false) => {
    setLoading(true);
    setError(null);
    setUploadSuccess(null);
    try {
      const res = await dropboxService.browse(path, refresh);
      setData(res);
      setCurrentPath(res.current_path === "/" ? "" : res.current_path);
    } catch (err: any) {
      console.error("Dropbox browse failed:", err);
      setError(err?.message || "Failed to fetch files from Dropbox");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFolder(initialPath);
  }, [initialPath, loadFolder]);

  // Navigate to folder
  const handleOpenFolder = (folderPath: string) => {
    loadFolder(folderPath);
  };

  // Navigate to parent
  const handleGoUp = () => {
    if (data?.parent_path !== undefined) {
      loadFolder(data.parent_path || "");
    }
  };

  // Upload handler
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    setUploadSuccess(null);

    const uploadTarget = currentPath || "";
    let uploadedCount = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadStatus(`Uploading ${file.name} (${formatSize(file.size)}) [${i + 1}/${files.length}]...`);
        await dropboxService.upload(file, uploadTarget);
        uploadedCount++;
      }
      setUploadSuccess(`Successfully uploaded ${uploadedCount} file(s) to Dropbox!`);
      // Reload current folder with refresh
      await loadFolder(uploadTarget, true);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err?.message || "Upload failed. Please check file size and internet connection.");
    } finally {
      setUploading(false);
      setUploadStatus("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Delete item handler
  const handleDeleteItem = async (path: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from Dropbox?`)) return;

    try {
      await dropboxService.deleteItem(path);
      await loadFolder(currentPath, true);
    } catch (err: any) {
      alert(err?.message || "Delete failed");
    }
  };

  // Create folder handler
  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    setCreatingFolder(true);
    try {
      const parent = currentPath.replace(/\/$/, "");
      const fullPath = `${parent}/${newFolderName.trim()}`;
      await dropboxService.createFolder(fullPath);
      setNewFolderName("");
      setShowNewFolderModal(false);
      await loadFolder(currentPath, true);
    } catch (err: any) {
      alert(err?.message || "Failed to create folder");
    } finally {
      setCreatingFolder(false);
    }
  };

  // Format file size
  const formatSize = (bytes: number) => {
    if (!bytes || bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Format breadcrumb paths
  const pathParts = (currentPath || "").split("/").filter(Boolean);

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* ── Header Bar ─────────────────────────────────────────────── */}
      <div className="p-6 bg-gradient-to-r from-[#07152F] to-[#122A5C] text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📦</span>
              <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            <p className="text-sm text-gray-300 mt-1">{subtitle}</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowNewFolderModal(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition flex items-center gap-1.5 backdrop-blur-sm"
            >
              <span>➕</span> New Folder
            </button>

            <label
              className={`px-4 py-2 bg-[#1265E8] hover:bg-[#0E54C4] text-white rounded-lg text-sm font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-md ${
                uploading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <span>⬆️</span> {uploading ? "Uploading..." : "Upload Files"}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                disabled={uploading}
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </label>

            <button
              onClick={() => loadFolder(currentPath, true)}
              disabled={loading}
              title="Refresh from Dropbox"
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
            >
              <span className={`inline-block ${loading ? "animate-spin" : ""}`}>🔄</span>
            </button>
          </div>
        </div>

        {/* ── Breadcrumb Navigation ─────────────────────────────────── */}
        <div className="flex items-center gap-2 text-sm text-gray-300 mt-6 overflow-x-auto pb-1">
          <button
            onClick={() => loadFolder("")}
            className={`flex items-center gap-1 hover:text-white transition font-medium ${
              !currentPath ? "text-white font-bold underline" : ""
            }`}
          >
            <span>🏠</span> Dropbox Root
          </button>

          {pathParts.map((part, index) => {
            const partPath = "/" + pathParts.slice(0, index + 1).join("/");
            const isLast = index === pathParts.length - 1;
            return (
              <React.Fragment key={partPath}>
                <span className="text-gray-500">/</span>
                <button
                  onClick={() => loadFolder(partPath)}
                  className={`hover:text-white transition truncate max-w-[150px] ${
                    isLast ? "text-white font-bold underline" : "text-gray-300"
                  }`}
                >
                  {part}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Upload Drag & Drop Zone ──────────────────────────────────── */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFileUpload(e.dataTransfer.files);
        }}
        className={`px-6 py-4 border-b border-dashed transition-colors flex items-center justify-between gap-4 flex-wrap text-sm ${
          isDragging ? "bg-blue-50 border-blue-400 text-blue-700" : "bg-gray-50 border-gray-200 text-gray-600"
        }`}
      >
        <div className="flex items-center gap-2">
          <span>💡</span>
          <span>
            <strong>Drag & Drop</strong> any photos/files here to upload to{" "}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">
              {currentPath || "/"}
            </code>
          </span>
        </div>
        {uploading && (
          <div className="flex items-center gap-2 text-blue-600 font-medium animate-pulse">
            <span className="animate-spin">⏳</span> {uploadStatus || "Uploading to Dropbox..."}
          </div>
        )}
      </div>

      {/* ── Alert Messages ───────────────────────────────────────────── */}
      {uploadSuccess && (
        <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center justify-between">
          <span>✅ {uploadSuccess}</span>
          <button onClick={() => setUploadSuccess(null)} className="text-emerald-600 hover:text-emerald-900">
            ✕
          </button>
        </div>
      )}

      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center justify-between">
          <span>⚠️ {error}</span>
          <button onClick={() => loadFolder(currentPath, true)} className="underline ml-3 font-semibold">
            Retry
          </button>
        </div>
      )}

      {/* ── Main Content Area ────────────────────────────────────────── */}
      <div className="p-6">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm font-medium">Fetching from your Dropbox account...</p>
          </div>
        ) : (
          <div>
            {/* ── Subfolders Section ───────────────────────────────────── */}
            {data && data.folders && data.folders.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Folders ({data.folders.length})
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {currentPath && (
                    <button
                      onClick={handleGoUp}
                      className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-left flex items-center gap-2.5 transition text-gray-600 font-medium text-sm group"
                    >
                      <span className="text-xl group-hover:-translate-x-1 transition-transform">⬅️</span>
                      <span className="truncate">.. (Parent)</span>
                    </button>
                  )}

                  {data.folders.map((folder) => (
                    <button
                      key={folder.id || folder.path}
                      onClick={() => handleOpenFolder(folder.path)}
                      className="p-3 bg-blue-50/50 hover:bg-blue-100/60 border border-blue-200/60 rounded-xl text-left flex items-center gap-2.5 transition group hover:shadow-sm"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">📁</span>
                      <span className="truncate text-sm font-semibold text-gray-800">{folder.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Files & Photos Section ──────────────────────────────── */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Files & Photos ({data?.files.length || 0})
                </h3>
              </div>

              {(!data?.files || data.files.length === 0) && (!data?.folders || data.folders.length === 0) ? (
                <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                  <span className="text-4xl block mb-2">📂</span>
                  <p className="text-gray-700 font-semibold">This folder is empty</p>
                  <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                    Use the &quot;Upload Files&quot; button above or drag-and-drop photos directly into this area.
                  </p>
                </div>
              ) : null}

              {data && data.files && data.files.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {data.files.map((file) => {
                    const isImg = file.isImage || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name);
                    const isVid = file.isVideo || /\.(mp4|mov|webm)$/i.test(file.name);

                    return (
                      <div
                        key={file.id || file.path}
                        className="group bg-white border border-gray-200 hover:border-blue-400 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                      >
                        {/* Media Thumbnail / Preview Area */}
                        <div
                          onClick={() => {
                            if (file.tempUrl) setPreviewFile(file);
                          }}
                          className="relative aspect-square bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden"
                        >
                          {isImg && file.tempUrl ? (
                            <Image
                              src={file.tempUrl}
                              alt={file.name}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              unoptimized
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center p-4 text-center">
                              <span className="text-4xl mb-1">
                                {isVid ? "🎬" : file.name.endsWith(".pdf") ? "📄" : "📁"}
                              </span>
                              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                {file.name.split(".").pop()}
                              </span>
                            </div>
                          )}

                          {/* Hover action overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            {file.tempUrl && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPreviewFile(file);
                                }}
                                className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 shadow-md text-xs font-semibold"
                                title="Preview"
                              >
                                👁️ View
                              </button>
                            )}
                            {file.tempUrl && (
                              <a
                                href={file.tempUrl}
                                download={file.name}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 shadow-md text-xs"
                                title="Download"
                              >
                                ⬇️
                              </a>
                            )}
                          </div>
                        </div>

                        {/* File Details Footer */}
                        <div className="p-3 flex flex-col justify-between flex-grow">
                          <div>
                            <p className="text-xs font-semibold text-gray-800 truncate" title={file.name}>
                              {file.name}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-0.5">{formatSize(file.size)}</p>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                            <span className="text-[10px] text-gray-400 truncate">
                              {file.clientModified ? new Date(file.clientModified).toLocaleDateString() : ""}
                            </span>
                            <button
                              onClick={() => handleDeleteItem(file.path, file.name)}
                              className="text-gray-300 hover:text-red-500 transition text-xs p-1"
                              title="Delete from Dropbox"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Lightbox / Preview Modal ─────────────────────────────────── */}
      {previewFile && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewFile(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4">
              <div className="truncate">
                <h4 className="font-bold text-gray-900 truncate">{previewFile.name}</h4>
                <p className="text-xs text-gray-500">{formatSize(previewFile.size)}</p>
              </div>

              <div className="flex items-center gap-2">
                {previewFile.tempUrl && (
                  <a
                    href={previewFile.tempUrl}
                    download={previewFile.name}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition"
                  >
                    <span>⬇️</span> Download
                  </a>
                )}
                <button
                  onClick={() => setPreviewFile(null)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg text-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 flex items-center justify-center bg-gray-900 max-h-[75vh] overflow-auto">
              {previewFile.isImage || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(previewFile.name) ? (
                previewFile.tempUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewFile.tempUrl}
                    alt={previewFile.name}
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
                  />
                ) : null
              ) : previewFile.isVideo || /\.(mp4|mov|webm)$/i.test(previewFile.name) ? (
                previewFile.tempUrl ? (
                  <video src={previewFile.tempUrl} controls className="max-h-[70vh] max-w-full rounded-lg" />
                ) : null
              ) : (
                <div className="p-12 text-center text-white">
                  <span className="text-6xl block mb-3">📄</span>
                  <p className="text-lg font-semibold">{previewFile.name}</p>
                  <p className="text-sm text-gray-400 mt-1">Preview not supported for this file type.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── New Folder Modal ─────────────────────────────────────────── */}
      {showNewFolderModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowNewFolderModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Create New Folder in Dropbox</h3>
            <p className="text-xs text-gray-500 mb-4">
              Folder will be created inside: <code className="font-mono bg-gray-100 p-1 rounded">{currentPath || "/"}</code>
            </p>

            <form onSubmit={handleCreateFolder}>
              <input
                type="text"
                placeholder="Folder name (e.g. wedding, real-estate)"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                autoFocus
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewFolderModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingFolder || !newFolderName.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition"
                >
                  {creatingFolder ? "Creating..." : "Create Folder"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
