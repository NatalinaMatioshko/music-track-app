import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { TagInput } from "../ui/TagInput";
import { Music, User, Disc, Image } from "lucide-react";
import type { Track, Genre } from "../../types";

const trackSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  album: z.string().optional(),
  coverImage: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.string().length(0)),
  genres: z.array(z.string()).min(1, "At least one genre is required"),
});

export type TrackFormValues = z.infer<typeof trackSchema>;

interface TrackFormProps {
  initialData?: Partial<Track>;
  genres: Genre[];
  onSubmit: (data: TrackFormValues) => void;
  isSubmitting: boolean;
  mode: "create" | "edit";
}

export function TrackForm({
  initialData,
  genres,
  onSubmit,
  isSubmitting,
  mode,
}: TrackFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TrackFormValues>({
    resolver: zodResolver(trackSchema),
    defaultValues: {
      title: initialData?.title || "",
      artist: initialData?.artist || "",
      album: initialData?.album || "",
      coverImage: initialData?.coverImage || "",
      genres: initialData?.genres || [],
    },
  });

  const genreOptions = genres.map((genre) => genre.name);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="track-form"
      className="space-y-4"
    >
      <Input
        id="title"
        label="Title"
        placeholder="Enter track title"
        error={errors.title?.message}
        icon={<Music size={16} />}
        {...register("title")}
        data-testid="input-title"
      />

      <Input
        id="artist"
        label="Artist"
        placeholder="Enter artist name"
        error={errors.artist?.message}
        icon={<User size={16} />}
        {...register("artist")}
        data-testid="input-artist"
      />

      <Input
        id="album"
        label="Album"
        placeholder="Enter album name (optional)"
        error={errors.album?.message}
        icon={<Disc size={16} />}
        {...register("album")}
        data-testid="input-album"
      />

      <Input
        id="coverImage"
        label="Cover Image URL"
        placeholder="Enter cover image URL (optional)"
        error={errors.coverImage?.message}
        icon={<Image size={16} />}
        {...register("coverImage")}
        data-testid="input-cover-image"
      />

      <Controller
        name="genres"
        control={control}
        render={({ field }) => (
          <TagInput
            id="genre"
            label="Genres"
            tags={field.value}
            onChange={field.onChange}
            options={genreOptions}
            error={errors.genres?.message}
            placeholder="Add a genre..."
            data-testid="genre-selector"
          />
        )}
      />

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          isLoading={isSubmitting}
          data-testid="submit-button"
        >
          {mode === "create" ? "Create Track" : "Update Track"}
        </Button>
      </div>
    </form>
  );
}
