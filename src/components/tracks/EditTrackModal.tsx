import React from "react";
import { Modal } from "../ui/Modal";
import { TrackForm, TrackFormValues } from "./TrackForm";
import type { Track, Genre } from "../../types";

interface EditTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TrackFormValues) => void;
  track: Track | null;
  genres: Genre[];
  isSubmitting: boolean;
}

export function EditTrackModal({
  isOpen,
  onClose,
  onSubmit,
  track,
  genres,
  isSubmitting,
}: EditTrackModalProps) {
  if (!track) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Track: ${track.title}`}
    >
      <TrackForm
        initialData={track}
        genres={genres}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        mode="edit"
      />
    </Modal>
  );
}
