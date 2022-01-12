import Player from "../components/Player/Player";
import QueueList from "../components/Queues/QueueList";

export default function Home({ data, removeInQueue, handleMoveNext }) {
  return (
    <div className="Home">
      {data.length > 0 ? (
        <>
          <QueueList
            data={data}
            removeInQueue={removeInQueue}
            handleMoveNext={handleMoveNext}
          />
        </>
      ) : (
        <p className="p-5">No video Currently on Queue</p>
      )}
    </div>
  );
}
