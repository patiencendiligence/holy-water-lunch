import Chip from "@/components/common/Chip";
import Seo from "@/components/common/Seo";
import SvgButton from "@/components/common/SvgButton";
import { LunchTypeData } from "@/constants";
import Link from "next/link";

export default function Home() {
  return (
    <div className="sm:px-0 lg:px-15 text-lg w-full text-gray-600 my-2 mx-auto overflow-hidden bg-black min-h-screen">
      <Seo title="HOLY WATER LUNCH" />
      <div className="max-w-4xl w-90 mx-auto mt-10">
        {LunchTypeData?.map((item: any, index: number) => (
          <Link href={item.href} key={item.name}>
            {item.type !== "svg" ? (
              <Chip
                width={item.width}
                color={item.color}
                outlined={[2, 4, 5, 8].indexOf(index) > -1}
                isBounce={item.isBounce}
                text={item.name}
              >
                {item.hasAnimation ? (
                  <span
                    className="animate-ping absolute inline-flex rounded-full bg-sky-400 opacity-75"
                    style={{
                      top: "50%",
                      left: " 50%",
                      width: "50px",
                      margin: "-25px 0 0 -25px",
                      height: " 50px",
                    }}
                  ></span>
                ) : (
                  ""
                )}
              </Chip>
            ) : (
              <SvgButton
                width={item.width}
                color={item.color}
                index={index}
                text={item.name}
              ></SvgButton>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
