import Seo from "./Seo";
import styled from "@emotion/styled";
import SvgButton from "components/common/SvgButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    setPageLoaded(true);
    checkTitle(router);
  }, []);

  return (
    <div className="font-sans relative px-4 items-start sm:px-6 md:max-w-2xl md:px-4 lg:px-4 py-6 text-2xl">
      <Seo title={title} />
      <HomeContainer>
        {title !== "Home" && (
          <button
            className="origin-top-right fixed top-0 right-5 z-10"
            type="button"
            onClick={() => router.back()}
          >
            <SvgButton width="85" color="#18b4fc" text="뒤로가기"></SvgButton>
          </button>
        )}
        {children}
      </HomeContainer>
    </div>
  );
}
