import { useState, useEffect } from "react";
import styles from "../pages/TracksPage.module.css";

import Modal from "../components/Modal/Modal";
import TrackForm from "../components/TrackForm/TrackForm";

const TracksPage = () => {
  const [tracks, setTracks] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      const response = await fetch("/api/tracks");
      const data = await response.json();
      setTracks(data);
    };

    fetchTracks();
  }, []);

  return (
    <div className={styles.tracksPage}>
      <h1 data-testid="tracks-header">Track list</h1>

      <button
        data-testid="create-track-button"
        onClick={() => setIsCreateOpen(true)}
      >
        Add track
      </button>

      <input data-testid="search-input" placeholder="Track search..." />
      <select data-testid="sort-select">
        <option value="title">Title</option>
        <option value="artist">Artist</option>
      </select>

      <select data-testid="filter-genre">
        <option value="">All genres</option>
      </select>

      <select data-testid="filter-artist">
        <option value="">All artists</option>
      </select>

      <div data-testid="pagination">
        <button data-testid="pagination-prev">Previous</button>
        <button data-testid="pagination-next">Next</button>
      </div>

      <div data-testid="loading-tracks">Download...</div>

      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.title} — {track.artist}
          </li>
        ))}
      </ul>

      {/* Модалка для створення треку */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
        <TrackForm />
      </Modal>
    </div>
  );
};

export default TracksPage;
