export default function Items({ items, loading }: any) {
  if (loading) {
    return (
      <tr>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
      </tr>
    );
  }

  // jsonplaceholder posts data
  return items.map((v: any) => (
    <tr key={v.id}>
      <td>{v.id}</td>
      <td>{v.title}</td>
      <td>{v.body}</td>
    </tr>
  ));
}
