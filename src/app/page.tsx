import Link from "next/link";
import { songBook } from "../mock-data";

export default function Home() {
  return (
    <main>
      <h1>Vibalry Test Page</h1>
      <br />
      <div>
        <div>Song Previews:</div>
        <ul>
          {Object.values(songBook).map((song) => (
            <li key={song.name} style={{ padding: 5, marginLeft: 30 }}>
              <Link
                href={`/${song.name.toLowerCase().replaceAll(/[^\w]+/g, "")}`}
              >
                {song.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
