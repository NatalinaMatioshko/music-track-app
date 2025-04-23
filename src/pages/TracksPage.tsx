// import React, { createContext, useContext, useState, useCallback } from "react";
// import { Toast, ToastContainer, ToastType } from "../components/ui/Toast";

// interface Toast {
//   id: string;
//   message: string;
//   type: ToastType;
// }

// interface ToastContextValue {
//   addToast: (message: string, type: ToastType) => void;
//   removeToast: (id: string) => void;
// }

// const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// export function ToastProvider({ children }: { children: React.ReactNode }) {
//   const [toasts, setToasts] = useState<Toast[]>([]);

//   const addToast = useCallback((message: string, type: ToastType) => {
//     const id = Math.random().toString(36).substring(2, 9);
//     setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
//   }, []);

//   const removeToast = useCallback((id: string) => {
//     setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
//   }, []);

//   return (
//     <ToastContext.Provider value={{ addToast, removeToast }}>
//       {children}
//       <ToastContainer>
//         {toasts.map((toast) => (
//           <Toast
//             key={toast.id}
//             message={toast.message}
//             type={toast.type}
//             onClose={() => removeToast(toast.id)}
//           />
//         ))}
//       </ToastContainer>
//     </ToastContext.Provider>
//   );
// }

// export function useToast() {
//   const context = useContext(ToastContext);
//   if (context === undefined) {
//     throw new Error("useToast must be used within a ToastProvider");
//   }
//   return context;
// }

// const TracksPage = () => {
//   return <h1>Track list page</h1>;
// };

// export default TracksPage;

// export default ToastProvider;
// import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { fetchAllTracks } from "../api/tracks";
// import { Track } from "../types";
// import { TrackItem } from "../components/tracks/TrackItem";
// import { TracksFilter } from "../components/tracks/TrackFilter";
// import { useToast } from "../context/ToastContext";

// const TracksPage = () => {
//   const { addToast } = useToast();

//   const {
//     data: tracks = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery<Track[]>({
//     queryKey: ["tracks"],
//     queryFn: fetchAllTracks,
//   });

//   useEffect(() => {
//     if (isError && error instanceof Error) {
//       addToast(error.message, "error");
//     }
//   }, [isError, error, addToast]);

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-semibold mb-6">🎵 Music Tracks</h1>

//       <TracksFilter onFilterChange={() => {}} genres={[]} artists={[]} />

//       {isLoading && <p className="text-gray-500">Loading...</p>}

//       {isError && <p className="text-red-500">Something went wrong...</p>}

//       <div className="space-y-4 mt-4">
//         {tracks.map((track: Track) => (
//           <TrackItem
//             key={track.id}
//             track={track}
//             onEdit={() => {}}
//             onDelete={() => {}}
//             onUpload={() => {}}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TracksPage;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Track, CreateTrackData, UpdateTrackData } from "../types";
import { fetchAllTracks } from "../api/tracks";
import { createTrack } from "../api/createTrack";
import { updateTrack } from "../api/updateTrack";
import { deleteTrack } from "../api/deleteTrack";
import { uploadAudio, removeAudio } from "../api/uploadAudio";
import { useToast } from "../context/ToastContext";
import { TrackItem } from "../components/tracks/TrackItem";
import { TracksFilter } from "../components/tracks/TrackFilter";
import { CreateTrackModal } from "../components/tracks/CreateTrackModal";
import { EditTrackModal } from "../components/tracks/EditTrackModal";
import { UploadTrackModal } from "../components/tracks/UploadTrackModal";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { Button } from "../components/ui/Button";

