import Head from "next/head";

interface ISeoProps {
  title: string | undefined;
}

const Seo = ({ title }: ISeoProps) => {
  return (
    <Head>
      <title>{title} | HolyWaterLunch</title>
    </Head>
  );
};
export default Seo;
