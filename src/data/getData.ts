import { fetchData } from "@/utils/fetchData";

export async function getData({ url, page, ITEMS_PER_PAGE }: any) {
  const data = await fetchData(url);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  return {
    items: data.slice(start, end),
    totalItems: data.length,
  };
}
