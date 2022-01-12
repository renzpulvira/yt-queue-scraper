import InputField from "../components/Search/InputField";
import Results from "../components/Search/Results";
export default function Search({ searchDummy }) {
  return (
    <div className="Search p-5">
      <InputField />
      <Results searchDummy={searchDummy} />
    </div>
  );
}
