"use client";

import { useEffect, useRef, useState } from "react";
import VinylRecord from "../components/VinylRecord";
import { Song, songBook } from "../mock-data";
import localFont from "next/font/local";

const fredoka = localFont({
  src: "./fonts/Fredoka.woff",
  variable: "--font-fredoka",
});

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [slashAngle, setSlashAngle] = useState<number>(0);
  const [recordWidth, setRecordWidth] = useState<number>(0);

  const [songA, setSongA] = useState<Song>();
  const [songB, setSongB] = useState<Song>();

  useEffect(() => {
    const r1 = Math.floor(Math.random() * Object.values(songBook).length);
    let r2 = Math.floor(Math.random() * (Object.values(songBook).length - 1));
    r2 = r2 < r1 ? r2 : r2 + 1;

    setSongA(Object.values(songBook)[r1]);
    setSongB(Object.values(songBook)[r2]);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const redrawBackground = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const isCurrentlyPortrait = canvas.width < canvas.height;
      setIsPortrait(isCurrentlyPortrait);

      setSlashAngle(
        isCurrentlyPortrait
          ? (Math.atan((0.3 * window.innerHeight) / window.innerWidth) * 180) /
              Math.PI
          : (Math.atan(window.innerHeight / (0.2 * window.innerWidth)) * 180) /
              Math.PI
      );

      setRecordWidth(
        isCurrentlyPortrait ? 0.8 * window.innerWidth : 0.7 * window.innerHeight
      );

      if (!isCurrentlyPortrait) {
        context.beginPath();
        context.fillStyle = songB ? songB.color : "black";
        context.moveTo(0, 0);
        context.lineTo(0.4 * canvas.width, 0);
        context.lineTo(0.6 * canvas.width, canvas.height);
        context.lineTo(0, canvas.height);
        context.fill();

        context.beginPath();
        context.fillStyle = songA ? songA.color : "black";
        context.moveTo(0.4 * canvas.width, 0);
        context.lineTo(0.6 * canvas.width, canvas.height);
        context.lineTo(canvas.width, canvas.height);
        context.lineTo(canvas.width, 0);
        context.fill();
      } else {
        const r = 0.35;
        const ri = 1 - r;

        context.beginPath();
        context.fillStyle = songB ? songB.color : "black";
        context.moveTo(0, canvas.height);
        context.lineTo(0, r * canvas.height);
        context.lineTo(canvas.width, ri * canvas.height);
        context.lineTo(canvas.width, canvas.height);
        context.fill();

        context.beginPath();
        context.fillStyle = songA ? songA.color : "black";
        context.moveTo(0, 0);
        context.lineTo(0, r * canvas.height);
        context.lineTo(canvas.width, ri * canvas.height);
        context.lineTo(canvas.width, 0);
        context.fill();
      }
    };

    redrawBackground();

    window.addEventListener("orientationchange", redrawBackground);
    window.addEventListener("resize", redrawBackground);

    return () => {
      window.removeEventListener("orientationchange", redrawBackground);
      window.removeEventListener("resize", redrawBackground);
    };
  }, [songA, songB]);

  const max_record_width = 500;

  return (
    <main className={fredoka.variable}>
      <meta
        name="theme-color"
        content={
          isPortrait
            ? songA
              ? songA.color
              : "black"
            : songB
            ? songB.color
            : "black"
        }
      />
      <div
        style={{
          position: "absolute",
          top: isPortrait ? `25%` : "50%",
          transform: "translateY(-50%) translateX(50%)",
          right: isPortrait ? "14%" : "25%",
        }}
      >
        {songA ? (
          <VinylRecord
            song={songA}
            width={recordWidth}
            maxWidth={max_record_width}
          />
        ) : (
          <></>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "50%",
          left: "50%",
          transformOrigin: "bottom",
          transform: `translateX(-50%) rotate(${slashAngle}deg) translateY(-6px)`,
          fontSize: 22,
          fontWeight: "900",
          textWrap: "nowrap",
          color: "black",
          fontFamily: "var(--font-fredoka)",
        }}
      >
        <span style={{ fontSize: 16, opacity: 0.6 }}>
          {songA ? songA.artist : ""}
        </span>
        {` ${songA ? songA.name : ""}`}
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "50%",
          transformOrigin: "top",
          transform: `translateX(50%) rotate(${slashAngle}deg) translateY(4px)`,
          fontSize: 22,
          fontWeight: "900",
          fontFamily: "var(--font-fredoka)",
          textWrap: "nowrap",
          color: "white",
        }}
      >
        {`${songB ? songB.name : ""} `}
        <span style={{ fontSize: 16, opacity: 0.6 }}>
          {songB ? songB.artist : ""}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: isPortrait ? `75%` : "50%",
          transform: "translateY(-50%) translateX(-50%)",
          left: isPortrait ? "14%" : `25%`,
        }}
      >
        {songB ? (
          <VinylRecord
            song={songB}
            width={recordWidth}
            maxWidth={max_record_width}
          />
        ) : (
          <></>
        )}
      </div>
      <canvas
        width={0}
        height={0}
        ref={canvasRef}
        style={{ backgroundColor: songA ? songA.color : "black" }}
      />
    </main>
  );
}
