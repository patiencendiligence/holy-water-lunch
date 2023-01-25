import Head from "next/head";

interface ISeoProps {
  title: string;
}

const Seo = ({ title }: ISeoProps) => {
  return (
    <>
      <Head>
        <title>{title} | HolyWaterLunch</title>
        <meta property="og:url" content="https://holywater-lunch.vercel.app" />
        <meta property="og:title" content="HOLY WATER LUNCH" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="../../public/image.png" />
        <meta property="og:description" content="성수동 점심 도우미" />
      </Head>
    </>
  );
};
export default Seo;
