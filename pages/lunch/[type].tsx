import { getLunchList } from "../api/sheets";
import { useRouter } from "next/router";
export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      // "/blog/first-post",
      // Object variant:
      { params: { type: "korean" } },
    ],
    fallback: true,
  };
}
function Lunch({ lunchListData }: any) {
  const router = useRouter();
  const thisType = router?.query?.type;
  const filteredLunch = lunchListData?.filter((i: any) => i?.type === thisType);
  const pickedOne = Math.floor(Math.random() * filteredLunch?.length);
  console.log(router, thisType, filteredLunch, pickedOne);
  return (
    <>
      {pickedOne ? (
        <Data
          key={filteredLunch[pickedOne].id}
          sort={filteredLunch[pickedOne].sort}
          type={filteredLunch[pickedOne].type}
          name={filteredLunch[pickedOne].name}
          menu={filteredLunch[pickedOne].menu}
          url={filteredLunch[pickedOne].url}
          imageUrl={filteredLunch[pickedOne].imageUrl}
          description={filteredLunch[pickedOne].description}
          priceRate={filteredLunch[pickedOne].priceRate}
        ></Data>
      ) : (
        <p>LOADING..</p>
      )}
    </>
  );
}

const Data = ({
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
    <div className="font-sans">
      <h1>{name}</h1>
      {imageUrl && imageUrl !== "" ? (
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={imageUrl}
            width={150}
            height={200}
          ></source>
          <img src={imageUrl} width="350" height="400" alt="" />
        </picture>
      ) : (
        ""
      )}
      <h2>
        분류: {type}, {sort}, {menu}
      </h2>
      <p>{description}</p>
      <p>{url}</p>
      {priceRate > 0 ? <span>평균 {priceRate}원</span> : ""}
      <button>다른 거 내놔</button>
    </div>
  );
};

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const sheet = await getLunchList();
  return {
    props: {
      lunchListData: sheet.slice(0, sheet.length), // remove sheet header
    },
    revalidate: 1, // In seconds
  };
}

export default Lunch;
