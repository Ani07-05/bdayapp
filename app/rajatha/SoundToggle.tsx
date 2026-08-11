"use client";

import { useEffect, useRef, useState } from "react";

const SONG_SRC = "/dracula.mp3";
const START_AT = 27.5;

export default function SoundToggle() {
  const [asked, setAsked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(SONG_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  const seekAndPlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const begin = () => {
      audio.currentTime = START_AT;
      audio.play();
    };
    if (audio.readyState >= 1) {
      begin();
    } else {
      audio.addEventListener("loadedmetadata", begin, { once: true });
    }
    setPlaying(true);
  };

  const playSong = () => {
    seekAndPlay();
    setAsked(true);
  };

  const dismiss = () => setAsked(true);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      seekAndPlay();
    }
  };

  return (
    <>
      {!asked && (
        <div className="rj-sound-veil" role="dialog" aria-label="Play song prompt">
          <div className="rj-sound-prompt">
            <p className="rj-sound-prompt-text">Would you like to play the song?</p>
            <div className="rj-sound-prompt-actions">
              <button type="button" className="rj-sound-prompt-yes" onClick={playSong}>
                Yes, play it
              </button>
              <button type="button" className="rj-sound-prompt-no" onClick={dismiss}>
                Not now
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={toggle}
        className={`rj-sound-toggle${playing ? " is-on" : ""}`}
        aria-pressed={playing}
        aria-label={playing ? "Pause the song" : "Play the song"}
      >
        <span className="rj-sound-bars" aria-hidden="true">
          <i></i><i></i><i></i>
        </span>
        {playing ? "playing" : "play the song"}
      </button>
    </>
  );
}
