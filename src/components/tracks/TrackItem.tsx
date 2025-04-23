import React, { useState } from "react";
import { Pencil, Trash2, Upload, Music } from "lucide-react";
import { Button } from "../ui/Button";
import { AudioPlayer } from "../ui/AudioPlayer";
import type { Track } from "../../types";

interface TrackItemProps {
  track: Track;
  onEdit: (track: Track) => void;
  onDelete: (track: Track) => void;
  onUpload: (track: Track) => void;
}

export function TrackItem({
  track,
  onEdit,
  onDelete,
  onUpload,
}: TrackItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const hasAudio = !!track.audioFile?.url;
  const defaultCoverImage =
    "https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300";
  const coverImage = track.coverImage || defaultCoverImage;

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
      data-testid={`track-item-${track.id}`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Cover image */}
        <div className="w-full md:w-48 h-48 overflow-hidden flex-shrink-0">
          <img
            src={coverImage}
            alt={`${track.title} cover`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultCoverImage;
            }}
          />
        </div>

        <div className="flex-1 p-4 flex flex-col">
          {/* Track info */}
          <div className="mb-4">
            <h3
              className="text-lg font-semibold text-gray-900 mb-1"
              data-testid={`track-item-${track.id}-title`}
            >
              {track.title}
            </h3>
            <p
              className="text-sm text-gray-600 mb-2"
              data-testid={`track-item-${track.id}-artist`}
            >
              {track.artist}
            </p>

            {track.album && (
              <p className="text-sm text-gray-500 mb-2">Album: {track.album}</p>
            )}

            <div className="flex flex-wrap gap-1 mb-3">
              {track.genres.map((genre, index) => (
                <span
                  key={index}
                  className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Audio player (if there's an audio file) */}
          {track.audioFile && (
            <div className="mb-4">
              <AudioPlayer
                src={track.audioFile.url}
                trackId={track.id}
                isPlaying={isPlaying}
                onPlayStateChange={setIsPlaying}
              />
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-auto">
            <Button
              size="sm"
              variant="outline"
              icon={<Pencil size={16} />}
              onClick={() => onEdit(track)}
              data-testid={`edit-track-${track.id}`}
            >
              Edit
            </Button>

            <Button
              size="sm"
              variant={hasAudio ? "secondary" : "primary"}
              icon={<Upload size={16} />}
              onClick={() => onUpload(track)}
              data-testid={`upload-track-${track.id}`}
            >
              {hasAudio ? "Replace Audio" : "Upload Audio"}
            </Button>

            <Button
              size="sm"
              variant="danger"
              icon={<Trash2 size={16} />}
              onClick={() => onDelete(track)}
              data-testid={`delete-track-${track.id}`}
              disabled={isPlaying}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
