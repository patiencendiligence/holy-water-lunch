import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import WaterSvg from "components/common/WaterSvg";
import Layout from "components/common/Layout";
import Loading from "components/common/Loading";
import { ILunch, options } from "components/common/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const Lunch = () => {
  const router = useRouter();
  const lunchTypeKeys = options.map((t: any) => {
    return t.value;
  });

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
    const movePath = (path: any) => {
      console.log(typeof path);
      path && path === "asPath"
        ? router.replace(router.asPath)
        : router.replace(path);
    };
    const imageSrc =
      imageUrl && imageUrl !== ""
        ? imageUrl
        : "https://github.com/patiencendiligence/holy-water-lunch/blob/a2b9d699b2fcf1c75520a2a90fbf1f2641600f5e/public/image.png?raw=true";
    return (
      <div className="font-sans relative px-4 items-start sm:px-6 max-w-2xl md:px-4 lg:px-4 py-6 text-2xl mx-auto">
        <h1 className="font-bold leading-7 text-slate-300">{name}</h1>
        <div className="mt-4 flex items-center gap-4">
          <button
            className="flex items-center text-sm font-bold leading-6 text-cyan-500 hover:text-cyan-700 active:text-cyan-900"
            onClick={() => (url ? movePath(url) : "")}
          >
            <WaterSvg width={20} color={"#14b4fc"} />
            Move detail
          </button>
        </div>
        {imageUrl && imageUrl !== "" && (
          <picture className="relative mx-auto my-4 block w-98 overflow-hidden rounded-lg bg-slate-800 shadow-xl shadow-slate-800 sm:rounded-xl lg:w-auto lg:rounded-2xl swiper-lazy">
            <source
              media="(max-width: 98%)"
              srcSet={imageSrc}
              width={150}
              height={150}
            ></source>
            <img src={imageSrc} width="100%" height="100%" alt="" />
          </picture>
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
          {(!imageUrl || imageUrl === "") && (
            <div
              className="relative flex justify-center items-center mx-auto my-4 w-90 overflow-hidden rounded-lg bg-slate-800 shadow-xl shadow-slate-800 sm:rounded-xl lg:w-auto lg:rounded-2xl"
              style={{
                background: `url(${imageSrc}) 0 0 no-repeat`,
                opacity: "0.7",
                backgroundSize: "100%",
                height: "300px",
                backgroundPosition: "center",
              }}
            >
              <span className="text-sm text-center">
                <Loading endWidth="100%" />
                <br />
                이미지가 없어요..
              </span>
            </div>
          )}
        </>
      </div>
    );
  };
  const thisType =
    router?.query?.type !== "random"
      ? router.query.type
      : lunchTypeKeys[Math.floor(Math.random() * lunchTypeKeys.length)];
  const [pageLoaded, setPageLoaded] = useState(false);
  const [filteredLunch, setFilteredLunch] = useState([]);

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
      const filteredLunch = data.data.filter(
        (i: ILunch) => i?.type === thisType
      );
      setFilteredLunch(filteredLunch);
    }
    setPageLoaded(true);
  }, [data]);

  return (
    <section className="work-carousel metro position-re">
      {filteredLunch && pageLoaded ? (
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
                  lazy={{
                    loadPrevNext: true, // 이전, 다음 이미지는 미리 로딩
                  }}
                  grabCursor={true}
                  centeredSlides={true}
                  lazy={true}
                  observer={true}
                  observeParents={true}
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
                      slidesPerView: 1,
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
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
};

Lunch.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Lunch;
