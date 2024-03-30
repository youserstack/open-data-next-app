"use client";

import OpenDataRows from "@/components/OpenDataRows";
import JsonplaceholderPosts from "@/components/JsonplaceholderPosts";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { getData, getDataWithOpenApi } from "@/data/getData";
import "../../styles/open-data.scss";

const ITEMS_PER_PAGE = 50; // 페이지당 아이템수

export default function page() {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [seviceName, setServiceName] = useState("");

  useEffect(() => {
    // 테스트 데이터
    const fetchPosts = async () => {
      setLoading(true);

      const data: any = await getData({
        url: "https://jsonplaceholder.typicode.com/posts",
        page: currentPage,
        ITEMS_PER_PAGE,
      });
      const { items, totalItems } = data;

      setItems(items);
      setTotalItems(totalItems);
      setLoading(false);
    };

    // 서울시 공공 데이터
    const fetchOpenDataRows = async () => {
      setLoading(true);
      const domain = process.env.SEOUL_OPEN_URL;
      const authKey = process.env.SEOUL_OPEN_API_KEY;
      const serviceCode = "VwsmAdstrdNcmCnsmpW";
      const start = ITEMS_PER_PAGE * (currentPage - 1) + 1; // 시작에 1을 더해준다.
      const end = ITEMS_PER_PAGE * currentPage;
      const openApiUrl = `${domain}/${authKey}/json/${serviceCode}/${start}/${end}`;
      const data: any = await getDataWithOpenApi({
        url: openApiUrl,
      });
      const { RESULT, list_total_count, row } = data.VwsmAdstrdNcmCnsmpW;
      console.log({ data });
      const keys: any = Object.keys(data);
      setServiceName(keys[0]);
      setItems(row);
      setTotalItems(list_total_count);
      setLoading(false);
    };

    if (searchWord) return paginateSearchedItems();
    fetchOpenDataRows();
    // fetchPosts();
  }, [currentPage]);

  // 검색
  const [searchWord, setSearchWord] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [searchedTotalItems, setSearchedTotalItems] = useState(0);

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
          v.ADSTRD_CD_NM.includes(searchWord)
        );
        rows.push(...filtered);
      }
      // console.log({ rows });

      setSearchedItems(rows);
      setSearchedTotalItems(rows.length);
      // 검색된 아이템들은 클라이언트에 모두 저장되어 있기 때문에
      // 페이지를 이동할때 저장된 클라이언트의 데이터에서 추출만하면 된다.
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const slicedItems = rows.slice(start, end);
      setPaginatedItems(slicedItems);
      setCurrentPage(1);
    } catch (err) {
      console.log({ err });
    }
    setLoading(false);
  };

  const handleSort = (e: any) => {
    console.log({ searchedItems });
    e.preventDefault();

    // 내림차순 정렬
    const sortedItems = searchedItems.sort((next: any, prev: any): any => {
      if (prev.ADSTRD_CD_NM > next.ADSTRD_CD_NM) return -1;
      if (prev.ADSTRD_CD_NM < next.ADSTRD_CD_NM) return 1;
      else return 0;
    });

    // 검색 아이템
    setSearchedItems(sortedItems);
    // 현재 페이지를 1로 해준다.
    setCurrentPage(1);
    // 정렬된 모든 아이템을 다시 페이지네이션한다.
    paginateSearchedItems();
  };

  // 검색 데이터 페이지네이트 (시작-끝 페이지를 정한다.)
  const paginateSearchedItems = () => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const slicedItems = searchedItems.slice(start, end);
    setPaginatedItems(slicedItems);
  };

  return (
    <main className="open-data">
      <section>
        <h1 className="title">서울시 소득소비 데이터</h1>
        <div className="search">
          <input
            type="text"
            onChange={(e) => setSearchWord(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
          />
          <button className="search-button" onClick={handleSearch}>
            행정동 검색
          </button>
          <button
            className="sort-button"
            onClick={handleSort}
            disabled={searchedItems.length === 0}
          >
            검색결과 사전순 정렬
          </button>
        </div>
        <div className="content">
          {items.length ? (
            <div className="pages">
              <h4>전체 데이터 개수 : {searchWord ? searchedTotalItems : totalItems}</h4>
              <h4>
                전체 페이지 :{" "}
                {searchWord
                  ? Math.ceil(searchedTotalItems / ITEMS_PER_PAGE)
                  : Math.ceil(totalItems / ITEMS_PER_PAGE)}
              </h4>
              <h4>현재 페이지 데이터 개수 : {searchWord ? paginatedItems.length : items.length}</h4>
            </div>
          ) : null}
          <div className="table">
            <table>
              <thead>
                {seviceName === "VwsmAdstrdNcmCnsmpW" ? (
                  <tr>
                    <th>행정동_코드_명</th>
                    <th>월_평균_소득_금액</th>
                    <th>지출_총금액</th>
                    <th>식료품_지출_총금액</th>
                    <th>의류_신발_지출_총금액</th>
                    <th>생활용품_지출_총금액</th>
                    <th>의료비_지출_총금액</th>
                    <th>교통_지출_총금액</th>
                    <th>교육_지출_총금액</th>
                    <th>유흥_지출_총금액</th>
                    <th>여가_문화_지출_총금액</th>
                    <th>기타_지출_총금액</th>
                    <th>음식_지출_총금액</th>
                  </tr>
                ) : null}
              </thead>
              <tbody>
                <OpenDataRows items={searchWord ? paginatedItems : items} loading={loading} />
                {/* <JsonplaceholderPosts
                items={searchedItems.length ? searchedItems : items}
                loading={loading}
              /> */}
              </tbody>
            </table>
          </div>
          <Pagination
            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={searchWord ? searchedTotalItems : totalItems}
          />
        </div>
      </section>
    </main>
  );
}