const TracksPage = () => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState<string | undefined>();
  const [artistFilter, setArtistFilter] = useState<string | undefined>();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [selectedTrackForUpload, setSelectedTrackForUpload] =
    useState<Track | null>(null);
  const [trackToDelete, setTrackToDelete] = useState<Track | null>(null);

  const [sortField, setSortField] = useState<"title" | "artist" | "album">(
    "title"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [currentlyPlayingTrackId, setCurrentlyPlayingTrackId] = useState<
    string | null
  >(null);

  const {
    data: tracks = [],
    isLoading,
    isError,
    error,
  } = useQuery<Track[]>({
    queryKey: ["tracks"],
    queryFn: fetchAllTracks,
  });

  const createMutation = useMutation({
    mutationFn: createTrack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      addToast("Track created successfully", "success");
      setIsCreateOpen(false);
    },
    onError: () => {
      addToast("Failed to create track", "error");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; data: UpdateTrackData }) =>
      updateTrack(data.id, data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      addToast("Track updated", "success");
      setSelectedTrack(null);
    },
    onError: () => {
      addToast("Failed to update track", "error");
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (data: { id: string; file: File }) =>
      uploadAudio(data.id, data.file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      addToast("Audio uploaded successfully", "success");
      setSelectedTrackForUpload(null);
    },
    onError: () => {
      addToast("Failed to upload audio", "error");
    },
  });

  const removeAudioMutation = useMutation({
    mutationFn: (id: string) => removeAudio(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      addToast("Audio removed", "success");
    },
    onError: () => {
      addToast("Failed to remove audio", "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTrack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      addToast("Track deleted", "success");
      setTrackToDelete(null);
    },
    onError: () => {
      addToast("Failed to delete track", "error");
    },
  });

  const genres = useMemo(() => {
    return Array.from(new Set(tracks.flatMap((t) => t.genres)));
  }, [tracks]);

  const artists = useMemo(() => {
    return Array.from(new Set(tracks.map((t) => t.artist)));
  }, [tracks]);

  const sortedFilteredTracks = useMemo(() => {
    const sorted = [...tracks].sort((a, b) => {
      const aField = a[sortField]?.toLowerCase?.() || "";
      const bField = b[sortField]?.toLowerCase?.() || "";
      if (aField < bField) return sortDirection === "asc" ? -1 : 1;
      if (aField > bField) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted.filter((track) => {
      const matchSearch =
        !searchTerm ||
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.album?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchGenre = !genreFilter || track.genres.includes(genreFilter);
      const matchArtist = !artistFilter || track.artist === artistFilter;

      return matchSearch && matchGenre && matchArtist;
    });
  }, [tracks, searchTerm, genreFilter, artistFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedFilteredTracks.length / itemsPerPage);
  const paginatedTracks = sortedFilteredTracks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6" data-testid="tracks-header">
        🎵 Music Tracks
      </h1>

      <div className="flex justify-between items-center mb-4">
        <Button
          onClick={() => setIsCreateOpen(true)}
          data-testid="create-track-button"
        >
          Create Track
        </Button>

        <div>
          <label htmlFor="sort-select" className="mr-2 font-medium">
            Sort by:
          </label>
          <select
            id="sort-select"
            data-testid="sort-select"
            value={sortField}
            onChange={(e) =>
              setSortField(e.target.value as "title" | "artist" | "album")
            }
            className="border rounded px-2 py-1"
          >
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
          </select>
          <button
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="ml-2 text-purple-600 text-sm"
          >
            {sortDirection === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <TracksFilter
        onFilterChange={({ search, genre, artist }) => {
          if (search !== undefined) setSearchTerm(search);
          if (genre !== undefined) setGenreFilter(genre);
          if (artist !== undefined) setArtistFilter(artist);
        }}
        genres={genres.map((name) => ({ id: name, name }))}
        artists={artists}
      />

      {isLoading && <p data-testid="loading-tracks">Loading...</p>}
      {isError && <p className="text-red-500">{error?.message}</p>}

      <div className="space-y-4 mt-4">
        {paginatedTracks.map((track) => (
          <TrackItem
            key={track.id}
            track={track}
            onEdit={(t) => setSelectedTrack(t)}
            onDelete={(t) => setTrackToDelete(t)}
            onUpload={(t) => setSelectedTrackForUpload(t)}
          />
        ))}
      </div>

      <div
        className="flex justify-center items-center gap-4 mt-6"
        data-testid="pagination"
      >
        <button
          data-testid="pagination-prev"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          data-testid="pagination-next"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <CreateTrackModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        genres={genres.map((name) => ({ id: name, name }))}
        isSubmitting={createMutation.isPending}
      />

      <EditTrackModal
        isOpen={!!selectedTrack}
        onClose={() => setSelectedTrack(null)}
        track={selectedTrack}
        genres={genres.map((name) => ({ id: name, name }))}
        isSubmitting={updateMutation.isPending}
        onSubmit={(data) => {
          if (selectedTrack) {
            updateMutation.mutate({ id: selectedTrack.id, data });
          }
        }}
      />

      <UploadTrackModal
        isOpen={!!selectedTrackForUpload}
        onClose={() => setSelectedTrackForUpload(null)}
        track={selectedTrackForUpload}
        onUpload={(file) => {
          if (selectedTrackForUpload) {
            uploadMutation.mutate({ id: selectedTrackForUpload.id, file });
          }
        }}
        onRemove={() => {
          if (selectedTrackForUpload) {
            removeAudioMutation.mutate(selectedTrackForUpload.id);
          }
        }}
        isUploading={uploadMutation.isPending}
        hasExistingFile={!!selectedTrackForUpload?.audioFile}
      />

      <ConfirmDialog
        isOpen={!!trackToDelete}
        title="Delete Track"
        message={`Are you sure you want to delete "${trackToDelete?.title}"?`}
        onConfirm={() => {
          if (trackToDelete) {
            deleteMutation.mutate(trackToDelete.id);
          }
        }}
        onCancel={() => setTrackToDelete(null)}
        onClose={() => setTrackToDelete(null)}
      />
    </div>
  );
};

export default TracksPage;
