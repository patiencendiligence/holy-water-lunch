import Loading from "@/components/common/Loading";
import WaterSvg from "@/components/common/WaterSvg";
import { LunchType } from "@/components/common/types";
import Image from 'next/image';
import router from "next/router";
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
}: LunchType) => {
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
                    <Image src={imageSrc} width={0} height={0} sizes="100vw" alt="" />
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

export default Data;