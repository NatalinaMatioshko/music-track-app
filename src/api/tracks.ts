// import { apiClient } from "./client";
// import type {
//   CreateTrackData,
//   FilterParams,
//   PaginationParams,
//   SortParams,
//   Track,
//   TrackListResponse,
//   UpdateTrackData,
// } from "../types";

// export const getTracks = async (
//   pagination: PaginationParams,
//   sort: SortParams,
//   filters: FilterParams
// ): Promise<TrackListResponse> => {
//   const { data } = await apiClient.get("/tracks", {
//     params: {
//       page: pagination.page,
//       limit: pagination.limit,
//       sortBy: sort.field,
//       sortDirection: sort.direction,
//       genre: filters.genre,
//       artist: filters.artist,
//       search: filters.search,
//     },
//   });
//   return data;
// };

// export const getTrack = async (id: string): Promise<Track> => {
//   const { data } = await apiClient.get(`/tracks/${id}`);
//   return data;
// };

// export const createTrack = async (
//   trackData: CreateTrackData
// ): Promise<Track> => {
//   const { data } = await apiClient.post("/tracks", trackData);
//   return data;
// };

// export const updateTrack = async (
//   id: string,
//   trackData: UpdateTrackData
// ): Promise<Track> => {
//   const { data } = await apiClient.put(`/tracks/${id}`, trackData);
//   return data;
// };

// export const deleteTrack = async (id: string): Promise<void> => {
//   await apiClient.delete(`/tracks/${id}`);
// };

// export const uploadTrackFile = async (
//   id: string,
//   file: File
// ): Promise<Track> => {
//   const formData = new FormData();
//   formData.append("file", file);

//   const { data } = await apiClient.post(`/tracks/${id}/audio`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return data;
// };

// export const removeTrackFile = async (id: string): Promise<Track> => {
//   const { data } = await apiClient.delete(`/tracks/${id}/audio`);
//   return data;
// };

// import { Track, TrackListResponse } from "../types";

// // Справжній запит (або твій клієнт)
// export async function getTracks(): Promise<TrackListResponse> {
//   const res = await fetch("/api/tracks");
//   if (!res.ok) throw new Error("Failed to fetch tracks");
//   return res.json();
// }

// // Адаптер для react-query
// export async function fetchAllTracks(): Promise<Track[]> {
//   const response = await getTracks();
//   return response.data; // 👈 важливо! не .tracks, а .data
// }

import { Track } from "../types";

// Збираємо всі JSON-файли в папці src/tracks
const modules = import.meta.glob("../tracks/*.json", { eager: true });

export async function fetchAllTracks(): Promise<Track[]> {
  const tracks: Track[] = [];

  for (const path in modules) {
    const mod = modules[path] as { default: Track };
    tracks.push(mod.default);
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(tracks), 300);
  });
}
