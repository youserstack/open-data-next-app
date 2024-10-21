import Link from "next/link";

interface Props {
  ITEMS_PER_PAGE: number;
  totalItems: number;
  currentPage: number;
  setCurrentPage: any;
}

const PAGES_PER_VIEW = 10; // 화면당 페이지 개수

export default function Pagination({
  ITEMS_PER_PAGE,
  totalItems,
  currentPage,
  setCurrentPage,
}: Props) {
  // 전체 페이지 개수 = 전체 아이템 개수 / 페이지당 아이템 개수
  const totalPages: any = Math.ceil(totalItems / ITEMS_PER_PAGE); // 마지막 페이지, 페이지 구간에서 next button disable 을 하기 위해 필요

  // 현재 페이지 그룹의 넘버들를 담을 배열을 만든다.
  // 현재 페이지 그룹을 알아내야 현재 페이지 그룹의 넘버들을 만들 수 있다.
  // 현재 페이지 그룹 = 현재 페이지 / 화면당 페이지 개수
  let pages: number[] = [];
  let currentPageGroup = Math.ceil(currentPage / PAGES_PER_VIEW);
  const start = PAGES_PER_VIEW * (currentPageGroup - 1);
  const end = Math.min(PAGES_PER_VIEW * currentPageGroup, totalPages); // 전체 페이지 개수보다 커질 수 없게 한다.
  // const end =
  //   PAGES_PER_VIEW * currentPageGroup > totalPages ? totalPages : PAGES_PER_VIEW * currentPageGroup;
  for (let i = start; i < end; i++) {
    pages.push(i + 1); // index가 0에서부터 시작하니까 +1
  }

  const previousPages = () => setCurrentPage((page: number) => page - 1);
  const nextPages = () => setCurrentPage((page: number) => page + 1);
  const selectPage = (page: any) => setCurrentPage(page);

  return (
    <div className="flex justify-between items-center">
      <button onClick={previousPages} disabled={currentPage === 1}>{`<`}</button>

      <div className="flex gap-4 flex-wrap">
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
        {pages.map((page: number) => {
          return (
            <Link
              className={`px-4 py-1 bg-neutral-200 rounded-sm    
                ${page === currentPage ? "text-blue-500" : ""}`}
              key={page}
              href={""}
              onClick={() => selectPage(page)}
            >
              {page}
            </Link>
          );
        })}
      </div>

      <button
        onClick={nextPages}
        disabled={currentPage === totalPages || totalPages.length === 0}
      >{`>`}</button>
    </div>
  );
}
