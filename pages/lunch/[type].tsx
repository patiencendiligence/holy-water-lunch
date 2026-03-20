import Layout from "@/components/common/Layout";
import Loading from "@/components/common/Loading";
import { LunchType, options } from "@/components/common/types";
import { useLunchList } from "@/hooks/store.query";
import { useRouter } from "next/router";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import Data from "./Data";

const TargetLunch = () => {
  const router = useRouter();
  const lunchTypeKeys = options?.map((t: any) => t.value);
  const thisType =
    router?.query?.type !== "random"
      ? router.query.type
      : lunchTypeKeys[Math.floor(Math.random() * lunchTypeKeys.length)];
  const { data, isLoading, isFetching } = useLunchList(thisType as string ?? '');
  
  if (isLoading || isFetching) return <Loading text="Loading..." />;
  
  return (
    <section className="work-carousel metro position-re">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 no-padding" style={{ height: `calc(100vh - 100px)`, overflow: `scroll` }}>
            <div className="swiper-container" style={{ width: "100vw" }}>
              {data?.length ?
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
                >
                  {data?.map((item: LunchType, index: number) => (
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
                : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

TargetLunch.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default TargetLunch;

