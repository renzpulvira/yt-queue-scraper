import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

export default function Nav({ handleNextQueue, playing }) {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  console.log(playing);

  if (!playing) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="border-b-2 border-b-gray-300 flex justify-between items-center">
      <ul className="flex p-0 m-0 ml-2">
        <Link
          className="px-5 py-2 hover:bg-sky-400 hover:text-white rounded-md"
          to="/"
        >
          Home
        </Link>
        <Link
          className="px-5 py-2 hover:bg-sky-400 hover:text-white rounded-md"
          to="/search"
        >
          Search
        </Link>
      </ul>
      <div className="flex items-center pr-2 py-2">
        {playing[0] && (
          <>
            <ReactPlayer
              width={0}
              height={0}
              url={playing[0].url}
              controls={false}
              className="opacity-0 invisible"
              // playing={isPlaying}
              playing={false}
              volume={0.5}
            />
            <p className="mr-2 border px-3 py-1 bg-sky-900 text-white">
              {isPlaying ? "Now Playing" : "Paused"}: {playing[0].title}
            </p>
          </>
        )}

        <button
          onClick={togglePlaying}
          className="mr-3 border-slate-300 bg-sky-500 text-white px-4 py-2 rounded-md"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={handleNextQueue}
          className="border-slate-300 bg-sky-500 text-white px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
