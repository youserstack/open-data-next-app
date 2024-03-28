export async function fetchData(url: any) {
  const response = await fetch(url);
  return response.json();
}
