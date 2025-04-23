export interface Track {
  id: string;
  title: string;
  artist: string;
  // album: string;
  album?: string;
  genres: string[];
  coverImage?: string;
  audioFile?: {
    url: string;
    name: string;
    size: number;
  };
}

export interface Genre {
  id: string;
  name: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  field: "title" | "artist" | "album";
  direction: "asc" | "desc";
}

export interface FilterParams {
  genre?: string;
  artist?: string;
  search?: string;
}

export interface TrackListResponse {
  data: Track[];
  total: number;
  page: number;
  limit: number;
}

export type CreateTrackData = Omit<Track, "id" | "audioFile">;
export type UpdateTrackData = Partial<CreateTrackData>;

export interface AudioUploadResponse {
  url: string;
  name: string;
  size: number;
}
