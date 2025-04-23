import { AudioUploadResponse } from "../types";

export async function uploadAudio(
  id: string,
  file: File
): Promise<AudioUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`http://localhost:8000/tracks/${id}/audio`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload audio");
  }

  return res.json();
}

export async function removeAudio(id: string): Promise<void> {
  const res = await fetch(`http://localhost:8000/tracks/${id}/audio`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to remove audio");
  }
}
