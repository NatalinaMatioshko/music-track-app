import React, { useState, useRef } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Upload, X, Music, FileText } from "lucide-react";
import type { Track } from "../../types";

interface UploadTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  onRemove?: () => void;
  track: Track | null;
  isUploading: boolean;
  hasExistingFile: boolean;
}

export function UploadTrackModal({
  isOpen,
  onClose,
  onUpload,
  onRemove,
  track,
  isUploading,
  hasExistingFile,
}: UploadTrackModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!track) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check if file is audio
    if (!file.type.startsWith("audio/")) {
      alert("Please upload an audio file (MP3, WAV, etc.)");
      return;
    }

    // Check file size (e.g., max 20MB)
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      alert("File is too large. Maximum size is 20MB.");
      return;
    }

    setFile(file);
  };

  const handleSubmit = () => {
    if (file) {
      onUpload(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Upload Audio for: ${track.title}`}
    >
      <div className="space-y-4">
        {hasExistingFile && !file && (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="text-purple-600" />
                <span className="text-sm font-medium">
                  Current file: {track.audioFile?.name || "audio file"}
                </span>
                <span className="text-xs text-gray-500">
                  ({formatFileSize(track.audioFile?.size || 0)})
                </span>
              </div>

              <Button
                size="sm"
                variant="danger"
                onClick={onRemove}
                disabled={isUploading}
              >
                Remove
              </Button>
            </div>
          </div>
        )}

        {/* File upload area */}
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? "border-purple-500 bg-purple-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm text-gray-600 justify-center">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  ref={fileInputRef}
                  className="sr-only"
                  onChange={handleFileChange}
                  accept="audio/*"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              MP3, WAV, OGG up to 20MB
            </p>
          </div>
        ) : (
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="text-purple-600" />
                <div>
                  <p className="text-sm font-medium truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!file || isUploading}
            isLoading={isUploading}
          >
            Upload
          </Button>
        </div>
      </div>
    </Modal>
  );
}
