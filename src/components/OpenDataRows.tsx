import { formatEokwon, formatManwon, formatYear } from "@/utils/format";

export default function OpenDataRows({ items, loading }: any) {
  if (loading) {
    return (
      <tr>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
      </tr>
    );
  }

  return items.map((v: any, i: any) => (
    // ADSTRD_CD 행정동 코드

    // ADSTRD_CD_NM 행정동_코드_명
    // MT_AVRG_INCOME_AMT 월_평균_소득_금액
    // EXPNDTR_TOTAMT 지출_총금액
    // FDSTFFS_EXPNDTR_TOTAMT	식료품_지출_총금액
    // CLTHS_FTWR_EXPNDTR_TOTAMT 의류_신발_지출_총금액
    // LVSPL_EXPNDTR_TOTAMT	생활용품_지출_총금액
    // MCP_EXPNDTR_TOTAMT	의료비_지출_총금액
    // TRNSPORT_EXPNDTR_TOTAMT	교통_지출_총금액
    // EDC_EXPNDTR_TOTAMT	교육_지출_총금액
    // PLESR_EXPNDTR_TOTAMT	유흥_지출_총금액
    // LSR_CLTUR_EXPNDTR_TOTAMT	여가_문화_지출_총금액
    // ETC_EXPNDTR_TOTAMT	기타_지출_총금액
    // FD_EXPNDTR_TOTAMT	음식_지출_총금액

    <tr key={i}>
      <td>{v.ADSTRD_CD_NM}</td>
      <td>{formatManwon(v.MT_AVRG_INCOME_AMT)}</td>
      <td>{formatEokwon(v.EXPNDTR_TOTAMT)}</td>

      <td>{v.FDSTFFS_EXPNDTR_TOTAMT.toLocaleString() + " 원"}</td>
      <td>{v.CLTHS_FTWR_EXPNDTR_TOTAMT.toLocaleString() + " 원"}</td>
      <td>{v.LVSPL_EXPNDTR_TOTAMT.toLocaleString() + " 원"}</td>
      <td>{v.MCP_EXPNDTR_TOTAMT.toLocaleString() + " 원"}</td>
      <td>{v.TRNSPORT_EXPNDTR_TOTAMT.toLocaleString() + " 원"}</td>
      <td>{v.EDC_EXPNDTR_TOTAMT.toLocaleString() + " 원"}</td>
      <td>{v.PLESR_EXPNDTR_TOTAMT.toLocaleString() + " 원"}</td>
      <td>{v.LSR_CLTUR_EXPNDTR_TOTAMT.toLocaleString() + " 원"}</td>
      <td>{v.ETC_EXPNDTR_TOTAMT.toLocaleString() + " 원"}</td>
      <td>{v.FD_EXPNDTR_TOTAMT.toLocaleString() + " 원"}</td>
    </tr>
  ));
}
