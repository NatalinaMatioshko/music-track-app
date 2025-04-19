import styles from "./TrackItem.module.css";

const TrackItem = ({ track }) => {
  return (
    <li data-testid={`track-item-${track.id}`}>
      <p data-testid={`track-item-${track.id}-title`}>{track.title}</p>
      <p data-testid={`track-item-${track.id}-artist`}>{track.artist}</p>

      <button data-testid={`edit-track-${track.id}`}>Edit</button>
      <button data-testid={`delete-track-${track.id}`}>Delete</button>
      <button data-testid={`upload-track-${track.id}`}>
        Download the file
      </button>
    </li>
  );
};

export default TrackItem;
