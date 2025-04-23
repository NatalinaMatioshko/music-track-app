import React from "react";
import { Modal } from "../ui/Modal";
import { TrackForm, TrackFormValues } from "./TrackForm";
import type { Genre } from "../../types";

interface CreateTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TrackFormValues) => void;
  genres: Genre[];
  isSubmitting: boolean;
}

export function CreateTrackModal({
  isOpen,
  onClose,
  onSubmit,
  genres,
  isSubmitting,
}: CreateTrackModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Track">
      <TrackForm
        genres={genres}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        mode="create"
      />
    </Modal>
  );
}
