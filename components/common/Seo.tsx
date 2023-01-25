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
        <meta
          property="og:image"
          content="https://github.com/patiencendiligence/holy-water-lunch/blob/a2b9d699b2fcf1c75520a2a90fbf1f2641600f5e/public/image.png?raw=true"
        />
        <meta property="og:description" content="성수동 점심 도우미" />
      </Head>
    </>
  );
};
export default Seo;
