"use client";

import Items from "../../components/Items";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import "../../styles/open-data.scss";
import { fetchData } from "@/utils/fetchData";
import { getData } from "@/data/getData";

const ITEMS_PER_PAGE = 10; // 페이지당 아이템수

export default function page() {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      const domain = process.env.SEOUL_OPEN_URL;
      const authKey = process.env.SEOUL_OPEN_API_KEY;
      const serviceCode = "VwsmAdstrdNcmCnsmpW";
      const endItem = currentPage * ITEMS_PER_PAGE;
      const startItem = endItem - ITEMS_PER_PAGE + 1;
      const paginate = `${startItem}/${endItem}`;
      const openApiUrl = `${domain}/${authKey}/json/${serviceCode}/${paginate}`;
      const data: any = await getData({
        url: "https://jsonplaceholder.typicode.com/posts",
        page: currentPage,
      });
      // const data: any = await fetchData("https://jsonplaceholder.typicode.com/posts");
      // console.log({ data });
      const { items, totalItems } = data;

      setItems(items);
      setTotalItems(totalItems);
      setLoading(false);
      // const data: any = await fetch(openApiUrl)
      //   .then((res) => res.json())
      //   .catch((err) => console.log({ err }));
      // const { RESULT, list_total_count, row } = data.VwsmAdstrdNcmCnsmpW;
      // console.log({ row });
      // setItems(row);
      // setTotalItems(list_total_count);
      // setLoading(false);
    };

    fetchItems();
  }, [currentPage]);

  // 검색
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // 1000개만 호출이 가능하니, 8000개의 데이터라면 8번 나누어서 데이터를 가져온다.
  const handleSearch = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    try {
      let fetchers = [];

      for (let i = 1; i < 8; i++) {
        const start = (i - 1) * 1000 + 1;
        const end = i * 1000;
        const url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_OPEN_API_KEY}/json/VwsmAdstrdNcmCnsmpW/${start}/${end}`;
        fetchers.push(fetchData(url));
      }

      const responses = await Promise.all(fetchers);
      let rows: any = [];
      for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        const filtered = response.VwsmAdstrdNcmCnsmpW.row.filter((v: any) =>
          v.ADSTRD_CD_NM.includes(search)
        );
        rows.push(...filtered);
      }
      console.log({ rows });

      setFilteredData(rows);
      setTotalItems(rows.length);
    } catch (err) {}
    setLoading(false);
  };

  return (
    <main className="open-data">
      <section>
        <h1 className="title">Search with Open API</h1>
        <div className="search">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
          />
          <button onClick={handleSearch}>행정동 검색</button>
        </div>
        <div className="content">
          {items.length ? (
            <div className="pages">
              <h3>전체 페이지 : {Math.ceil(totalItems / ITEMS_PER_PAGE)}</h3>
              <h3>현재 페이지 : {currentPage}</h3>
              <h3>데이터 개수 : {items.length}</h3>
            </div>
          ) : null}
          <table>
            {/* <thead>
              <tr>
                <th>기준_년분기_코드</th>
                <th>행정동_코드_명</th>
                <th>월_평균_소득_금액</th>
                <th>지출_총금액</th>
              </tr>
            </thead> */}
            <tbody>
              <Items items={filteredData.length ? filteredData : items} loading={loading} />
            </tbody>
          </table>
          <Pagination
            totalItems={totalItems}
            currentPage={currentPage}
            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            setCurrentPage={setCurrentPage}
            // currentPages={currentPages}
            // 액션
            // previousPages={previousPages}
            // nextPages={nextPages}
            // selectPage={selectPage}
          />
        </div>
      </section>
    </main>
  );
}
