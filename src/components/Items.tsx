import { formatEokwon, formatManwon, formatYear } from "@/utils/format";

export default function Items({ items, loading }: any) {
  if (loading) {
    return (
      <tr>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
      </tr>
    );
  }
  return items.map((v: any, i: any) => (
    // ADSTRD_CD : 행정동 코드
    // STDR_YYQU_CD : 기준_년분기_코드
    // ADSTRD_CD_NM : 행정동_코드_명
    // MT_AVRG_INCOME_AMT: 월_평균_소득_금액
    // EXPNDTR_TOTAMT : 지출_총금액
    <tr key={i}>
      <td>{formatYear(v.STDR_YYQU_CD || v.stdr_yyqu_cd)}</td>
      <td>{v.ADSTRD_CD_NM || v.adstrd_cd_nm}</td>
      <td>{formatManwon(v.MT_AVRG_INCOME_AMT || v.mt_avrg_income_amt)}</td>
      <td>{formatEokwon(v.EXPNDTR_TOTAMT || v.expndtr_totamt)}</td>
    </tr>
  ));
}
