"use client";
import { useEffect, useState } from "react";
import vinylImage from "../assets/vinyl.png";
import { Song } from "../mock-data";
/* eslint-disable @next/next/no-img-element */

const vinyl_width = 600;
const cover_width = 230;

const preview_length = 7.5;

const VinylRecord = (props: { song: Song }) => {
  const [isRotating, toggleRotation] = useState<boolean>(false);

  useEffect(() => {
    const audio = document.getElementById(props.song.name) as
      | HTMLAudioElement
      | undefined;
    if (!audio) return;

    if (!isRotating) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    audio.play();

    const playbackLoop = setInterval(() => {
      console.log(audio.currentTime);
      audio.volume = Math.min(
        audio.currentTime,
        1,
        Math.max(preview_length - audio.currentTime, 0)
      );

      if (audio.currentTime >= preview_length + 0.5) {
        toggleRotation(false);
      }
    });

    return () => clearInterval(playbackLoop);
  }, [isRotating, props.song.name]);

  return (
    <div
      style={{
        maxWidth: "calc(100vw - 20px)",
        maxHeight: "calc(100vw - 20px)",
        width: vinyl_width,
        height: vinyl_width,
        position: "relative",
        textAlign: "center",
        top: 0,
        left: 0,
        borderRadius: "100%",
        boxShadow: "0px 5px 20px rgba(0, 0, 0, .8)",
        cursor: "pointer",
      }}
      onClick={() => {
        toggleRotation((isCurrentlyRotating) => !isCurrentlyRotating);
      }}
    >
      <audio id={props.song.name} preload="auto">
        <source src={props.song.previewUrl} type="audio/mp3" />
      </audio>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "100%",
          animation: "spin 2s linear infinite",
          animationPlayState: isRotating ? "running" : "paused",
          userSelect: "none",
        }}
      >
        <img
          src={vinylImage.src}
          width={vinyl_width}
          height={vinyl_width}
          alt="Vinyl Record"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <img
          src={props.song.imageUrl}
          width={cover_width}
          height={cover_width}
          alt="Album Cover"
          style={{
            position: "relative",
            top: `${-50 - (52 * cover_width) / vinyl_width}%`,
            borderRadius: "100%",
            width: `${(100 * cover_width) / vinyl_width}%`,
            height: `${(100 * cover_width) / vinyl_width}%`,
          }}
        />
      </div>
    </div>
  );
};

export default VinylRecord;
