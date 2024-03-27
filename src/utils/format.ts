export function formatManwon(some: any) {
  return Math.floor(some / 10000) + " 만원";
}

export function formatEokwon(some: any) {
  return Math.floor(some / 100000000) + " 억원";
}

export function formatYear(some: any) {
  return String(some).slice(4) + "분기";
  // return String(some).slice(0, 4) + "년 " + String(some).slice(4) + "분기";
}
