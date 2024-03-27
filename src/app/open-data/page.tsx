"use client";

import Items from "../../components/Items";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import "../../styles/open-data.scss";

export default function page() {
  const [loading, setLoading] = useState(false);

  // 패칭 데이터
  const [totalItems, setTotalItems] = useState(0); // 전체 아이템수
  const [items, setItems] = useState([]);

  // 페이징
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 50; // 페이지당 아이템수

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      const domain = process.env.SEOUL_OPEN_URL;
      const authKey = process.env.SEOUL_OPEN_API_KEY;
      const serviceCode = "VwsmAdstrdNcmCnsmpW";

      // 페이지네이션을 위한 계산
      // 1*10-10+1, 1*10
      // 2*10-10+1, 2*10
      // 3*10-10+1, 3*10
      const endItem = currentPage * itemsPerPage;
      const startItem = endItem - itemsPerPage + 1;

      // let pages = [];
      // for (let i = startItem; i <= endItem; i++) pages.push(i);
      // setPages(pages);

      const paginate = `${startItem}/${endItem}`;
      console.log({ paginate });
      const openApiUrl = `${domain}/${authKey}/json/${serviceCode}/${paginate}`;
      // console.log({ openApiUrl });

      const data: any = await fetch(openApiUrl)
        .then((res) => res.json())
        .catch((err) => console.log({ err }));
      const { RESULT, list_total_count, row } = data.VwsmAdstrdNcmCnsmpW;
      // const res = await axios({ method: "get", url: openApiUrl });
      // const { RESULT, list_total_count, row } = res.data.VwsmAdstrdNcmCnsmpW;
      console.log({ row });

      setTotalItems(list_total_count);
      setItems(row);
      setLoading(false);
    };
    fetchItems();
  }, [currentPage]);

  // 페이징 구간
  const [currentPages, setCurrentPages] = useState(1); // 현재 페이지가 있는 구간
  const pagesPerView = 10; // 화면당 페이지수
  const totalPages = Math.ceil(totalItems / itemsPerPage); // 마지막 페이지, 페이지 구간에서 next button disable 을 하기 위해 필요

  let pages = [];
  let endPage = currentPages * pagesPerView;
  let startPage = endPage - pagesPerView + 1;
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const previousPages = () => {
    setCurrentPage((page) => page + pagesPerView); // 화면당 페이지수 만큼 점프한다.
    setCurrentPages((pages) => pages - 1);
  };

  const nextPages = () => {
    setCurrentPage((page) => page + pagesPerView);
    setCurrentPages((pages) => pages + 1);
  };

  const selectPage = (page: any) => {
    setCurrentPage(page);
  };

  // 검색
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (e: any) => {
    const filtered = items.filter((v: any) => v.ADSTRD_CD_NM.includes(e.target.value));
    console.log({ filtered });
    setFilteredData(filtered);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    const filtered = items.filter((v: any) => v.ADSTRD_CD_NM.includes(search));
    console.log({ filtered });
    setFilteredData(filtered);
  };

  return (
    <main className="open-data">
      <section>
        <h1 className="title">Search with Open API</h1>
        <div className="search">
          <input
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
              // handleFilter(e);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleFilter(e)}
          />
          <button onClick={handleSearch}>행정동 검색</button>
        </div>
        <div className="content">
          {items.length ? (
            <div className="pages">
              <h3>전체 페이지 : {Math.ceil(totalItems / itemsPerPage)}</h3>
              <h3>현재 페이지 : {currentPage}</h3>
              <h3>데이터 개수 : {items.length}</h3>
            </div>
          ) : null}
          <table>
            <thead>
              <tr>
                <th>기준_년분기_코드</th>
                <th>행정동_코드_명</th>
                <th>월_평균_소득_금액</th>
                <th>지출_총금액</th>
              </tr>
            </thead>
            <tbody>
              <Items items={filteredData.length ? filteredData : items} loading={loading} />
            </tbody>
          </table>
          <Pagination
            loading={loading}
            pages={pages}
            totalPages={totalPages}
            currentPage={currentPage}
            currentPages={currentPages}
            // 액션
            previousPages={previousPages}
            nextPages={nextPages}
            selectPage={selectPage}
          />
        </div>
      </section>
    </main>
  );
}
