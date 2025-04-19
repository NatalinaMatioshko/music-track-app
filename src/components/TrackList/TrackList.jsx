import { useState } from "react";
import TrackItem from "./TrackItem/TrackItem";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import styles from "./TrackList.module.css";

const TrackList = ({ tracks, onEdit, onDelete, onUpload, loading }) => {
  const [currentPlayingId, setCurrentPlayingId] = useState(null);

  // Функція для відтворення треку
  const handlePlay = (id) => {
    setCurrentPlayingId(id);
  };

  if (loading) {
    return (
      <div data-testid="loading-tracks" data-loading="true">
        Loading tracks...
      </div>
    );
  }

  if (!tracks || tracks.length === 0) {
    return <div className={styles.emptyList}>No tracks found</div>;
  }

  return (
    <ul className={styles.trackList}>
      {tracks.map((track) => (
        <div key={track.id} className={styles.trackContainer}>
          <TrackItem
            track={track}
            onEdit={() => onEdit(track)}
            onDelete={() => onDelete(track.id)}
            onUpload={() => onUpload(track.id)}
            onPlay={() => handlePlay(track.id)}
          />

          {/* Відображаємо аудіо плеєр лише для поточного треку */}
          {currentPlayingId === track.id && track.fileUrl && (
            <AudioPlayer id={track.id} src={track.fileUrl} />
          )}
        </div>
      ))}
    </ul>
  );
};

export default TrackList;
