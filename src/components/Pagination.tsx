import Link from "next/link";

export default function Pagination({
  loading,
  pages,
  totalPages,
  currentPage,
  currentPages,

  previousPages,
  nextPages,
  selectPage,
}: any) {
  return (
    <nav className="pagination">
      <ul>
        <li>
          <button
            onClick={previousPages}
            disabled={loading || currentPage === 1 || currentPages === 1}
          >{`<`}</button>
        </li>
      </ul>
      <ul>
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
            disabled={
              loading ||
              currentPage === totalPages ||
              currentPages === totalPages ||
              totalPages.length === 0
            }
          >{`>`}</button>
        </li>
      </ul>
    </nav>
  );
}
