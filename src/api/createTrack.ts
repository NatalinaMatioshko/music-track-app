import { CreateTrackData, Track } from "../types";

export async function createTrack(data: CreateTrackData): Promise<Track> {
  const res = await fetch("http://localhost:8000/tracks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create track");
  }

  return res.json();
}
