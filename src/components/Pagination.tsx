import Link from "next/link";
import { useState } from "react";

const PAGES_PER_VIEW = 5; // 화면당 페이지수

export default function Pagination({
  totalItems,
  currentPage,
  setCurrentPage,
  ITEMS_PER_PAGE,
}: any) {
  const [currentPageGroup, setCurrentPageGroup] = useState(1); // 현재 페이지 그룹
  const totalPages: any = Math.ceil(totalItems / ITEMS_PER_PAGE); // 마지막 페이지, 페이지 구간에서 next button disable 을 하기 위해 필요
  // console.log({ currentPageGroup });

  let pages: any = [];
  let pageGroup = Math.ceil(currentPage / PAGES_PER_VIEW);
  for (let i = (pageGroup - 1) * PAGES_PER_VIEW + 1; i <= pageGroup * PAGES_PER_VIEW; i++) {
    pages.push(i);
  }

  const previousPages = () => setCurrentPage((page: any) => page - 1);
  const nextPages = () => setCurrentPage((page: any) => page + 1);
  const selectPage = (page: any) => setCurrentPage(page);

  return (
    <nav className="pagination">
      <ul>
        <li>
          <button onClick={previousPages} disabled={currentPage === 1}>{`<`}</button>
        </li>
      </ul>
      <ul>
        {/* {Array(totalPages)
          .fill(undefined)
          .map((page: any, index: any) => {
            return (
              <li
                className={`page-number ${index + 1 === currentPage ? "current-page" : ""}`}
                key={page + 1}
              >
                <Link href={""} onClick={() => selectPage(index + 1)}>
                  {index + 1}
                </Link>
              </li>
            );
          })} */}
        {pages.map((page: any) => {
          return (
            <li className={`page-number ${page === currentPage ? "current-page" : ""}`} key={page}>
              <Link href={""} onClick={() => selectPage(page)}>
                {page}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul>
        <li>
          <button
            onClick={nextPages}
            disabled={currentPage === totalPages || totalPages.length === 0}
          >{`>`}</button>
        </li>
      </ul>
    </nav>
  );
}
