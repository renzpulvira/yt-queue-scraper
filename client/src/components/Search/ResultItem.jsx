export default function ResultItem({ data }) {
  console.log(data);
  return (
    <li className="Results__item py-3 last:pb-0 px-0 flex justify-between align-middle">
      <div className="">
        <h3>{data.title}</h3>
        <span>{data.channel}</span>
      </div>
      <div className="">
        <button className="py-2 px-4 bg-sky-700 text-white rounded-md">
          Add To Queue
        </button>
      </div>
    </li>
  );
}
