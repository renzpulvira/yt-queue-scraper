import React, { useState } from "react";
import ResultItem from "./ResultItem";

export default function Results({ searchDummy }) {
  const [showSearch, setShowSearch] = useState(false);

  console.log(searchDummy);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="Results mt-3">
      <ul>
        {searchDummy.map((item) => (
          <ResultItem key={item.uuid} data={item} />
        ))}
      </ul>
    </div>
  );
}
