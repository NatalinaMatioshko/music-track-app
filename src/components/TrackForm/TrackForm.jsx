import styles from "../TrackForm/TrackForm.module.css";

const TrackForm = ({ onSubmit, defaultValues = {} }) => {
  return (
    <form data-testid="track-form" onSubmit={onSubmit}>
      <input
        data-testid="input-title"
        defaultValue={defaultValues.title || ""}
      />
      <input
        data-testid="input-artist"
        defaultValue={defaultValues.artist || ""}
      />
      <input
        data-testid="input-album"
        defaultValue={defaultValues.album || ""}
      />
      <input
        data-testid="input-cover-image"
        defaultValue={defaultValues.cover || ""}
      />
      <select data-testid="genre-selector" multiple>
        <option value="rock">Rock</option>
        <option value="pop">Pop</option>
      </select>
      <button data-testid="submit-button" type="submit">
        Save
      </button>
    </form>
  );
};

export default TrackForm;
