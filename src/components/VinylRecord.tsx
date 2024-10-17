"use client";
import { useEffect, useRef, useState } from "react";
import vinylImage from "../assets/vinyl.png";
import { Song } from "../mock-data";
/* eslint-disable @next/next/no-img-element */

const vinyl_width = 600;
const cover_width = 230;

const preview_length = 7.5;

const VinylRecord = (props: {
  song: Song;
  context: AudioContext | undefined;
}) => {
  const [isRotating, toggleRotation] = useState<boolean>(false);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | undefined>();
  const [source, setSource] = useState<AudioBufferSourceNode | undefined>();

  const [isVinylImageLoaded, setIsVinylImageLoaded] = useState<boolean>(false);
  const [isCoverImageLoaded, setIsCoverImageLoaded] = useState<boolean>(false);
  const areAllImagesLoaded = isVinylImageLoaded && isCoverImageLoaded;

  const vinylImageRef = useRef<HTMLImageElement>(null);
  const coverImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!vinylImageRef.current || !coverImageRef.current) {
      return;
    }

    if (vinylImageRef.current.complete) {
      setIsVinylImageLoaded(true);
    } else {
      vinylImageRef.current.onload = () => setIsVinylImageLoaded(true);
    }

    if (coverImageRef.current.complete) {
      setIsCoverImageLoaded(true);
    } else {
      coverImageRef.current.onload = () => setIsCoverImageLoaded(true);
    }
  }, []);

  useEffect(() => {
    const audioContext = props.context;

    if (!audioContext) {
      return;
    }

    (async () => {
      const response = await fetch(props.song.previewUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      setAudioBuffer(audioBuffer);
    })();
  }, [props.context, props.song.previewUrl]);

  useEffect(() => {
    const audioContext = props.context;

    if (!audioContext || !audioBuffer || !isRotating) {
      return;
    }

    const newSource = audioContext.createBufferSource();
    newSource.buffer = audioBuffer;
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueCurveAtTime([0, 1], audioContext.currentTime, 1);
    gainNode.gain.setValueCurveAtTime(
      [1, 0],
      audioContext.currentTime + preview_length - 1,
      1
    );

    newSource.connect(gainNode);
    gainNode.connect(audioContext.destination);

    newSource.start();
    newSource.stop(audioContext.currentTime + preview_length + 0.5);

    newSource.onended = () => {
      toggleRotation(false);
    };
    setSource(newSource);
  }, [audioBuffer, isRotating, props.context]);

  useEffect(() => {
    if (!isRotating) {
      if (source) {
        source.stop();
        setSource(undefined);
      }
      return;
    }
  }, [isRotating, source]);

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
        opacity: areAllImagesLoaded ? 1 : 0,
      }}
      onClick={() => {
        toggleRotation(!isRotating);
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "100%",
          animation: "spin 2s linear infinite",
          animationPlayState: isRotating ? "running" : "paused",
          userSelect: "none",
          pointerEvents: "none",
          border: "1px solid black",
        }}
      >
        <img
          ref={vinylImageRef}
          src={vinylImage.src}
          width={vinyl_width}
          height={vinyl_width}
          alt="Vinyl Record"
          style={{
            width: "100%",
            height: "100%",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
        <img
          ref={coverImageRef}
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
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

export default VinylRecord;
