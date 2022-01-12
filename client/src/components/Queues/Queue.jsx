import { MdOutlineNextPlan } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { BsMusicNoteBeamed } from "react-icons/bs";

export default function Queue({
  index,
  removeInQueue,
  handleMoveNext,
  ...item
}) {
  return (
    <li className="flex last:mb-0 mb-5">
      {index === 0 ? (
        <div className="flex-id font-sans">
          <BsMusicNoteBeamed className="relative -bottom-1" />
        </div>
      ) : (
        <div className="flex-id font-sans">
          {index > 9 ? index + 1 : "0" + (index + 1)}
        </div>
      )}

      <div className="flex-title font-sans">{item.title}</div>
      <div className="flex-1 font-sans">{item.channel}</div>
      <div className="flex-1 font-sans">
        <div className="btn-group text-right flex justify-end">
          <MdOutlineNextPlan
            onClick={() => handleMoveNext(index)}
            className="text-2xl mr-2 hover:cursor-pointer"
          />
          <BsFillTrashFill
            onClick={() => removeInQueue(index)}
            className="text-2xl hover:cursor-pointer"
          />
        </div>
      </div>
    </li>
  );
}
