export interface DropboxFile {
  name: string;
  path: string;
  pathDisplay: string;
  id: string;
  size: number;
  clientModified: string;
  serverModified: string;
  isDownloadable: boolean;
  tempUrl: string | null;
  thumbnailUrl?: string | null;
  isImage?: boolean;
  isVideo?: boolean;
  extension?: string;
}

export interface DropboxSubfolder {
  name: string;
  path: string;
  pathDisplay?: string;
  id: string;
}

export interface DropboxFolder {
  path: string;
  files: DropboxFile[];
  total_count: number;
  cached: boolean;
  fetchedAt: string | null;
}

export interface DropboxBrowseResult {
  current_path: string;
  parent_path: string | null;
  folders: DropboxSubfolder[];
  files: DropboxFile[];
  total_count: number;
  total_folders: number;
  cached: boolean;
}

export interface DropboxBeforeAfterPair {
  pairIndex: number;
  before: DropboxFile;
  after: DropboxFile;
}

export type DropboxLoadingState = "idle" | "loading" | "success" | "error";
