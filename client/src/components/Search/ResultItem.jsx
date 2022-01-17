import axios from "axios";
export default function ResultItem({ data }) {
  console.log(data);

  const addSelected = async () => {
    try {
      const response = await axios.post("http://localhost:1337/api/queue/add", {
        title: data.title,
        video_id: data.url,
        channel: data.channel,
      });
      console.log(response);
    } catch (err) {
      if (err) console.log(err);
    }
  };

  return (
    <li
      className="Results__item py-3 last:pb-0 px-0 flex justify-between align-middle"
      onClick={() => addSelected()}
    >
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
