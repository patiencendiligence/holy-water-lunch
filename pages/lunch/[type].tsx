import { getLunchList } from "../api/sheets";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import WaterSvg from "components/common/WaterSvg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useRef, useState, useEffect } from "react";
import { ILunch, options } from "components/common/types";
import Layout from "components/common/Layout";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

export async function getStaticPaths() {
  return {
    paths: [{ params: { type: "" } }],
    fallback: true,
  };
}
const SwiperController = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  right: auto;
  width: 50px;
  height: 50px;
  margin-top: -25px;
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--swiper-navigation-color, var(--swiper-theme-color));
`;

const Lunch = ({ lunchListData }: any) => {
  const router = useRouter();
  const lunchTypeKeys = options.map((t: any) => {
    return t.value;
  });
  const thisType =
    router?.query?.type !== "random"
      ? router.query.type
      : lunchTypeKeys[Math.floor(Math.random() * lunchTypeKeys.length)];
  const filteredLunch = lunchListData?.filter(
    (i: ILunch) => i?.type === thisType
  );
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, [pageLoaded]);

  return (
    <section className="work-carousel metro position-re">
      {filteredLunch && pageLoaded && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 no-padding">
              <div className="swiper-container" style={{ width: "100vw" }}>
                <Swiper
                  className="swiper-wrapper"
                  modules={[Navigation]}
                  spaceBetween={30}
                  loop={true}
                  pagination={{
                    clickable: true,
                  }}
                  centeredSlides={true}
                  lazy={true}
                  observer={true}
                  observeParents={true}
                  // navigation={{
                  //   prevEl: navigationPrevRef.current,
                  //   nextEl: navigationNextRef.current,
                  // }}
                  // onBeforeInit={(swiper) => {
                  // swiper!.params!.navigation!.prevEl =
                  //   navigationPrevRef.current;
                  // swiper!.params!.navigation!.nextEl =
                  //   navigationNextRef.current;
                  //   swiper.navigation.init();
                  //   swiper.navigation.update();
                  // }}
                  // autoplay={{
                  //   delay: 2500,
                  //   disableOnInteraction: false,
                  // }}
                  speed={1000}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    767: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    991: {
                      slidesPerView: 2,
                    },
                  }}
                >
                  {filteredLunch.map((item: ILunch, index: number) => (
                    <SwiperSlide
                      className="swiper-slide"
                      key={item.name + "-" + index}
                    >
                      <Data
                        key={item.name + "-" + index}
                        sort={item.sort}
                        type={item.type}
                        name={item.name}
                        menu={item.menu}
                        url={item.url}
                        imageUrl={item.imageUrl}
                        description={item.description}
                        priceRate={item.priceRate}
                      ></Data>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <SwiperController
                  ref={navigationNextRef}
                  className="swiper-nav-ctrl cursor-pointer right hover:scale-110 ease-in-out duration-150 group"
                >
                  <span className="invisible group-hover:visible block animate-ping absolute h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                </SwiperController>
                <SwiperController
                  ref={navigationPrevRef}
                  className="cursor-pointer hover:scale-110 ease-in-out duration-150 group"
                  style={{ right: "10px", left: "auto" }}
                >
                  <span className="invisible group-hover:visible block animate-ping absolute h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                </SwiperController>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const Data = ({
  sort,
  name,
  type,
  menu,
  url,
  imageUrl,
  description,
  priceRate,
  isDisplayed,
}: ILunch) => {
  const router = useRouter();
  const movePath = (path: any) => {
    console.log(typeof path);
    path && path === "asPath"
      ? router.replace(router.asPath)
      : router.replace(path);
  };

  return (
    <div className="font-sans relative px-4 items-start sm:px-6 md:max-w-2xl md:px-4 lg:px-4 py-6 text-2xl">
      <h1 className="font-bold leading-7 text-slate-300">{name}</h1>
      <div className="mt-4 flex items-center gap-4">
        {/* <button
          className="flex items-center text-sm font-bold leading-6 text-cyan-500 hover:text-cyan-700 active:text-cyan-900"
          type="button"
          onClick={(path) => movePath("asPath")}
        >
          <WaterSvg width={20} color={"#14b4fc"} />
          다른 거
        </button> */}
        {/* <span className="text-sm font-bold text-slate-400">/</span> */}
        <button
          className="flex items-center text-sm font-bold leading-6 text-cyan-500 hover:text-cyan-700 active:text-cyan-900"
          onClick={() => (url ? movePath(url) : "")}
        >
          <WaterSvg width={20} color={"#14b4fc"} />
          Move detail
        </button>
      </div>
      {imageUrl && imageUrl !== "" ? (
        <picture className="relative mx-auto my-4 block w-98 overflow-hidden rounded-lg bg-slate-800 shadow-xl shadow-slate-800 sm:rounded-xl lg:w-auto lg:rounded-2xl">
          <source
            media="(max-width: 98vw)"
            srcSet={imageUrl}
            width={150}
            height={150}
          ></source>
          <img src={imageUrl} width="100%" height="100%" alt="" />
        </picture>
      ) : (
        ""
      )}
      <>
        <p className="mt-3 text-lg font-medium leading-8 text-slate-500">
          {`#${type}, #${sort}, #${menu}`}
        </p>

        <p className="mt-1 text-base leading-7 text-slate-300 max-w-2xl">
          {description}
        </p>
        {priceRate && priceRate > 0 && (
          <p className="font-mono text-sm leading-7 text-slate-500">
            <span>평균 {priceRate}원</span>
          </p>
        )}
      </>
    </div>
  );
};
// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const sheet = await getLunchList();
  return {
    props: {
      lunchListData: sheet
        .slice(0, sheet.length)
        .filter((l) => !!l.isDisplayed && l.isDisplayed !== "FALSE"), // remove sheet header
    },
    revalidate: 1, // In seconds
  };
}

Lunch.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Lunch;
