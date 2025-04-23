import { UpdateTrackData, Track } from "../types";

export async function updateTrack(
  id: string,
  data: UpdateTrackData
): Promise<Track> {
  const res = await fetch(`http://localhost:8000/tracks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update track");
  }

  return res.json();
}
