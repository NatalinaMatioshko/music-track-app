const AudioPlayer = ({ id, src }) => {
  return (
    <div data-testid={`audio-player-${id}`}>
      <audio controls src={src}></audio>
      <button data-testid={`play-button-${id}`}>▶</button>
      <button data-testid={`pause-button-${id}`}>⏸</button>
      <progress data-testid={`audio-progress-${id}`} />
    </div>
  );
};

export default AudioPlayer;
