import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { debounce } from "../../utils/debounce";
import type { FilterParams, Genre } from "../../types";

interface TracksFilterProps {
  onFilterChange: (filters: Partial<FilterParams>) => void;
  genres: Genre[];
  artists: string[];
}

export function TracksFilter({
  onFilterChange,
  genres,
  artists,
}: TracksFilterProps) {
  // Create a debounced search handler
  const debouncedSearch = React.useMemo(
    () => debounce((value: string) => onFilterChange({ search: value }), 300),
    [onFilterChange]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleGenreChange = (value: string) => {
    onFilterChange({ genre: value === "all" ? undefined : value });
  };

  const handleArtistChange = (value: string) => {
    onFilterChange({ artist: value === "all" ? undefined : value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Search tracks, artists, or albums..."
          icon={<Search size={16} />}
          onChange={handleSearchChange}
          data-testid="search-input"
        />

        <Select
          options={[
            { value: "all", label: "All Genres" },
            ...genres.map((genre) => ({
              value: genre.name,
              label: genre.name,
            })),
          ]}
          onChange={handleGenreChange}
          data-testid="filter-genre"
        />

        <Select
          options={[
            { value: "all", label: "All Artists" },
            ...artists.map((artist) => ({ value: artist, label: artist })),
          ]}
          onChange={handleArtistChange}
          data-testid="filter-artist"
        />
      </div>
    </div>
  );
}
