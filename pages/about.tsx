import Layout from "components/common/Layout";
import LogoSvg from "components/common/LogoSvg";
import { useRouter } from "next/router";

const About = () => {
  const router = useRouter();
  const movePath = (path: any) => {
    console.log(typeof path);
    router.replace(path);
  };

  return (
    <>
      <span className="text-base mt-10">
        HOLY WATER LUNCH는
        <br />
        보다 짧고 성공적인
        <br />
        서울 성수동에서의 점심메뉴 선택을 위한 앱입니다.
        <br />
        <br />
        성수동 직장인의 가성비와 취향을 고려하여 선별한 리스트들 입니다.
        <br />
        <br />
        리스트에 추가를 원하시면
        <button
          className="flex items-center text-sm font-bold leading-6 text-cyan-500 hover:text-cyan-700 active:text-cyan-900"
          onClick={() => movePath("/AddLunch")}
        >
          여기 👈
        </button>
      </span>
      <LogoSvg />
    </>
  );
};

About.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;
export default About;
