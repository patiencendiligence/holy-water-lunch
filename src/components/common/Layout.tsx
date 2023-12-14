import Seo from "./Seo";
import styled from "@emotion/styled";
import SvgButton from "@/components/common/SvgButton";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { title } from "process";
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
`;

type Props = {
  children: React.ReactNode;
};
const checkTitle = (router: any) => {
  console.log(router.pathname, "pathname");
  let pathName = router.pathname;
  const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  //특수문자 검증
  if (reg.test(pathName)) {
    //특수문자 제거후 리턴
    return (pathName = pathName.replace(reg, ""));
  }
  const title =
    router.query && router.query.type
      ? JSON.stringify(router.query.type)
      : pathName && !!pathName.match("LunchList")
        ? "LunchList"
        : pathName !== "/"
          ? JSON.stringify(pathName)
          : ("Home" as const);
  console.log(title, "title");
  return title;
};
export default function Layout({ children }: Props) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const router = useRouter();
  const currentRef = useRef<HTMLInputElement>(null);

  const notchHeight =
    typeof window !== "undefined"
      ? window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--sat")
      : "100vh";
  const offset = 100 + Number(notchHeight.substring(0, notchHeight.length - 2));

  const checkNotch = () => {
    console.log(
      currentRef?.current?.offsetTop,
      "currentRef?.current?.offsetTop"
    );
    if (currentRef && currentRef?.current?.offsetTop) {
      if (typeof window !== "undefined") {
        window.scrollTo({
          top: currentRef?.current?.offsetTop - offset,
          behavior: "smooth",
        });
      }
    }
  };
  useEffect(() => {
    setPageLoaded(true);
    checkTitle(router);
    checkNotch();
  }, [router]);
  const storage = globalThis?.sessionStorage;
  const link =
    storage && storage.getItem("prevPath") !== storage.getItem("currentPath")
      ? storage.getItem("prevPath")
      : "/";
  return (
    <div className="font-sans relative px-4 items-start sm:px-6 md:px-4 lg:px-4 py-6 text-2xl mx-auto bg-black h-screen overflow-y-auto py-10">
      <Seo title={title} />
      <HomeContainer ref={currentRef}>
        {title !== "Home" && (
          <button
            className="origin-top-right fixed top-0 right-5 z-10"
            type="button"
            onClick={() => link && router.push(link)}
          >
            <SvgButton width="85" color="#18b4fc" text="뒤로가기"></SvgButton>
          </button>
        )}
        {children}
      </HomeContainer>
    </div>
  );
}
