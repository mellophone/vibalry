import { redirect } from "next/navigation";
import VinylRecord from "../../components/VinylRecord";
import { Song, songBook } from "../../mock-data";
/* eslint-disable @next/next/no-img-element */

const SongPreview = ({ params }: { params: { songTitle: string } }) => {
  const song = songBook[params.songTitle as keyof typeof songBook] as
    | Song
    | undefined;

  if (!song) {
    redirect("/");
  }

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: song.color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <title>{`${song.name} - Vibalry`}</title>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 30,
          textAlign: "center",
        }}
      >
        <VinylRecord song={song} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 10,
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
          }}
        >
          <div style={{ fontSize: 30 }}>{song.name}</div>
          <div style={{ fontSize: 16, opacity: 0.7 }}>{song.artist}</div>
        </div>
      </div>
    </main>
  );
};

export default SongPreview;
