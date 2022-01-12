import { useState } from "react";
import ReactPlayer from "react-player";

export default function Player({ playing, handleNextQueue }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="Player p-5 flex">
      <ReactPlayer
        className="flex-2"
        url={playing.url}
        onEnded={handleNextQueue}
        playing={isPlaying}
        volume={0.2}
      />
      <div className="flex-1 p-5 pt-0">
        <span className="font-light">Now PLaying:</span>
        <h3 className="font-bold mb-5">{playing.title}</h3>
        <span className="font-light">Channel:</span>
        <h3 className="font-medium mb-5">{playing.channel}</h3>
        <p>
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
        </p>
      </div>
    </div>
  );
}
