"use client";

import DataSummary from "@/components/DataSummary";
import Table from "@/components/Table";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 50;

export default function OpenData() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);

    const service = "VwsmAdstrdNcmCnsmpW";
    const start = ITEMS_PER_PAGE * (currentPage - 1) + 1; // 시작에 1을 더해준다.
    const end = ITEMS_PER_PAGE * currentPage;
    const proxyServerApiUrl = `/api/${process.env.API_KEY}/json/${service}/${start}/${end}`;
    console.log({ proxyServerApiUrl });

    fetch(proxyServerApiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!data.VwsmAdstrdNcmCnsmpW) throw new Error("VwsmAdstrdNcmCnsmpW not found in response");

        setData(data.VwsmAdstrdNcmCnsmpW);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => console.log({ data }), [data]);

  return (
    <main className="mt-[200px] mb-[200px]">
      <div
        className="fixed inset-0 z-[-10]
        bg-cover bg-no-repeat bg-center bg-neutral-900"
      ></div>

      <section className="max-w-screen-lg mx-auto space-y-4 [&_>_*]:p-4">
        <h1>서울시 소득소비 데이터</h1>

        <div className="space-y-4">
          <DataSummary data={data} itemsPerPage={ITEMS_PER_PAGE} />
          <Table data={data} loading={loading} />
          <Pagination
            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            totalItems={data?.list_total_count || 0}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
    </main>
  );
}
