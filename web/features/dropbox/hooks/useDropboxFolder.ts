"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  DropboxFile,
  DropboxFolder,
  DropboxBeforeAfterPair,
  DropboxLoadingState,
} from "../types/dropbox.types";
import { dropboxService } from "../services/dropbox.service";

interface UseDropboxFolderOptions {
  /** Absolute Dropbox folder path (e.g. "/lirisha-media/gallery/portrait") */
  path: string;
  /**
   * When true the hook won't fetch on mount — call `refetch()` manually.
   * Useful for tab panels that shouldn't load until the tab is activated.
   */
  lazy?: boolean;
}

interface UseDropboxFolderReturn {
  files: DropboxFile[];
  folder: DropboxFolder | null;
  state: DropboxLoadingState;
  error: string | null;
  /** True when the response was served from the PostgreSQL cache */
  isCached: boolean;
  /**
   * Re-fetches the folder.
   * @param forceRefresh When true, bypasses the server-side cache (live Dropbox fetch).
   */
  refetch: (forceRefresh?: boolean) => Promise<void>;
  /**
   * Pairs of before/after images extracted from the folder.
   * Convention: filenames must be "before_<N>.ext" and "after_<N>.ext".
   */
  beforeAfterPairs: DropboxBeforeAfterPair[];
}

/**
 * Custom hook for fetching and caching Dropbox folder contents.
 *
 * Usage:
 * ```tsx
 * const { files, state, error } = useDropboxFolder({
 *   path: "/lirisha-media/gallery/portrait",
 * });
 * ```
 */
export function useDropboxFolder({
  path,
  lazy = false,
}: UseDropboxFolderOptions): UseDropboxFolderReturn {
  const [folder, setFolder] = useState<DropboxFolder | null>(null);
  const [state, setState] = useState<DropboxLoadingState>(
    lazy ? "idle" : "loading"
  );
  const [error, setError] = useState<string | null>(null);

  // Prevent stale closure issues in async callbacks
  const pathRef = useRef(path);
  pathRef.current = path;

  const fetchFolder = useCallback(async (forceRefresh = false) => {
    const currentPath = pathRef.current;
    if (!currentPath) return;

    setState("loading");
    setError(null);

    try {
      const data = await dropboxService.listFolder(currentPath, forceRefresh);
      setFolder(data);
      setState("success");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to load images from Dropbox";
      setError(msg);
      setState("error");
    }
  }, []);

  // Auto-fetch on mount (unless lazy)
  useEffect(() => {
    if (!lazy && path) {
      fetchFolder();
    }
    // Re-fetch when path changes
  }, [path, lazy, fetchFolder]);

  // Derive before/after pairs from files
  const beforeAfterPairs: DropboxBeforeAfterPair[] = (() => {
    const map: Record<
      string,
      { before?: DropboxFile; after?: DropboxFile }
    > = {};

    for (const file of folder?.files ?? []) {
      const match = file.name.match(/^(before|after)[_-](\d+)\./i);
      if (match) {
        const [, type, num] = match;
        if (!map[num]) map[num] = {};
        map[num][type.toLowerCase() as "before" | "after"] = file;
      }
    }

    return Object.entries(map)
      .filter(([, pair]) => pair.before && pair.after)
      .map(([num, pair]) => ({
        pairIndex: parseInt(num, 10),
        before: pair.before!,
        after: pair.after!,
      }))
      .sort((a, b) => a.pairIndex - b.pairIndex);
  })();

  return {
    files: folder?.files ?? [],
    folder,
    state,
    error,
    isCached: folder?.cached ?? false,
    refetch: fetchFolder,
    beforeAfterPairs,
  };
}
