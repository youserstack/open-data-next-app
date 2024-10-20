interface Params {
  data: Data | null;
  itemsPerPage: number;
}

export default function DataSummary({ data, itemsPerPage }: Params) {
  if (!data) return null;

  const totalItems = data.list_total_count || 0;
  const totalPage = Math.ceil(data.list_total_count || 0 / itemsPerPage);
  const currentItems = data.row.length || 0;

  return (
    <div className="flex justify-between">
      <h4>전체 데이터 개수 : {totalItems}</h4>
      <h4>전체 페이지 : {totalPage}</h4>
      <h4>현재 페이지 데이터 개수 : {currentItems}</h4>
    </div>
  );
}
