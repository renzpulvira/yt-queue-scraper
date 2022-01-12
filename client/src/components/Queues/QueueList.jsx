import Queue from "./Queue";

export default function QueueList({ data, removeInQueue, handleMoveNext }) {
  return (
    <>
      <ul className="p-5 pb-0">
        <li className="flex">
          <div className="flex-id font-sans font-bold">#</div>
          <div className="flex-title font-sans font-bold">TITLE</div>
          <div className="flex-1 font-sans font-bold">CHANNEL</div>
          <div className="flex-1 font-sans font-bold text-right">
            CONTROLS
            {/* <div className="btn-group flex">
              <MdOutlineNextPlan className="text-2xl mr-2" />
              <BsFillTrashFill className="text-2xl" />
            </div> */}
          </div>
        </li>
      </ul>
      <ul className="p-5">
        {data &&
          data.map((item, ind) => (
            <Queue
              key={item.uuid}
              index={ind}
              {...item}
              removeInQueue={removeInQueue}
              handleMoveNext={handleMoveNext}
            />
          ))}
      </ul>
    </>
  );
}
