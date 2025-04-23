import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "../../utils/cn";

interface AudioPlayerProps {
  // src: string;
  // trackId: string;
  // onPlayStateChange?: (isPlaying: boolean) => void;
  src: string;
  trackId: string;
  isPlaying: boolean;
  onPlayStateChange: (playing: boolean) => void;
}

export function AudioPlayer({
  src,
  trackId,

  onPlayStateChange,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Format time in MM:SS format
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle play state change
  // useEffect(() => {
  //   onPlayStateChange?.(isPlaying);
  // }, [isPlaying, onPlayStateChange]);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <div
      className="flex flex-col p-3 bg-gray-50 rounded-md border border-gray-200"
      data-testid={`audio-player-${trackId}`}
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={togglePlay}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          data-testid={
            isPlaying ? `pause-button-${trackId}` : `play-button-${trackId}`
          }
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            data-testid={`audio-progress-${trackId}`}
          />
        </div>

        <div className="text-xs text-gray-500 min-w-16 text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="text-gray-600 hover:text-gray-800"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className={cn(
            "w-20 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer",
            isMuted ? "accent-gray-400" : "accent-purple-600"
          )}
        />
      </div>
    </div>
  );
}
