import { getLunchList } from "../api/sheets";
import Image from "next/image";
export default function LunchList({ lunchListData }: any) {
  return (
    <>
      <ul className="mx-auto max-w-md bg-white p-2 shadow">
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
          <li>Error..</li>
        )}
      </ul>
    </>
  );
}

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
    <li className="group/item relative flex items-center justify-between rounded-xl p-4 hover:bg-slate-100">
      <div className="flex gap-4">
        <div className="w-full text-sm leading-6">
          <a className="font-semibold text-slate-900" href={url}>
            {name}
          </a>
          <p>
            분류: {type}, {sort}, {menu}
          </p>
          <div className="text-slate-500">
            {priceRate > 0 ? <span>평균 {priceRate}원</span> : ""}
          </div>
        </div>
      </div>

      <a
        className="group/edit invisible relative flex items-center whitespace-nowrap rounded-full py-1 pl-4 pr-3 text-sm text-slate-500 transition hover:bg-slate-200 group-hover/item:visible"
        href={url}
      >
        <span className="font-semibold transition group-hover/edit:text-gray-700">
          More
        </span>
        <svg
          className="mt-px h-5 w-5 text-slate-400 transition group-hover/edit:translate-x-0.5 group-hover/edit:text-slate-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
    </li>
  );
};

export async function getStaticProps(context: any) {
  const sheet = await getLunchList();
  return {
    props: {
      lunchListData: sheet.slice(0, sheet.length), // remove sheet header
    },
    revalidate: 1, // In seconds
  };
}
