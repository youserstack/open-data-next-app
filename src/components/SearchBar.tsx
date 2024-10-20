import { useState } from "react";

export default function SearchBar() {
  const [searchWord, setSearchWord] = useState("");

  // 검색
  // const [searchedItems, setSearchedItems] = useState([]);
  // const [paginatedItems, setPaginatedItems] = useState([]);
  // const [searchedTotalItems, setSearchedTotalItems] = useState(0);

  return (
    <div className="flex gap-4">
      <input
        className="px-4"
        type="text"
        onChange={(e) => setSearchWord(e.target.value)}
        // onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
      />

      <button onClick={() => {}}>행정동 검색</button>

      <button
        // onClick={handleSort}
        // disabled={searchedItems.length === 0}
        className="disabled:cursor-not-allowed"
      >
        검색결과 사전순 정렬
      </button>
    </div>
  );
}
