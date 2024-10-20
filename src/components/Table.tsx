import OpenDataRows from "@/components/OpenDataRows";

interface Params {
  data: Data | null;
  loading: boolean;
}

export default function Table({ data, loading }: Params) {
  return (
    <div className="overflow-x-scroll">
      <table
        className="w-max border-collapse bg-white 
        [&_th]:p-2 [&_th]:border [&_th]:bg-neutral-300
        [&_td]:p-2 [&_td]:border
        [&_tr:nth-of-type(n):hover]:bg-blue-100"
      >
        <thead>
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
        </thead>
        <tbody>
          <OpenDataRows items={data?.row} loading={loading} />
          {/* <OpenDataRows items={searchWord ? paginatedItems : items} loading={loading} /> */}
        </tbody>
      </table>
    </div>
  );
}
