import Layout from "components/common/Layout";
import Loading from "components/common/Loading";
import { useState, useEffect } from "react";
import useSWR from "swr";

const LunchList = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [lunchListData, setLunchListData] = useState([]);

  const fetcher = async () =>
    await fetch("/api/getList", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });
  const { data, error } = useSWR("/api/getList", fetcher);

  useEffect(() => {
    if (data && data.data) {
      setLunchListData(data.data);
    }
    setPageLoaded(true);
  }, [data]);

  return (
    <>
      <ul className="mx-auto max-w-md p-2 shadow">
        {!pageLoaded && <Loading />}
        {lunchListData && lunchListData.length ? (
          lunchListData.map((item: any, index: number) => (
            <Lunch
              key={index}
              sort={item.sort}
              type={item.type}
              name={item.name}
              menu={item.menu}
              url={item.url}
              imageUrl={item.imageUrl}
              description={item.description}
              priceRate={item.priceRate}
            ></Lunch>
          ))
        ) : (
          <Loading />
        )}
      </ul>
    </>
  );
};

const Lunch = ({
  sort,
  name,
  type,
  menu,
  url,
  imageUrl,
  description,
  priceRate,
}: any) => {
  return (
    <li className="group/item relative flex items-center justify-between rounded-xl p-4  text-slate-400 hover:text-slate-200 hover:bg-slate-900/[0.8] mb-1 ">
      <div className="flex gap-4">
        <div className="w-full text-sm leading-6">
          <a className="font-semibold" href={url}>
            {name}
            <svg
              width="15"
              className="inline-flex invisible group-hover/item:visible mt-px h-5 text-slate-400 transition group-hover/edit:translate-x-0.5 group-hover/edit:text-slate-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <p className="text-slate-300">
            {priceRate > 0 ? <span>평균 {priceRate}원</span> : ""}
            <span className="text-slate-500">
              #{type}, #{sort}, #{menu}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
};

LunchList.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;
export default LunchList;
