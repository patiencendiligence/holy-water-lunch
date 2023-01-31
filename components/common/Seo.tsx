import Head from "next/head";
import { useState, useEffect } from "react";

interface ISeoProps {
  title: string;
}

const Seo = ({ title }: ISeoProps) => {
  const [titleText, setTitleText] = useState("");
  useEffect(() => {
    if (title) {
      setTitleText(title);
    }
  }, []);
  return (
    <>
      <Head>
        <title>{titleText} | HolyWaterLunch</title>
        <meta property="og:url" content="https://holywater-lunch.vercel.app" />
        <meta property="og:title" content="HOLY WATER LUNCH" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://github.com/patiencendiligence/holy-water-lunch/blob/a2b9d699b2fcf1c75520a2a90fbf1f2641600f5e/public/image.png?raw=true"
        />
        <meta property="og:description" content="성수동 점심 도우미" />
      </Head>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5091133649314994"
        crossOrigin="anonymous"
      ></script>
    </>
  );
};
export default Seo;
