import { supabase } from "@/lib/supabase";

export const uploadImage = async (file: File): Promise<string | null> => {
  if (!file) {
    console.error("No file selected!");
    return null;
  }
  (async () => {
    try {
      console.log("Checking Supabase Storage Buckets...");

      const { data, error } = await supabase.storage.listBuckets();

      console.log("Storage Buckets:", data, error);

      if (error) {
        console.error("Error fetching buckets:", error.message);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  })();
  try {
    const fileName = `public/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("images") // Ensure this bucket exists in Supabase
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false, // Prevent overwriting
      });
    if (error) {
      console.error("Upload failed:", error.message);
      return null;
    }

    return supabase.storage.from("images").getPublicUrl(data.path).data
      .publicUrl;
  } catch (err) {
    console.error("Unexpected upload error:", err);
    return null;
  }
};
