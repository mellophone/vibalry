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

  useEffect(() => {}, [isRotating]);

  return (
    <div
      style={{
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
        toggleRotation((currentRotation) => {
          const audio = document.getElementById(props.song.name) as
            | HTMLAudioElement
            | undefined;
          if (!audio) return !currentRotation;

          if (currentRotation) {
            audio.pause();
            audio.currentTime = 0;
          } else {
            audio.volume = 0;
            audio.play();

            const playbackLoop = setInterval(() => {
              audio.volume = Math.min(
                audio.currentTime,
                1,
                Math.max(preview_length - audio.currentTime, 0)
              );

              if (audio.currentTime >= preview_length + 0.5) {
                toggleRotation(false);
                audio.pause();
                audio.currentTime = 0;
                clearInterval(playbackLoop);
              }
            });
          }

          return !currentRotation;
        });
      }}
    >
      <audio id={props.song.name}>
        <source src={props.song.previewUrl} type="audio/mp3" />
      </audio>
      <div
        style={{
          width: vinyl_width,
          height: vinyl_width,
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
        />
        <img
          src={props.song.imageUrl}
          width={cover_width}
          height={cover_width}
          alt="Album Cover"
          style={{
            position: "relative",
            top: -vinyl_width / 2 - cover_width / 2 - 4,
            borderRadius: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default VinylRecord;
