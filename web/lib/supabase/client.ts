import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xznlbaqqxmmglaidridj.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bmxiYXFxeG1tZ2xhaWRyaWRqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTE3Nzg4MywiZXhwIjoyMDk2NzUzODgzfQ.RPRvVda1YCOC6-ysjJ6yvDk8jnJFIE0xXVQdpt0sMT0";

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
