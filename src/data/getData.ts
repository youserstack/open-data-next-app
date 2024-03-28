import { fetchData } from "@/utils/fetchData";

const ITEMS_PER_PAGE = 10; // 페이지당 아이템수

export async function getData({ url, page }: any) {
  const data = await fetchData(url);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  return {
    items: data.slice(start, end),
    totalItems: data.length,
  };
}
