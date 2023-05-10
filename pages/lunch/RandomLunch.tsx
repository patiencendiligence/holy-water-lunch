import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useLunchList } from "@/hooks/store.query";
import WaterSvg from "components/common/WaterSvg";
import Layout from "components/common/Layout";
import Loading from "components/common/Loading";
import { ILunch, options } from "components/common/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Map from "../api/map";
const RandomLunch = () => {
  const router = useRouter();
  const mapRef = useRef<any>(null);
  const [filteredLunch, setFilteredLunch] = useState([]);
  const lunchTypeKeys = options.map((t: any) => {
    return t.value;
  });
  const thisType =
    lunchTypeKeys[Math.floor(Math.random() * lunchTypeKeys.length)];
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

        <div
          id="vmap"
          ref={mapRef}
          style={{ width: "100%", height: "350px", left: 0, top: 0 }}
        ></div>

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
          {priceRate && +priceRate > 0 && (
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
  const { data, isLoading } = useLunchList();
  const [lunchList, setLunchList] = useState([]);

  useEffect(() => {
    if (data?.data && !isLoading) setLunchList(data.data);
  }, [data]);
  const vmap = mapRef.current?.vmap;
  const fnMoveZoom = () => {
    const zoom = vmap.getView().getZoom();
    if (16 > zoom) {
      return vmap.getView().setZoom(14);
    }
  };
  const move = (swiper: any) => {
    console.log(swiper, "???????");
    const x = 0;
    const y = 0;
    const z = 0;
    const _center = [x, y];
    var pan = vmap.ol.animation.pan({
      duration: 2000,
      source: vmap.getView().getCenter(),
    });
    vmap.beforeRender(pan);
    vmap.getView().setCenter(_center);
    setTimeout(fnMoveZoom(), 3000);
  };
  const setMap = (vw: any) => {
    const options = {
      basemapType: vw.ol3.BasemapType.GRAPHIC,
      controlDensity: vw.ol3.DensityType.EMPTY,
      interactionDensity: vw.ol3.DensityType.BASIC,
      controlsAutoArrange: true,
      homePosition: vw.ol3.CameraPosition,
      initPosition: vw.ol3.CameraPosition,
    };

    const vmap = new vw.ol3.Map("vmap", options);
  };
  useEffect(() => {
    const filterLunchList = () => {
      setFilteredLunch(lunchList.filter((i: ILunch) => i?.type === thisType));
    };
    filterLunchList();
    const vw = Map();
    setMap(vw);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lunchList, thisType]);

  return (
    <section className="work-carousel metro position-re">
      {isLoading ? (
        <Loading text="Loading..." />
      ) : (
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
                  onSlideChange={(swiper) => move(swiper)}
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
      )}
    </section>
  );
};

RandomLunch.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default RandomLunch;
