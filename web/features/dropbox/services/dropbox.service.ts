import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import {
  DropboxBrowseResult,
  DropboxFile,
  DropboxFolder,
  DropboxSubfolder,
} from "../types/dropbox.types";

export const dropboxService = {
  /**
   * Browse Dropbox folder contents (subfolders + all files with preview links).
   */
  browse(path: string = "", refresh = false): Promise<DropboxBrowseResult> {
    return apiClient.get<DropboxBrowseResult>(ENDPOINTS.DROPBOX.BROWSE, {
      params: {
        path: path || "",
        ...(refresh ? { refresh: "true" } : {}),
      },
      timeoutMs: 30000,
    });
  },

  /**
   * Uploads a file directly to the given Dropbox folder path.
   * Uses 180s (3 minutes) timeout to accommodate larger file uploads over network.
   */
  upload(file: File, folderPath: string = "/lirisha-media"): Promise<DropboxFile> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder_path", folderPath);

    return apiClient.post<DropboxFile>(ENDPOINTS.DROPBOX.UPLOAD, formData, {
      timeoutMs: 180000,
    });
  },

  /**
   * Creates a new folder in Dropbox.
   */
  createFolder(path: string): Promise<DropboxSubfolder> {
    return apiClient.post<DropboxSubfolder>(
      ENDPOINTS.DROPBOX.CREATE_FOLDER,
      { path },
      { timeoutMs: 30000 }
    );
  },

  /**
   * Deletes a file or folder in Dropbox.
   */
  deleteItem(path: string): Promise<{ deleted: boolean; path: string }> {
    return apiClient.delete<{ deleted: boolean; path: string }>(ENDPOINTS.DROPBOX.DELETE_ITEM, {
      params: { path },
      timeoutMs: 30000,
    });
  },

  /**
   * Lists all image files in a Dropbox folder.
   */
  listFolder(path: string, refresh = false): Promise<DropboxFolder> {
    return apiClient.get<DropboxFolder>(ENDPOINTS.DROPBOX.FOLDERS, {
      params: {
        path,
        ...(refresh ? { refresh: "true" } : {}),
      },
      timeoutMs: 30000,
    });
  },

  /**
   * Lists immediate child subfolders.
   */
  listSubfolders(path: string): Promise<DropboxSubfolder[]> {
    return apiClient.get<DropboxSubfolder[]>(ENDPOINTS.DROPBOX.SUBFOLDERS, {
      params: { path },
      timeoutMs: 30000,
    });
  },

  /**
   * Generates a temporary link.
   */
  getTemporaryLink(path: string): Promise<{ url: string }> {
    return apiClient.get<{ url: string }>(ENDPOINTS.DROPBOX.LINK, {
      params: { path },
      timeoutMs: 30000,
    });
  },

  /**
   * Invalidates cache.
   */
  invalidateCache(path: string): Promise<{ invalidated: boolean; path: string }> {
    return apiClient.post<{ invalidated: boolean; path: string }>(
      ENDPOINTS.DROPBOX.INVALIDATE_CACHE,
      { path },
      { timeoutMs: 15000 }
    );
  },

  /**
   * Invalidates all cache.
   */
  invalidateAllCache(): Promise<{ invalidated_count: number }> {
    return apiClient.post<{ invalidated_count: number }>(
      ENDPOINTS.DROPBOX.INVALIDATE_ALL_CACHE,
      undefined,
      { timeoutMs: 15000 }
    );
  },
};
