import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rtcflmsmhsuouytntegg.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0Y2ZsbXNtaHN1b3V5dG50ZWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3OTAyMzksImV4cCI6MjEwNzM2NjIzOX0.CJ0HT_d7WPPjaNcRKg1RMT0Xa7DmtzTdEqlEDT9kBbQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "lirisha-assets";

/**
 * Uploads a file directly to the Supabase Storage bucket and returns its public URL.
 * @param file Browser File object
 * @param folder Optional folder path within the bucket (e.g. 'logos', 'photos', 'favicons')
 */
export async function uploadToSupabaseStorage(
  file: File,
  folder: string = "uploads"
): Promise<{ url: string | null; error: string | null }> {
  try {
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filePath = `${folder}/${timestamp}_${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      return { url: null, error: uploadError.message };
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

    return { url: data.publicUrl, error: null };
  } catch (err: any) {
    return { url: null, error: err.message || "Failed to upload file to storage" };
  }
}
